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
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}