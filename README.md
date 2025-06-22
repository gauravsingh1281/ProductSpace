# 🛍️ ProductSpace

**ProductSpace** is a modern e-commerce web application built using **React + Redux Toolkit** and powered by **Vite**. It allows users to browse products, manage carts and wishlists, and add, edit, and delete their own listings for authenticated users (owners).

> 🚀 Built for learning, scaling, and real-world application scenarios.

---

## 🔗 Live Demo

🌐 https://tubular-pika-ae0218.netlify.app/

---

## 📸 Preview

![ProductSpace Preview](./public/preview.jpg) <!-- Add your own preview screenshot here -->

---

## 🧰 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, DaisyUI, React Icons
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Persistence**: Redux state persisted via **localStorage**
- **Notifications**: React Toastify
- **Authentication**: Dummy Auth via Redux state
- **API**: FakeStoreAPI + local user/product state

---

## ✨ Features

### For All Users (Public + Logged In)
- 🛍️ View all products
- 📄 Product detail preview
- ❤️ Add/remove items from Wishlist
- 🛒 Add items to Cart
- 🔍 View subtotal and item count in Cart dropdown

### For Logged-in Users
- ❤️ Add/remove products to/from Wishlist
- 🛒 Add/remove products to/from Cart
- 📦 View cart summary, item count, and subtotal
- 🧑‍💻 View your profile
- 📌 Data persists using `localStorage` (even after refresh)

### For Product Owners (Logged-in Users who created the product)
- ➕ Add new product listings
- 📝 Edit only their own products
- ❌ Delete only their own products

---
## 🔐 Authenticated User vs Product Owner

In ProductSpace:

| Action                       | Public User | Logged-in User | Product Owner |
|-----------------------------|-------------|----------------|----------------|
| View Products               | ✅          | ✅             | ✅             |
| Add to Wishlist             | ❌          | ✅             | ✅             |
| Add to Cart                 | ❌          | ✅             | ✅             |
| Add New Product             | ❌          | ✅             | ✅ (New Owner) |
| Edit Product                | ❌          | ❌             | ✅             |
| Delete Product              | ❌          | ❌             | ✅             |

- 🔒 **Authenticated User**: Any logged-in user.
- 🧑‍🎨 **Product Owner**: The user who listed the product. Ownership is tracked using `userId`.

> Only the owner sees **Edit** and **Delete** options on their products. Others see **Add to Cart** and **Wishlist** (if logged in).

---

### 🧠 Smart UI Behavior
- 🚫 Cannot add same product to cart multiple times
- 🛡️ Route protection using `<ProtectedRoute />`
- 📊 Subtotal and quantity auto-updated
- 🎨 Fully responsive with mobile-first design
- ⚠️ Graceful 404 Page with **Back to Home** option
- 💾 **Data persists after refresh** using `localStorage`

---

## 🧠 State Persistence

All core Redux state slices like:
- `user`
- `cart`
- `wishlist`
- `products` (added by user)

...are automatically saved and rehydrated from `localStorage` so that app data is **not lost on refresh**.

> Uses `store.subscribe()` in `store.js` to keep localStorage in sync with Redux state.

---

## 📁 Folder Structure
src/
├── assets/
├── components/
├── layout/
├── pages/
├── redux/
│ ├── features/
│ └── store.js
├── routes/
├── App.jsx
└── main.jsx

Made with ❤️ by Gaurav Pratap Singh
