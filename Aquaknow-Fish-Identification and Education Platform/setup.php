<?php
// Database setup script for Aquaknow Fish Identification and Education Platform
$db_host = 'localhost';
$db_user = 'root';
$db_password = '';

// Connect to MySQL server without selecting a database
try {
    $pdo = new PDO("mysql:host=$db_host", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Set the success flag to false by default
    $success = false;
    $message = '';
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['setup'])) {
        // Get the SQL file content
        $sqlFile = file_get_contents('database/db_setup.sql');
        
        // Split SQL file into individual queries
        $queries = explode(';', $sqlFile);
        
        // Execute each query
        foreach ($queries as $query) {
            $query = trim($query);
            if (!empty($query)) {
                try {
                    $pdo->exec($query);
                } catch (PDOException $e) {
                    throw new Exception("Error executing query: " . $e->getMessage());
                }
            }
        }
        
        $success = true;
        $message = "Database setup completed successfully! Your Aquaknow Fish Identification and Education Platform is ready to use.";
    }
} catch (Exception $e) {
    $message = "Error: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aquaknow - Database Setup</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .setup-container {
            max-width: 800px;
            margin: 120px auto 50px;
            padding: 2rem;
            background: var(--white);
            border-radius: 20px;
            box-shadow: var(--box-shadow);
        }
        
        .setup-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .setup-steps {
            margin-bottom: 2rem;
        }
        
        .setup-step {
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(0, 213, 255, 0.05);
            border-radius: 10px;
        }
        
        .setup-step h3 {
            margin-top: 0;
            color: var(--primary-color);
        }
        
        .setup-buttons {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .setup-success {
            background: rgba(46, 213, 115, 0.1);
            color: #2ed573;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .setup-error {
            background: rgba(255, 71, 87, 0.1);
            color: #ff4757;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <header class="glass-effect">
        <nav>
            <div class="logo">
                <h1>Aquaknow</h1>
            </div>
        </nav>
    </header>

    <main>
        <div class="setup-container">
            <div class="setup-header">
                <h2>Aquaknow Database Setup</h2>
                <p>Follow the steps below to set up your database for the Aquaknow Fish Identification and Education Platform</p>
            </div>
            
            <?php if (!empty($message)): ?>
                <div class="<?php echo $success ? 'setup-success' : 'setup-error'; ?>">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>
            
            <div class="setup-steps">
                <div class="setup-step">
                    <h3>Step 1: Check Requirements</h3>
                    <p>Make sure XAMPP is installed and the Apache and MySQL services are running.</p>
                    <ul>
                        <li>Apache Status: <?php echo function_exists('apache_get_version') ? '<span style="color: #2ed573;">Running</span>' : '<span style="color: #ff4757;">Not detected</span>'; ?></li>
                        <li>MySQL Status: <?php echo class_exists('PDO') && in_array('mysql', PDO::getAvailableDrivers()) ? '<span style="color: #2ed573;">Available</span>' : '<span style="color: #ff4757;">Not detected</span>'; ?></li>
                    </ul>
                </div>
                
                <div class="setup-step">
                    <h3>Step 2: Initialize Database</h3>
                    <p>Click the button below to create the Aquaknow database and initialize all required tables.</p>
                    <p><strong>Note:</strong> This will create a new database named "aquaknow" if it doesn't exist.</p>
                    
                    <?php if (!$success): ?>
                    <form method="POST" action="">
                        <div class="setup-buttons">
                            <button type="submit" name="setup" class="modern-button">Initialize Database</button>
                        </div>
                    </form>
                    <?php else: ?>
                    <div class="setup-buttons">
                        <a href="index.php" class="modern-button">Go to Aquaknow Platform</a>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <?php if ($success): ?>
            <div class="setup-step">
                <h3>Next Steps</h3>
                <p>Your database has been successfully set up. You can now:</p>
                <ul>
                    <li>Explore the Aquaknow Fish Identification and Education Platform</li>
                    <li>Add more fish data through the database</li>
                    <li>Customize the platform to suit your needs</li>
                </ul>
            </div>
            <?php endif; ?>
        </div>
    </main>

    <footer class="modern-footer">
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Aquaknow. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
