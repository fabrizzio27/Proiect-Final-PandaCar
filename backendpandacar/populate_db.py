#!/usr/bin/env python
import os
import sys
import django

# Add the backend directory to Python path
sys.path.append('/app/backendpandacar')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendpandacar.production_settings')
django.setup()

from api.models import Car, CarAvailability

# Sample cars data
cars_data = [
    {
        'car_name': 'BMW X5',
        'brand': 'BMW',
        'model': 'X5',
        'year': 2023,
        'price_per_day': 150,
        'seats': 5,
        'fuel_type': 'Gasoline',
        'transmission': 'Automatic',
        'photo_url': '/media/car_photos/BMW_X5.jpg',
        'description': 'Luxury SUV with premium features'
    },
    {
        'car_name': 'Audi Q7',
        'brand': 'Audi',
        'model': 'Q7',
        'year': 2023,
        'price_per_day': 160,
        'seats': 7,
        'fuel_type': 'Gasoline',
        'transmission': 'Automatic',
        'photo_url': '/media/car_photos/Audi_Q7.jpg',
        'description': 'Premium SUV with advanced technology'
    },
    {
        'car_name': 'Mercedes S-Class',
        'brand': 'Mercedes',
        'model': 'S-Class',
        'year': 2023,
        'price_per_day': 200,
        'seats': 5,
        'fuel_type': 'Gasoline',
        'transmission': 'Automatic',
        'photo_url': '/media/car_photos/Mercedes_Benz_S-Class.jpg',
        'description': 'Ultra-luxury sedan with cutting-edge features'
    },
    {
        'car_name': 'Tesla Model 3',
        'brand': 'Tesla',
        'model': 'Model 3',
        'year': 2023,
        'price_per_day': 120,
        'seats': 5,
        'fuel_type': 'Electric',
        'transmission': 'Automatic',
        'photo_url': '/media/car_photos/Tesla_Model_3.jpg',
        'description': 'Electric sedan with autopilot features'
    },
    {
        'car_name': 'Honda Civic',
        'brand': 'Honda',
        'model': 'Civic',
        'year': 2023,
        'price_per_day': 80,
        'seats': 5,
        'fuel_type': 'Gasoline',
        'transmission': 'Manual',
        'photo_url': '/media/car_photos/Honda_Civic.jpg',
        'description': 'Reliable compact car with great fuel economy'
    },
    {
        'car_name': 'Toyota Yaris',
        'brand': 'Toyota',
        'model': 'Yaris',
        'year': 2023,
        'price_per_day': 70,
        'seats': 5,
        'fuel_type': 'Gasoline',
        'transmission': 'Manual',
        'photo_url': '/media/car_photos/Toyota_Yaris.jpg',
        'description': 'Compact and efficient city car'
    }
]

# Create cars
for car_data in cars_data:
    car, created = Car.objects.get_or_create(
        car_name=car_data['car_name'],
        defaults=car_data
    )
    if created:
        print(f"Created car: {car.car_name}")
    else:
        print(f"Car already exists: {car.car_name}")
    
    # Create availability for each car
    availability, created = CarAvailability.objects.get_or_create(
        car=car,
        defaults={'is_available': True}
    )
    if created:
        print(f"Created availability for: {car.car_name}")

print("Database populated successfully!")
