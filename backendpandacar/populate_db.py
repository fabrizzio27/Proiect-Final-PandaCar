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
        'brand_name': 'BMW',
        'price_per_day': 150,
        'number_of_seats': 5,
        'fuel_type': 'Petrol',
        'photo_name': 'BMW_X5.jpg',
        'color': 'Black',
        'horse_power': 300,
        'engine_capacity': 3.0
    },
    {
        'car_name': 'Audi Q7',
        'brand_name': 'Audi',
        'price_per_day': 160,
        'number_of_seats': 7,
        'fuel_type': 'Petrol',
        'photo_name': 'Audi_Q7.jpg',
        'color': 'White',
        'horse_power': 340,
        'engine_capacity': 3.0
    },
    {
        'car_name': 'Mercedes S-Class',
        'brand_name': 'Mercedes',
        'price_per_day': 200,
        'number_of_seats': 5,
        'fuel_type': 'Petrol',
        'photo_name': 'Mercedes_Benz_S-Class.jpg',
        'color': 'Silver',
        'horse_power': 450,
        'engine_capacity': 4.0
    },
    {
        'car_name': 'Tesla Model 3',
        'brand_name': 'Tesla',
        'price_per_day': 120,
        'number_of_seats': 5,
        'fuel_type': 'Electric',
        'photo_name': 'Tesla_Model_3.jpg',
        'color': 'Blue',
        'horse_power': 283,
        'engine_capacity': 0.0
    },
    {
        'car_name': 'Honda Civic',
        'brand_name': 'Honda',
        'price_per_day': 80,
        'number_of_seats': 5,
        'fuel_type': 'Petrol',
        'photo_name': 'Honda_Civic.jpg',
        'color': 'Red',
        'horse_power': 158,
        'engine_capacity': 1.5
    },
    {
        'car_name': 'Toyota Yaris',
        'brand_name': 'Toyota',
        'price_per_day': 70,
        'number_of_seats': 5,
        'fuel_type': 'Petrol',
        'photo_name': 'Toyota_Yaris.jpg',
        'color': 'White',
        'horse_power': 106,
        'engine_capacity': 1.0
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
        defaults={
            'start_date': '2024-01-01',
            'end_date': '2024-12-31'
        }
    )
    if created:
        print(f"Created availability for: {car.car_name}")

print("Database populated successfully!")
