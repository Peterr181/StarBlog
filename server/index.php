<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react-blog";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Funkcje pomocnicze
function getUserById($userId) {
    global $conn;
    $sql = "SELECT * FROM users WHERE id = $userId";
    $result = $conn->query($sql);
    return $result->fetch_assoc();
}

$sql = "SELECT * FROM posts";
$result = $conn->query($sql);

$posts = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

echo json_encode($posts);

$conn->close();
?>
