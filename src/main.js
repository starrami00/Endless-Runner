/* Stephanie Ramirez
   Rocket Patrol: Space Protector
   Total Hours: 12
   Mods: 
   * Implement the 'FIRE' UI text (5pts)
   * Add your own (copyright-free) background music (5pts)
   * Create a new scrolling tile sprite for the background (5pts)
   * Allow the player to control the Rocket after it's fired (5pts)
   * Implement the speed increase that happens after 30 seconds (5pts)
   * Create 4 new explosion sound effects and randomize which one plays on impact (10pts)
   * Display the time remaining (in seconds) on the screen (10pts)
   * Create a new title screen (10pts)
   * Create a new enemy Spaceship type (15pts)
   * Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15pts)
   * Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15pts)
   Total Points: 100
   Credit: https://www.joshmorony.com/how-to-create-an-accurate-timer-for-phaser-games/ (Countdown Timer)

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;