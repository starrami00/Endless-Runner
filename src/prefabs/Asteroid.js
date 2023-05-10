// Asteroid prefab
class Asteroid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        // pixels per frame
        this.moveSpeed = game.settings.asteroidSpeed;
    }

    update() {
        // move asteroid left
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
            let asteroidHeight = Phaser.Math.Between(0, 1);
            if(asteroidHeight == 1){
                this.y = borderUISize*6;
            } else {
                this.y = borderUISize*10;
            }
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}