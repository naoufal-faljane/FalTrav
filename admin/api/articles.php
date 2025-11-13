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
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get articles
        $id = $_GET['id'] ?? null;
        
        if ($id) {
            // Get specific article
            $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
            $stmt->execute([$id]);
            $article = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($article) {
                echo json_encode(['success' => true, 'article' => $article]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Article not found']);
            }
        } else {
            // Get all articles
            $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
            $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode(['success' => true, 'articles' => $articles]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add or update article
        $id = $_POST['id'] ?? null;
        $title = sanitizeInput($_POST['title'] ?? '');
        $category = sanitizeInput($_POST['category'] ?? '');
        $content = $_POST['content'] ?? '';
        
        // Handle featured image upload
        $featuredImage = null;
        if (isset($_FILES['featured_image']) && $_FILES['featured_image']['error'] === 0) {
            $validation = validateImageFile($_FILES['featured_image']);
            if ($validation['success']) {
                $uploadResult = uploadFile($_FILES['featured_image'], 'articles');
                if ($uploadResult['success']) {
                    $featuredImage = $uploadResult['filename'];
                } else {
                    echo json_encode(['success' => false, 'message' => $uploadResult['message']]);
                    exit();
                }
            } else {
                echo json_encode(['success' => false, 'message' => $validation['message']]);
                exit();
            }
        }
        
        if ($id) {
            // Update existing article
            $sql = "UPDATE articles SET title = ?, content = ?, category = ?, updated_at = CURRENT_TIMESTAMP";
            $params = [$title, $content, $category];
            
            if ($featuredImage) {
                $sql .= ", featured_image = ?";
                $params[] = $featuredImage;
            }
            
            $sql .= " WHERE id = ?";
            $params[] = $id;
            
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute($params)) {
                logActivity('Update Article', "Updated article: $title", $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => 'Article updated successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update article']);
            }
        } else {
            // Create new article
            $sql = "INSERT INTO articles (title, content, category, featured_image) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute([$title, $content, $category, $featuredImage])) {
                logActivity('Create Article', "Created article: $title", $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => 'Article created successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create article']);
            }
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Delete article
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
        
        if ($id) {
            // First get the article to log its details
            $stmt = $pdo->prepare("SELECT title FROM articles WHERE id = ?");
            $stmt->execute([$id]);
            $article = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
            if ($stmt->execute([$id])) {
                logActivity('Delete Article', "Deleted article: " . ($article['title'] ?? 'Unknown'), $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => 'Article deleted successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to delete article']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing article ID']);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>