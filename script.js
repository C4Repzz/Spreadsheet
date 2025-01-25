// Add item to the list
async function addItemToList(event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Collect form data
  const newItem = {
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    imageLink: document.getElementById('image-link').value,
    category: document.getElementById('category').value === 'custom' 
              ? document.getElementById('custom-category').value 
              : document.getElementById('category').value,
    qcLink: document.getElementById('qc-link').value || null,
  };

  // Send POST request to Netlify function to add the item
  try {
    const response = await fetch('/.netlify/functions/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      alert('Item added successfully!');
      // Optionally reload or update the list after adding an item
      loadItems();
      document.getElementById('add-item-form').reset(); // Reset the form
    } else {
      alert('Failed to add item');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// Load all items from data
async function loadItems() {
  try {
    const response = await fetch('/.netlify/functions/getItems');
    const items = await response.json();

    const itemsContainer = document.getElementById('admin-list');
    itemsContainer.innerHTML = ''; // Clear previous items
    items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('clothing-item');
      itemElement.innerHTML = `
        <img src="${item.imageLink}" alt="${item.name}" />
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Category: ${item.category}</p>
          <a href="${item.qcLink}" target="_blank">View QC Link</a>
          <button onclick="editItem('${item.name}')">Edit</button>
        </div>
      `;
      itemsContainer.appendChild(itemElement);
    });
  } catch (error) {
    alert('Error loading items: ' + error.message);
  }
}

// Function to open the Edit modal and populate the fields (not fully implemented)
function editItem(itemName) {
  // Find the item based on the name (or ID) and populate the edit form fields.
  // This can be expanded to include functionality to edit items.
  alert(`Edit functionality for ${itemName} is not fully implemented yet.`);
}

// Call loadItems on page load to display existing items
window.onload = loadItems;
