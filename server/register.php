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
    $data = json_decode(file_get_contents("php://input"));

    

   if(isset($_FILES['avatar'])){
    $avatarPath = $_FILES['avatar']['name'];
    $avatarTmp = $_FILES['avatar']['tmp_name'];
    $destination = $_SERVER['DOCUMENT_ROOT'].'/server/avatars'."/".$avatarPath;
   }

    $nickname = $data->nickname;
    $email = $data->email;
    $password = $data->password;
    $repeatPassword = $data->repeatPassword;
    $role = $data->role;

    if ($password !== $repeatPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
        exit();
    }

    $checkUserQuery = "SELECT * FROM users WHERE email='$email'";
    $checkUserResult = $conn->query($checkUserQuery);

    if ($checkUserResult->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'User with this email already exists']);
        exit();
    }

    $hashedPassword = hashPassword($password);
    $role = getDefaultRole();

    $insertUserQuery = "INSERT INTO users (username, email, password, role, avatar_path) VALUES ('$nickname', '$email', '$hashedPassword', '$role', '$avatarPath')";

    if($result){
        move_uploaded_file($avatarTmp, $destination);
        echo json_encode(['success' => true,'message'=>'Avatar uploaded successfully']);
    }

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
