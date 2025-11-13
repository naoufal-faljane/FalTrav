<?php
// Installation script for FalTrav Admin Panel
echo "<h2>FalTrav Admin Panel Setup</h2>";

// Create necessary directories
$directories = [
    __DIR__ . '/uploads/images',
    __DIR__ . '/uploads/articles',
    __DIR__ . '/uploads/products',
    __DIR__ . '/uploads/products/gallery'
];

foreach ($directories as $dir) {
    if (!file_exists($dir)) {
        mkdir($dir, 0755, true);
        echo "✓ Created directory: $dir<br>";
    } else {
        echo "- Directory already exists: $dir<br>";
    }
}

// Test database connection
require_once __DIR__ . '/includes/database.php';

echo "<br><h3>Setup Complete!</h3>";
echo "<p>Your FalTrav admin panel is ready.</p>";
echo "<p><strong>Default Login:</strong></p>";
echo "<ul>";
echo "<li>Username: <code>admin</code></li>";
echo "<li>Password: <code>password</code></li>";
echo "</ul>";
echo "<p><a href='admin/login.php'>Access Admin Panel</a></p>";
?>