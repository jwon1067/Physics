class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        this.add.text(220, 200, 'Catch The Snails!', {
            fontSize: '48px',
            fill: '#ffffff'
        });

        this.add.text(250, 320, 'Click to Start', {
            fontSize: '32px',
            fill: '#ffff00'
        });

        this.input.once('pointerdown', () => {
            this.scene.start('game');
        });
    }
}