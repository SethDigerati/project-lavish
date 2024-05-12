document.addEventListener('DOMContentLoaded', function () {
    // Select the loading screen by its ID
    var loadingScreen = document.getElementById('loadingScreen');

    // Set a timeout to hide the loading screen after 6 seconds (6000 milliseconds)
    setTimeout(function() {
        // Animate loading screen off-screen upwards
        loadingScreen.style.transition = 'transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), z-index 0s linear 1.5s';
        loadingScreen.style.transform = 'translateY(-100%)';
        loadingScreen.style.zIndex = '2000'; // Ensure loading screen remains on top
    }, 6000);

    // Event listener for touchstart (or mousedown) to record initial position
    loadingScreen.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX;
    });

    // Event listener for touchmove (or mousemove) to update end position during swipe
    loadingScreen.addEventListener('touchmove', function (event) {
        endX = event.touches[0].clientX;
    });

    // Event listener for touchend (or mouseup) to determine swipe direction and distance
    loadingScreen.addEventListener('touchend', function () {
        var swipeDistance = endX - startX;

        // If swipe distance is greater than 100px and positive (to the right), hide loading screen
        if (swipeDistance > 100) {
            // Animate loading screen off-screen upwards
            loadingScreen.style.transition = 'transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), z-index 0s linear 1.5s';
            loadingScreen.style.transform = 'translateY(-100%)';
            loadingScreen.style.zIndex = '2000'; // Ensure loading screen remains on top
        }
    });
});
