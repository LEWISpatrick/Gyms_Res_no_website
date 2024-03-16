// Function to fetch gym data
function fetchGymData() {
  fetch('gyms.json') // Replace 'gyms.json' with the actual path to your gyms JSON file
      .then(response => response.json())
      .then(data => {
          // Display gyms with null or undefined website
          const filteredGyms = data.filter(item => item.website === null || item.website === undefined);
          filteredGyms.forEach(gym => {
              // Display gym information
              const gymContainer = document.createElement('div');
              gymContainer.innerHTML = `
                  <h2>${gym.title}</h2>
                  <p><strong>Rank:</strong> ${gym.rank}</p>
                  <p><strong>Address:</strong> <button class="address-button" data-address="${gym.address}">${gym.address}</button></p>
                  <p><strong>City:</strong> ${gym.city}</p>
                  <p><strong>State:</strong> ${gym.state}</p>
                  <p><strong>Postal Code:</strong> ${gym.postalCode}</p>
                  <p><strong>Country Code:</strong> ${gym.countryCode}</p>
                  <p><strong>Website:</strong> ${gym.website ? `<a href="${gym.website}" target="_blank">${gym.website}</a>` : 'Not available'}</p>
                  <p><strong>Google Maps Link:</strong> <a href="${gym.searchPageUrl}" target="_blank">View on Google Maps</a></p>
              `;
              document.getElementById('gyms').appendChild(gymContainer);
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
      .catch(error => console.error('Error fetching gym JSON:', error));
}

// Call the function to fetch and display gym data
fetchGymData();
