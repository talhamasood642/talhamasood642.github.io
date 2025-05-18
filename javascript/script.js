console.log('lets write javascript');

let currfolder;

async function getSongs(folder) {
    currfolder = folder
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div");
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // Show all the song in the playlist
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUl.innerHTML = ""
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li><i class="fas fa-music"></i>
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playnow">
                                <span>PlayNow</span>
                                <i class="fas fa-play"></i>
                            </div></li>`;
    }

    // Attch addeventlistner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    return songs
}
let currentSong = new Audio()

const playmusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track);
    currentSong.src = `/${currfolder}/` + track
    if (!pause) {
        currentSong.play();
        let playBtn = document.getElementById("play");
        let icon = playBtn.querySelector("i");
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    }





    // Song duration and time

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}

async function displayAlbum() {
    let a = await fetch(`/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");

    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").filter(part => part && part !== "songs").pop();

            try {
                let a = await fetch(`/songs/${folder}/info.json`);
                let response = await a.json();
                console.log(response);

                cardContainer.innerHTML += ` 
                    <div data-folder="${folder}" class="card">
                        <div class="play">
                            <i class="fas fa-play"></i>
                        </div>
                        <img src="/songs/${folder}/cover.jpeg" alt="">
                        <h2>${response.title}</h2>  
                        <p>${response.description}</p>
                    </div>`;
            } catch (error) {
                console.error("Failed to load info.json for folder:", folder, error);
            }
        }
    }

    // Load the playlist whenever card is clicked

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playmusic(songs[0])
        })
    });
}


// async function displayAlbum() {
//     let a = await fetch(`http://127.0.0.1:5500/songs/`)
//     let response = await a.text()
//     let div = document.createElement("div");
//     div.innerHTML = response
//     let anchors = div.getElementsByTagName("a")
//     let cardContainer = document.querySelector(".cardContainer")

//     let array = Array.from(anchors)

//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];


//     if (e.href.includes("/songs")) {
//         let folder = e.href.split("/").slice(-2)[0];
//         let folder = e.href.split("/").filter(Boolean).pop();

//         //    Get the meta data of the folder

//         let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
//         let response = await a.json()
//         console.log(response)
//         cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="cs" class="card">
//                         <div class="play">
//                             <i class="fas fa-play"></i>
//                         </div>
//                         <img src="/songs/${folder}/cover.jpg" alt="" srcset="">
//                         <h2>${response.title}</h2>
//                         <p>${response.description}</p>
//                     </div>  `
//     }
//     }


//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             console.log(item, item.currentTarget.dataset);

//             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
//         })
//     })


// }

async function main() {

    // Get the list all the songs
    await getSongs("songs/ncs")
    playmusic(songs[0], true)

    // display all the album
    displayAlbum()



    // Attch addeventlistner to play next and previous

    // play.addEventListener("click" , ()=>{
    //     if(currentSong.paused){
    //         currentSong.play();
    //         play.src = "pause.svg"    
    //     }
    //     else{
    //         currentSong.pause()
    //         pause.src = "play"
    //     }
    // })
    let playBtn = document.getElementById("play");

    playBtn.addEventListener("click", () => {
        let icon = playBtn.querySelector("i");

        if (currentSong.paused) {
            currentSong.play();
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        } else {
            currentSong.pause();
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        }
    });

    // Listen for time update function

    function formatTime(seconds) {
        let mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);

        // Add leading zero if seconds < 10
        secs = secs < 10 ? '0' + secs : secs;

        return `${mins}:${secs}`;
    }

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    // Add for event listner for hamberger

    document.querySelector(".hamberger").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "0"
    })

    // Add for event listner for close-btn

    document.querySelector(".close-btn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // Add eventlistner for previous

    let currentIndex = 0
    let previous = document.getElementById("previous");
    previous.addEventListener("click", (e) => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = songs.length - 1
        }
        playmusic(songs[currentIndex])
    })

    // Add eventlistner for next
    let next = document.getElementById("next");
    next.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= songs.length) {
            currentIndex = 0; // 🔁 loop back to first song
        }
        playmusic(songs[currentIndex]);
    });

    // Add event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
    })

    // add event to mute / unmute

    document.querySelector(".volume>i").addEventListener("click", (e) => {
        let icon = e.target;
        console.log(icon.classList);
        console.log(currentSong);

        if (icon.classList.contains("fa-volume-up")) {
            currentSong.muted = true;
            icon.classList.remove("fa-volume-up")
            icon.classList.add("fa-volume-mute")

        } else if (icon.classList.contains("fa-volume-mute")) {
            currentSong.muted = false;
            icon.classList.remove("fa-volume-mute")
            icon.classList.add("fa-volume-up")
        }
    })



}
main()



