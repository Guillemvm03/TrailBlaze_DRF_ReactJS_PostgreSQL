from django.db import models,transaction

from datetime import datetime, timedelta
import time
from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin, Group, Permission, BaseUserManager)
from django.conf import settings
import jwt


class UserManager(BaseUserManager):
    def create_user(
        self, username: str, email: str, password: str , phone: str):
        user = self.model(
           
            email=self.normalize_email(email),
            username=username,
            phone=phone
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(
        self, username: str, email: str, password: str , phone: str):
        user = self.create_user(

            email=self.normalize_email(email),
            username=username,
            password=password,
            phone=phone
        )
        user.role = 'Admin'
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin, models.Model):
    uuid = models.CharField('uuid', max_length=36, unique=True, editable=False, null=False)
    username: str = models.CharField(max_length=40)
    name = models.CharField(max_length=40)
    email: str = models.EmailField(unique=True, max_length=254)
    phone: str = models.CharField(blank=False, max_length=9)
    role = models.CharField(max_length=15, default='Client')
    is_staff = models.BooleanField(default=False)
    avatar = models.CharField(max_length=255)
    countTokens = models.IntegerField(default=0)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)


    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS: list[str] = []

    objects = UserManager()


    @property
    def token(self):
        return self.generate_token_jwt(3600)

    # def generate_token_jwt(self):
    #     dt = datetime.now() + timedelta(minutes=settings.JWT_EXP_TIME)

    #     token = jwt.encode({
    #         'email': self.email,
    #         'exp': int(dt.strftime('%s'))
    #     }, settings.SECRET_KEY, algorithm='HS256')

    #     return token 
    
    def generate_token_jwt(self, token_time):
        dt = datetime.now() + timedelta(seconds=token_time)
        token = jwt.encode({'email': self.email, 'exp': dt.utcfromtimestamp(dt.timestamp())
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')