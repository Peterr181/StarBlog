<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
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
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Pobierz id z parametrów żądania DELETE
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    // Sprawdź, czy id zostało przekazane
    if ($id !== null) {
        // Usuń post o podanym id z bazy danych
        $sql = "DELETE FROM posts WHERE id = $id";

        if ($conn->query($sql) === TRUE) {
            // Zwróć odpowiedź JSON, aby poinformować o sukcesie
            echo json_encode(['success' => true]);
        } else {
            // Zwróć odpowiedź JSON z informacją o błędzie, jeśli wystąpił problem
            echo json_encode(['success' => false, 'error' => $conn->error]);
        }
    } else {
        // Zwróć odpowiedź JSON z informacją o braku przekazanego id
        echo json_encode(['success' => false, 'error' => 'No id provided']);
    }
}

$conn->close();
?>
