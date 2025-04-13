from flask import Flask, jsonify, request, session, send_from_directory, render_template
from flask_cors import CORS
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# --- App Config ---
app = Flask(__name__)
CORS(app)
app.secret_key = 'replace_with_strong_secret_key'  # Replace this with a strong key in production

# --- Image Uploads ---
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- Database Connection ---
def get_db_connection():
    conn = sqlite3.connect('auction.db')
    conn.row_factory = sqlite3.Row
    return conn

# --- Page Routes ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/register')
def register_page():
    return render_template('register.html')

# --- API: Auth ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user_type = data.get('userType')

    if not username or not password or not user_type:
        return jsonify({'message': 'Username, password, and user type are required'}), 400

    hashed_password = generate_password_hash(password)
    conn = get_db_connection()

    try:
        conn.execute(
            'INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)',
            (username, hashed_password, user_type)
        )
        conn.commit()
        return jsonify({'message': 'Registration successful'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Username already exists'}), 400
    except sqlite3.Error as e:
        return jsonify({'message': f'Error during registration: {str(e)}'}), 500
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    print("🔐 Attempting login...")
    print("🔍 Username entered:", username)
    print("🔍 Password entered (plain):", password)

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()

    if user:
        print("✅ User found in DB:", dict(user))
        print("🔍 Stored hashed password:", user['password'])
    else:
        print("❌ No user found with that username")

    if user and check_password_hash(user['password'], password):
        session['user_id'] = user['id']
        session['username'] = user['username']
        session['user_type'] = user['user_type']
        return jsonify({'message': 'Login successful', 'userType': user['user_type']}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/seller/dashboard')
def seller_dashboard():
    return render_template('seller/dashboard.html')

@app.route('/bidder/dashboard')
def bidder_dashboard():
    return render_template('bidder/dashboard.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    return render_template('admin/dashboard.html')

# --- API: Gadgets ---
@app.route('/api/gadgets', methods=['GET'])
def get_gadgets():
    conn = get_db_connection()
    gadgets = conn.execute('SELECT * FROM gadgets').fetchall()
    conn.close()
    return jsonify([dict(g) for g in gadgets])

@app.route('/api/gadgets/<int:gadget_id>', methods=['GET'])
def get_gadget_details(gadget_id):
    conn = get_db_connection()
    gadget = conn.execute('SELECT * FROM gadgets WHERE id = ?', (gadget_id,)).fetchone()
    conn.close()

    if gadget:
        return jsonify(dict(gadget))
    else:
        return jsonify({'message': 'Gadget not found'}), 404
@app.route('/bidder/gadgets')
def view_gadgets():
    return render_template('bidder/view-gadgets.html')


@app.route('/api/gadgets', methods=['POST'])
def add_gadget():
    if 'gadget-name' not in request.form or 'initial-bid' not in request.form or \
       'bidding-start' not in request.form or 'bidding-end' not in request.form:
        return jsonify({'message': 'Missing required fields'}), 400

    form = request.form
    gadget_name = form['gadget-name']
    gadget_features = form.get('gadget-features', '')
    gadget_age = form.get('gadget-age', None)
    gadget_status = form['gadget-status']
    initial_bid = form['initial-bid']
    bidding_start = form['bidding-start']
    bidding_end = form['bidding-end']

    image_paths = []
    if 'gadget-images' in request.files:
        images = request.files.getlist('gadget-images')
        for image in images:
            if image.filename:
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
                image.save(filepath)
                image_paths.append(filepath)

    conn = get_db_connection()
    try:
        conn.execute(
            '''
            INSERT INTO gadgets (name, features, age, status, initialBid, currentBid, biddingStart, biddingEnd, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            (
                gadget_name,
                gadget_features,
                gadget_age,
                gadget_status,
                initial_bid,
                initial_bid,  # Start currentBid with initialBid
                bidding_start,
                bidding_end,
                ','.join(image_paths)
            )
        )
        conn.commit()
        return jsonify({'message': 'Gadget added successfully'}), 201
    except sqlite3.Error as e:
        return jsonify({'message': f'Error adding gadget: {str(e)}'}), 500
    finally:
        conn.close()

@app.route('/api/gadgets/<int:gadget_id>/bids', methods=['POST'])
def place_bid(gadget_id):
    data = request.json
    bid_amount = data.get('bidAmount')

    if not bid_amount:
        return jsonify({'message': 'Bid amount is required'}), 400

    conn = get_db_connection()
    gadget = conn.execute('SELECT * FROM gadgets WHERE id = ?', (gadget_id,)).fetchone()

    if not gadget:
        conn.close()
        return jsonify({'message': 'Gadget not found'}), 404

    current_bid = gadget['currentBid']
    if float(bid_amount) <= float(current_bid):
        conn.close()
        return jsonify({'message': 'Bid must be higher than the current bid'}), 400

    try:
        conn.execute('UPDATE gadgets SET currentBid = ? WHERE id = ?', (bid_amount, gadget_id))
        conn.commit()

        # Add 2% commission to user's balance (for simulation)
        commission = float(bid_amount) * 0.02
        conn.execute(
            'UPDATE users SET balance = COALESCE(balance, 0) + ? WHERE id = ?',
            (commission, session['user_id'])
        )
        conn.commit()

        return jsonify({'message': 'Bid placed successfully'}), 200
    except sqlite3.Error as e:
        return jsonify({'message': f'Error placing bid: {str(e)}'}), 500
    finally:
        conn.close()

# --- Serve Uploaded Images ---
@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# --- Run the App ---
if __name__ == '__main__':
    app.run(debug=True)
