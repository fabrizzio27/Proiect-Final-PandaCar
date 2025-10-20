import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import './CarsPage.css';
import config from '../../config';
import { useAuth } from '../../contexts/AuthContext';

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null); // New state for the selected car
    const [startDate, setStartDate] = useState(''); // State for start date
    const [endDate, setEndDate] = useState(''); // State for end date
    const { isAuthenticated } = useAuth();

    // Fetch cars from the API
    const fetchCars = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${config.API_BASE_URL}/cars/`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                setError('Error fetching cars!');
                throw new Error(JSON.stringify(errorData));
            }

            const data = await response.json();
            setCars(data);
            setFilteredCars(data);
        } catch (error) {
            setError('Failed to fetch cars');
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleFilterChange = (filteredCars) => {
        setFilteredCars(filteredCars);
    };

    const handleAddToCart = async (car) => {
        try {
            console.log('Adding to cart:', car.car_name);
            console.log('API URL:', `${config.API_BASE_URL}/cart/add/${car.id}/`);
            console.log('Is authenticated:', isAuthenticated);
            console.log('User agent:', navigator.userAgent);
            
            if (!isAuthenticated) {
                alert('Please log in first to add items to cart');
                return;
            }
            
            console.log('Making request to:', `${config.API_BASE_URL}/cart/add/${car.id}/`);
            
            // Get token from localStorage for mobile compatibility
            const token = localStorage.getItem('access_token');
            const headers = {
                'Content-Type': 'application/json',
            };
            
            // Add Authorization header if token exists (for mobile)
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
                console.log('Using Authorization header for mobile');
            }
            
            const response = await fetch(`${config.API_BASE_URL}/cart/add/${car.id}/`, {
                method: 'POST',
                credentials: 'include',
                headers: headers,
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                console.error('Response not OK:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert(`Server error: ${response.status} - ${response.statusText}`);
                return;
            }
            
            const data = await response.json();
            console.log('Response data:', data);

            if (response.status === 201) {
                alert(`${car.car_name} added to cart successfully!`);
                console.log(`${car.car_name} added to cart`);
            } else if (response.status === 200 && data.message.includes("already")) {
                alert(`${car.car_name} is already in your cart`);
                console.log(`${car.car_name} is already in your cart`);
            } else {
                alert(`Error: ${data.error || 'Failed to add to cart'}`);
                console.error('Failed to add to cart');
            }
        } catch (error) {
            console.error('Error in handleAddToCart:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            alert(`Network error: ${error.message}. Please check your connection.`);
        }
    };

    const handleAddToFavorites = async (car) => {
        try {
            console.log('Adding to favorites:', car.car_name);
            console.log('API URL:', `${config.API_BASE_URL}/favorites/add/${car.id}/`);
            console.log('Is authenticated:', isAuthenticated);
            console.log('User agent:', navigator.userAgent);
            
            if (!isAuthenticated) {
                alert('Please log in first to add items to favorites');
                return;
            }
            
            console.log('Making request to:', `${config.API_BASE_URL}/favorites/add/${car.id}/`);
            
            // Get token from localStorage for mobile compatibility
            const token = localStorage.getItem('access_token');
            const headers = {
                'Content-Type': 'application/json',
            };
            
            // Add Authorization header if token exists (for mobile)
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
                console.log('Using Authorization header for mobile');
            }
            
            const response = await fetch(`${config.API_BASE_URL}/favorites/add/${car.id}/`, {
                method: 'POST',
                credentials: 'include',
                headers: headers,
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                console.error('Response not OK:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error response:', errorText);
                alert(`Server error: ${response.status} - ${response.statusText}`);
                return;
            }
            
            const data = await response.json();
            console.log('Response data:', data);

            if (response.status === 201) {
                alert(`${car.car_name} added to favorites successfully!`);
                console.log(`${car.car_name} added to favorites`);
            } else if (response.status === 200 && data.message.includes("already")) {
                alert(`${car.car_name} is already in your favorites`);
                console.log(`${car.car_name} is already in your favorites`);
            } else {
                alert(`Error: ${data.error || 'Failed to add to favorites'}`);
                console.error('Failed to add to favorites');
            }
        } catch (error) {
            console.error('Error in handleAddToFavorites:', error);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            alert(`Network error: ${error.message}. Please check your connection.`);
        }
    };

    const handleViewDetails = (car) => {
        setSelectedCar(car); // Set the selected car when "View details" is clicked
    };

    const handleCloseDetails = () => {
        setSelectedCar(null); // Reset the selected car and show the list again
    };

    const handleDateChange = (e, type) => {
        if (type === 'start') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }
    };

    return (
        <div className="carsWrapper">
            <Header />
            <div className="contentCarspage">
                <Filters onFilterChange={handleFilterChange} cars={cars} />
                <main className="mainContentCars">
                    {selectedCar ? (
                        <div className="car-details">
                            <button className="close-button" onClick={handleCloseDetails}>X</button>
                            <h1>{selectedCar.car_name} ({selectedCar.brand_name})</h1>
                            <img src={selectedCar.photo_url.startsWith('http') ? selectedCar.photo_url : `${config.API_BASE_URL.replace('/api', '')}${selectedCar.photo_url}`} alt={`${selectedCar.car_name} photo`} />
                            <p>Price per day: ${selectedCar.price_per_day}</p>
                            <p>Fuel type: {selectedCar.fuel_type}</p>
                            <p>Seats: {selectedCar.number_of_seats}</p>
                            <p>Horsepower: {selectedCar.horse_power} HP</p>

                            {/* Date Selection */}
                            <div className="date-selection">
                                <label>Select dates:</label>
                                <span> From: </span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => handleDateChange(e, 'start')}
                                />
                                <span> To: </span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => handleDateChange(e, 'end')}
                                />
                            </div>

                            {/* Add to Cart button */}
                            <button className="add-to-cart-button" onClick={() => handleAddToCart(selectedCar)}>Add to Cart</button>
                        </div>
                    ) : (
                        <>
                            <h1>Available Cars</h1>
                            {loading && <p>Loading...</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="cars-list">
                                {filteredCars.length === 0 ? (
                                    <p>No cars available</p>
                                ) : (
                                    filteredCars.map((car) => (
                                        <div key={car.id} className="car-card">
                                            <h3>{car.car_name} ({car.brand_name})</h3>
                                            <img src={car.photo_url.startsWith('http') ? car.photo_url : `${config.API_BASE_URL.replace('/api', '')}${car.photo_url}`} alt={`${car.car_name} photo`} />
                                            <p>Price per day: ${car.price_per_day}</p>
                                            <p>Fuel type: {car.fuel_type}</p>
                                            <p>Seats: {car.number_of_seats}</p>
                                            <p>Horsepower: {car.horse_power} HP</p>
                                            <div className="car-card-buttons">
                                                <button
                                                    className="favorite-button"
                                                    onClick={() => handleAddToFavorites(car)} // passing car as an argument
                                                >
                                                    Add to favorites
                                                </button>
                                                <button
                                                    className="details-button"
                                                    onClick={() => handleViewDetails(car)} // passing car as an argument
                                                >
                                                    View details
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CarsPage;
