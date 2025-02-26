let currentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

const songs = [
    {
        name: 'Happy Birthday ',
        path: 'musics/Happy Birthday To You.mp3',
        artist: 'Alex',
        cover: 'images/portrait.png'
    },

];

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playBtn.classList.add('pause');
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
        disk.classList.add('play');
    } else {
        music.pause();
        playBtn.classList.remove('pause');
        playBtn.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
        disk.classList.remove('play');
    }
});

// Setup music
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.textContent = song.name;
    artistName.textContent = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.textContent = '00:00';
    music.addEventListener('loadedmetadata', () => {
        seekBar.max = Math.floor(music.duration);
        musicDuration.textContent = formatTime(music.duration);
    });
    music.load();
};

setMusic(0);

// Update time
music.addEventListener('timeupdate', () => {
    seekBar.value = Math.floor(music.currentTime);
    currentTime.textContent = formatTime(music.currentTime);
});

// Seek bar control
seekBar.addEventListener('input', () => {
    music.currentTime = seekBar.value;
});

// Format time (mm:ss)
const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

// Forward and Backward
forwardBtn.addEventListener('click', () => {
    currentMusic = (currentMusic + 1) % songs.length;
    setMusic(currentMusic);
    music.play();
    playBtn.classList.add('pause');
});

backwardBtn.addEventListener('click', () => {
    currentMusic = (currentMusic - 1 + songs.length) % songs.length;
    setMusic(currentMusic);
    music.play();
    playBtn.classList.add('pause');
});
