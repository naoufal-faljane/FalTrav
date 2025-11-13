<?php
require_once '../includes/config.php';
initializeSecureSession();

if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tourism Products - FalTrav Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .sidebar {
            min-height: 100vh;
            background-color: #2c3e50;
            color: white;
        }
        .sidebar a {
            color: rgba(255,255,255,0.7);
        }
        .sidebar a:hover {
            color: white;
        }
        .card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .main-content {
            padding-top: 20px;
        }
        .image-preview {
            max-height: 100px;
            object-fit: cover;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 sidebar d-md-block p-3">
                <div class="text-center mb-4">
                    <h4 class="text-white">FalTrav Admin</h4>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="articles.php">
                            <i class="fas fa-newspaper"></i> Articles
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="products.php">
                            <i class="fas fa-gift"></i> Tourism Products
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="media.php">
                            <i class="fas fa-images"></i> Media
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Main Content -->
            <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Tourism Products Management</h1>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                        <i class="fas fa-plus"></i> Add Product
                    </button>
                </div>

                <!-- Products Table -->
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Destination</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="products-table">
                                    <tr><td colspan="6">Loading products...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div class="modal fade" id="addProductModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add/Edit Tourism Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="productForm">
                    <div class="modal-body">
                        <input type="hidden" id="productId">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Product Name</label>
                                    <input type="text" class="form-control" id="name" name="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="destination" class="form-label">Destination</label>
                                    <input type="text" class="form-control" id="destination" name="destination" required>
                                </div>
                                <div class="mb-3">
                                    <label for="price" class="form-label">Price ($)</label>
                                    <input type="number" class="form-control" id="price" name="price" step="0.01" required>
                                </div>
                                <div class="mb-3">
                                    <label for="duration" class="form-label">Duration</label>
                                    <input type="text" class="form-control" id="duration" name="duration" placeholder="e.g., 7 days, 2 weeks" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="main_image" class="form-label">Main Image</label>
                                    <input type="file" class="form-control" id="main_image" name="main_image">
                                </div>
                                <div class="mb-3">
                                    <label for="gallery_images" class="form-label">Gallery Images</label>
                                    <input type="file" class="form-control" id="gallery_images" name="gallery_images[]" multiple>
                                </div>
                                <div class="mb-3">
                                    <label for="availability" class="form-label">Availability</label>
                                    <select class="form-control" id="availability" name="availability">
                                        <option value="available">Available</option>
                                        <option value="unavailable">Unavailable</option>
                                        <option value="limited">Limited</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" name="description" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Load products
        async function loadProducts() {
            try {
                const response = await fetch('api/products.php');
                const data = await response.json();
                
                const table = document.getElementById('products-table');
                table.innerHTML = '';
                
                if (data.success && data.products) {
                    data.products.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.destination}</td>
                            <td>$${product.price}</td>
                            <td><span class="badge bg-${product.availability === 'available' ? 'success' : product.availability === 'limited' ? 'warning' : 'danger'}">${product.availability}</span></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        `;
                        table.appendChild(row);
                    });
                }
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        // Edit product
        async function editProduct(id) {
            try {
                const response = await fetch(`api/products.php?id=${id}`);
                const data = await response.json();
                
                if (data.success && data.product) {
                    document.getElementById('productId').value = data.product.id;
                    document.getElementById('name').value = data.product.name;
                    document.getElementById('destination').value = data.product.destination;
                    document.getElementById('price').value = data.product.price;
                    document.getElementById('duration').value = data.product.duration;
                    document.getElementById('description').value = data.product.description;
                    document.getElementById('availability').value = data.product.availability;
                    
                    // Show modal
                    const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
                    modal.show();
                }
            } catch (error) {
                console.error('Error loading product:', error);
            }
        }

        // Delete product
        async function deleteProduct(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    const response = await fetch(`api/products.php`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: id })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        loadProducts();
                    }
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            }
        }

        // Handle form submission
        document.getElementById('productForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('id', document.getElementById('productId').value);
            formData.append('name', document.getElementById('name').value);
            formData.append('destination', document.getElementById('destination').value);
            formData.append('price', document.getElementById('price').value);
            formData.append('duration', document.getElementById('duration').value);
            formData.append('description', document.getElementById('description').value);
            formData.append('availability', document.getElementById('availability').value);
            
            const mainImage = document.getElementById('main_image').files[0];
            if (mainImage) {
                formData.append('main_image', mainImage);
            }
            
            const galleryImages = document.getElementById('gallery_images').files;
            for (let i = 0; i < galleryImages.length; i++) {
                formData.append('gallery_images[]', galleryImages[i]);
            }

            try {
                const response = await fetch('api/products.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (data.success) {
                    // Reset form
                    document.getElementById('productForm').reset();
                    
                    // Hide modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                    modal.hide();
                    
                    // Reload products
                    loadProducts();
                }
            } catch (error) {
                console.error('Error saving product:', error);
            }
        });

        // Load products when page loads
        document.addEventListener('DOMContentLoaded', loadProducts);
    </script>
</body>
</html>