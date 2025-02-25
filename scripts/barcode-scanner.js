document.addEventListener('DOMContentLoaded', function() {
    // Quagga.init({
    //     inputStream: {
    //         name: "Live",
    //         type: "LiveStream",
    //         target: document.getElementById("scanner-container")
    //     },
    //     decoder: {
    //         readers: ["ean_reader", "code_128_reader"]
    //     }
    // }, function(err) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("Initialization finished. Ready to start");
    //     Quagga.start();
    // });

    // Quagga.onProcessed(function(result) {
    //     var drawingCtx = Quagga.canvas.ctx;
    //     if (result) {
    //         if (result.boxes) {
    //             drawingCtx.strokeStyle = "green";
    //             drawingCtx.lineWidth = 2;
    //             drawingCtx.strokeRect(result.boxes[0]);
    //         }
    //         if (result.codeResult && result.codeResult.code) {
    //             console.log("Barcode detected:", result.codeResult.code);
    //         }
    //     }
    // });

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

    document.getElementById("start-scanning").addEventListener("click", function() {
        Quagga.init(quaggaConf, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
    });

    Quagga.onDetected(function(result) {
        if (result.codeResult) {
            document.getElementById("barcode-result").innerText = "Detected barcode: " + result.codeResult.code;
            console.log("Barcode detected:", result.codeResult.code);
            Quagga.stop(); // Stop scanning after detecting a barcode
        }
    });
});