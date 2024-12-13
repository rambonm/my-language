<?php
// Get the input JSON from the request
$inputJSON = file_get_contents('php://input');

// Decode the JSON data to a PHP array
$data = json_decode($inputJSON, true);

if ($data && isset($data['code']) && isset($data['encryptedData'])) {
    // Define the path to save the JSON data
    $filePath = 'encrypted_data.json';

    // Read existing data from the file
    if (file_exists($filePath)) {
        $existingData = json_decode(file_get_contents($filePath), true);
    } else {
        $existingData = [];
    }

    // Append the new data
    $existingData[] = $data;

    // Save the updated data back to the file
    file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT));
}
?>
