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
                echo list_recommendations();
                break;

            case "POST":
                http_response_code(201);
                echo create_recommendation(file_get_contents('php://input'), TRUE);
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
 * List all recommendations for a given user ID.
 */
function list_recommendations($user_id) {
    $response = array();
    $conn = create_db_connection();

    $stmt = $conn->prepare("SELECT *
                            FROM Recommendations, Users, Media 
                            WHERE Media.id = mediaID 
                              AND Recommendations.recommenderID = Users.id 
                              AND Recommendations.recommendedToID = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    if ($stmt->get_result()->num_rows > 0) {
        while($row = $stmt->get_result()->fetch_assoc()) {
            array_push($response, $row);
        }
    }

    $conn->close();

    return json_encode($response);
}


/*
 * Add a new recommendation into the database.
 */
function create_recommendation($recommendation) {
    $response = $recommendation;
    $conn = create_db_connection();

    $stmt = $conn->prepare("INSERT INTO Recommendations (message, mediaID, recommenderID, recommendedToID) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("siii", $recommendation["message"],
                               $recommendation["mediaID"],
                               $recommendation["recommenderID"],
                               $recommendation["recommendedToID"]);

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
