<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
 
  $title = $data['title'];
  $content = $data['content'];
  $category = $data['category'];
  $user_id = $data['user_id'];
  $username = $data['username'];

  $sql = "INSERT INTO posts (title, content, category, user_id, username) VALUES ('$title', '$content', '$category', '$user_id', '$username')";

  if ($conn->query($sql) === TRUE) {
      
      echo json_encode(['message' => 'New post added successfully']);
  } else {
      http_response_code(500);
      echo json_encode(['error' => 'Error adding a new post: ' . $conn->error]);
  }
}
?>