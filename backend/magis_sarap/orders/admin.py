from django.contrib import admin
from .models import Order, Payment, Review

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

class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'amount', 'payment_status', 'date_paid']
    list_filter = ['payment_status']

    @admin.display(description='Is Paid')
    def is_paid(self, obj):
        return obj.is_paid

admin.site.register(Payment, PaymentAdmin)

class ReviewAdmin(admin.ModelAdmin):
   list_display = ['customer', 'restaurant', 'rating', 'comment', 'date_created']

admin.site.register(Review, ReviewAdmin)
