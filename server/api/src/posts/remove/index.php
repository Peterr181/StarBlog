<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $id = isset($_GET['id']) ? $_GET['id'] : null;

  if ($id !== null) {
      $sql = "DELETE FROM posts WHERE id = $id";

      if ($conn->query($sql) === TRUE) {
          echo json_encode(['success' => true]);
      } else {
          http_response_code(500);
          echo json_encode(['success' => false, 'error' => 'Error deleting the post: ' . $conn->error]);
      }
  } else {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'No id provided']);
  }
}

?>