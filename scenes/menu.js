class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        this.add.text(120, 200, 'THE CLUTTER BETWEEN US', {
            fontSize: '48px',
            fill: '#6b4b2d'
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