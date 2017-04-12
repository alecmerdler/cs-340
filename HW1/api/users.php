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
                echo list_users();
                break;

            case "POST":
                http_response_code(201);
                echo create_user(json_decode(file_get_contents('php://input'), TRUE));
                break;

            case "DELETE":
                http_response_code(204);
                echo remove_user($_GET["username"]);
                break;

            default:
                http_response_code(405);
                echo json_encode(array("error" => "method not supported"));
                break;
        }
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(array("error" => $e->getMessage()));
    }
}


/*
 * List all users in database.
 */
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


/*
 * Add a new user into the database.
 */
function create_user($user) {
    $response = $user;
    $conn = create_db_connection();

    $stmt = $conn->prepare("INSERT INTO Users (username, firstName, lastName, email, age) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $user["username"], $user["firstName"], $user["lastName"], $user["email"], $user["age"]);

    if (!$stmt->execute()) {
        $error = array("message" => $stmt->error);
//        if (strpos($stmt->error, "Duplicate") !== false) {
//            array_push($error, array("type" => "duplicate"));
//        }
//        else {
//            array_push($error, array("type" => "general"));
//        }
        throw new Exception($error);
    }

    $stmt->close();
    $conn->close();

    return json_encode($response);
}


/*
 * Remove a user from the database by username.
 */
function remove_user($username) {
    $response = array();
    $conn = create_db_connection();

    $stmt = $conn->prepare("DELETE from Users WHERE username = ?");
    $stmt->bind_param("s", $username);

    if (!$stmt->execute()) {
        $error = array("message" => $stmt->error);
        array_push($error, array("type" => "general"));

        throw new Exception($error);
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
