from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id','username', 'uuid', 'email', 'phone','role', 'password', 'balance')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):

        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError("This email is already in use")
        
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError("This username is already in use.")
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone']
        )
        return user

    def getUser(context):
            email = context['email']

            try:
                user = User.objects.get(email=email)
            except:
                raise serializers.ValidationError('*User not found.')

            return {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'phone': user.phone,
                    'email': user.email,
                    'role': user.role,
                    'balance': user.balance,
                },
                'token': user.token,
            }