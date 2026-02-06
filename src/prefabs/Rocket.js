// rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        
        // add object to existing scene
        scene.add.existing(this)
        this.moveSpeed = 2

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        // left/right
        if(!this.scene.mouseControls) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }
        if(this.scene.mouseControls) {
            const leftBound = borderUISize + this.width
            const rightBound = game.config.width - borderUISize - this.width
            let pointerX = this.scene.input.activePointer.x
            if((pointerX <= this.x) && this.x > leftBound) {
                this.x -= this.moveSpeed
            }
            else if((pointerX >= this.x) && this.x < rightBound) {
                this.x += this.moveSpeed
            }
            this.x = Phaser.Math.Clamp(this.x, leftBound, rightBound)
        }

        // fire button
        if(!this.scene.mouseControls) {
            if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
                this.isFiring = true
                this.sfxShot.play()
            }
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding

            // sub 5 seconds on miss
            this.scene.timeLimit -= 5000
        }
    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}