<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "react-blog";

$conn = new mysqli($servername, $username, $password, $dbname);




if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit();
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
        http_response_code(500);
        echo json_encode(['error' => 'Error adding a new post: ' . $conn->error]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
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
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
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

$conn->close();
?>
