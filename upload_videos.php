<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $description = $_POST["description"];
    $category = $_POST['category'];

    // Create uploads directory if it does not exist
    $base_dir = "uploads/";
    if (!is_dir($base_dir)) {
        mkdir($base_dir, 0777, true);
    }

    // Create videos directory if it does not exist
    $video_dir = $base_dir . "videos/";
    if (!is_dir($video_dir)) {
        mkdir($video_dir, 0777, true);
    }

    // Create thumbnails directory if it does not exist
    $thumbnail_dir = $base_dir . "thumbnails/";
    if (!is_dir($thumbnail_dir)) {
        mkdir($thumbnail_dir, 0777, true);
    }


    // Get the uploaded file names
    $video_url = $_FILES["video_url"]["name"];
    $thumbnail_url = $_FILES["thumbnail_url"]["name"];

    // Set the target file paths
    $video_target_file = $video_dir . basename($video_url);
    $thumbnail_target_file = $thumbnail_dir . basename($thumbnail_url);

    // Validate file types (add more types as needed)
    $allowed_types = array('mp4', 'jpg', 'jpeg', 'png');
    $video_file_type = strtolower(pathinfo($video_target_file, PATHINFO_EXTENSION));
    $thumbnail_file_type = strtolower(pathinfo($thumbnail_target_file, PATHINFO_EXTENSION));

    if (in_array($video_file_type, $allowed_types) && in_array($thumbnail_file_type, $allowed_types)) {
        // Move the uploaded files to their respective directories
        if (move_uploaded_file($_FILES["video_url"]["tmp_name"], $video_target_file) && move_uploaded_file($_FILES["thumbnail_url"]["tmp_name"], $thumbnail_target_file)) {
            // Prepare and execute the SQL statement
            $stmt = $conn->prepare("INSERT INTO videos (title, description, video_url, thumbnail_url, category) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $title, $description, $video_target_file, $thumbnail_target_file, $category);

            if ($stmt->execute()) {
                echo "Video uploaded successfully";
            } else {
                echo "Error: " . $stmt->error;
            }
        } else {
            echo "Error uploading files";
        }
    } else {
        echo "Invalid file type.";
    }
}
?>

