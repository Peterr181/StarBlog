<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get user ID from the request
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;

    if (!$userId) {
        http_response_code(400);
        echo json_encode(['error' => 'User ID is required.']);
        exit();
    }

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();

    $result = $stmt->get_result();

    $userData = $result->fetch_assoc();

    if (!$userData) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found.']);
        exit();
    }

    echo json_encode($userData);
}

?>
