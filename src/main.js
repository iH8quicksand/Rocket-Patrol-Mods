/* 
Shiloh Sharmahd
SUPER Patrol
1 pointers:
- high score
- left/right movement while rocket is firing
3 pointers:
- added 4 explosion sound effect, randomized
- display time remaining on screen
5 pointers:
- mouse left/right + firing
- add time on hit and sub on miss
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyM

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore = 0