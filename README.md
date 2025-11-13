# FalTrav Admin Panel

A complete, secure, and responsive admin panel for the FalTrav tourism website.

## Features

- Secure login with hashed passwords
- Dashboard with analytics
- Article management (with rich text editor)
- Tourism product management
- Media management system
- Activity logging
- Responsive UI

## Requirements

- PHP 7.4 or higher
- SQLite support
- Web server (Apache/Nginx)

## Installation

1. Upload all files to your web server in the `/FalTrav/` directory
2. Make sure the `/uploads/` directory is writable by the web server
3. Access the setup script: `http://yourdomain.com/FalTrav/setup.php`
4. Access the admin panel: `http://yourdomain.com/FalTrav/admin/`

## Default Login

- Username: `admin`
- Password: `password`

## Security Features

- Password hashing with PHP's password_hash()
- Session management with timeout
- CSRF protection
- Input sanitization
- File upload validation
- SQL injection prevention

## File Structure

```
FalTrav/
├── admin/                 # Admin panel files
│   ├── api/              # API endpoints
│   ├── articles.php      # Article management
│   ├── index.php         # Dashboard
│   ├── login.php         # Login page
│   ├── logout.php        # Logout handler
│   ├── media.php         # Media management
│   └── products.php      # Product management
├── includes/             # Configuration and database
│   ├── config.php        # Configuration settings
│   └── database.php      # Database connection
├── uploads/              # Uploaded files
│   ├── articles/         # Article images
│   ├── images/           # General images
│   └── products/         # Product images
├── setup.php             # Installation script
```

## API Endpoints

- `GET /admin/api/dashboard.php` - Get dashboard statistics
- `GET/POST/DELETE /admin/api/articles.php` - Manage articles
- `GET/POST/DELETE /admin/api/products.php` - Manage products
- `GET/POST/DELETE /admin/api/media.php` - Manage media files

## Customization

To change the default admin credentials, update the database directly or add a user management feature using the provided database structure.