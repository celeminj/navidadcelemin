<?php
header('Content-Type: application/json');

// Leer los datos enviados desde el cliente
$data = json_decode(file_get_contents("php://input"), true);
var_dump($data);  // Esto es para depurar y ver qué datos están llegando
// Verificar que los datos sean válidos
if ($data === null) {
    echo json_encode(["error" => "No se recibieron datos válidos."]);
    exit;
}

$nombre = isset($data['nombre']) ? $data['nombre'] : null;
$contenido = isset($data['contenido']) ? $data['contenido'] : null;
$url = isset($data['url']) ? $data['url'] : null;

// Validar los datos
if (!$nombre || !$contenido) {
    echo json_encode(["error" => "El nombre y el contenido son obligatorios."]);
    exit;
}

try {
    // Conexión a la base de datos
    $conn = new PDO("mysql:host=localhost;dbname=ReyesMagos", "root", "mysql"); // Ajustar contraseña si es necesario
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Insertar datos en la tabla
    $query = $conn->prepare("INSERT INTO cartas (nombre, contenido, url) VALUES (?, ?, ?)");
    $query->execute([$nombre, $contenido, $url]);

    echo json_encode(["message" => "Carta guardada correctamente."]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
