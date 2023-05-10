class Cow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
       
        this.moveSpeed = 2;
       
    }

    update() {
        // move cow left
        this.x -= this.moveSpeed;

    }
     
     reset() {
        
    }
}
