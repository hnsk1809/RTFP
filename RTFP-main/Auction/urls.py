from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from bid_app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('about/', about, name="about"),
    path('contact/', contact, name="contact"),
    path('login/', login_user, name="login"),
    path('signup/', signup, name="signup"),
    path('logout/', Logout, name="logout"),
    path('change_password/', Change_Password, name="change_password"),
    path('profile/<int:pid>/', profile, name="profile"),
    path('edit_profile/', Edit_profile, name="edit_profile"),
    path('email_verify/<int:pid>', email_verify, name="email_verify"),
    path('generateotp/<int:pid>', generateotp, name="generateotp"),

    # Category URLs
    path('add_category/', Add_Category, name="add_category"),
    path('view_category/', View_Category, name="view_category"),
    path('delete_category/<int:id>/', Delete_Category, name="delete_category"),

    # Product URLs
    path('add_product/', Add_Product, name="add_product"),
    path('view_product/', view_product, name="view_product"),
    path('delete_product/<int:pid>', delete_product, name="delete_product"),
    path('product_detail/<int:pid>', product_detail, name="product_detail"),
    path('edit_product/<int:pid>', edit_product, name="edit_product"),
    path('all_product/', all_product, name="all_product"),
    path('admin_product_detail/<int:pid>', admin_product_detail, name="admin_product_detail"),
    path('delete_admin_product/<int:pid>', delete_admin_product, name="delete_admin_product"),
    path('change_status/<int:pid>', change_status, name="change_status"),

    # Bidding URLs
    path('make_participants/<int:pid>', make_participants, name="make_participants"),
    path('getbidhistory/<int:pid>', getbidhistory, name="getbidhistory"),
    path('startbidding/<int:pid>', startbidding, name="startbidding"),
    path('changelivetocomplete/<int:pid>', changelivetocomplete, name="changelivetocomplete"),
    path('changeupcomingtolive/<int:pid>', changeupcomingtolive, name="changeupcomingtolive"),
    path('meetwinners/', meetwinners, name="meetwinners"),

    # Admin URLs
    path('admin_home/', admin_home, name="admin_home"),
    path('loginadmin/', Admin_Login, name="loginadmin"),
    path('view_buyer_user/', view_buyer_user, name="view_buyer_user"),
    path('view_seller_user/', view_seller_user, name="view_seller_user"),
    path('delete_user/<int:pid>', delete_user, name="delete_user"),
    path('view_participants/', view_participants, name="view_participants"),
    path('delete_participant/<int:pid>', delete_participant, name="delete_participant"),
    path('admin_view_product/', Admin_product, name="admin_view_product"),
    path('view_winner/', view_winner, name="view_winner"),
    path('change_user_status/<int:pid>', change_user_status, name="change_user_status"),
    path('bidder_detail/<int:pid>', bidder_detail, name="bidder_detail"),
    path('seller_detail/<int:pid>', seller_detail, name="seller_detail"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)