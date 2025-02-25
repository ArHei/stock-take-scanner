document.addEventListener('DOMContentLoaded', function() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.getElementById("scanner-container")
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx;
        if (result) {
            if (result.boxes) {
                drawingCtx.strokeStyle = "green";
                drawingCtx.lineWidth = 2;
                drawingCtx.strokeRect(result.boxes[0]);
            }
            if (result.codeResult && result.codeResult.code) {
                console.log("Barcode detected:", result.codeResult.code);
            }
        }
    });
});
