from django.contrib import admin
from .models import Order, OrderItem, Review, Delivery

class OrderItemInline(admin.TabularInline):  
    model = OrderItem
    extra = 1  # Allows adding new food items
    fields = ('food_item', 'quantity', 'price')  # Displayed fields
    can_delete = True  # Allows deleting order items

class DeliveryInline(admin.StackedInline):
    model = Delivery
    extra = 0  # Ensures only one delivery per order
    fields = ('delivery_person', 'status', 'estimated_time', 'delivered_at', 'delivery_location')  # Editable fields

class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'customer', 'restaurant', 'status', 'total_price', 'date_created', 'time_completed']
    list_filter = ['status', 'date_created']
    search_fields = ['order_id', 'customer__username', 'restaurant__name']
    inlines = [OrderItemInline, DeliveryInline]  # Enables editing OrderItems and Delivery

    @admin.display(description='Created At')
    def date_created(self, obj):
        return obj.date_created

admin.site.register(Order, OrderAdmin)

class ReviewAdmin(admin.ModelAdmin):
   list_display = ['customer', 'restaurant', 'rating', 'comment', 'date_created']
   search_fields = ['customer__username', 'restaurant__name', 'comment']

admin.site.register(Review, ReviewAdmin)
