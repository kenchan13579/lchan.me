<?php

// CONNECT TO THE DATABASE
$DB_NAME = 'personal_site';
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    $query = "UPDATE `views` SET `view_counts`=view_counts+1 ";
    $result = $mysqli->query($query) or die($mysqli->error . __LINE__);

    // A QUICK QUERY ON A FAKE USER TABLE
    $query = "SELECT * FROM `views`";
    $result = $mysqli->query($query) or die($mysqli->error . __LINE__);

    // GOING THROUGH THE DATA
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo stripslashes($row['view_counts']);
        }
    }
    else {
        echo 'NO RESULTS';
    }

    // CLOSE CONNECTION
    mysqli_close($mysqli);
}
else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $query = "SELECT * FROM `views`";
    $result = $mysqli->query($query) or die($mysqli->error . __LINE__);

    // GOING THROUGH THE DATA
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo stripslashes($row['view_counts']);
        }
        mysqli_close($mysqli);
    }
    else {
        echo 'NO RESULTS';
    }
}
?>
