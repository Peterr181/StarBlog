
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../.././config/dbConnection.php";

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch all users from the 'users' table
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Fetch and output data
  $users = array();
  while ($row = $result->fetch_assoc()) {
      $users[] = $row;
  }

  // Convert the array to JSON and send it to the client
  header('Content-Type: application/json');
  echo json_encode($users);
} else {
  // No users found
  echo json_encode(array('error' => 'No users found.'));
}

// Close connection
$conn->close();

?>
