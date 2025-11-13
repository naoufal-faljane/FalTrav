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
    <title>Media Management - FalTrav Admin</title>
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
        .media-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
        }
        .media-item {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            height: 200px;
            background: white;
        }
        .media-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .media-item .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .media-item:hover .overlay {
            opacity: 1;
        }
        .file-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px;
            font-size: 0.8rem;
            text-align: center;
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
                        <a class="nav-link" href="products.php">
                            <i class="fas fa-gift"></i> Tourism Products
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="media.php">
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
                    <h1 class="h2">Media Management</h1>
                    <div class="d-flex">
                        <input type="file" class="form-control me-2" id="uploadFile" name="file" multiple>
                        <button class="btn btn-primary" id="uploadBtn">
                            <i class="fas fa-upload"></i> Upload
                        </button>
                    </div>
                </div>

                <!-- Media Gallery -->
                <div class="card">
                    <div class="card-body">
                        <div id="media-grid" class="media-grid">
                            <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Load media files
        async function loadMedia() {
            try {
                const response = await fetch('api/media.php');
                const data = await response.json();
                
                const grid = document.getElementById('media-grid');
                grid.innerHTML = '';
                
                if (data.success && data.files) {
                    data.files.forEach(file => {
                        const mediaItem = document.createElement('div');
                        mediaItem.className = 'media-item position-relative';
                        
                        let mediaContent = '';
                        if (file.type.startsWith('image/')) {
                            mediaContent = `<img src="${file.url}" alt="${file.name}">`;
                        } else {
                            mediaContent = `<div class="d-flex align-items-center justify-content-center h-100">
                                <i class="fas fa-file fa-3x text-muted"></i>
                            </div>`;
                        }
                        
                        mediaItem.innerHTML = `
                            ${mediaContent}
                            <div class="file-info">
                                <div>${file.name}</div>
                                <div>${file.size}</div>
                            </div>
                            <div class="overlay">
                                <div>
                                    <a href="${file.url}" target="_blank" class="btn btn-sm btn-light me-1">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <button class="btn btn-sm btn-danger" onclick="deleteFile('${file.name}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                        
                        grid.appendChild(mediaItem);
                    });
                }
            } catch (error) {
                console.error('Error loading media:', error);
            }
        }

        // Upload file
        document.getElementById('uploadBtn').addEventListener('click', async function() {
            const fileInput = document.getElementById('uploadFile');
            const files = fileInput.files;
            
            if (files.length === 0) {
                alert('Please select at least one file to upload');
                return;
            }
            
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }
            
            try {
                const response = await fetch('api/media.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                if (data.success) {
                    // Reset file input
                    fileInput.value = '';
                    
                    // Reload media
                    loadMedia();
                } else {
                    alert('Upload failed: ' + (data.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload error: ' + error.message);
            }
        });

        // Delete file
        async function deleteFile(filename) {
            if (confirm(`Are you sure you want to delete ${filename}?`)) {
                try {
                    const response = await fetch('api/media.php', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ filename: filename })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                        loadMedia();
                    }
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }
        }

        // Load media when page loads
        document.addEventListener('DOMContentLoaded', loadMedia);
    </script>
</body>
</html>