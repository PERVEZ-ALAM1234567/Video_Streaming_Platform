<?php
include "../config.php";
session_start(); // Start the session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            $_SESSION['user_id'] = $row['id']; // Store user ID in session
            $_SESSION['message'] = "Login successful!"; // Set success message
            header("Location: index.html");
            exit();
        } else {
            $_SESSION['message'] = "Invalid password"; // Set error message
        }
    } else {
        $_SESSION['message'] = "Invalid username"; // Set error message
    }
    $stmt->close();
}
?>