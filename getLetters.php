<?php
header('Content-Type: application/json');
try {
    $conn = new PDO("mysql:host=localhost;dbname=ReyesMagos", "root", "mysql");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener las cartas
    $query = $conn->prepare("SELECT * FROM cartas");
    $query->execute();
    $cartas = $query->fetchAll(PDO::FETCH_ASSOC);

    // Comprobar si se obtuvieron cartas
    if ($cartas) {
        echo json_encode($cartas);
    } else {
        echo json_encode(["message" => "No se encontraron cartas"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al obtener las cartas: " . $e->getMessage()]);
}

?>
