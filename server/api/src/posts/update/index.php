<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $data = json_decode(file_get_contents('php://input'), true);
  $id = isset($_GET['id']) ? $_GET['id'] : null;
  echo json_encode(['message' => 'New post added successfully']);
  if ($id !== null) {
      $title = $data['title'];
      $content = $data['content'];
      $category = $data['category'];

      $updateSql = "UPDATE posts SET title='$title', content='$content', category='$category' WHERE id=$id";

      if ($conn->query($updateSql) === TRUE) {
          echo json_encode(['message' => 'Post updated successfully']);
      } else {
          http_response_code(500);
          echo json_encode(['error' => 'Error updating the post: ' . $conn->error]);
      }
  } else {
      http_response_code(400);
      echo json_encode(['error' => 'No id provided']);
  }
}

?>