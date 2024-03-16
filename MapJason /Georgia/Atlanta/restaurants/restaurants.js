// Function to fetch restaurant data
function fetchRestaurantData() {
    fetch('restaurants.json') // Replace 'restaurants.json' with the actual path to your restaurants JSON file
        .then(response => response.json())
        .then(data => {
            // Display restaurants with null or undefined website
            const filteredRestaurants = data.filter(item => item.website === null || item.website === undefined);
            filteredRestaurants.forEach(restaurant => {
                // Display restaurant information
                const restaurantContainer = document.createElement('div');
                restaurantContainer.innerHTML = `
                    <h2>${restaurant.title}</h2>
                    <p><strong>Rank:</strong> ${restaurant.rank}</p>
                    <p><strong>Address:</strong> <button class="address-button" data-address="${restaurant.address}">${restaurant.address}</button></p>
                    <p><strong>City:</strong> ${restaurant.city}</p>
                    <p><strong>State:</strong> ${restaurant.state}</p>
                    <p><strong>Postal Code:</strong> ${restaurant.postalCode}</p>
                    <p><strong>Country Code:</strong> ${restaurant.countryCode}</p>
                    <p><strong>Website:</strong> ${restaurant.website ? `<a href="${restaurant.website}" target="_blank">${restaurant.website}</a>` : 'Not available'}</p>
                    <p><strong>Google Maps Link:</strong> <a href="${restaurant.searchPageUrl}" target="_blank">View on Google Maps</a></p>
                    <p><strong>Popular Times Live Text:</strong> ${restaurant.popularTimesLiveText}</p>
                    <p><strong>Popular Times Live Percent:</strong> ${restaurant.popularTimesLivePercent}</p>
                `;
                document.getElementById('restaurants').appendChild(restaurantContainer);
            });

            // Add event listener to address buttons
            const addressButtons = document.querySelectorAll('.address-button');
            addressButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const address = this.dataset.address;
                    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                    window.open(searchUrl, '_blank');
                });
            });
        })
        .catch(error => console.error('Error fetching restaurant JSON:', error));
}

// Call the function to fetch and display restaurant data
fetchRestaurantData();
