class Level2_Intro extends Phaser.Scene {
    constructor(){
        super('level2_Intro');
    }
    create(){

        this.add.text(300, 150, 'Level 2', {
            fontSize: '48px',
            fill: '#6b4b2d'
        });

        this.add.text(285, 210, 'Goal: 20 points', {
            fontSize: '25px',
            fill: '#6b4b2d'
        });

        //Add buttons
        new Button(this, 390, 290, 'Play', () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('level2');
            }); 
        });
        
    }
}
