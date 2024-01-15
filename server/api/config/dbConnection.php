<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react-blog";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


?>
