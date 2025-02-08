<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include "config.php"; // Database connection

header("Content-Type: application/json");

// Allow CORS (for API requests)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if IDs are sent
    if (!isset($_POST['ids']) || empty($_POST['ids'])) {
        echo json_encode(["error" => "No video IDs provided"]);
        exit;
    }

    // Convert received IDs to array
    $videoIds = explode(",", $_POST['ids']);

    // Loop through each video ID to delete
    foreach ($videoIds as $videoId) {
        $videoId = intval($videoId); // Convert ID to integer for safety

        // Fetch the video path
        $stmt = $conn->prepare("SELECT video_url FROM videos WHERE id = ?");
        $stmt->bind_param("i", $videoId);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $videoPath = $row['video_url'];

            // Delete file from the server
            if (file_exists($videoPath)) {
                unlink($videoPath);
            }

            // Delete the video from the database
            $stmt = $conn->prepare("DELETE FROM videos WHERE id = ?");
            $stmt->bind_param("i", $videoId);
            if (!$stmt->execute()) {
                echo json_encode(["error" => "Error deleting video with ID: $videoId"]);
                $stmt->close();
                exit;
            }
            $stmt->close();
        }
    }

    echo json_encode(["success" => "Videos deleted successfully."]);
} else {
    echo json_encode(["error" => "Invalid request method. Use POST."]);
}
?>
