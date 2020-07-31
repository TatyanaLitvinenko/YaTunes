import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoProgress = document.querySelector('.video-progress');
    const videoFullScreen = document.querySelector('.video-full-screen');
    const videoVolume = document.querySelector('.video-volume');
    const videoVolumeDown = document.querySelector('.video-button__mute');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    } 

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const toggleVolumeIcon = () => {
        if (videoPlayer.volume === 0) {
            videoVolumeDown.classList.remove('fa-volume-down');
            videoVolumeDown.classList.add('fa-volume-off');
        } else {
            videoVolumeDown.classList.add('fa-volume-down');
            videoVolumeDown.classList.remove('fa-volume-off');
        }
    }

    const toggleMute = () => {
        if (videoPlayer.volume != 0) {
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = videoVolume.value / 100;
        }
    }

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        
        videoProgress.value = (currentTime / duration) * 100;

        let minsPassed = Math.floor(currentTime / 60);
        let secsPassed = Math.floor(currentTime % 60);

        let minsTotal = Math.floor(duration / 60);
        let secsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = addZero(minsPassed) + ':' + addZero(secsPassed);
        videoTimeTotal.textContent = addZero(minsTotal) + ':' + addZero(secsTotal);
        
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
        if (videoPlayer.volume === 0) {
            toggleVolumeIcon();
        }
    });

    
    videoVolumeDown.addEventListener('click', toggleMute);
    videoVolumeDown.addEventListener('click', toggleVolumeIcon);
    
    
    videoVolume.value = videoPlayer.volume * 100;

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) {
            stopPlay();
        }
    };
    
};