<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../.././config/dbConnection.php";



if (isset($_GET['userId']) && is_numeric($_GET['userId'])) {
  $userId = intval($_GET['userId']);


  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Aktualizuj rolę użytkownika na "user"
  $query = "UPDATE users SET role = 'user' WHERE id = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param('i', $userId);

  if ($stmt->execute()) {
      $response = array('success' => true, 'message' => 'User authorized successfully.');
      echo json_encode($response);
  } else {
      $response = array('success' => false, 'message' => 'Error authorizing user.');
      echo json_encode($response);
  }

  // Zamknij połączenie z bazą danych
  $stmt->close();
  $conn->close();
} else {
  $response = array('success' => false, 'message' => 'Invalid user ID.');
  echo json_encode($response);
}
?>