<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));
header('Content-Type: application/json');

switch($method) {
    case "GET":
        try {
            http_response_code(200);
            echo list_users();
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode($e->getMessage());
        }
        break;

    case "POST":
        try {
            http_response_code(201);
            echo create_user(json_decode(file_get_contents('php://input'), TRUE));
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode($e->getMessage());
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(array("error" => "method not supported"));
        break;
}


function list_users() {
    $response = array();
    $conn = create_db_connection();

    $stmt = "SELECT * from Users";
    $result = $conn->query($stmt);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, $row);
        }
    }

    $conn->close();

    return json_encode($response);
}


function create_user($user) {
    $response = $user;
    $conn = create_db_connection();

    $stmt = $conn->prepare("INSERT INTO Users (username, firstName, lastName, email, age) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $user["username"], $user["firstName"], $user["lastName"], $user["email"], $user["age"]);
    $stmt->execute();

    // TODO: Throw exception if bad query

    $stmt->close();
    $conn->close();

    return json_encode($response);
}


function create_db_connection() {
    $servername = "classmysql.engr.oregonstate.edu";
    $username = "cs340_merdlera";
    $password = "6041";
    $dbname = "cs340_merdlera";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception($conn->connect_error);
    }

    return $conn;
}

?>
