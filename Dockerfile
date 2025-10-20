FROM ghcr.io/library/python:3.10.14-slim-bullseye

WORKDIR /app

# Copy requirements first for better caching
COPY backendpandacar/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Set the Django settings module
ENV DJANGO_SETTINGS_MODULE=backendpandacar.production_settings

# Ensure media directory exists and has proper permissions
RUN mkdir -p /app/backendpandacar/media/car_photos && \
    chmod -R 755 /app/backendpandacar/media

# Collect static files
RUN cd backendpandacar && python manage.py collectstatic --noinput

# Expose port
EXPOSE $PORT

# Start the application
WORKDIR /app/backendpandacar
CMD python manage.py migrate && python populate_db.py && gunicorn backendpandacar.wsgi:application --bind 0.0.0.0:$PORT
