from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework import exceptions
import logging

logger = logging.getLogger(__name__)

class CustomAuthentication(JWTAuthentication):
    """Custom authentication class that supports both cookies and headers"""
    
    def authenticate(self, request):
        # Try header first (for mobile)
        header = self.get_header(request)
        raw_token = None
        
        if header is not None:
            raw_token = self.get_raw_token(header)
            logger.info(f"Token found in header: {raw_token is not None}")
        else:
            # Try cookies (for web)
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
            logger.info(f"Token found in cookies: {raw_token is not None}")
        
        if raw_token is None:
            logger.warning("No token found in header or cookies")
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            logger.info(f"Authentication successful for user: {user}")
            return user, validated_token
        except Exception as e:
            logger.error(f"Token validation failed: {str(e)}")
            return None
