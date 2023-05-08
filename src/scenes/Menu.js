class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load title screen
        this.load.image('TitleScreen', './assets/TitleScreen.png');
        // load audio
        this.load.audio('bg_music', './assets/SpaceMusic.wav');
    }

    create() {
        // title config
        let title = this.add.sprite(0,0,'TitleScreen');
        title.setOrigin(0,0);
        let music = this.sound.add('bg_music');
        music.setLoop(true);
        music.play();
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Go to Credits
            this.scene.start('creditScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Start game
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
    
}
