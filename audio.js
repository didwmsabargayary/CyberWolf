/**
 * Audio Player Controls - Modern Persistent Background Music Player
 */
document.addEventListener('DOMContentLoaded', function() {
    let audio = document.getElementById('background-music');
    
    // If audio element is not already in HTML, create one
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'background-music';
        audio.src = 'DIDWMSA.mp3';
        audio.loop = true;
        audio.preload = 'auto';
        document.body.appendChild(audio);
    }
    
    // If controls don't exist, create them
    if (!document.querySelector('.audio-controls')) {
        createAudioControls(audio);
    } else {
        bindExistingControls(audio);
    }
    
    // Restore volume & playback position
    const savedVolume = parseFloat(localStorage.getItem('musicVolume') || '0.5');
    audio.volume = savedVolume;
    
    const savedPosition = parseFloat(localStorage.getItem('musicPosition') || '0');
    if (savedPosition > 0 && !isNaN(savedPosition)) {
        audio.currentTime = savedPosition;
    }
    
    // Save position periodically
    setInterval(function() {
        if (audio && !audio.paused) {
            localStorage.setItem('musicPosition', audio.currentTime.toString());
            localStorage.setItem('musicVolume', audio.volume.toString());
        }
    }, 1500);
});

function createAudioControls(audio) {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'audio-controls';
    controlsContainer.setAttribute('aria-label', 'Audio player');
    
    // Play/Pause button
    const playPauseBtn = document.createElement('button');
    playPauseBtn.id = 'play-pause-btn';
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    playPauseBtn.title = 'Play/Pause Audio';
    playPauseBtn.setAttribute('aria-label', 'Play/Pause Music');
    
    // Mute button
    const muteBtn = document.createElement('button');
    muteBtn.id = 'mute-btn';
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    muteBtn.title = 'Mute/Unmute';
    muteBtn.setAttribute('aria-label', 'Mute/Unmute Audio');
    
    // Volume slider
    const volumeContainer = document.createElement('div');
    volumeContainer.className = 'volume-slider-container';
    
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.01';
    volumeSlider.value = audio.volume || 0.5;
    volumeSlider.className = 'volume-slider';
    volumeSlider.title = 'Volume';
    volumeSlider.setAttribute('aria-label', 'Volume Slider');
    
    volumeContainer.appendChild(volumeSlider);
    controlsContainer.appendChild(playPauseBtn);
    controlsContainer.appendChild(muteBtn);
    controlsContainer.appendChild(volumeContainer);
    document.body.appendChild(controlsContainer);
    
    // Bind events
    setupAudioListeners(audio, playPauseBtn, muteBtn, volumeSlider);
}

function bindExistingControls(audio) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (playPauseBtn && muteBtn && volumeSlider) {
        setupAudioListeners(audio, playPauseBtn, muteBtn, volumeSlider);
    }
}

function setupAudioListeners(audio, playPauseBtn, muteBtn, volumeSlider) {
    // Play/Pause Click
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                localStorage.setItem('musicPlaying', 'true');
            }).catch(err => {
                console.log('Playback error:', err);
            });
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    // Mute Click
    muteBtn.addEventListener('click', function() {
        audio.muted = !audio.muted;
        if (audio.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // Volume Slider Change
    volumeSlider.addEventListener('input', function() {
        audio.volume = parseFloat(this.value);
        audio.muted = false;
        localStorage.setItem('musicVolume', this.value);
        if (parseFloat(this.value) === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
}