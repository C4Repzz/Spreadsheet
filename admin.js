document.addEventListener("DOMContentLoaded", () => {
  const addItemForm = document.getElementById("add-item-form");
  const adminList = document.getElementById("admin-list");
  const editItemModal = document.getElementById("edit-item-modal");
  const editItemForm = document.getElementById("edit-item-form");

  // Handle Add Item
  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const item = {
      name: addItemForm.name.value,
      price: addItemForm.price.value,
      link: addItemForm.link.value,
      imageLink: addItemForm.imageLink.value,
      qcLink: addItemForm.qcLink.value,
      category: addItemForm.category.value === "custom" ? addItemForm.customCategory.value : addItemForm.category.value,
    };

    addItemToList(item);
    addItemForm.reset();
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

    editItemForm.onsubmit = (e) => {
      e.preventDefault();

      item.name = editItemForm.name.value;
      item.price = editItemForm.price.value;
      item.link = editItemForm.link.value;
      item.imageLink = editItemForm.imageLink.value;
      item.qcLink = editItemForm.qcLink.value;
      item.category = editItemForm.category.value;

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
    };
  }

  // Close Edit Modal
  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    editItemModal.style.display = "none";
  });
});
