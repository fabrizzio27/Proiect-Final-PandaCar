FROM python:3.10-slim

WORKDIR /app

# Copy requirements first for better caching
COPY backendpandacar/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Set the Django settings module
ENV DJANGO_SETTINGS_MODULE=backendpandacar.production_settings

# Collect static files
RUN cd backendpandacar && python manage.py collectstatic --noinput

# Expose port
EXPOSE $PORT

# Start the application
WORKDIR /app/backendpandacar
CMD python manage.py migrate && gunicorn backendpandacar.wsgi:application --bind 0.0.0.0:$PORT
