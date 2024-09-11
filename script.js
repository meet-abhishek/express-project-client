console.log('Welcome to Heaven');
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://your-production-url.com';

// Create the main container for the dashboard with Bootstrap styles
function createDashboard() {
  const dashboardDiv = document.createElement('div');
  dashboardDiv.classList.add('container', 'text-center', 'mt-5', 'p-3', 'border', 'rounded', 'shadow-sm');
  
  const title = document.createElement('h2');
  title.innerText = 'Dashboard';
  title.classList.add('mb-4', 'fw-bold');
  dashboardDiv.appendChild(title);
  
  document.body.appendChild(dashboardDiv);

  // Create button and message inside the dashboard div
  createButton(dashboardDiv);
  createMessageDiv(dashboardDiv);
}

// Create the button with Bootstrap styles
function createButton(parentElement) {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'mb-3'); // Bootstrap button classes
  button.innerText = 'Click Me';
  
  // Add click event listener to trigger API request with dynamic endpoint
  button.addEventListener('click', () => requestFromBackend('/message'));
  
  parentElement.appendChild(button);
}

// Create the hidden message div with Bootstrap styles
function createMessageDiv(parentElement) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('alert', 'alert-success', 'mt-3');
  messageDiv.innerText = 'Something good will happen';
  messageDiv.style.display = 'none'; // Initially hidden
  
  parentElement.appendChild(messageDiv);
}

// Function to request from the backend API with a dynamic endpoint
function requestFromBackend(endpoint) {
  const messageDiv = document.querySelector('.alert');
  messageDiv.innerText = 'Loading...';
  messageDiv.style.display = 'block'; // Show message div while loading

  // Construct the full URL with the dynamic endpoint
  const url = `${API_URL}${endpoint}`;

  // Make the request using fetch
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the backend returns JSON data
    })
    .then(data => {
      // Handle the response data from the backend
      messageDiv.innerText = `Success: ${data.message}`; // Assuming the API returns a 'message' field
    })
    .catch(error => {
      // Handle any errors
      messageDiv.classList.remove('alert-success');
      messageDiv.classList.add('alert-danger'); // Change to a danger alert
      messageDiv.innerText = `Error: ${error.message}`;
    });
}

// Initialize the dashboard creation
createDashboard();
