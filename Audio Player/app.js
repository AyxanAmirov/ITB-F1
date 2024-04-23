import { musicList } from "./data.js";
const audio = document.querySelector("audio");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const forwardBtn = document.querySelector("#forward");
const backBtn = document.querySelector("#back");
const songInform = document.querySelector(".singer");
const currentTimeElem = document.querySelector(".time");
const rangeInput = document.querySelector("#myRange");
const audioBody = document.querySelector(".albums");
let index = 0;

window.addEventListener("DOMContentLoaded", () => {
  musicList.forEach((album, i) => {
    const albumElement = document.createElement('div'); 
    albumElement.classList.add('album-body'); 
    albumElement.innerHTML = `
      <img src=./assets/images/${album.imagePath} class="singer-poster" />
      <div class="album-inform">
        <div class="d-flex">
          <p class="album-name-singer">${album.artistName}-</p>
          <p class="album-music">${album.musicName}</p>
        </div>
      </div>
    `;

    albumElement.addEventListener('click', () => {
      index = i; 
      music(index); 
      playBtn.classList.add("active");
      pauseBtn.classList.remove("active");
    });

    audioBody.appendChild(albumElement); 
  });
});

playBtn.addEventListener("click", () => {
  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");

  music(index);
});
pauseBtn.addEventListener("click", () => {
  pauseBtn.classList.add("active");
  playBtn.classList.remove("active");
  audio.pause();
});

function music(i) {
  audio.src = `./assets/audios/${musicList[i].musicPath}`;
  songInform.innerHTML = `
    <img
    src=./assets/images/${musicList[i].imagePath}
    alt="singer"
    class="singer-img"
  />
  <div class="song-inform">
    <h3 class="singer-name">${musicList[i].artistName}</h3>
    <marquee class="singer-name" direction="right"
      >${musicList[i].musicPath}</marquee
    >
  </div>
    `;
  audio.play();
  rangeInput.max = musicList[i].duration;
  let albumBody = document.querySelectorAll(".album-body")
  albumBody.forEach(albums=>{
    albums.style.backgroundColor = "#455a64"
  })
  albumBody[i].style.backgroundColor = 'transparent'
}

forwardBtn.addEventListener("click", () => {
  if (index < 3) {
    index += 1;
    music(index);
  } else {
    index = 0;
    music(index);
  }
  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});
backBtn.addEventListener("click", () => {
  if (index > 0) {
    index -= 1;
    music(index);
  } else {
    index = 3;
    music(index);
  }
  playBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});
audio.addEventListener("ended", () => {
  if (index < 3) {
    index += 1;
    music(index);
  } else {
    index = 0;
    console.log("Kərim");
    music(index);
  }
});

audio.addEventListener("timeupdate", () => {
  let mn = Math.trunc(audio.currentTime / 60);
  let sn = Math.trunc(audio.currentTime % 60);
  currentTimeElem.innerHTML = `${mn >= 10 ? mn : "0" + mn}:${
    sn >= 10 ? sn : "0" + sn
  }`;
  rangeInput.value = audio.currentTime;
});

rangeInput.addEventListener("input", () => {
  audio.currentTime = rangeInput.value;
});
