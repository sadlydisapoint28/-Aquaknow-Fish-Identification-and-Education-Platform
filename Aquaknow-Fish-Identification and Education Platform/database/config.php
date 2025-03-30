<?php
// Database connection configuration
$db_host = 'localhost';
$db_name = 'aquaknow';
$db_user = 'root';
$db_password = '';

// Create a database connection
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // If there is an error with the connection, stop the script and display the error
    die("Database connection failed: " . $e->getMessage());
}

// Function to sanitize user input
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}
?>
