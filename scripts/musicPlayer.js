import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');
    const audioMute = document.querySelector('.audio-mute');
    

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        };
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        };
        loadTrack();
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        };
        loadTrack();
    }

    const toggleVolumeIcon = () => {
        if (audioPlayer.volume === 0) {
            audioMute.classList.remove('fa-volume-up');
            audioMute.classList.add('fa-volume-off');
        } else {
            audioMute.classList.remove('fa-volume-off');
            audioMute.classList.add('fa-volume-up');
            
        }
    }

    const toggleMute = () => {
        if (audioPlayer.volume != 0) {
            audioPlayer.volume = 0;
        } else {
            audioPlayer.volume = audioVolume.value / 100;
        }
    }

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            };
            
            audioHeader.textContent = track.toUpperCase();
            const track = playlist[trackIndex];
        };

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        };

        if (target.classList.contains('audio-button__next')) {
           nextTrack();
        };
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;
        audioProgressTiming.style.width = progress + '%';

        const minsPassed = Math.floor(currentTime / 60) || '0';
        const secsPassed = Math.floor(currentTime % 60) || '0';

        const minsTotal = Math.floor(duration / 60) || '0';
        const secsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minsPassed)}:${addZero(secsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minsTotal)}:${addZero(secsTotal)}`;
    });

    audioProgress.addEventListener('click', event => {
        const coordinate = event.offsetX;
        const progressBarWidth = audioProgress.clientWidth;
        const progress = (coordinate / progressBarWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
        if (audioPlayer.volume === 0) {
            toggleVolumeIcon();
        }
    });

    
    audioMute.addEventListener('click', toggleMute);
    audioMute.addEventListener('click', toggleVolumeIcon);
    audioVolume.addEventListener('input', toggleVolumeIcon);
    
    
    audioVolume.value = audioPlayer.volume * 100;

    
};