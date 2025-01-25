// Function to display all clothing items
function displayItems(items) {
  const clothesList = document.getElementById("clothes-list");
  clothesList.innerHTML = ''; // Clear previous list of items

  items.forEach((item) => {
    const clothingItem = document.createElement("div");
    clothingItem.classList.add("clothing-item");

    const anchorTag = document.createElement("a");
    anchorTag.href = item.link;
    anchorTag.target = "_blank"; 
    clothingItem.appendChild(anchorTag);

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    anchorTag.appendChild(img);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("item-details");

    const namePara = document.createElement("p");
    namePara.textContent = item.name;
    detailsDiv.appendChild(namePara);

    const pricePara = document.createElement("p");
    pricePara.innerHTML = `<span>$${item.price}</span>`;
    detailsDiv.appendChild(pricePara);

    // Check if item.qcLink exists, and add it or display a placeholder message
    if (item.qcLink && item.qcLink.trim() !== "") {
      const qcLink = document.createElement("a");
      qcLink.href = item.qcLink; 
      qcLink.textContent = "QC";
      qcLink.classList.add("qc-link"); 
      detailsDiv.appendChild(qcLink);
    } else {
      // Optional: Show a message if no QC link is available
      const noQcLink = document.createElement("span");
      noQcLink.textContent = "No QC available";  // Placeholder message
      noQcLink.classList.add("no-qc-link");
      detailsDiv.appendChild(noQcLink);
    }

    anchorTag.appendChild(detailsDiv);
    clothesList.appendChild(clothingItem);
  });
}

// Function to filter items based on category
function filterCategory(category) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  let filteredProducts;

  if (category === '') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }

  displayItems(filteredProducts);
}

// Function to check the zoom level and show/hide the brand text
function checkZoomLevel() {
  const brandText = document.querySelector('.brand-text');

  // Get the current zoom level by comparing the window's inner width to the document's width
  const zoomLevel = window.innerWidth / document.documentElement.clientWidth * 100;

  if (zoomLevel <= 115) {
    // Hide the brand text if zoom level is 115% or lower
    brandText.style.display = 'none';
  } else {
    // Show the brand text if zoom level is above 115%
    brandText.style.display = 'block';
  }
}

// Call the function on window resize or zoom change
window.addEventListener('resize', checkZoomLevel);
window.addEventListener('load', checkZoomLevel); // Also call on initial load


// Load and display all items on page load
document.addEventListener("DOMContentLoaded", function () {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  displayItems(products);
});

