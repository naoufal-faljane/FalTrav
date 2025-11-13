<?php
require_once 'config.php';

// Database connection and setup
class Database {
    private $pdo;
    
    public function __construct() {
        try {
            $this->pdo = new PDO("sqlite:" . DB_FILE);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->setupTables();
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
    
    private function setupTables() {
        // Create articles table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT,
            category TEXT,
            featured_image TEXT,
            status TEXT DEFAULT 'draft',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Create products table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            destination TEXT,
            price REAL,
            duration TEXT,
            description TEXT,
            main_image TEXT,
            gallery_images TEXT,
            availability TEXT DEFAULT 'available',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Create admin_users table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Create activity log table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS activity_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            description TEXT,
            user TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Insert default admin user if not exists
        $stmt = $this->pdo->prepare("SELECT id FROM admin_users WHERE username = ?");
        $stmt->execute(['admin']);
        if ($stmt->rowCount() == 0) {
            // Default password is 'password'
            $defaultPasswordHash = password_hash('password', PASSWORD_DEFAULT);
            $stmt = $this->pdo->prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)");
            $stmt->execute(['admin', $defaultPasswordHash]);
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
}

// Initialize database
$db = new Database();
$pdo = $db->getConnection();
?>