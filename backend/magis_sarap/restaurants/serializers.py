from rest_framework import serializers
from .models import Restaurant
import json

class RestaurantSerializer(serializers.ModelSerializer):
    cuisines = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField() 

    def get_cuisines(self, obj):
        return json.loads(obj.cuisines)

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return request.build_absolute_uri("/static/images/default.png")  

    class Meta:
        model = Restaurant
        fields = ["resto_id", "resto_name", "location", "image", "cuisines", "description"]
