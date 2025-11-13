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
    <title>Articles Management - FalTrav Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.ckeditor.com/ckeditor5/35.4.0/classic/ckeditor.js"></script>
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
                        <a class="nav-link active" href="articles.php">
                            <i class="fas fa-newspaper"></i> Articles
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="products.php">
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
                    <h1 class="h2">Articles Management</h1>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addArticleModal">
                        <i class="fas fa-plus"></i> Add Article
                    </button>
                </div>

                <!-- Articles Table -->
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="articles-table">
                                    <tr><td colspan="6">Loading articles...</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Article Modal -->
    <div class="modal fade" id="addArticleModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add/Edit Article</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form id="articleForm">
                    <div class="modal-body">
                        <input type="hidden" id="articleId">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" name="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="category" class="form-label">Category</label>
                            <select class="form-control" id="category" name="category">
                                <option value="Beach">Beach</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Cultural">Cultural</option>
                                <option value="City">City</option>
                                <option value="Nature">Nature</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="featured_image" class="form-label">Featured Image</label>
                            <input type="file" class="form-control" id="featured_image" name="featured_image">
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">Content</label>
                            <textarea class="form-control" id="content" name="content" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Article</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        let editor;

        // Initialize CKEditor
        ClassicEditor
            .create(document.querySelector('#content'))
            .then(newEditor => {
                editor = newEditor;
            })
            .catch(error => {
                console.error(error);
            });

        // Load articles
        async function loadArticles() {
            try {
                const response = await fetch('api/articles.php');
                const data = await response.json();
                
                const table = document.getElementById('articles-table');
                table.innerHTML = '';
                
                if (data.success && data.articles) {
                    data.articles.forEach(article => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${article.id}</td>
                            <td>${article.title}</td>
                            <td>${article.category}</td>
                            <td>${new Date(article.created_at).toLocaleDateString()}</td>
                            <td><span class="badge bg-${article.status === 'published' ? 'success' : 'warning'}">${article.status}</span></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary" onclick="editArticle(${article.id})"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteArticle(${article.id})"><i class="fas fa-trash"></i></button>
                            </td>
                        `;
                        table.appendChild(row);
                    });
                }
            } catch (error) {
                console.error('Error loading articles:', error);
            }
        }

        // Edit article
        async function editArticle(id) {
            try {
                const response = await fetch(`api/articles.php?id=${id}`);
                const data = await response.json();
                
                if (data.success && data.article) {
                    document.getElementById('articleId').value = data.article.id;
                    document.getElementById('title').value = data.article.title;
                    document.getElementById('category').value = data.article.category;
                    editor.setData(data.article.content || '');
                    
                    // Show modal
                    const modal = new bootstrap.Modal(document.getElementById('addArticleModal'));
                    modal.show();
                }
            } catch (error) {
                console.error('Error loading article:', error);
            }
        }

        // Delete article
        async function deleteArticle(id) {
            if (confirm('Are you sure you want to delete this article?')) {
                try {
                    const response = await fetch(`api/articles.php`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: id })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        loadArticles();
                    }
                } catch (error) {
                    console.error('Error deleting article:', error);
                }
            }
        }

        // Handle form submission
        document.getElementById('articleForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('id', document.getElementById('articleId').value);
            formData.append('title', document.getElementById('title').value);
            formData.append('category', document.getElementById('category').value);
            formData.append('content', editor.getData());
            
            const featuredImage = document.getElementById('featured_image').files[0];
            if (featuredImage) {
                formData.append('featured_image', featuredImage);
            }

            try {
                const response = await fetch('api/articles.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (data.success) {
                    // Reset form
                    document.getElementById('articleForm').reset();
                    if (editor) {
                        editor.setData('');
                    }
                    
                    // Hide modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addArticleModal'));
                    modal.hide();
                    
                    // Reload articles
                    loadArticles();
                }
            } catch (error) {
                console.error('Error saving article:', error);
            }
        });

        // Load articles when page loads
        document.addEventListener('DOMContentLoaded', loadArticles);
    </script>
</body>
</html>