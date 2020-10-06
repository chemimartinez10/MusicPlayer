const music_container = document.getElementById('music-container')
const progress_container = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const audio = document.getElementById('audio')
const prev = document.getElementById('prev')
const play = document.getElementById('play')
const next = document.getElementById('next')


//song titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of song
let songIndex = 1

//Initially load song details to DOM
loadSong(songs[songIndex])

//Methods

function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/${song}.jpg`
}

function playSong() {
    music_container.classList.add('play')
    play.querySelector('i.fa').classList.remove('fa-play')
    play.querySelector('i.fa').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    music_container.classList.remove('play')
    play.querySelector('i.fa').classList.remove('fa-pause')
    play.querySelector('i.fa').classList.add('fa-play')

    audio.pause()
}

function prevSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1
    } else {
        songIndex--
    }
    loadSong(songs[songIndex])
    if (music_container.classList.contains('play')) {
        pauseSong()
        playSong()
    }

}

function nextSong() {
    if (songIndex === (songs.length - 1)) {
        songIndex = 0
    } else {
        songIndex++
    }

    loadSong(songs[songIndex])
    if (music_container.classList.contains('play')) {
        pauseSong()
        playSong()
    }

}

function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement

    const progressPercent = (currentTime / duration) * 100

    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration

}


//Event listener
play.addEventListener('click', () => {
    const isPlaying = music_container.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
prev.addEventListener('click', prevSong)
next.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)
progress_container.addEventListener('click', setProgress)