<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./api/config/dbConnection.php";

// Start the session


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Funkcja do weryfikacji hasła
function verifyPassword($password, $hashedPassword) {
    return password_verify($password, $hashedPassword);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pobierz dane z formularza
    $data = json_decode(file_get_contents("php://input"), true); // Decode as an associative array

    $email = $data['email'];
    $password = $data['password'];

    // Sprawdź, czy użytkownik o podanym emailu istnieje
    $checkUserQuery = "SELECT * FROM users WHERE email='$email'";
    $checkUserResult = $conn->query($checkUserQuery);

    if ($checkUserResult->num_rows == 1) {
        $user = $checkUserResult->fetch_assoc();

        // Sprawdź poprawność hasła
        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['authenticated'] = true;
            $_SESSION['id'] = $user['id'];

            // Return user data upon successful login
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'userId' => $_SESSION['id'],
                'authenticated' => true,
            ]);
            exit(); // Ensure that no extra output is sent
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
        exit();
    }
}

// Zakończ połączenie z bazą danych
$conn->close();
?>