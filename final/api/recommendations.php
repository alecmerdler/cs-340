<?php

/*
 * Respond to HTTP request.
 */
function handle_request($method) {
    header('Content-Type: application/json');

    try {
        switch($method) {
            case "GET":
                http_response_code(200);
                echo list_media();
                break;

            default:
                http_response_code(405);
                echo json_encode(array("error" => "method not supported"));
                break;
        }
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(array("error" => json_decode($e->getMessage())));
    }
}


/*
 * List all recommendations in database.
 */
function list_recommendations() {
    $response = array();
    $conn = create_db_connection();

    $stmt = "SELECT * from Recommendations";
    $result = $conn->query($stmt);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, $row);
        }
    }

    $conn->close();

    return json_encode($response);
}


// TODO: Filter by user


/*
 * Return a new database connection.
 */
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


handle_request($_SERVER['REQUEST_METHOD']);

?>
