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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   
    $sql = "SELECT * FROM posts";
    $result = $conn->query($sql);

    $posts = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $posts[] = $row;
        }
    }

    echo json_encode($posts);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
    $data = json_decode(file_get_contents('php://input'), true);

    $title = $data['title'];
    $content = $data['content'];
    $category = $data['category'];

   

    $sql = "INSERT INTO posts (title, content, category) VALUES ('$title', '$content', '$category')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'New post added successfully']);
    } else {
        echo json_encode(['error' => 'Error adding a new post']);
    }
}

$conn->close();
?>
