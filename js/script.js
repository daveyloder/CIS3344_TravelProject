async function loadDestinationData() {
  try {
    const response = await fetch("destinationData.json");
    const data = await response.json();
    const destinations = data.map((destination) => ({
      // spread the destination info to add default price and region
      ...destination,
    }));
    displayDestinations(destinations);
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
            <a href="destination-details.html?id=${destination.id}" class="btn btn-small">View Details</a>
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
}

// Initial display of all destinations

document.addEventListener("DOMContentLoaded", () => {
  loadDestinationData();
});
