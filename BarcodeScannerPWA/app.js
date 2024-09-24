let scannedNumbers = [];

document.getElementById('scanButton').addEventListener('click', () => {
    const codeReader = new ZXing.BrowserMultiFormatReader();
    codeReader.decodeOnceFromVideoDevice(null, 'video').then(result => {
        const barcodeNumber = result.text;
        scannedNumbers.push(barcodeNumber);
        displayResults();
    }).catch(err => {
        console.error(err);
    });
});

function displayResults() {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = scannedNumbers.map(num => `<p>${num}</p>`).join('');
    document.getElementById('downloadButton').style.display = 'block';
}

document.getElementById('downloadButton').addEventListener('click', () => {
    const blob = new Blob([scannedNumbers.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'barkodlar.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

let intervalId;

document.getElementById('startButton').addEventListener('click', () => {
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            // Barkod okuma işlemi
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
        }
    });

    // Her 10 saniyede bir tarayıcıyı sıfırlayın
    intervalId = setInterval(() => {
        codeReader.reset();
        console.log('Tarayıcı sıfırlandı.');
    }, 10000); // 10000 ms = 10 saniye
});

// Uygulama kapatıldığında intervali temizleyin
window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
});
