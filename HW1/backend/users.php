<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

switch($method) {
    case "GET":
        echo list_users();
        break;

    case "POST":
        echo create_user();
        break;

    default:
        echo json_encode(array("error" => "method not supported"));
        break;
}


function list_users() {
    $conn = create_db_connection();

    $sql = "SELECT * from Users";
    $result = $conn->query($sql);

    $response = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, $row);
        }
    }

    $conn->close();

    return json_encode($response);
}


function create_user() {
    $conn = create_db_connection();

    $response = array();

    return json_encode($response);
}


function create_db_connection() {
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

    return $conn;
}

?>