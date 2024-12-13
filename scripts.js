function encryptData() {
    const inputData = document.getElementById('inputData').value;
    const password = document.getElementById('encryptionPassword').value;

    if (!inputData || !password) {
        alert('Please enter both data and password!');
        return;
    }

    // Simple encryption using base64 (replace with a more secure method in production)
    const encryptedData = btoa(inputData + password);

    const encryptionCode = generateEncryptionCode(encryptedData);
    document.getElementById('encryptionCode').textContent = encryptionCode;
    saveEncryptedData(encryptedData, encryptionCode);

    alert('Encryption Successful!');
}

function generateEncryptionCode(encryptedData) {
    const date = new Date().toISOString();
    return encryptedData + '|' + date;
}

function saveEncryptedData(encryptedData, encryptionCode) {
    const encryptedObject = {
        code: encryptionCode,
        encryptedData: encryptedData
    };

    fetch('save_encrypted_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(encryptedObject)
    });
}

function decryptData() {
    const encryptionCode = document.getElementById('encryptionCodeInput').value;
    const password = document.getElementById('decryptionPassword').value;

    if (!encryptionCode || !password) {
        alert('Please enter both encryption code and password!');
        return;
    }

    // Extract encrypted data from encryption code
    const encryptedData = encryptionCode.split('|')[0];
    const decryptedData = atob(encryptedData);

    const originalData = decryptedData.slice(0, -password.length);
    document.getElementById('decryptedData').textContent = originalData;
}
