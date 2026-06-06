class Menu extends Phaser.Scene {
    constructor(){
        super('menu');
    }
    create(){
        this.add.text(80, 200, 'THE CLUTTER BETWEEN US', {
            fontSize: '48px',
            fill: '#6b4b2d'
        });

        this.add.text(250, 320, 'Click to Start', {
            fontSize: '32px',
            fill: '#a87f66'
        });

        this.input.once('pointerdown', () => {
            this.scene.start('level1_Intro');
        });
    }
}