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

    <!-- Admin Panel -->
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

        <!-- Custom Category -->
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
  <div id="edit-item-modal" class="modal" style="display: none;">
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

        <!-- Custom Category -->
        <input type="text" id="edit-custom-category" name="category" style="display:none;" placeholder="Enter custom category">

        <input type="text" id="edit-qc-link" placeholder="QC Link (optional)" />

        <div class="modal-buttons">
          <button type="button" id="cancel-edit-btn" class="cancel-btn">Cancel</button>
          <button type="submit" id="save-edit-btn" class="save-btn">Save</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Firebase SDK -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

    console.log("admin.js is loaded successfully!");

    const firebaseConfig = {
      apiKey: "AIzaSyAMLRMkZ3QARVCgz4de7u2Pu_g2bAEZJtA",
      authDomain: "repzz-a1538.firebaseapp.com",
      projectId: "repzz-a1538",
      storageBucket: "repzz-a1538.appspot.com",
      messagingSenderId: "296738706173",
      appId: "1:296738706173:web:5ddb076677e7d7f8d62494",
      measurementId: "G-N567VPRWXQ"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Add your JavaScript code (login, admin panel, product CRUD)
    document.addEventListener("DOMContentLoaded", () => {
      console.log("Document is ready!");
      // Place event handlers and product logic here
    });
  </script>
</body>
</html>
