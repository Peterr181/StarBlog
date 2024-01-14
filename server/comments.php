<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'dbConnection.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_input = file_get_contents('php://input');
    $data = json_decode($json_input, true);

    $postId = $data['postId'];
    $nickname = $data['nickname'];
    $title = $data['title'];
    $content = $data['content'];

    $sql = "INSERT INTO comments (post_id, nickname, title, content) VALUES ($postId, '$nickname', '$title', '$content')";

    if ($conn->query($sql) === TRUE) {
        // Update the comment count in the posts table
        $updateSql = "UPDATE posts SET comment_count = comment_count + 1 WHERE id = $postId";
        $conn->query($updateSql);

        // Fetch the updated comment count
        $updatedCountSql = "SELECT comment_count FROM posts WHERE id = $postId";
        $result = $conn->query($updatedCountSql);
        $row = $result->fetch_assoc();
        $commentCount = $row['comment_count'];

        // Return the updated comment count along with the newly added comment
        $responseData = array(
            'comment_count' => $commentCount
        );
        echo json_encode($responseData);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['postId'])) {
        $postId = $_GET['postId'];

        // Fetch comments for the specific post
        $sql = "SELECT * FROM comments WHERE post_id = $postId";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $comments = array();
            while ($row = $result->fetch_assoc()) {
                $comments[] = array(
                    'id' => $row['id'],
                    'postId' => $row['post_id'],
                    'nickname' => $row['nickname'],
                    'title' => $row['title'],
                    'content' => $row['content'],
                    'created_at' => $row['created_at'],
                );
            }

            echo json_encode($comments);
        } else {
            echo "No comments found for the specified post.";
        }
    } else {
        echo "Invalid parameters";
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>
