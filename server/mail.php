<?php
 header("Access-Control-Allow-Origin: *"); 
 header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
 header("Access-Control-Allow-Headers: Content-Type");
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
//required files
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
 
//Create an instance; passing `true` enables exceptions

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $post_data = file_get_contents("php://input");

  
  $json_data = json_decode($post_data, true);
 
  $mail = new PHPMailer(true);
 
    //Server settings
    $mail->isSMTP();                              //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;             //Enable SMTP authentication
    $mail->Username   = 'hustlax181@gmail.com';   //SMTP write your email
    $mail->Password   = 'lhppicslglgfpkww';      //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit SSL encryption
    $mail->Port       = 465;                                    
 
    //Recipients
    $mail->setFrom($json_data["email"], $json_data["firstName"]); // Sender Email and name
    $mail->addAddress('hustlax181@gmail.com'); // Add a recipient email  
    $mail->addReplyTo($json_data["email"], $json_data["firstName"]); // Reply to sender email

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = $json_data["message"]; // Email subject headings
    $mail->Body = $json_data["message"]; // Email message
      
    // Success sent message alert
    var_dump($mail);
    $mail->send();
    
    
}