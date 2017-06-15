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
                if (key_exists('search', $_GET)) {
                    echo json_encode(search_media($_GET["search"]));
                }
                else {
                    echo json_encode(list_media());
                }
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
 * List all media in database.
 */
function list_media() {
    $response = array();
    $conn = create_db_connection();

    $stmt = "SELECT * from Media";
    $result = $conn->query($stmt);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($response, $row);
        }
    }

    $conn->close();

    return $response;
}


/*
 * Search for media based on title.
 */
function search_media($search_title) {
    $response = array();
    $conn = create_db_connection();

    $stmt = $conn->prepare("SELECT * from Media 
                            WHERE title LIKE CONCAT('%', ?, '%')");
    $stmt->bind_param("s", $search_title);
    $stmt->execute();

//    while ($row = $stmt->get_result()) {
//        $data = $row->fetch_assoc();
//        if ($data != null) {
//            array_push($response, $data);
//        }
//    }
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        if ($row != null) {
            array_push($response, $row);
        }
    }

    $stmt->close();
    $conn->close();

    return $response;
}


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
