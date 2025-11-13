<?php
// Configuration file for FalTrav Admin Panel
define('SITE_NAME', 'FalTrav');
define('ADMIN_EMAIL', 'admin@faltrav.com');
define('UPLOAD_DIR', __DIR__ . '/uploads');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']);

// Database configuration - using SQLite for simplicity
define('DB_FILE', __DIR__ . '/includes/database.sqlite');

// Security settings
define('CSRF_TOKEN_NAME', 'csrf_token');
define('SESSION_TIMEOUT', 3600); // 1 hour

// Initialize session with security settings
function initializeSecureSession() {
    // Set session cookie parameters for security
    $params = session_get_cookie_params();
    session_set_cookie_params(
        $params["lifetime"],
        $params["path"],
        $params["domain"],
        isset($_SERVER["HTTPS"]), // secure only if HTTPS
        true  // httponly
    );
    
    session_start();
    
    // Check for session timeout
    if (isset($_SESSION['last_activity']) && 
        (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT)) {
        session_unset();
        session_destroy();
        header('Location: admin/login.php?timeout=1');
        exit();
    }
    
    $_SESSION['last_activity'] = time();
}

// Function to validate CSRF token
function validateCSRFToken($token = null) {
    $token = $token ?? $_POST['csrf_token'] ?? $_GET['csrf_token'] ?? '';
    return isset($_SESSION[CSRF_TOKEN_NAME]) && hash_equals($_SESSION[CSRF_TOKEN_NAME], $token);
}

// Function to generate CSRF token
function generateCSRFToken() {
    if (!isset($_SESSION[CSRF_TOKEN_NAME])) {
        $_SESSION[CSRF_TOKEN_NAME] = bin2hex(random_bytes(32));
    }
    return $_SESSION[CSRF_TOKEN_NAME];
}

// Sanitization functions
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Image validation function
function validateImageUpload($file) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'message' => 'File upload error'];
    }
    
    if ($file['size'] > MAX_FILE_SIZE) {
        return ['success' => false, 'message' => 'File size exceeds limit'];
    }
    
    if (!in_array($file['type'], ALLOWED_IMAGE_TYPES)) {
        return ['success' => false, 'message' => 'Invalid file type'];
    }
    
    return ['success' => true];
}

// File upload function
function uploadFile($file, $subdir = 'images') {
    $uploadPath = UPLOAD_DIR . '/' . $subdir . '/';
    
    // Create directory if it doesn't exist
    if (!file_exists($uploadPath)) {
        mkdir($uploadPath, 0755, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
    $destination = $uploadPath . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return ['success' => true, 'filename' => $filename, 'path' => $destination];
    } else {
        return ['success' => false, 'message' => 'Failed to move uploaded file'];
    }
}

// Logging function
function logActivity($action, $description, $user = null) {
    global $pdo;
    
    try {
        $query = "INSERT INTO activity_log (action, description, user) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$action, $description, $user]);
    } catch (Exception $e) {
        // Log to error log if database logging fails
        error_log("Activity log error: " . $e->getMessage());
    }
}
?>