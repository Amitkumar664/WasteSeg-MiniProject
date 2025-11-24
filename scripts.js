// Tab switching
function showTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (tabId !== 'liveTab') liveDetectionActive = false;
}

// Upload logic
let uploadedImage = null;
function handleUpload(input) {
    const file = input.files[0];
    if (!file) return;
    uploadedImage = file;
    document.getElementById('uploadedImageText').innerHTML = `<img src="${URL.createObjectURL(file)}" style="max-width:120px;border-radius:8px;">`;
    document.getElementById('segmentationText').innerText = "Ready to process";
}

function resetUpload() {
    uploadedImage = null;
    document.getElementById('uploadedImageText').innerText = "No image uploaded";
    document.getElementById('segmentationText').innerText = "Results will appear here";
}

// Webcam logic (simplified, add your backend integration as needed)
let stream, currentFacingMode = "environment";
function startCamera(videoId, facingMode = "environment") {
    const constraints = { video: { facingMode }, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(s => {
        stream = s;
        const video = document.getElementById(videoId);
        video.srcObject = stream;
    });
}

// ...existing code...
function processImage() {
    if (!uploadedImage) {
    document.getElementById('segmentationText').innerText = "Please upload an image first.";
    return;
    }
    document.getElementById('segmentationText').innerHTML = `<span style="color:var(--primary);"><i class="fa fa-spinner fa-spin"></i> Processing...</span>`;
    const formData = new FormData();
    formData.append('image', uploadedImage);

    fetch('https://waste-segregation-i0xi.onrender.com/predict', {
    method: 'POST',
    body: formData
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('segmentationText').innerHTML = `<span style="color:var(--success);">${data.result || data.prediction}</span>`;
    })
    .catch(() => {
        document.getElementById('segmentationText').innerHTML = `<span style="color:var(--danger);">Prediction failed. Try again.</span>`;
    });
}


function captureImage() {
    const video = document.getElementById("camera");
    const captureBtn = document.querySelector('#captureTab .upload-label');
    captureBtn.disabled = true;
    captureBtn.style.opacity = 0.6;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const imgDataUrl = canvas.toDataURL("image/jpeg");
    document.getElementById("capturedImageText").innerHTML = `<img src="${imgDataUrl}" style="max-width:120px;border-radius:8px;">`;
    document.getElementById("captureResultText").innerHTML = `<span style="color:var(--primary);"><i class="fa fa-spinner fa-spin"></i> Processing...</span>`;

    canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append('image', blob, 'capture.jpg');
    fetch('https://waste-segregation-i0xi.onrender.com/predict', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
        let result = data.result || data.prediction || "No prediction received.";
        let confidence = data.confidence !== undefined ? ` (${(data.confidence * 100).toFixed(1)}%)` : "";
        document.getElementById("captureResultText").innerHTML =
            `<span style="color:var(--success);">${result}${confidence}</span>`;
        })
        .catch(() => {
        document.getElementById("captureResultText").innerHTML = `<span style="color:var(--danger);">Prediction failed. Try again.</span>`;
        })
        .finally(() => {
        captureBtn.disabled = false;
        captureBtn.style.opacity = 1;
        });
    }, "image/jpeg");
}


function flipCamera() {
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
    if (stream) stream.getTracks().forEach(track => track.stop());
    startCamera("camera", currentFacingMode);
}
// Live detection logic (simplified)
function flipRealtimeCamera() {
    currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
    if (stream) stream.getTracks().forEach(track => track.stop());
    startCamera("realtimeCamera", currentFacingMode);
}

let liveDetectionActive = false;

function startLiveDetection() {
const video = document.getElementById("realtimeCamera");
liveDetectionActive = true;
const resultBox = document.getElementById("realtimeResultText");
let firstRun = true;

function sendFrame() {
    if (!liveDetectionActive) return;
    if (video.readyState === 4) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'frame.jpg');
        if (firstRun) {
        resultBox.innerHTML = `<span style="color:var(--primary);"><i class="fa fa-spinner fa-spin"></i> Detecting...</span>`;
        firstRun = false;
        }
        fetch('https://waste-segregation-i0xi.onrender.com/predict', {
        method: 'POST',
        body: formData
        })
        .then(res => res.json())
        .then(data => {
            let result = data.result || data.prediction || "No prediction received.";
            let confidence = data.confidence !== undefined ? ` (${(data.confidence * 100).toFixed(1)}%)` : "";
            resultBox.innerHTML = `<span style="color:var(--success);">${result}${confidence}</span>`;
            setTimeout(sendFrame, 1200);
        })
        .catch(() => {
            resultBox.innerHTML = `<span style="color:var(--danger);">Prediction failed.</span>`;
            setTimeout(sendFrame, 2000);
        });
    }, "image/jpeg");
    } else {
    setTimeout(sendFrame, 600);
    }
}
sendFrame();
}

document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
btn.addEventListener('click', () => {
    if (btn.textContent.includes('Webcam')) {
    liveDetectionActive = false;
    startCamera("camera", currentFacingMode);
    }
    if (btn.textContent.includes('Live')) {
    startCamera("realtimeCamera", currentFacingMode);
    setTimeout(startLiveDetection, 1000); // Wait for camera to be ready
    }
    if (btn.textContent.includes('Upload')) {
    liveDetectionActive = false;
    if (stream) stream.getTracks().forEach(track => track.stop());
    }
});
});

// Drag & drop upload
const uploadDrop = document.getElementById('uploadDrop');
uploadDrop.addEventListener('dragover', e => { e.preventDefault(); uploadDrop.style.background = 'rgba(33,200,122,0.10)'; });
uploadDrop.addEventListener('dragleave', e => { e.preventDefault(); uploadDrop.style.background = 'rgba(33,200,122,0.04)'; });
uploadDrop.addEventListener('drop', e => {
    e.preventDefault();
    uploadDrop.style.background = 'rgba(33,200,122,0.04)';
    const files = e.dataTransfer.files;
    if (files.length) {
    document.querySelector('.upload-label input[type="file"]').files = files;
    handleUpload({ files });
    }
});
