class Win extends Phaser.Scene {
    constructor(){
        super('win');
    }
    create(){

        this.add.text(160, 150, 'LEVEL 3 COMPLETE!', {
            fontSize: '48px',
            fill: '#6b4b2d'
        });

        this.add.text(310, 210, 'Play again?', {
            fontSize: '25px',
            fill: '#6b4b2d'
        });

        //Add buttons
        new Button(this, 390, 290, 'Play', () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('level3');
            }); 
        });

        new Button(this, 390, 370, 'Menu', () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('menu');
            }); 
        });
        
    }
}
