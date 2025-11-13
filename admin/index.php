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
    <title>Admin Dashboard - FalTrav</title>
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
        .stat-card {
            background: linear-gradient(135deg, #2c6e49, #4c956c);
            color: white;
        }
        .stat-card i {
            font-size: 2.5rem;
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
                        <a class="nav-link active" href="index.php">
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
                    <h1 class="h2">Dashboard</h1>
                </div>

                <!-- Stats Cards -->
                <div class="row mb-4">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase">Articles</div>
                                        <div class="h5 mb-0" id="article-count">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-newspaper fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase">Products</div>
                                        <div class="h5 mb-0" id="product-count">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-gift fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase">Images</div>
                                        <div class="h5 mb-0" id="media-count">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-images fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-uppercase">Users</div>
                                        <div class="h5 mb-0" id="user-count">0</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-users fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">Recent Activity</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Action</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody id="activity-table">
                                            <tr><td colspan="3">Loading activity...</td></tr>
                                        </tbody>
                                    </table>
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
        // Fetch dashboard statistics
        async function loadDashboardData() {
            try {
                const response = await fetch('api/dashboard.php');
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('article-count').textContent = data.articles;
                    document.getElementById('product-count').textContent = data.products;
                    document.getElementById('media-count').textContent = data.media;
                    document.getElementById('user-count').textContent = data.users;
                    
                    // Update recent activity
                    const activityTable = document.getElementById('activity-table');
                    activityTable.innerHTML = '';
                    data.activity.forEach(activity => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${new Date(activity.date).toLocaleString()}</td>
                            <td>${activity.action}</td>
                            <td>${activity.description}</td>
                        `;
                        activityTable.appendChild(row);
                    });
                }
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            }
        }

        // Load data when page loads
        document.addEventListener('DOMContentLoaded', loadDashboardData);
    </script>
</body>
</html>