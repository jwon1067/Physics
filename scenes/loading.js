
// Beveal Shape for button
class Beveal extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        // Shapes
        let topT = scene.add.triangle(0, 0, 73, 23, 148, 73, 223, 23, 0xADB5BD);
        let leftT = scene.add.triangle(0, 0, 23, 33, 73, 66, 23, 103, 0x495057);
        let rightT = scene.add.triangle(0, 0, 173, 103, 123, 66, 173, 33, 0x343A40);
        let bottomT = scene.add.triangle(0, 0, 73, 98, 148, 38, 223, 98, 0x212529);
        
        let rect = scene.add.graphics();
            rect.fillGradientStyle(0x212529, 0x212529, 0x212529, 0xADB5BD, 1);
            rect.fillRect(13, 8, 119, 48);
        
        // Container of shapes
        this.add([topT, leftT, rightT, bottomT, rect]);

        // Add the container to the scene's display list
        scene.add.existing(this);
    }
}
// How to add to scene
// this.myShape = new Beveal(this, x, y);

//Interactive Button
class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, callback) {
        super(scene, x, y);

        // Interactive button        
        let buttonShape = new Beveal(scene, 0, 0);

        // Add label text: text(x,y,text,size, color).orgin(x, y)
        let label = scene.add.text(29, 17, text, { 
            fontSize: '30px', 
            fill: '#fff' });

        // center text inside button
        label.setPosition(223 / 8, 103 / 6);

        // Add components to the container
        this.add([buttonShape, label]);
        
        // Make the whole container interactive // define interaction area
        this.setSize(223, 103);
        this.setInteractive();

        // Add events (Hover effects and click)
        this.on('pointerover', () => this.setScale(1.05));
        this.on('pointerout', () => this.setScale(1));
        this.on('pointerdown', () => this.setScale(0.95));
        this.on('pointerup', () => {
            this.setScale(1.05);
            callback();
        });

        // Add the container to the scene
        scene.add.existing(this);
    }
}
//Add buttons
//  new Button(this, 160, 330, 'Start', () => {
//      this.scene.start('loading'); // must match key exactly
//  });

class Loading extends Phaser.Scene{
    constructor(){
        super('loading');
    }
    init(data){
        this.nextScene = data.next || 'intro';
    }
    preload(){}
    create(){  
    
        // Rectangle frame: rectangle with no fill (centerX, centerY, width, height) border (width, color, opacity)
        this.add.rectangle(400, 270, 600, 50).setStrokeStyle(8, 0x6b4b2d);
        
        // Loading Text
        this.textObject = this.add.text(
            300,     // x
            150,    // y
            "Loading...", // text
            { font: "50px Press Start 2P", color: "#6b4b2d" } // size & font, color
        );

        // Fade in Scene
        this.cameras.main.fadeIn(500);

        // Individual loading bars        
        let bars = [] // Array of loading bars

        //bar: rectangle(x, y, fade at x of bar, height, color).setOrigin(Left to Right)
        for(let i = 0; i < 10; i++){
            let bars = this.add.rectangle(110 + i * 59, 270, 50, 30, 0x6b4b2d)
            .setOrigin(0, 0.5) // set origin
            .setScale(0); // initalize rectangles as invisible

            // Load individual Bars
            this.tweens.add({
                targets: bars, 
                scaleX: 1, // make a loading bar visible horizontally
                scaleY: 1, // make a loading bar visible vertically
                alpha: 1, // Opacity: full
                duration: 200, //duration of action
                delay: i * 200, // delay in between bars
                ease: 'Power2', //rate of change of animation
            });
        }

        // Fade out to new scene
        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(300);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start(this.nextScene);
            });
        });
    }
    update(){}
}