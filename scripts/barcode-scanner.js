document.addEventListener('DOMContentLoaded', function() {
    const quaggaConf = {
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.getElementById("scanner-container")
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader", "code_39_reader"]
        }
    };

    let isScanning = false;

    document.getElementById("start-scanning").addEventListener("click", function() {
        if (!isScanning) {
            Quagga.init(quaggaConf, function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Initialization finished. Ready to start");
                Quagga.start();
                isScanning = true;
                document.getElementById("start-scanning").disabled = true;
                document.getElementById("stop-scanning").disabled = false;
            });
        }
    });

    document.getElementById("stop-scanning").addEventListener("click", function() {
        if (isScanning) {
            Quagga.stop();
            isScanning = false;
            document.getElementById("start-scanning").disabled = false;
            document.getElementById("stop-scanning").disabled = true;
        }
    });

    Quagga.onDetected(function(result) {
        if (result.codeResult) {
            const barcodeLogElement = document.getElementById("barcode-log");
            const newResult = "Detected barcode: " + result.codeResult.code + "\n";
            barcodeLogElement.innerText += newResult;
            console.log("Barcode detected:", result.codeResult.code);
        }
    });
});
