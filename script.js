const player = document.querySelector('.player');
const video = document.querySelector('video');
const playBtn = document.getElementById('play-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const progressRange = document.querySelector('.progress-range');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const volumeIcon = document.getElementById('volume-icon');
const speed = document.querySelector('.player-speed');
const fullscreen = document.querySelector('.full-screen');



function videoEnd(){
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}

function playVideo(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play','fa-pause');
        playBtn.setAttribute('title','Pause');
    }
    else{
        video.pause();
        videoEnd();
    }
}

function setTime(time){
    const minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);
    seconds = (seconds < 10) ? `0${seconds}`: seconds;
    return `${minutes}:${seconds}`;
}

function updateProgress(){
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`
    currentTime.textContent = `${setTime(video.currentTime)}/`;
    duration.textContent = `${setTime(video.duration)}`;
}

function updateProgressBar(e){
    const newtime = e.offsetX/progressRange.offsetWidth;
    progressBar.style.width = `${(newtime)*100}%`;
    video.currentTime = newtime*video.duration;
}

let lastvolume = 1;

function updateVolumeBar(e){
    let volume = e.offsetX/volumeRange.offsetWidth;
    if(volume < 0.1){
        volume = 0;
    }
    if(volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${(volume)*100}%`;
    video.volume = volume;

    volumeIcon.className = '';
    if(volume > 0.6){
        volumeIcon.classList.add('fa-solid','fa-volume-high');
    }
    else if(volume < 0.6 && volume > 0){
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    }
    else if(volume === 0){
        volumeIcon.classList.add('fa-solid','fa-volume-off');
    }
    lastvolume = volume;
}

function toggleVolume(){
    volumeIcon.className = '';
    if(video.volume){
        lastvolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid','fa-volume-mute');
        volumeIcon.setAttribute('title','Unmute'); 
    } else{
        video.volume = lastvolume;
        volumeBar.style.width = `${(lastvolume)*100}%`;
        volumeIcon.classList.add('fa-solid','fa-volume-high');
        volumeIcon.setAttribute('title','Mute');
    }
}

function videoSpeed(){
    video.playbackRate = speed.value;
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { 
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
      elem.msRequestFullscreen();
    }
    video.classList.add('video-full-screen');
  }
  
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    video.classList.remove('video-full-screen');
  }
let full = false;

function toggleScreen(){
    if(!full){
        openFullscreen(player);
    }else{
        closeFullscreen();
    }
    full =!full;
}


playBtn.addEventListener('click',playVideo);
video.addEventListener('click',playVideo);
video.addEventListener('ended',videoEnd);
video.addEventListener('timeupdate',updateProgress);
progressRange.addEventListener('click',updateProgressBar);
volumeRange.addEventListener('click',updateVolumeBar);
volumeIcon.addEventListener('click',toggleVolume);
speed.addEventListener('change',videoSpeed);
fullscreen.addEventListener('click',toggleScreen);
