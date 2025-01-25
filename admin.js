document.addEventListener('DOMContentLoaded', function () {
  const adminList = document.getElementById('admin-list');
  const addItemForm = document.getElementById('add-item-form');
  const editItemForm = document.getElementById('edit-item-form');
  const editModal = document.getElementById('edit-item-modal');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');

  // Fetch products from localStorage
  function fetchProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }

  // Save products to localStorage
  function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Render products in admin view
  function renderAdminProducts() {
    const products = fetchProducts();
    adminList.innerHTML = ''; // Clear the admin list

    products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('clothing-item');

      // Create buttons
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-btn');
      removeButton.onclick = () => {
        products.splice(index, 1);
        saveProducts(products);
        renderAdminProducts();
      };

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-btn');
      editButton.onclick = () => {
        openEditModal(product, index);
      };

      buttonContainer.appendChild(removeButton);
      buttonContainer.appendChild(editButton);

      // Image and details
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;

      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('item-details');

      const namePara = document.createElement('p');
      namePara.textContent = product.name;

      const pricePara = document.createElement('p');
      pricePara.innerHTML = `<span>$${product.price}</span>`;

      detailsDiv.appendChild(namePara);
      detailsDiv.appendChild(pricePara);

      // Append elements to the product div
      productDiv.appendChild(buttonContainer);
      productDiv.appendChild(img);
      productDiv.appendChild(detailsDiv);

      // Append product div to the admin list
      adminList.appendChild(productDiv);
    });
  }

  // Handle form submission to add a new product
  addItemForm.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image-link').value;
    const link = document.getElementById('link').value;
    const category = document.getElementById('category').value;
    const customCategory = document.getElementById('custom-category').value;

    // If 'custom' category is selected, use the custom category input
    const finalCategory = category === 'custom' ? customCategory : category;

    // Check if all fields are filled
    if (name.trim() === '' || price.trim() === '' || image.trim() === '' || link.trim() === '' || finalCategory.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    const products = fetchProducts();
    products.push({ name, price, image, link, category: finalCategory });
    saveProducts(products);
    renderAdminProducts();
    e.target.reset(); // Clear the form
  };

  // Open the edit modal and pre-fill it with product data
  function openEditModal(product, index) {
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-link').value = product.link;
    document.getElementById('edit-image-link').value = product.image;
    document.getElementById('edit-category').value = product.category;
    document.getElementById('edit-qc-link').value = product.qcLink || '';

    // If the category is "Custom", show the custom category input
    if (product.category === 'custom') {
      document.getElementById('edit-custom-category').style.display = 'inline';
      document.getElementById('edit-custom-category').value = product.category;
    } else {
      document.getElementById('edit-custom-category').style.display = 'none';
    }

    window.editingProductIndex = index;
    editModal.style.display = 'block';
  }

  // Close the edit modal
  cancelEditBtn.onclick = function () {
    editModal.style.display = 'none';
  };

  // Save changes to the product
  editItemForm.onsubmit = function (e) {
    e.preventDefault();

    const updatedProduct = {
      name: document.getElementById('edit-name').value,
      price: document.getElementById('edit-price').value,
      link: document.getElementById('edit-link').value,
      image: document.getElementById('edit-image-link').value,
      category: document.getElementById('edit-category').value,
      qcLink: document.getElementById('edit-qc-link').value,
    };

    // If 'custom' category is selected, use the custom category input
    const customCategory = document.getElementById('edit-custom-category').value;
    updatedProduct.category = updatedProduct.category === 'custom' ? customCategory : updatedProduct.category;

    // Check if all fields are filled
    if (updatedProduct.name.trim() === '' || updatedProduct.price.trim() === '' || updatedProduct.image.trim() === '' || updatedProduct.link.trim() === '' || updatedProduct.category.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    const products = fetchProducts();
    products[window.editingProductIndex] = updatedProduct;
    saveProducts(products);
    renderAdminProducts();
    editModal.style.display = 'none';
  };

  // Initial rendering of products
  renderAdminProducts();
});
