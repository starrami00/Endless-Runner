/* 
Stephanie Ramirez
Sleepy Cow
Total Hours: 28
* I am particularly proud of how I implemented the score tracking and the display of it across different scenes.
* I was not able to figure this out in prior attempts but after an hours of researching and debugging with the console
* I was able to get the player's score to display during game play and at the end screen.
* Before changing scenes I would take the data from the player's score and allows the game over scene to acces this data.

* I was proud of my art work and sound effects, particularly my larger background drawings. 
* I don't usually associate myself with art, but have been opening up into drawing pixel art. 
* For the large scenes I drew each item individually so I could get more detail on them. 
* After I placed them onto a large canvas so I can manipulate them to my desire. 

*/
const SCALE = 0.5;
const tileSize = 35;

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: [Menu, Credit, Play, GameOver]
}
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyM, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;