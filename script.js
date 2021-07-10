//getting DOM elements

var audio = document.querySelector("audio");
var pause_button = document.querySelector(".fa-pause");
var play_button = document.querySelector(".fa-play");
var next_button = document.querySelector(".fa-chevron-right");
var previous_button = document.querySelector(".fa-chevron-left");
var progress_bar = document.querySelector(".progress_bar");
var progress_container = document.querySelector(".progress_container");
var currTime = document.querySelector(".current_time");
var DurTime = document.querySelector(".duration");
var title = document.querySelector(".song_title");
var shuffle = document.querySelector(".fa-random");

//storing song data in a array

var songs = [
  "24K Magic",
  "Animals",
  "Astronaut In The Ocean",
  "AURORA",
  "Bella Ciao",
  "DANCE MONKEY",
  "Dancing With Your Ghost",
  "Devil Eyes",
  "Dusk Till Dawn",
  "FRIENDS",
  "Galway Girl",
  "Hips Don_t Lie",
  "In The End",
  "Indila Derniere Danse",
  "Legends Never Die",
  "lovely",
  "Memories",
  "Mi Gente",
  "My Oh My",
  "On My Way",
  "Paris",
  "Perfect",
  "Play Date",
  "Pretty Girl",
  "Princesses Don_t Cry",
  "rockstar",
  "Safari",
  "Scars To Your Beautiful",
  "Señorita",
  "Stereo Hearts",
  "Sugar  Brownies",
  "Take You Dancing",
  "The Nights",
  "Watermelon Sugar",
  "What If ",
];

//function to load details of the song initial

function load_song(song) {
  audio.src = `audio/${song}.mp3`;
  title.innerHTML = `${song}`;
  return audio;
}
//function to move to next song

function next_song() {
  const is_Shuffle_on = shuffle.classList.contains("shuffle_on");
  if (!is_Shuffle_on) {
    song_index++;
    if (song_index > songs.length - 1) {
      song_index = 0;
    }
    selected_song = load_song(songs[song_index]);
    console.log("playing:", selected_song, ":", song_index);
    play_button.classList.remove("fa-play");
    play_button.classList.add("fa-pause");
    selected_song.play();
  } else if (is_Shuffle_on) {
    song_index = Math.floor(Math.random() * songs.length);
    if (song_index > songs.length - 1) {
      song_index = 0;
    }
    selected_song = load_song(songs[song_index]);
    console.log("playing:", selected_song, ":", song_index);
    play_button.classList.remove("fa-play");
    play_button.classList.add("fa-pause");
    selected_song.play();
  }
}
//function to move to previous song

function previous_song() {
  song_index--;
  if (song_index < 0) {
    song_index = songs.length - 1;
  }
  selected_song = load_song(songs[song_index]);
  console.log("playing:", selected_song, ":", song_index);
  play_button.classList.remove("fa-play");
  play_button.classList.add("fa-pause");
  selected_song.play();
}
//function to update the progress bar

function update_progress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress_bar.style.width = `${progressPercent}%`;
}
//function to alter the current time by the user

function set_progress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = selected_song.duration;

  selected_song.currentTime = (clickX / width) * duration;
}
//function to play or pause

function play_pause() {
  const isPlaying = progress_container.classList.contains("play");

  if (isPlaying) {
    progress_container.classList.remove("play");
    play_button.classList.remove("fa-play");
    play_button.classList.add("fa-pause");
    selected_song.play();
  } else {
    progress_container.classList.add("play");
    play_button.classList.remove("fa-pause");
    play_button.classList.add("fa-play");
    selected_song.pause();
  }
}
//function to implement some key shortcuts

function Key_shortcuts(e) {
  if (e.keyCode == 32) {
    play_pause();
  }
  if (e.keyCode == 39 || e.keyCode == 176) {
    next_song();
  }
  if (e.keyCode == 37 || e.keyCode == 177) {
    previous_song();
  }
}
//function to update time

function duration_time_updater(e) {
  const { duration, currentTime } = e.srcElement;
  var sec = Math.floor(currentTime);
  var cur_min = sec / 60;
  cur_min = cur_min < 1 ? "0" : Math.floor(cur_min);
  cur_min = cur_min < 10 ? "0" + cur_min : cur_min;
  var cur_sec = sec % 60;
  cur_sec = cur_sec < 10 ? "0" + cur_sec : cur_sec;
  var cur_time = cur_min + ":" + cur_sec;

  var sec_dur = Math.floor(duration);
  var dur_min = sec_dur / 60;
  dur_min = dur_min < 1 ? "0" : Math.floor(dur_min);
  dur_min = dur_min < 10 ? "0" + dur_min : dur_min;
  var dur_sec = sec_dur % 60;
  dur_sec = dur_sec < 10 ? "0" + dur_sec : dur_sec;
  var total_duration = dur_min + ":" + dur_sec;
  if (isNaN(dur_min) || isNaN(dur_sec)) {
    total_duration = "00:00";
  }
  currTime.innerHTML = `${cur_time}`;
  DurTime.innerHTML = `${total_duration}`;
}
//function to toggle shuffle button

function shuffleToggle() {
  if (shuffle.classList.contains("shuffle_on")) {
    shuffle.classList.remove("shuffle_on");
    console.log("shuffle off");
  } else {
    shuffle.classList.add("shuffle_on");
    console.log("shuffle on");
  }
}

//initial code

var song_index = 0;
var selected_song = load_song(songs[song_index]);

//event listeners

play_button.addEventListener("click", play_pause);
window.addEventListener("keyup", Key_shortcuts);
next_button.addEventListener("click", next_song);
selected_song.addEventListener("ended", next_song);
previous_button.addEventListener("click", previous_song);
selected_song.addEventListener("timeupdate", update_progress);
selected_song.addEventListener("timeupdate", duration_time_updater);
progress_container.addEventListener("click", set_progress);
shuffle.addEventListener("click", shuffleToggle);
