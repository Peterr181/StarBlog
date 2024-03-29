<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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

?>