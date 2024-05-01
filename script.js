document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snapBtn = document.getElementById('snap-btn');
    const filterSelect = document.getElementById('filter-select');
    const context = canvas.getContext('2d');

    // Function to initialize camera
    async function initializeCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } catch (err) {
            console.error('Error accessing the camera:', err);
        }
    }

    // Function to take a snapshot
    function takeSnapshot() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Show the canvas (hidden by default in CSS)
        canvas.style.display = 'block';
    }

    // Function to apply filters
    function applyFilter(filter) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch (filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg + 100;
                    data[i + 1] = avg + 50;
                    data[i + 2] = avg;
                }
                break;
            // Add more cases for additional filters
            case 'none':
            default:
                // No filter
                break;
        }

        context.putImageData(imageData, 0, 0);
    }

    // Event listener for snap button click
    snapBtn.addEventListener('click', function () {
        takeSnapshot();
    });

    // Event listener for filter select change
    filterSelect.addEventListener('change', function () {
        const selectedFilter = filterSelect.value;
        applyFilter(selectedFilter);
    });

    // Initialize camera when the page loads
    initializeCamera();
});
