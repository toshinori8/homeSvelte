<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Sprawdzamy czy parametr 'action' jest ustawiony
if (isset($_GET["action"])) {
  $action = $_GET["action"];
  $file = "database.json";

  // Jeśli działanie to 'read'
  if ($action == "read") {
    if (file_exists($file)) {
      $data = file_get_contents($file);
      echo $data;
    } else {
      // Błąd jeśli plik nie istnieje
      echo json_encode(["error" => "File not found"]);
    }
  }≤
  // Jeśli działanie to 'write'
  elseif ($action == "write") {
    // Sprawdzamy czy parametr 'data' jest ustawiony
    if (isset($_POST['data'])) {
      $data = $_POST['data'];

      // Zapisujemy dane do pliku
      if (file_put_contents($file, $data)) {
        echo json_encode(["status" => "success"]);
      } else {
        // Błąd podczas zapisywania do pliku
        echo json_encode(["error" => "Failed to write to file"]);
      }
    } else {
      // Błąd jeśli dane nie są podane
      echo json_encode(["error" => "No data provided"]);
    }
  } else {
    // Błąd jeśli działanie jest nieznane
    echo json_encode(["error" => "Unknown action"]);
  }
} else {
  // Błąd jeśli działanie nie jest ustawione
  echo json_encode(["error" => "No action specified"]);
}
?>
