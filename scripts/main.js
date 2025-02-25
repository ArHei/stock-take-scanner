document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('capture-button');
    const canvas = document.getElementById('canvas');

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                exact: 'environment'
            }
        }
    })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => console.error("Error accessing camera:", err));

    captureButton.addEventListener('click', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL();
        console.log(imageDataURL); // This will now be displayed in the console-output element
    });

    // Override console.log to display messages in the console-output element
    (function() {
        var oldLog = console.log;
        console.log = function(message) {
            oldLog.apply(console, arguments);
            document.getElementById("console-output").innerHTML += message + "\n";
        };
    })();
});
