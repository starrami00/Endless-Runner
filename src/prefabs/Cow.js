class Cow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
       
        this.cowSpeed = 3;
       
    }

    update() {
        // move cow left
        this.x -= this.cowSpeed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
            let cowHeight = Phaser.Math.Between(0, 1);
            if(cowHeight == 1){
                this.y = borderUISize*6;
            } else {
                this.y = borderUISize*10;
            }
        }
    }
     
    reset() {
        this.x = game.config.width;
    }
}
