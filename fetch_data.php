<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$encryptionCode = $data['encryptionCode'];
$password = $data['password'];

$file = 'data.json';

if (!file_exists($file)) {
    echo json_encode(['success' => false, 'message' => 'No data found']);
    exit;
}

$jsonData = json_decode(file_get_contents($file), true);

foreach ($jsonData as $entry) {
    if ($entry['encryptionCode'] == $encryptionCode && $entry['password'] == $password) {
        echo json_encode(['success' => true, 'encryptedData' => $entry['encryptedData']]);
        exit;
    }
}

echo json_encode(['success' => false, 'message' => 'Invalid encryption code or password']);
?>
