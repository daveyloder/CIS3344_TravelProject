// Global variable to store destination data
let allDestinations = [];

async function loadDestinationData() {
  try {
    const response = await fetch("destinationData.json");
    const data = await response.json();
    allDestinations = data.map((destination) => ({
      // spread the destination info to add default price and region
      ...destination,
    }));
    displayDestinations(allDestinations);
    return Promise.resolve(); // Return a resolved promise.
  } catch (error) {
    console.log(`Error loading destination data: ${error}.`);
    return Promise.reject(error);
  }
}

// Function to create destination cards
function createDestinationCard(destination) {
  return `
      <div class="destination-card"">
        <div class="destination-image">
          <img src="${destination.image}" alt="${destination.name}">
        </div>
        <div class="destination-content">
          <h3>${destination.name}</h3>
          <p class="description">${destination.description}</p>
          <div class="destination-footer">
            <span class="price">${destination.price}</span>
            <button class="btn btn-small view-details" data-id="${destination.id}">View Details</button>
          </div>
        </div>
      </div>
    `;
}

// Function to display destinations
function displayDestinations(destinationsToShow) {
  const destinationsGrid = document.getElementById("destinationsGrid");

  if (destinationsToShow.length === 0) {
    destinationsGrid.innerHTML =
      '<p class="no-results">No destinations found. Please try a different search.</p>';
    return;
  }

  destinationsGrid.innerHTML = "";

  destinationsToShow.forEach((destination) => {
    destinationsGrid.innerHTML += createDestinationCard(destination);
  });

  // Add event listeners to all "View Details" buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", function () {
      const destinationId = parseInt(this.getAttribute("data-id"));
      openModal(destinationId);
    });
  });
}

// Function to open modal with destination details
function openModal(destinationId) {
  const destination = allDestinations.find((dest) => dest.id === destinationId);
  if (!destination) return;

  const modal = document.getElementById("destinationModal");
  const modalContent = document.getElementById("modalContent");
  const bookingForm = document.getElementById("bookingForm");
  const bookButton = document.getElementById("bookButton");

  // Create the content for the modal
  modalContent.innerHTML = `
    <h2>${destination.name}</h2>
    <div class="modal-image">
      <img src="${destination.image}" alt="${destination.name}">
    </div>
    <div class="modal-details">
      <p class="price-large">Price: ${destination.price}</p>
      <div class="long-description">
        <h3>About this Destination</h3>
        <p>${destination.details.long_description}</p>
      </div>
      <div class="itinerary">
        <h3>Itinerary</h3>
        <ul>
          ${destination.details.itinerary
            .map((day) => `<li>${day}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="location">
        <h3>Location</h3>
        <p>Latitude: ${destination.details.location.latitude}</p>
        <p>Longitude: ${destination.details.location.longitude}</p>
      </div>
    </div>
  `;

  // Reset and hide booking form
  if (bookingForm) {
    document.getElementById("tripBookingForm").reset();
    bookingForm.style.display = "none";
  }

  // Show the modal
  modal.style.display = "block";

  // Change book button text to "Book Now"

  bookButton.textContent = "Book Now";

  // Remove existing event listeners by cloning and replacing the button
  const newBookingButton = bookButton.cloneNode(true);

  bookButton.parentNode.replaceChild(newBookingButton, bookButton);

  // Add book button event listener
  document.getElementById("bookButton").addEventListener("click", function () {
    const form = document.getElementById("bookingForm");

    if (form.style.display === "none") {
      // First click - show the form
      form.style.display = "block";
      this.textContent = "Submit Booking";

      // Scroll to the form
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      if (validateBookingForm()) {
        submitBookingForm(destination.name);
      }
    }
  });

  // Close modal when clicking the X
  document.querySelector(".close-btn").addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
// Function to validate user input to the form
function validateBookingForm() {
  let isValid = true;

  const requireFields = [
    { id: "firstName", errorId: "firstNameError" },
    { id: "lastName", errorId: "lastNameError" },
    { id: "email", errorId: "emailError" },
    { id: "phone", errorId: "phoneError" },
    { id: "travelDate", errorId: "dateError" },
    { id: "travelers", errorId: "travelersError" },
  ];

  // Reset all error messages
  document.querySelectorAll(".error").forEach((error) => {
    error.style.display = "none";
  });

  requireFields.forEach((field) => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);

    if (!input.value.trim()) {
      isValid = false;
      error.style.display = "block";
    }
    // Additional validation for email
    if (field.id === "email" && input.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        isValid = false;
        error.style.display = "block";
      }
    }
  });

  return isValid;
}

// Submit the booking form and data
function submitBookingForm(destinationName) {
  const form = document.getElementById("tripBookingForm");
  const formData = new FormData(form);
  const bookingData = {};

  // Convert FormData to object
  for (let [key, value] of formData.entries()) {
    bookingData[key] = value;
  }

  // Add destination name to booking data
  bookingData.destination = destinationName;

  // Log the booking data (replace with your actual submission code)
  console.log("Booking submitted:", bookingData);

  // Show success message
  alert(
    `Thank you ${bookingData.firstName}! Your booking for ${destinationName} has been submitted. We'll contact you shortly to confirm your reservation.`
  );

  // Close the modal
  document.getElementById("destinationModal").style.display = "none";
}
// Search function that actively filters search input to destination card
function searchDestinations() {
  const searchInput = document
    .getElementById("destinationSearch")
    .value.toLowerCase();

  const filteredDestinations = allDestinations.filter((destination) => {
    // Check if destination name, description, or price contains the search input
    const nameMatch = destination.name.toLowerCase().includes(searchInput);
    const descriptionMatch = destination.description
      .toLowerCase()
      .includes(searchInput);
    const priceMatch = destination.price.toLowerCase().includes(searchInput);

    return nameMatch || descriptionMatch || priceMatch;
  });

  displayDestinations(filteredDestinations);
}

// Initial display of all destinations
document.addEventListener("DOMContentLoaded", () => {
  loadDestinationData().then(() => {
    document
      .getElementById("destinationSearch")
      .addEventListener("input", searchDestinations);
  });

  // Close modal when ESC key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.getElementById("destinationModal").style.display = "none";
    }
  });
});
