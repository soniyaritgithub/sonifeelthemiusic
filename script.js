const data = {
    "bollywood": [
        {
            "name": "O Saki Saki",
            "path": "./songs/O Saki Saki.mp3"
        },
        {
            "name": "Apna Bna Le",
            "path": "./songs/Apna Bna Le.mp3"
        },
        {
            "name": "Therefore i am",
            "path": "./songs/m16.mp3"
        },
        {
            "name": "Bad Guy",
            "path": "./songs/m1.mp3"
        },
        {
            "name": "Phir aur ky chahiye",
            "path": "./songs/m2.mp3"
        },
        {
            "name": "Sinchan title-song",
            "path": "./songs/m18.mp3"
        },
        {
            "name": "Gasolina",
            "path": "./songs/m3.mp3"
        },
        {
            "name": "Doremon title-song",
            "path": "./songs/m17.mp3"
        },
        {
            "name": "Zara Zara",
            "path": "./songs/m4.mp3"
        },
        {
            "name": "Current Laga Re",
            "path": "./songs/Current Laga Re.mp3"
        },
        {
            "name": "Chorbazari",
            "path": "./songs/Chorbazari.mp3"
        },
        {
            "name": "Akh lad jaave",
            "path": "./songs/m5.mp3"
        },
        {
            "name": "Manike",
            "path": "./songs/m6.mp3"
        },
        {
            "name": "Apni Toh Jaise Taise",
            "path": "./songs/Apni Toh Jaise Taise.mp3"
        },
        {
            "name": "Pink venom",
            "path": "./songs/m7.mp3"
        },
        {
            "name": "You should see me in a crown",
            "path": "./songs/m8.mp3"
        },
        {
            "name": "Beliver",
            "path": "./songs/mp9.mp3"
        },
        {
            "name": "Daru Badnam",
            "path": "./songs/Daru Badnam.mp3"
        },
        {
            "name": "Girl I Need You",
            "path": "./songs/Girl I Need You.mp3"
        },
        {
            "name": "Calm down",
            "path": "./songs/m10.mp3"
        },
        {
            "name": "Pretty savage",
            "path": "./songs/m11.mp3"
        },
        {
            "name": "Maarkhayega",
            "path": "./songs/Maarkhayega.mp3"
        },
        {
            "name": "295 Sidhu moose",
            "path": "./songs/m12.mp3"
        },
        {
            "name": "Sidhu moosewala no name",
            "path": "./songs/m13.mp3"
        },
        {
            "name": "Lalisa-money",
            "path": "./songs/m14.mp3"
        },
        {
            "name": "Thug love",
            "path": "./songs/m15.mp3"
        }
    ]
};

const gameOver = new Audio('./sounds/gameOver.mp3');
const playAgain = new Audio('./sounds/playAgain.mp3');
const rightAnswer = new Audio('./sounds/U.mp3');
const wrongAnswer = new Audio('./sounds/wrongAnswer.mp3');

// At the start of the game or on reloading the game


window.addEventListener('load', () => {
let loadingPage = document.getElementById('loading-page');
    let gamePage = document.getElementById('game-page');
    let startButton = document.getElementById('start-game');

    gamePage.style.display = 'none';

    startButton.addEventListener('click', (event) => {
        event.preventDefault();
        loadingPage.style.display = 'none';
        gamePage.style.display = 'grid';
        startGame();
    });
});

function startGame() {
    let categoryInputs = ['bollywood'];
    // List of the played songs during a complete game
    let lastSongs = [];

    // Check the game is still playing or not
    let isPlaying = true;

    // Storing the chosen category songs in a list
    let songs = [];
    categoryInputs.forEach(function (category) {
        if (data.hasOwnProperty(category)) {
            songs = songs.concat(data[category]);
        }
    });

    // Function handling of reloading the page
    function pageReload() {
        playAgain.play();
        playAgain.addEventListener('ended', function () {
            location.reload();
        });
    }

    // Working of New Game Button
    let btnNew = document.querySelector('.btn-new');
    btnNew.addEventListener('click', pageReload);

    let player1 = document.querySelector('.player-1');
    let player2 = document.querySelector('.player-2');
    let container1 = document.querySelector('.options-container-1');
    let container2 = document.querySelector('.options-container-2');
    let optionBtn = document.querySelectorAll('.option');
    let btnNext = document.querySelector('.btn-next');
    let scores = document.querySelectorAll('.score');

    function nextSong() {
        let randomIndex = Math.floor(Math.random() * songs.length);
        while (lastSongs.includes(randomIndex)) randomIndex = Math.floor(Math.random() * songs.length);
        lastSongs.push(randomIndex);
        if (lastSongs.length > 27) lastSongs.shift();

        let randomSong = songs[randomIndex];
        let s = document.querySelector('.song');
        let audio = new Audio(randomSong.path);
        let timeoutId;
        audio.play();
        s.style.display = '';
        container1.style.display = 'none';
        container2.style.display = 'none';
        btnNext.style.display = 'none';

        audio.addEventListener('play', function () {
            timeoutId = setTimeout(function () {
                audio.pause();
                s.style.display = 'none';
                randomOptionFill(randomIndex, songs);
            }, 10000);
        });

        audio.addEventListener('ended', function () {
            clearTimeout(timeoutId);
        });
    }
    nextSong();

    // Switch player function
    function switchPlayer() {
        optionBtn.forEach(b => {
            if (b.classList.contains('correct-option')) b.classList.remove('correct-option');
            else if (b.classList.contains('wrong-option')) b.classList.remove('wrong-option');
        });
        if (isPlaying) {
            if (player1.classList.contains('player-active')) {
                container1.style.display = 'none';
                container2.style.display = '';
            } else {
                container1.style.display = '';
                container2.style.display = 'none';
            }
            player1.classList.toggle('player-active');
            player2.classList.toggle('player-active');
            nextSong();
        }
    };
    btnNext.addEventListener('click', switchPlayer);

    // Function which shuffle the values of 4 random variables
    function shuffle(a, b, c, d) {
        let values = [a, b, c, d];
        for (let i = values.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = values[i];
            values[i] = values[j];
            values[j] = temp;
        }
        return values;
    }

    // Function handling the random the options
    function randomOptionFill(id, songs) {
        let random1 = Math.floor(Math.random() * songs.length);
        while (random1 == id) random1 = Math.floor(Math.random() * songs.length);

        let random2 = Math.floor(Math.random() * songs.length);
        while (random2 == id || random1 == random2) random2 = Math.floor(Math.random() * songs.length);

        let random3 = Math.floor(Math.random() * songs.length);
        while (random3 == id || random1 == random3 || random2 == random3) random3 = Math.floor(Math.random() * songs.length);

        if (player1.classList.contains('player-active')) {
            let values = shuffle(random1, random2, random3, id);
            let option1 = document.getElementById('btn-11');
            option1.innerHTML = songs[values[0]].name;

            let option2 = document.getElementById('btn-12');
            option2.innerHTML = songs[values[1]].name;

            let option3 = document.getElementById('btn-13');
            option3.innerHTML = songs[values[2]].name;

            let option4 = document.getElementById('btn-14');
            option4.innerHTML = songs[values[3]].name;

            container1.style.display = '';
            container2.style.display = 'none';
        } else {
            let values = shuffle(random1, random2, random3, id);
            let option1 = document.getElementById('btn-21');
            option1.innerHTML = songs[values[0]].name;

            let option2 = document.getElementById('btn-22');
            option2.innerHTML = songs[values[1]].name;

            let option3 = document.getElementById('btn-23');
            option3.innerHTML = songs[values[2]].name;

            let option4 = document.getElementById('btn-24');
            option4.innerHTML = songs[values[3]].name;

            container1.style.display = 'none';
            container2.style.display = '';
        }

        function optionClickHandler(event) {
            let clickedBtn = event.target;
            if (clickedBtn.innerHTML == songs[id].name) {
                rightAnswer.play();
                rightAnswer.addEventListener('ended', function () {
                    btnNext.style.display = '';
                });
                clickedBtn.classList.add('correct-option');
                if (player1.classList.contains('player-active')) {
                    scores[0].innerHTML = parseInt(scores[0].innerHTML) + 1;
                } else {
                    scores[1].innerHTML = parseInt(scores[1].innerHTML) + 1;
                }
                if (parseInt(scores[0].innerHTML) === 10 || parseInt(scores[1].innerHTML) == 10) {
                    isPlaying = false;
                    gameOver.play();
                    document.querySelector('.player-active').classList.add('player-winner');
                    btnNext.style.display = 'none';
                }
            } else {
                wrongAnswer.play();
                wrongAnswer.addEventListener('ended', function () {
                    btnNext.style.display = '';
                });
                clickedBtn.classList.add('wrong-option');
                if (player1.classList.contains('player-active')) {
                    scores[0].innerHTML = parseInt(scores[0].innerHTML) - 1;
                } else {
                    scores[1].innerHTML = parseInt(scores[1].innerHTML) - 1;
                }
            }
            optionBtn.forEach(btn => {
                btn.removeEventListener('click', optionClickHandler);
            });
        }
        optionBtn.forEach(btn => {
            btn.addEventListener('click', optionClickHandler);
        });
    }
}
