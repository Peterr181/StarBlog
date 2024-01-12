<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$config = require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $post_data = file_get_contents("php://input");
    $json_data = json_decode($post_data, true);

    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();                            
    $mail->Host       = 'smtp.gmail.com';      
    $mail->SMTPAuth   = true;             
    $mail->Username   = $config['email'];  
    $mail->Password   = $config['password'];     
    $mail->SMTPSecure = 'ssl';            
    $mail->Port       = 465;                                    
    
    // Recipients
    $mail->setFrom($json_data["email"], $json_data["firstName"]);
    $mail->addAddress('hustlax181@gmail.com');  
    $mail->addReplyTo($json_data["email"], $json_data["firstName"]);

    // Content
    $mail->isHTML(true); 
    $mail->Subject = $json_data["message"];
    
    // Include user's email in the email body
    $mail->Body = "Sender's Email: " . $json_data["email"] . "<br>" .
    "Sender's Phone: " . $json_data["phone"] . "<br><br>" .
    $json_data["message"];

    // Success sent message alert
    var_dump($mail);
    $mail->send();
}
