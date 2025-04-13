import sqlite3

# Connect to (or create) auction.db
with sqlite3.connect("auction.db") as conn:
    conn.executescript("""
    -- Create users table
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        user_type TEXT NOT NULL,
        balance REAL DEFAULT 0
    );

    -- Create gadgets table
    CREATE TABLE IF NOT EXISTS gadgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        features TEXT,
        age INTEGER,
        status TEXT,
        initialBid REAL NOT NULL,
        currentBid REAL DEFAULT 0,
        biddingStart TEXT NOT NULL,
        biddingEnd TEXT NOT NULL,
        image TEXT,
        timeLeft TEXT,
        description TEXT
    );
    """)

print("✅ New auction.db created with users and gadgets tables.")
