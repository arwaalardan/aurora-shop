 <?php
$host = "localhost";
$dbname = "aurora_shop";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("vaild : " . $conn->connect_error);
}

$name = $_POST['name'];
$email = $_POST['email'];
$password_input = $_POST['password'];
$role = 'user'; 
$created_at = date("Y-m-d H:i:s");

$hashed_password = password_hash($password_input, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (name, email, password, role, created_at) 
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $email, $hashed_password, $role, $created_at);

if ($stmt->execute()) {
    echo "Welcome to Aurora Shop! yippe :3";
} else {
    echo "error " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
