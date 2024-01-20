<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "./api/config/dbConnection.php";

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
    return 'userGuest';
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = $_POST['nickname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repeatPassword = $_POST['repeatPassword'];
    $role = getDefaultRole();

    // Check if the passwords match
    if ($password !== $repeatPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
        exit();
    }

    // Handle file upload
    $avatarPath = '';
    if (isset($_FILES['avatar'])) {
        $files = $_FILES['avatar'];
        $filename = $files['name'];
        $templocation = $files['tmp_name'];
        $uploaderrors = $files['error'];

        $splitedname = explode('.', $filename);
        $fileExtension = strtolower(end($splitedname));

        $allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (in_array($fileExtension, $allowedExtensions)) {
            if ($uploaderrors === 0) {
                $new_file_name = uniqid() . '.' . $fileExtension;
                $file_destination = '../client/public/avatars/' . $new_file_name;
                $avatarPath = $new_file_name;

                if (move_uploaded_file($templocation, $file_destination)) {
                    // File uploaded successfully
                } else {
                    echo json_encode(['success' => false, 'message' => 'Error uploading file']);
                    exit();
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Upload error: ' . $uploaderrors]);
                exit();
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'File extension not allowed']);
            exit();
        }
    }

    // Check if the avatar file is received
    if (empty($avatarPath)) {
        echo json_encode(['success' => false, 'message' => 'Avatar file not received']);
        exit();
    }

    // Check if the user with this email already exists
    $checkUserQuery = "SELECT * FROM users WHERE email='$email'";
    $checkUserResult = $conn->query($checkUserQuery);

    if ($checkUserResult->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'User with this email already exists']);
        exit();
    }

    // Hash the password
    $hashedPassword = hashPassword($password);

    // Insert the user into the database
    $insertUserQuery = "INSERT INTO users (username, email, password, role, avatar) VALUES ('$nickname', '$email', '$hashedPassword', '$role', '$avatarPath')";

    if ($conn->query($insertUserQuery) === TRUE) {
        $_SESSION['authenticated'] = true;
        $_SESSION['user'] = [
            'id' => mysqli_insert_id($conn),
            'username' => $nickname,
            'email' => $email,
            'role' => $role,
        ];

        echo json_encode(['success' => true, 'message' => 'User registered successfully', 'user' => $_SESSION['user']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
}

$conn->close();
?>
