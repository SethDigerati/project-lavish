document.addEventListener('DOMContentLoaded', function () {
    // Select the loading screen by its ID
    var loadingScreen = document.getElementById('loadingScreen');

    // Set the loading screen to cover the whole screen
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100vw';
    loadingScreen.style.height = '100vh';
    loadingScreen.style.zIndex = '9999';

    // Set a timeout to hide the loading screen after 6 seconds (6000 milliseconds)
    setTimeout(function() {
        // Animate loading screen off-screen upwards
        loadingScreen.style.transition = 'transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        loadingScreen.style.transform = 'translateY(-100%)';
        loadingScreen.style.opacity = '0';
        loadingScreen.style.display = 'none';
    }, 6000);
});

