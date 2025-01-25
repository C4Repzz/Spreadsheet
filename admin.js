document.addEventListener("DOMContentLoaded", () => {
  const addItemForm = document.getElementById("add-item-form");
  const adminList = document.getElementById("admin-list");
  const editItemModal = document.getElementById("edit-item-modal");
  const editItemForm = document.getElementById("edit-item-form");

  // Fetch items from the getItems function when the page loads
  async function fetchItems() {
    try {
      const response = await fetch('/functions/getItems');
      const items = await response.json();
      items.forEach(addItemToList);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  fetchItems(); // Load items when the page loads

  // Handle Add Item
  addItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const item = {
      name: addItemForm.name.value,
      price: addItemForm.price.value,
      link: addItemForm.link.value,
      imageLink: addItemForm.imageLink.value,
      qcLink: addItemForm.qcLink.value,
      category: addItemForm.category.value === "custom" ? addItemForm.customCategory.value : addItemForm.category.value,
    };

    // Send the new item to the backend (Netlify function)
    try {
      const response = await fetch('/functions/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        addItemToList(item); // Add the item to the list on success
        addItemForm.reset();
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item');
    }
  });

  // Add Item to Admin List
  function addItemToList(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");

    itemElement.innerHTML = `
      <p>Name: ${item.name}</p>
      <p>Price: ${item.price}</p>
      <p><a href="${item.link}" target="_blank">Product Link</a></p>
      <img src="${item.imageLink}" alt="${item.name}" style="max-width: 100px;">
      <p>QC Link: ${item.qcLink || "N/A"}</p>
      <p>Category: ${item.category}</p>
      <button class="edit-btn">Edit</button>
    `;

    // Handle Edit Button
    itemElement.querySelector(".edit-btn").addEventListener("click", () => {
      openEditModal(item, itemElement);
    });

    adminList.appendChild(itemElement);
  }

  // Open Edit Modal
  function openEditModal(item, itemElement) {
    editItemModal.style.display = "block";
    editItemForm.name.value = item.name;
    editItemForm.price.value = item.price;
    editItemForm.link.value = item.link;
    editItemForm.imageLink.value = item.imageLink;
    editItemForm.qcLink.value = item.qcLink;
    editItemForm.category.value = item.category;

    editItemForm.onsubmit = async (e) => {
      e.preventDefault();

      item.name = editItemForm.name.value;
      item.price = editItemForm.price.value;
      item.link = editItemForm.link.value;
      item.imageLink = editItemForm.imageLink.value;
      item.qcLink = editItemForm.qcLink.value;
      item.category = editItemForm.category.value;

      // Update item on the backend (if needed)
      try {
        const response = await fetch('/functions/updateItem', { // Assuming you have an 'updateItem' function
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });

        if (response.ok) {
          // Update the item in the list
          itemElement.innerHTML = `
            <p>Name: ${item.name}</p>
            <p>Price: ${item.price}</p>
            <p><a href="${item.link}" target="_blank">Product Link</a></p>
            <img src="${item.imageLink}" alt="${item.name}" style="max-width: 100px;">
            <p>QC Link: ${item.qcLink || "N/A"}</p>
            <p>Category: ${item.category}</p>
            <button class="edit-btn">Edit</button>
          `;

          itemElement.querySelector(".edit-btn").addEventListener("click", () => {
            openEditModal(item, itemElement);
          });

          editItemModal.style.display = "none";
        } else {
          alert('Failed to update item');
        }
      } catch (error) {
        console.error('Error updating item:', error);
        alert('Error updating item');
      }
    };
  }

  // Close Edit Modal
  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    editItemModal.style.display = "none";
  });
});
