class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }
    preload() {
        this.load.image('background', 'assets/aptBg.png');
        this.load.image('trashCan', 'assets/trashCan.png');
        this.load.image('snail', 'assets/greySnail.png');

        this.load.audio('catch', 'assets/freesound_community-plastic-trash-can-98819.mp3');
    }
    create() {
        // Background
        this.add.image(400, 300, 'background');

        // Score
        this.score = 0;

        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '32px',
            fill: '#ffffff'
        });

        // Player
        this.player = this.physics.add.sprite(400, 420, 'trashCan').setScale(0.3);

        this.player.setCollideWorldBounds(true);

        // Prevent physics push/pause behavior
        this.player.setImmovable(true);
        this.player.body.allowGravity = false;

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Falling snails group
        this.snails = this.physics.add.group();

        // Spawn snails repeatedly
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnSnail,
            callbackScope: this,
            loop: true
        });

        // Overlap/Collision detection
        this.physics.add.overlap(
            this.player,
            this.snails,
            this.catchSnail,
            null,
            this
        );
    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }
        else {
            this.player.setVelocityX(0);
        }

        // Remove snails that fall off screen
        this.snails.getChildren().forEach(snail => {
            if (snail.y > 650) {
                snail.destroy();
            }
        });
    }

    spawnSnail() {
        const x = Phaser.Math.Between(50, 750);

        const snail = this.snails.create(x, -50, 'snail');

        snail.setScale(0.15);

        // Disable gravity for snails
        snail.body.allowGravity = false;
        
        // Smooth downward movement
        snail.setVelocityY(200);
    }

    catchSnail(player, snail) {

        // Prevent duplicate overlap calls
        if (!snail.active) {
            return;
        }

        // Stop movement immediately
        snail.setVelocity(0, 0);

        // Disable physics/body
        snail.disableBody(true, true);

        // Play sound
        this.sound.play('catch');

        // Increase score
        this.score += 1;

        // Update score text
        this.scoreText.setText('Score: ' + this.score);
    }
}