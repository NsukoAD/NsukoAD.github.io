const startBtn = document.querySelector('.start');
const character = document.querySelector('.character');
const game = document.querySelector('.game');
const phone = document.querySelector('.phoneNumber');
// const retryBtn = document.querySelector('.retry'); -moved to stopgame()

let phoneNumber = "";
let maxNumber = 10;
let stop = false;
let spawnSpeed;

startBtn.addEventListener('click', runGame);//START BUTTON
// retryBtn.addEventListener('click', runGame); //RETRY BUTTON -moved to stopgame()

function runGame (){ //MAIN FUNCTION - EVERYTHING SHOULD HAPPEN THROUGH THIS FUNCTION
    game.addEventListener('mousemove', (e) => { //MOUSE MOVEMENT FOR CHARACTER
    startBtn.style.display = 'none';
    document.body.classList.add('hideCursor');
    const gameScreen = game.getBoundingClientRect();
    let mouseX = e.clientX - gameScreen.left;
    const charWidth = character.offsetWidth;
    mouseX = Math.max(0, Math.min(game.offsetWidth - charWidth, mouseX - charWidth / 2));
    character.style.left = `${mouseX}px`;
});

let phoneNumber = ""; //RESETS THE PHONE NUMBER VALUE
let stop = false; //RESETS STOP VARIABLE
document.querySelectorAll('.result, .retry, .home').forEach(el => el.remove()); //REMOVES BUTTONS ADDED IN STOPGAME()
document.querySelector('.phoneNumber').textContent = 'Phone Number:'; //RESETS PHONE NUMBER

function spawnImage() { //SPAWNS IMAGES FROM ARRAY
    const imageArray = [
        { src:'img/bird_1_bluejay.png',value: 0 }, //https://opengameart.org/content/lpc-birds
        { src:'img/bird_1_brown.png',value: 1 },
        { src:'img/bird_3_robin.png',value: 2 },
        { src:'img/bird_1_red.png',value: 3 },
        { src:'img/bird_1_white.png',value: 4 },
        { src:'img/bird_2_black.png',value: 5 },
        { src:'img/bird_2_blue.png',value: 6 },
        { src:'img/bird_2_brown_2.png',value: 7 },
        { src:'img/bird_2_eagle.png',value: 8 },
        { src:'img/bird_3_sparrow.png',value: 9 },
        { src:'img/cat.png', type: 'cat'}, //https://opengameart.org/content/lpc-cats-and-dogs
        { src:'img/dog.png', type: 'dog'}
    ];

    if (stop || phoneNumber.length >= maxNumber) return; //STOPS IMAGES FROM SPAWNING ONCE FULL PHONE NUMBER ENTERED OR GAME STOPS

    if (phoneNumber.length >= maxNumber) return; //STOPS COLLECTING NUMBERS AFTER 10 DIGIT MAX IS REACHED

    const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)]; // RANDOMIZES IMAGES AS THEY SPAWN
    const img = document.createElement('img'); //CREATES MANY IMAGES AND ASSIGNS THE CORRECT VALUE AND TYPE
    img.src = randomImage.src;
    img.classList.add('fallingImg');
    img.dataset.value = randomImage.value;
    img.dataset.type = randomImage.type;

    const size = 80; //SIZE OF IMAGES
    img.style.width = `${size}px`;
    img.style.left = `${Math.random() * (window.innerWidth - size)}px`; //POSITION OF IMAGES
    img.style.top = `-100px`;

    document.body.appendChild(img); // ADDS IMAGES TO BODY

    let posY = -50; //STARTING POINT FOR IMAGE SPAWN - HOW HIGH THEY SPAWN
    const speed = Math.random() * 2 + 2; //FALLING SPEED

function fall() {
    posY += speed;
    img.style.top = `${posY}px`;
    const type = img.dataset.type;

    if (collisionDetect(img, character)) { //CHECKS FOR COLLISION OF IMAGES AND CHARACTER
        if (type === 'dog') { //ENDS THE GAME IF DOG IS HIT
            stopGame();
            img.remove();
            return; 
        } else if (type === 'cat') { //SUBTRACTS THE LAST VALUE FROM THE PHONE NUMBER IF CAT IS HIT
            phoneNumber = phoneNumber.slice(0, -1);
            document.querySelector('.phoneNumber').textContent = `Phone Number: ${phoneNumber}`;
            img.remove();
            return; 
        } else { //ADDS VALUE OF NORMAL IMAGES IF BIRDS ARE HIT
            if (phoneNumber.length < maxNumber) {
                const value = img.dataset.value;
                phoneNumber += value; //ADDS VALUE OF IMAGE TO PHONE NUMBER
                document.querySelector('.phoneNumber').textContent = `Phone Number: ${phoneNumber}`;

                if (phoneNumber.length === maxNumber) { //ENDS GAME WHEN PHONE NUMBER IS 10 DIGITS LONG
                    stopGame();
                }
            }
            img.remove(); //REMOVES ANY NORMAL IMAGE AFTER COLLISION
            return; 
        }
    }

    if (posY < window.innerHeight) { //KEEPS NON-COLLISION IMAGES FALLING UNTIL OFF SCREEN
        requestAnimationFrame(fall);
    } else {
        img.remove(); //REMOVES IMAGE OFF SCREEN
    }
}

    fall(); //CALL FOR FALL FUNCTION
}
function collisionDetect(falling, character) { 
    //IF COLLISION OCCURS - Axis-Aligned Bounding Box Collision - https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection - https://kishimotostudios.com/articles/aabb_collision/ - usually for 3d but works with 2d
  const fallingImages = falling.getBoundingClientRect();
  const characterImage = character.getBoundingClientRect();

    return !( //COLLISION LOGIC - IF COLLISION OCCURS - *TRUE* - OTHERWISE - *FALSE*
        fallingImages.bottom < characterImage.top || fallingImages.top > characterImage.bottom || fallingImages.right < characterImage.left || fallingImages.left > characterImage.right); 
        // CHECK POSITION OF IMAGES RELATIVE TO SCREEN SIZE TO DETERIMINE IF COLLISION IN OCCURING
        }

function stopGame(){
    stop = true; //STOPS GAME

    const endNumber = document.createElement('div'); //DISPLAYS PHONE NUMBER
    endNumber.textContent = `Your Phone Number: ${phoneNumber}`;
    endNumber.classList.add('result');
    document.body.appendChild(endNumber);

    document.body.classList.remove('hideCursor');

    const retryBtn = document.createElement('div'); //DISPLAYS TRY AGAIN BUTTON
    retryBtn.textContent = 'Try Again'
    retryBtn.classList.add('retry');
    document.body.appendChild(retryBtn);

    retryBtn.addEventListener('click', runGame);  //RESTARTS GAME WHEN PRESSED
    console.log('game over');
}

clearInterval(spawnSpeed);
spawnSpeed = setInterval(spawnImage, 250); //SPAWN RATE OF IMAGES

}