export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMute = document.querySelector('.radio-mute');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const toggleIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }

    const toggleVolumeIcon = () => {
        if (audio.volume === 0) {
            radioMute.classList.remove('fa-volume-up');
            radioMute.classList.add('fa-volume-off');
        } else {
            radioMute.classList.add('fa-volume-up');
            radioMute.classList.remove('fa-volume-off');
        }
    }

    const toggleMute = () => {
        if (audio.volume != 0) {
            audio.volume = 0;
        } else {
            audio.volume = radioVolume.value / 100;
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
        radioStop.disabled = false;
        const target = event.target;

        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        
        const imgUrl = parent.querySelector('.radio-img').src;
        radioCoverImg.src = imgUrl;

        audio.src = target.dataset.radioStantion;
        audio.play();
        toggleIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        toggleIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        if (audio.volume === 0) {
            toggleVolumeIcon();
        }
    });

    
    radioMute.addEventListener('click', toggleMute);
    radioMute.addEventListener('click', toggleVolumeIcon);
    
    
    radioVolume.value = audio.volume * 100;

    radioPlayerInit.stop = () => {
        audio.pause();
        toggleIconPlay();
    };
    

};