class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }
    preload() {
        // load credit screen
        this.load.image('CreditScreen', './assets/creditScreen.png');
        // load audio
        this.load.audio('bg_music', './assets/titleBgMusic.wav');
    }

    create() {
        // credit config
        let title = this.add.sprite(0,0,'CreditScreen');
        title.setOrigin(0,0);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Go to Menu
            this.scene.start('menuScene');
        }
    
    }
    
}