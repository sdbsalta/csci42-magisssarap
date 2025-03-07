from django.contrib import admin
from .models import Order, Review

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'status', 'total_price', 'date_created', 'time_completed']
    list_filter = ['status', 'date_created']
    
    @admin.display(description='Created At')
    def date_created(self, obj):
        return obj.date_created

    @admin.display(description='Updated At')
    def updated_at(self, obj):
        return obj.updated_at

admin.site.register(Order, OrderAdmin)

class ReviewAdmin(admin.ModelAdmin):
   list_display = ['customer', 'restaurant', 'rating', 'comment', 'date_created']

admin.site.register(Review, ReviewAdmin)
