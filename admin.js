<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <!-- Login Section -->
    <div id="login-section">
      <h1>Admin Login</h1>
      <form id="login-form">
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p id="login-error" style="color: red; display: none;">Invalid login credentials. Please try again.</p>
    </div>

    <!-- Admin Panel (hidden by default) -->
    <div id="admin-panel" style="display: none;">
      <h1>Admin Panel</h1>
      
      <!-- Add Item Form -->
      <form id="add-item-form">
        <input type="text" id="name" placeholder="Item Name" required>
        <input type="number" id="price" placeholder="Price" required>
        <input type="text" id="link" placeholder="Product Link" required>
        <input type="text" id="image-link" placeholder="Image Link" required>
        <input type="text" id="qc-link" placeholder="QC Link (optional)">
        
        <label for="category">Category</label>
        <select id="category" name="category">
          <option value="">Select a Category</option>
          <option value="Shoes">Shoes</option>
          <option value="Hoodies">Hoodies/Sweaters</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Jackets">Jackets</option>
          <option value="Pants">Pants/Shorts</option>
          <option value="Headwear">Headwear</option>
          <option value="Accessories">Accessories</option>
          <option value="Other">Other Stuff</option>
          <option value="custom">Custom</option>
        </select>

        <!-- Custom Category Input (hidden by default) -->
        <input type="text" id="custom-category" name="category" style="display:none;" placeholder="Enter custom category">
        
        <button type="submit">Add Item</button>
      </form>

      <!-- List of Items -->
      <div id="admin-list" class="clothes-list"></div>

      <!-- Logout Button -->
      <button id="logout-btn">Logout</button>
    </div>
  </div>

  <!-- Edit Item Modal -->
  <div id="edit-item-modal" class="modal">
    <div class="modal-content">
      <h2>Edit Item</h2>
      <form id="edit-item-form">
        <input type="text" id="edit-name" placeholder="Item Name" required />
        <input type="number" id="edit-price" placeholder="Price" required />
        <input type="text" id="edit-link" placeholder="Product Link" required />
        <input type="text" id="edit-image-link" placeholder="Image Link" required />
        
        <label for="edit-category">Category</label>
        <select id="edit-category" name="category">
          <option value="">Select a Category</option>
          <option value="Shoes">Shoes</option>
          <option value="Hoodies">Hoodies/Sweaters</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Jackets">Jackets</option>
          <option value="Pants">Pants/Shorts</option>
          <option value="Headwear">Headwear</option>
          <option value="Accessories">Accessories</option>
          <option value="Other">Other Stuff</option>
          <option value="custom">Custom</option>
        </select>

        <!-- Custom Category Input (hidden by default) -->
        <input type="text" id="edit-custom-category" name="category" style="display:none;" placeholder="Enter custom category">

        <input type="text" id="edit-qc-link" placeholder="QC Link (optional)" />

        <div class="modal-buttons">
          <button type="button" id="cancel-edit-btn" class="cancel-btn">Cancel</button>
          <button type="submit" id="save-edit-btn" class="save-btn">Save</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Firebase SDKs -->
  <script type="module" src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
  <script type="module" src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>

  <!-- Admin JS -->
  <script type="module">
    import { initializeApp } from "firebase/app";
    import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyAMLRMkZ3QARVCgz4de7u2Pu_g2bAEZJtA",
      authDomain: "repzz-a1538.firebaseapp.com",
      projectId: "repzz-a1538",
      storageBucket: "repzz-a1538.appspot.com",
      messagingSenderId: "296738706173",
      appId: "1:296738706173:web:5ddb076677e7d7f8d62494",
      measurementId: "G-N567VPRWXQ"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    document.addEventListener('DOMContentLoaded', function () {
      const loginForm = document.getElementById('login-form');
      const adminPanel = document.getElementById('admin-panel');
      const loginError = document.getElementById('login-error');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const logoutBtn = document.getElementById('logout-btn');
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

      // Handle form submission for login
      loginForm.onsubmit = async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // If successful, show admin panel and hide login form
          loginForm.style.display = 'none';
          adminPanel.style.display = 'block';
          
          console.log("User logged in:", user);
        } catch (error) {
          console.error("Error logging in:", error);
          loginError.style.display = 'block'; // Show error message
        }
      };

      // Handle logout
      logoutBtn.onclick = async () => {
        await signOut(auth);
        console.log('User logged out');
        loginForm.style.display = 'block';
        adminPanel.style.display = 'none';
      };

      // Handle auth state change (e.g., user logging out)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in, show the admin panel
          loginForm.style.display = 'none';
          adminPanel.style.display = 'block';
        } else {
          // No user is logged in, show the login form
          loginForm.style.display = 'block';
          adminPanel.style.display = 'none';
        }
      });

      // Initial rendering of products (only if user is authenticated)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          renderAdminProducts();
        }
      });
    });
  </script>
</body>
</html>
