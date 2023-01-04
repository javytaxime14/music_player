let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let repeat;
repeat = document.getElementById('repeat');

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;


//create audio element

let track = document.createElement('audio');

track.loop = false;
//all songs list

let All_song = [ 
    {
        name: "Want U Back", 
        path: "music/wantuback.mp3",
        img: "images/wantuback.png",
        singer: "Cher Lloyd"
    },
    {
        name: "Lost On You", 
        path: "music/lostonyou.mp3",
        img: "images/lostonyou.jpg",
        singer: "LP"
    }
];

//All function

const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const main_box= document.querySelector('.main');
const logo = document.getElementById('logo');
const show_song = document.querySelector('.show_song_no');
const range = document.querySelector('input');
const volume_icon = document.getElementById('volume_icon');






toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        main_box.style.background = 'white';
        play.style.background = '#993300';
        range.style.background = 'darkgray';
        slider.style.background = 'darkgray';
        volume_icon.style.background = '#FF8A65';
        previous.style.background = '#ff7733';
        next.style.background = '#ff7733';
        body.style.color = 'black';     
        title.style.color = 'darkslategray';
        artist.style.color = 'darkslategray';
        logo.style.color = 'black';
        show_song.style.color = '#ee9729';
        volume_show.style.color = 'darkslategray';
        body.style.transition = '2s';
        main_box.style.transition = '2s';
    }else{
        body.style.background = 'black';
        main_box.style.background = 'black';
        play.style.background = 'darkgray';
        previous.style.background = '#333333';
        next.style.background = '#333333';
        auto_play.style.background = 'lightgray';
        volume_icon.style.background = 'black';
        title.style.color = 'white';
        artist.style.color = 'white';
        body.style.color = 'white';
        auto_play.style.color = 'black';
        volume_show.style.color = 'white';
        body.style.transition = '2s';

    }
});

//function load track
function load_track(index_no) {
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000)
    
}
load_track(index_no);

//mute sound 

function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
    
}


//reset song slider

function reset_slider() {
    slider.value = 0;
}

//checking the song is playing or not

function justplay(){
    if(playing_song==false){
        playsong()
    }else{
        pausesong();
    }
}


//play song

function playsong() {
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause-circle"></i>';
}

//pause song

function pausesong() {
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play-circle"></i>';
}

//next song 

function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song 

function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

repeat.addEventListener('click', loop);

function loop() {
    if (track.loop) {
        track.loop = false;
        $("#repeat img").attr("src", "images/rep.png")
    }else {
        track.loop = true;
        $("#repeat img").attr("src", "images/rep1.png")
    }


}

// change volume 
function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}



//change slider position

function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function

function autoplay_switch() {
    if (autoplay==1)  {
        autoplay = 0;
        auto_play.style.background = "#b3b3b3";
        auto_play.style.color = "#fff"

    } else {
        autoplay = 1;
        auto_play.style.background = "#ff6333";
        auto_play.style.color = "#000"
    }
}



function range_slider() {
    let position = 0;


    //update slider position

    if(!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    //will run when song is over

    if(track.ended) {
        play.innerHTML = '<i class="fa fa-play-circle"></i>';
        if (autoplay==1) {
            index_no += 1;
            load_track(index_no);
            playsong();

        }
    }
}



