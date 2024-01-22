<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../../.././config/dbConnection.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $postId = $data['postId'];
    $userId = $data['userId'];

    if ($postId !== null && $userId !== null) {
        // Check if the user has already liked the post
        $checkSql = "SELECT * FROM likes WHERE post_id = $postId AND user_id = $userId";
        $result = $conn->query($checkSql);

        if ($result->num_rows === 0) {
            // User has not liked the post, proceed with the like insertion
            $stmt = $conn->prepare("INSERT INTO likes (post_id, user_id) VALUES (?, ?)");
            $stmt->bind_param("ss", $postId, $userId);

            if ($stmt->execute()) {
                // Update like_count in posts
                $updateSql = "UPDATE posts SET like_count = like_count + 1 WHERE id = $postId";
                if ($conn->query($updateSql) === TRUE) {
                    echo json_encode(['success' => true, 'action' => 'like']);
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'error' => 'Error updating like_count in posts: ' . $conn->error]);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Error updating likes_count: ' . $stmt->error]);
            }

            $stmt->close();
        } else {
            // User has already liked the post, delete the like (dislike)
            $deleteSql = "DELETE FROM likes WHERE post_id = $postId AND user_id = $userId";
            if ($conn->query($deleteSql) === TRUE) {
                // Update like_count in posts
                $updateSql = "UPDATE posts SET like_count = like_count - 1 WHERE id = $postId";
                if ($conn->query($updateSql) === TRUE) {
                    echo json_encode(['success' => true, 'action' => 'dislike']);
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'error' => 'Error updating like_count in posts: ' . $conn->error]);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Error deleting like: ' . $conn->error]);
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No postId or userId provided']);
    }
}

$conn->close();
?>
