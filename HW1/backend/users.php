<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
header('Content-Type: application/json');

switch($method) {
    case "GET":
        echo list_users();
        break;

    case "POST":
        echo create_user(json_decode(file_get_contents('php://input'), TRUE));
        break;

    default:
        http_response_code(405);
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


function create_user($user) {
    $conn = create_db_connection();

    $stmt = $conn->prepare("INSERT INTO Users (username, firstName, lastName, email, age) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $user["username"], $user["firstName"], $user["lastName"], $user["email"], $user["age"]);
    $stmt->execute();

    $stmt->close();
    $conn->close();

    $response = $user;

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