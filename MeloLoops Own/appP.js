const music = new Audio('punj/1.mp3');
// music.play();
const songs3 = [
    {
    id: 1,
    songName: 'Tauba Tauba<br><div class="subtitle">-Karan Ahujla</div>',
    poster: "post.jpg"
},
    {
    id: 2,
    songName: 'Do You Know???<br><div class="subtitle">-Diljit Dosanjh</div>',
    poster: "post.jpg"
},
    {
    id: 3,
    songName: 'Jee Nahi Lagda<br><div class="subtitle">-Karan Ahujla</div>',
    poster: "post.jpg"
},
    {
    id: 4,
    songName: 'Lover<br><div class="subtitle">-Diljit Dosanjh</div>',
    poster: "post.jpg"
}
] 
Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src=songs3[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML=songs3[i].songName;
});
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');
masterPlay.addEventListener('click', ()=>{
    if(music.paused || music.currentTime <= 0){
        music.play();
        wave.classList.add('active1');        
    }else{
        music.pause();
        wave.classList.remove('active1');       
    }
});

let index = 0 ;
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index = el.target.id;
        // console.log(index);
        music.src = `punj/${index}.mp3`;
        music.play();

        let songTitles = songs3.filter((els) =>{
            return els.id == index;            
        });
        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
        });
    });
});
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];
music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    let min1= Math.floor(music_dur / 60);
    let sec1= Math.floor(music_dur % 60);
    // console.log(min1);
    if (sec1 < 10){
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText =`${min1}:${sec1}`;
    let min2= Math.floor(music_curr / 60);
    let sec2= Math.floor(music_curr % 60);
    if (sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;
    let progressBar = parseInt((music_curr / music_dur)*100);
    seek.value = progressBar;
    // console.log(seek.value);
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});
seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration / 100;
});
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');
vol.addEventListener('change', ()=>{
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a /100;
});
let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;

    }
    music.src = `punj/${index}.mp3`;
    music.play();
    let songTitles = songs3.filter((els) => {
        return els.id == index;            
    });
    songTitles.forEach(elss =>{
        let { songName } = elss;
        title.innerHTML = songName;
    });
});

next.addEventListener('click', ()=>{
    index++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }
    music.src = `punj/${index}.mp3`;
    music.play();
    let songTitles = songs3.filter((els) => {
        return els.id == index;            
    });
    songTitles.forEach(elss =>{
        let { songName } = elss;
        title.innerHTML = songName;
    });
});