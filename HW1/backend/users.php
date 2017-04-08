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

// Execute query
$sql = "SELECT * from Users";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($data, json_encode($row));
    }
}

// Send response
echo json_encode($data);

// Close connnection
$conn->close();

?>