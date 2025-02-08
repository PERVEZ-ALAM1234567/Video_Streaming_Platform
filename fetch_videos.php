<?php
// include "config.php";

// $sql = "SELECT * FROM videos";
// $result = $conn->query($sql);

// $videos = array();
// if ($result->num_rows > 0) {
//     while($row = $result->fetch_assoc()) {
//         $videos[] = $row;
//     }
// }

// header('Content-Type: application/json');
// echo json_encode($videos);

include "config.php";

$sql = "SELECT * FROM videos";
// $sql = "SELECT * FROM videos ORDER BY id DESC";

$result = $conn->query($sql);

$videos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $videos[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($videos);
?>