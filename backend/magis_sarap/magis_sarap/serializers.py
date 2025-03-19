from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["id"] = user.id  # Ensure correct id mapping
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Get refresh and access tokens
        refresh = self.get_token(self.user)

        # Explicitly serialize tokens into strings
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)  # Ensure JSON serializable

        return data
