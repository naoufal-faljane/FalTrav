<?php
session_start();

// Check if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']) {
    header('Location: index.php');
    exit();
}

require_once '../includes/database.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = sanitizeInput($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    try {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $user['username'];
            logActivity('Login', "User {$user['username']} logged in", $user['username']);
            header('Location: index.php');
            exit();
        } else {
            $error = 'Invalid username or password';
        }
    } catch (PDOException $e) {
        $error = 'An error occurred during login';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - FalTrav</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #2c6e49, #4c956c);
            height: 100vh;
            display: flex;
            align-items: center;
        }
        .login-card {
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card login-card p-4">
                    <div class="text-center mb-4">
                        <i class="fas fa-lock fa-3x text-primary mb-3"></i>
                        <h3>Admin Login</h3>
                        <p class="text-muted">Enter your credentials to access the admin panel</p>
                    </div>
                    
                    <?php if ($error): ?>
                        <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
                    <?php endif; ?>
                    
                    <form method="POST">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" name="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                    
                    <div class="mt-3 text-center">
                        <small class="text-muted">Default: admin / password</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
</body>
</html>