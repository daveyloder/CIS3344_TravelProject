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
  } catch (error) {
    console.log(`Error loading destination data: ${error}.`);
  }
}

// Function to create destination cards
function createDestinationCard(destination) {
  return `
      <div class="destination-card" data-region="${destination.region}">
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

  // Create the content for the modal
  modalContent.innerHTML = `
    <h2>${destination.name}</h2>
    <div class="modal-image">
      <img src="${destination.image}" alt="${destination.name}">
    </div>
    <div class="modal-details">
      <p class="price-large">Price: ${destination.price}</p>
      <p class="region">Region: ${destination.region}</p>
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

  // Show the modal
  modal.style.display = "block";

  // Add book button event listener
  document.getElementById("bookButton").addEventListener("click", function () {
    console.log("Booked!");
    alert(`Thank you for booking ${destination.name}!`);
    modal.style.display = "none";
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

// Initial display of all destinations
document.addEventListener("DOMContentLoaded", () => {
  loadDestinationData();

  // Close modal when ESC key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.getElementById("destinationModal").style.display = "none";
    }
  });
});
