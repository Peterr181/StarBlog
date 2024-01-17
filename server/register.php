<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "./api/config/dbConnection.php";
include "auth.php";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Funkcja do hashowania hasła
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// Funkcja do ustawiania domyślnej roli użytkownika
function getDefaultRole() {
    return 'user';
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pobierz dane z formularza
    $data = json_decode(file_get_contents("php://input"));

    $nickname = $data->nickname;
    $email = $data->email;
    $password = $data->password;
    $repeatPassword = $data->repeatPassword;

    // Sprawdź, czy hasła są identyczne
    if ($password !== $repeatPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
        exit();
    }

    // Sprawdź, czy użytkownik o podanym emailu już istnieje
    $checkUserQuery = "SELECT * FROM users WHERE email='$email'";
    $checkUserResult = $conn->query($checkUserQuery);

    if ($checkUserResult->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'User with this email already exists']);
        exit();
    }

    // Zapisz nowego użytkownika do bazy danych
    $hashedPassword = hashPassword($password);
    $role = getDefaultRole();

    $insertUserQuery = "INSERT INTO users (username, email, password, role) VALUES ('$nickname', '$email', '$hashedPassword', '$role')";

    if ($conn->query($insertUserQuery) === TRUE) {
        // Set session variables after successful registration
        $_SESSION['authenticated'] = true;
        $_SESSION['user'] = [
            'id' => mysqli_insert_id($conn),
            'username' => $nickname,
            'email' => $email,
        ];

        echo json_encode(['success' => true, 'message' => 'User registered successfully', 'user' => $_SESSION['user']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
}

// Zakończ połączenie z bazą danych
$conn->close();
?>
