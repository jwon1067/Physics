class Level1_Intro extends Phaser.Scene {
    constructor(){
        super('level1_Intro');
    }
    create(){

        this.add.text(250, 250, 'Level 1', {
            fontSize: '48px',
            fill: '#6b4b2d'
        });

        //Add buttons
        new Button(this, 330, 180, 'Start', () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('level1');
            }); 
        });
        
    }
}
