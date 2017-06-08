<?php

/*
 * Respond to HTTP request.
 */
function handle_request($method) {
    header('Content-Type: application/json');

    try {
        switch($method) {
            case "POST":
                http_response_code(200);
                echo json_encode(authenticate(json_decode(file_get_contents('php://input'), true)));
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
 * Authenticate credentials for a user.
 */
function authenticate($credentials) {
    $conn = create_db_connection();

    $stmt = $conn->prepare("SELECT * FROM Users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $credentials["username"],
                            substr(password_hash($credentials["password"], PASSWORD_DEFAULT), 0, 20));

    if (!$stmt->execute()) {
        $error = array("message" => $stmt->error);
        $error["type"] = "general";
        throw new Exception(json_encode($error));
    }

    $response = $stmt->get_result()->fetch_assoc();

    $response = substr(password_hash($credentials["password"], PASSWORD_DEFAULT), 0, 20);

    if (!$response) {
        $error = array("message" => "invalid credentials");
        $error["type"] = "authentication";
        throw new Exception(json_encode($error));
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
