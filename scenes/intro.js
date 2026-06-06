class Intro extends Phaser.Scene {
    constructor(){
        super('intro');
    }
    preload(){
        this.load.image('background', 'assets/aptBg.png');
        this.load.image('trashCan', 'assets/trashCan.png');
        this.load.image('snail', 'assets/greySnail.png');
        
        this.load.image('brwButton', 'assets/brwnButton.png');

        this.load.audio('catch', 'assets/freesound_community-plastic-trash-can-98819.mp3');
    }
    create(){
        this.scene.start('menu');
    }
}
