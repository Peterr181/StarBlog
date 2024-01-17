<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if a category parameter is provided
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    
    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM posts" . ($category ? " WHERE category = ?" : ""));
    
    // Bind the category parameter if provided
    if ($category) {
        $stmt->bind_param("s", $category);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $posts = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
    }

    echo json_encode($posts);
}

?>
