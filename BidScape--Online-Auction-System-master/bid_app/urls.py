# Category URLs
path('add_category/', views.Add_Category, name='add_category'),
path('view_category/', views.View_Category, name='view_category'),
path('delete_category/<int:id>/', views.Delete_Category, name='delete_category'),

# Product URLs
path('add_product/', views.Add_Product, name='add_product'),
path('view_product/', views.View_Product, name='view_product'),
path('delete_product/<int:id>/', views.Delete_Product, name='delete_product'), 