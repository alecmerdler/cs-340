<?php

$servername = "classmysql.engr.oregonstate.edu";
$username = "cs340_merdlera";
$password = "6041";
$dbname = "cs340_merdlera";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

?>