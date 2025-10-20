"""
Production settings for backendpandacar project.
"""

from .settings import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-nad2nz^fsmf^+vcd=l9k5&&wj@3dcuu5@axa2fls3##pwa1p8^')

# Allow all hosts for deployment
ALLOWED_HOSTS = ['*']

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    'https://proiect-final-panda-car-mngj.vercel.app',
]

# Update CORS settings for production
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False  # Keep this False for security

# Database - Use SQLite for now (can switch to PostgreSQL later)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static files settings for production
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings for production
SECURE_SSL_REDIRECT = False  # Temporarily disable for debugging
SESSION_COOKIE_SECURE = False  # Temporarily disable for debugging
CSRF_COOKIE_SECURE = False  # Temporarily disable for debugging
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# Update JWT settings for production
SIMPLE_JWT.update({
    "AUTH_COOKIE_DOMAIN": None,  # Will be set by the hosting platform
    "AUTH_COOKIE_SECURE": False,  # Temporarily disable for debugging
    "AUTH_COOKIE_REFRESH_TOKEN_DOMAIN": None,
    "AUTH_COOKIE_REFRESH_TOKEN_SECURE": False,  # Temporarily disable for debugging
    "AUTH_COOKIE_SAMESITE": "None",  # Allow cross-site cookies for mobile
    "AUTH_COOKIE_REFRESH_TOKEN_SAMESITE": "None",  # Allow cross-site cookies for mobile
})

# CSRF settings for production
CSRF_TRUSTED_ORIGINS = [
    "https://proiect-final-panda-car-mngj.vercel.app",
]

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
