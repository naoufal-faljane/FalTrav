<?php
session_start();
require_once '../includes/database.php';
require_once '../includes/config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

initializeSecureSession();

try {
    // Get counts
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM articles");
    $articles = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
    $products = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Count files in uploads directory
    $media = 0;
    if (is_dir(__DIR__ . '/../uploads')) {
        $media = count(glob(__DIR__ . '/../uploads/*/*', GLOB_BRACE));
    }
    
    // For this basic implementation, we'll just return 1 user
    $users = 1;
    
    // Get recent activity
    $stmt = $pdo->query("SELECT action, description, created_at FROM activity_log ORDER BY created_at DESC LIMIT 5");
    $activity = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'articles' => $articles,
        'products' => $products,
        'media' => $media,
        'users' => $users,
        'activity' => $activity
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>