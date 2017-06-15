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
                if (key_exists('userID', $_GET)) {
                    echo json_encode(list_views_for_user(intval($_GET['userID'])));
                }
                else if (key_exists('mediaID', $_GET)) {
                    echo json_encode(list_views_for_media(intval($_GET['mediaID'])));
                }
                break;

            case "POST":
                http_response_code(201);
                echo json_encode(create_view(json_decode(file_get_contents('php://input'), true)));
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
 * List all views for a given user ID.
 */
function list_views_for_user($user_id) {
    $response = array();
    $conn = create_db_connection();

    $stmt = $conn->prepare("SELECT Views.id, userID, mediaID, title, firstName, timestamp
                            FROM Views, Users, Media 
                            WHERE userID = ?
                              AND Media.id = mediaID 
                              AND userID = Users.id");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    while ($row = $stmt->get_result()) {
        $data = $row->fetch_assoc();
        if ($data != null) {
            array_push($response, $data);
        }
    }

    $stmt->close();
    $conn->close();

    return $response;
}


/*
 * List all views for a given media ID.
 */
function list_views_for_media($media_id) {
    $response = array();
    $conn = create_db_connection();

    $stmt = $conn->prepare("SELECT Views.id, userID, mediaID, title, firstName, timestamp
                            FROM Views, Users, Media 
                            WHERE mediaID = ?
                              AND Media.id = mediaID 
                              AND userID = Users.id");
    $stmt->bind_param("i", $media_id);
    $stmt->execute();

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
 * Add a new view into the database.
 */
function create_view($view) {
    $response = $view;
    $conn = create_db_connection();

    $stmt = $conn->prepare("INSERT INTO Views (mediaID, userID) VALUES (?, ?)");
    $stmt->bind_param("ii", $view["mediaID"],
                            $view["userID"]);

    if (!$stmt->execute()) {
        $error = array("message" => $stmt->error);
        if (strpos($stmt->error, "Duplicate") !== false) {
            $error["type"] = "duplicate";
        }
        else {
            $error["type"] = "general";
        }
        throw new Exception(json_encode($error));
    }

    $stmt->close();
    $conn->close();

    return json_encode($response);
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
