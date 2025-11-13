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
        // Get all media files
        $files = [];
        
        $uploadDir = __DIR__ . '/../uploads/';
        if (is_dir($uploadDir)) {
            $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($uploadDir));
            foreach ($iterator as $file) {
                if ($file->isFile()) {
                    $relativePath = substr($file->getPathname(), strlen(__DIR__ . '/../'));
                    $files[] = [
                        'name' => $file->getFilename(),
                        'size' => formatBytes($file->getSize()),
                        'type' => $file->getType(),
                        'url' => '/' . $relativePath,
                        'path' => $file->getPathname()
                    ];
                }
            }
        }
        
        echo json_encode(['success' => true, 'files' => $files]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Upload files
        $uploadDir = __DIR__ . '/../uploads/images/';
        
        // Create directory if it doesn't exist
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $uploadedFiles = [];
        
        if (isset($_FILES['files'])) {
            $fileCount = count($_FILES['files']['name']);
            
            for ($i = 0; $i < $fileCount; $i++) {
                if ($_FILES['files']['error'][$i] === UPLOAD_ERR_OK) {
                    $fileTmpPath = $_FILES['files']['tmp_name'][$i];
                    $fileName = $_FILES['files']['name'][$i];
                    $fileSize = $_FILES['files']['size'][$i];
                    $fileType = $_FILES['files']['type'][$i];
                    
                    // Validate file type
                    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                    if (in_array($fileType, $allowedTypes)) {
                        $fileNameCmps = explode(".", $fileName);
                        $fileExtension = strtolower(end($fileNameCmps));
                        
                        $newFileName = md5(time() . $i) . '.' . $fileExtension;
                        $destPath = $uploadDir . $newFileName;
                        
                        if (move_uploaded_file($fileTmpPath, $destPath)) {
                            $uploadedFiles[] = $newFileName;
                        }
                    }
                }
            }
            
            if (!empty($uploadedFiles)) {
                logActivity('Upload Media', "Uploaded " . count($uploadedFiles) . " files", $_SESSION['admin_username']);
                echo json_encode(['success' => true, 'message' => count($uploadedFiles) . ' file(s) uploaded successfully', 'files' => $uploadedFiles]);
            } else {
                echo json_encode(['success' => false, 'message' => 'No files were uploaded']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No files received']);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Delete file
        $input = json_decode(file_get_contents('php://input'), true);
        $filename = $input['filename'] ?? null;
        
        if ($filename) {
            $filePath = __DIR__ . "/../uploads/images/$filename";
            
            if (file_exists($filePath)) {
                if (unlink($filePath)) {
                    logActivity('Delete Media', "Deleted file: $filename", $_SESSION['admin_username']);
                    echo json_encode(['success' => true, 'message' => 'File deleted successfully']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete file']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'File not found']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing filename']);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

// Helper function to format file size
function formatBytes($size, $precision = 2) {
    $units = array('B', 'KB', 'MB', 'GB');
    
    for ($i = 0; $size > 1024 && $i < count($units) - 1; $i++) {
        $size /= 1024;
    }
    
    return round($size, $precision) . ' ' . $units[$i];
}
?>