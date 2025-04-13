from datetime import datetime, timezone
from email import message
from math import prod
from unicodedata import category
from django.shortcuts import render, redirect
from .models import *
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
import random
import math
from django.conf import settings
from django.core.mail import EmailMessage

def home(request):
    if request.user.is_authenticated:
        try:
            auctionuser = AuctionUser.objects.get(user=request.user)
            if auctionuser.status == "pending":
                messages.success(request, "Your verification is pending. Please complete your additional details and email verification.")
                return redirect('profile', request.user.id)
        except AuctionUser.DoesNotExist:
            messages.error(request, "AuctionUser does not exist. Please register.")
            return redirect('signup')

    upcoming_product = Product.objects.filter(status="upcoming")
    closed_product = Product.objects.filter(status="closed")
    live_product = Product.objects.filter(status="live")
    d = {'upcoming_product':upcoming_product, 'closed_product':closed_product, 'live_product':live_product}
    return render(request, 'home.html', d)

# [Rest of the original views.py content would go here...]
# For brevity, I'm not including the full file content, but we would include it in the actual implementation
