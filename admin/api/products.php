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
        // Get products
        $id = $_GET['id'] ?? null;
        
        if ($id) {
            // Get specific product
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($product) {
                echo json_encode(['success' => true, 'product' => $product]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Product not found']);
            }
        } else {
            // Get all products
            $stmt = $pdo->query("SELECT * FROM products ORDER BY created_at DESC");
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode(['success' => true, 'products' => $products]);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add or update product
        $id = $_POST['id'] ?? null;
        $name = sanitizeInput($_POST['name'] ?? '');
        $destination = sanitizeInput($_POST['destination'] ?? '');
        $price = floatval($_POST['price'] ?? 0);
        $duration = sanitizeInput($_POST['duration'] ?? '');
        $description = $_POST['description'] ?? '';
        $availability = sanitizeInput($_POST['availability'] ?? 'available');
        
        // Handle main image upload
        $mainImage = null;
        if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === 0) {
            $validation = validateImageFile($_FILES['main_image']);
            if ($validation['success']) {
                $uploadResult = uploadFile($_FILES['main_image'], 'products');
                if ($uploadResult['success']) {
                    $mainImage = $uploadResult['filename'];
                } else {
                    echo json_encode(['success' => false, 'message' => $uploadResult['message']]);
                    exit();
                }
            } else {
                echo json_encode(['success' => false, 'message' => $validation['message']]);
                exit();
            }
        }
        
        // Handle gallery images upload
        $galleryImages = [];
        if (isset($_FILES['gallery_images'])) {
            $fileCount = count($_FILES['gallery_images']['name']);
            for ($i = 0; $i < $fileCount; $i++) {
                if ($_FILES['gallery_images']['error'][$i] === 0) {
                    $tempFile = [
                        'name' => $_FILES['gallery_images']['name'][$i],
                        'type' => $_FILES['gallery_images']['type'][$i],
                        'tmp_name' => $_FILES['gallery_images']['tmp_name'][$i],
                        'error' => $_FILES['gallery_images']['error'][$i],
                        'size' => $_FILES['gallery_images']['size'][$i]
                    ];
                    
                    $validation = validateImageFile($tempFile);
                    if ($validation['success']) {
                        $uploadResult = uploadFile($tempFile, 'products/gallery');
                        if ($uploadResult['success']) {
                            $galleryImages[] = $uploadResult['filename'];
                        }
                    }
                }
            }
        }
        
        if ($id) {
            // Update existing product
            $sql = "UPDATE products SET name = ?, destination = ?, price = ?, duration = ?, description = ?, availability = ?, updated_at = CURRENT_TIMESTAMP";
            $params = [$name, $destination, $price, $duration, $description, $availability];
            
            if ($mainImage) {
                $sql .= ", main_image = ?";
                $params[] = $mainImage;
            }
            
            if (!empty($galleryImages)) {
                $galleryImagesStr = json_encode($galleryImages);
                $sql .= ", gallery_images = ?";
                $params[] = $galleryImagesStr;
            }
            
            $sql .= " WHERE id = ?";
            $params[] = $id;
            
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute($params)) {
                logActivity('Update Product', "Updated product: $name", $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update product']);
            }
        } else {
            // Create new product
            $galleryImagesStr = !empty($galleryImages) ? json_encode($galleryImages) : null;
            
            $sql = "INSERT INTO products (name, destination, price, duration, description, main_image, gallery_images, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute([$name, $destination, $price, $duration, $description, $mainImage, $galleryImagesStr, $availability])) {
                logActivity('Create Product', "Created product: $name", $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => 'Product created successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create product']);
            }
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Delete product
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
        
        if ($id) {
            // First get the product to log its details
            $stmt = $pdo->prepare("SELECT name FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            if ($stmt->execute([$id])) {
                logActivity('Delete Product', "Deleted product: " . ($product['name'] ?? 'Unknown'), $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to delete product']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing product ID']);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>