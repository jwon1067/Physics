
// Beveal Shape for button
class ButtonBg extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        // Shapes
        let brownButton = scene.add.image(0, 0, 'brwButton').setScale(4, 2);

        // Container of shapes
        this.add([brownButton]);

        // Add the container to the scene's display list
        scene.add.existing(this);
    }
}

//Interactive Button
class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, callback) {
        super(scene, x, y);

        // Interactive button        
        let pressButton = new ButtonBg(scene, 0, 0);

        // Add label text: text(x,y,text,size, color).orgin(x, y)
        let label = scene.add.text(0, -18, text, { 
            fontSize: '20px', 
            fill: '#6b4b2d' });

        // center text inside button
        label.setOrigin(0.5, 0.5);

        // Add components to the container
        this.add([pressButton, label]);
        
        // Make the whole container interactive // define interaction area
        this.setSize(223, 103);
        this.setInteractive();

        // Add events (Hover effects and click)
        this.on('pointerover', () => {this.setScale(1.5)});
        this.on('pointerout', () => {this.setScale(1)});
        this.on('pointerdown', () => {this.setScale(0.95)});
        this.on('pointerup', () => {
            callback();
        }); 

        // Add the container to the scene
        scene.add.existing(this);
    }
}

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