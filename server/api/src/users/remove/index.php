<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../.././config/dbConnection.php";
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    
    $deleteSql = "DELETE FROM users WHERE id = $userId";
    if ($conn->query($deleteSql) === TRUE) {
        echo json_encode(array('success' => 'User deleted successfully.'));
    } else {
        echo json_encode(array('error' => 'Error deleting user: ' . $conn->error));
    }

    exit(); 
}


?>
