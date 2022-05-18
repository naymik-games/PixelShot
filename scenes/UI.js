class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);


  }
  create() {
    this.Main = this.scene.get('playGame');
    this.header = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.5);
    this.header.displayWidth = 900;
    this.header.displayHeight = 200;
    this.zoom = this.add.image(game.config.width - 25, game.config.height - 25, 'blank').setOrigin(1).setTint(0xffffff).setInteractive();
    this.zoom.on('pointerdown', function () {
      this.scopeToggle()
    }, this)

    this.score = 0;
    this.windText = this.add.bitmapText(85, 100, 'topaz', '0', 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);

    this.scoreText = this.add.bitmapText(450, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);


    this.fireButton = this.add.image(650, 1150, 'blank').setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(0);
    this.fireButton.on('pointerdown', this.fireShot, this)

    this.distanceText = this.add.bitmapText(800, 1150, 'topaz', '0', 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(0);


    this.staticXJsPos = 450
    this.staticYJsPos = 1200
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: this.staticXJsPos,
      y: this.staticYJsPos,
      radius: 100,
      //base: baseGameObject,
      //thumb: thumbGameObject,
      dir: '4dir',
      // forceMin: 16,
      // fixed: true,
      // enable: true
    }).on('update', this.updateJoystickState, this);
    this.cursorKeys = this.joyStick.createCursorKeys();

    this.Main.events.on('score', function () {

      this.score += 1;
      //console.log('dots ' + string)
      this.scoreText.setText(this.score)
    }, this);



  }

  update() {
    this.distanceText.setText(this.Main.distance)
    this.windText.setText(this.Main.wind)
    this.updateJoystickState();
  }
  updateJoystickState() {
    let direction = '';
    for (let key in this.cursorKeys) {
      if (this.cursorKeys[key].isDown) {
        direction += key;
      }
    }

    // If no direction if provided then stop 
    // the player animations and exit the method
    if (direction.length === 0) {
      //  this.stopPlayerAnimations();
      return;
    }

    // If last cursor direction is different
    //  the stop all player animations
    if (this.lastCursorDirection !== direction) {
      //this.stopPlayerAnimations();
    }

    // Set the new cursor direction
    this.lastCursorDirection = direction;
    //console.log(this.lastCursorDirection)
    // Handle the player moving
    var force = Math.floor(this.joyStick.force * 100) / 100
    this.Main.movePlayer(this.lastCursorDirection, force);

    // Set debug info about the cursor
    //this.setCursorDebugInfo();
  }
  scopeToggle() {
    this.Main.toggleScope()
    if (this.Main.toggle == 0) {
      this.fireButton.setAlpha(1).setInteractive()
      this.distanceText.setAlpha(1)
      /*  var tween = this.tweens.add({
         targets: this.rifle,
         scale: 3,
         duration: 300,
         alpha: 0
       })
       this.fireButton.setAlpha(1).setInteractive()
       this.reloadText.setAlpha(1).setInteractive()
       this.guideTextGroup.setAlpha(1)
       this.distanceContainer.setAlpha(1)
       this.windContainer.setAlpha(1) */
      this.Main.toggle = 1
    } else {
      this.fireButton.setAlpha(0).disableInteractive()
      this.distanceText.setAlpha(0)
      /*       var tween = this.tweens.add({
              targets: this.rifle,
              scale: 1,
              delay: 100,
              duration: 300,
              alpha: 1
            })
            this.guideTextGroup.setAlpha(0)
            
            this.reloadText.setAlpha(0).disableInteractive()
            this.distanceContainer.setAlpha(0)
            this.windContainer.setAlpha(0) */
      this.Main.toggle = 0
    }
  }
  fireShot() {
    this.Main.fire()
  }


}