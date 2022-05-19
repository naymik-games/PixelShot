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
    this.zoom = this.add.image(game.config.width - 25, game.config.height - 25, 'crosshair').setOrigin(1).setTint(0xffffff).setInteractive();
    this.zoom.on('pointerdown', function () {
      this.scopeToggle()
    }, this)
    this.canFire = true
    this.hits = 0;
    this.score = 0;
    this.shotsFired = 0
    this.clipCount = 3
    this.clip = []
    this.ammoBox = []
    this.scoreText = this.add.bitmapText(450, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);
    this.windText = this.add.bitmapText(110, 100, 'topaz', '0', 80).setOrigin(1, .5).setTint(0xcbf7ff).setAlpha(1);
    this.distanceText = this.add.bitmapText(135, 100, 'topaz', '0', 80).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(0);
    this.hitText = this.add.bitmapText(875, 100, 'topaz', '', 80).setOrigin(1, .5).setTint(0xffffff).setAlpha(1);


    this.fireButton = this.add.image(650, 1150, 'blank').setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(0);
    this.fireButton.on('pointerdown', this.fireShot, this)





    //WIND SET
    this.windAdjust = 0
    this.windContainer = this.add.container()
    var windLeftButton = this.add.image(game.config.width / 2 - 100, game.config.height / 2 - 350, 'menu_icons', 6).setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(1).setScale(.8);
    //var windLeftText = this.add.bitmapText(game.config.width / 2 - 100, game.config.height / 2 - 450, 'topaz', 'L', 80).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    windLeftButton.on('pointerdown', function () {
      this.changeWind('left')
    }, this)
    this.windSetText = this.add.bitmapText(game.config.width / 2, game.config.height / 2 - 350, 'topaz', this.windAdjust, 80).setOrigin(.5).setTint(0xffffff).setAlpha(1);
    var windRightButton = this.add.image(game.config.width / 2 + 100, game.config.height / 2 - 350, 'menu_icons', 7).setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(1).setScale(.8);
    //var windRightText = this.add.bitmapText(game.config.width / 2 + 100, game.config.height / 2 - 450, 'topaz', 'R', 80).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    windRightButton.on('pointerdown', function () {
      this.changeWind('right')
    }, this)
    this.windContainer.add(this.windSetText)
    this.windContainer.add(windLeftButton)
    this.windContainer.add(windRightButton)
    this.windContainer.setAlpha(0)



    //distance set
    this.distanceAdjust = 0
    this.distanceContainer = this.add.container()
    //var distanceDownText = this.add.bitmapText(850, game.config.height / 2 - 100, 'topaz', 'U', 80).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    var distanceDownButton = this.add.image(800, game.config.height / 2 - 100, 'menu_icons', 6).setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(1).setScale(.8);
    distanceDownButton.angle = 90

    distanceDownButton.on('pointerdown', function () {
      this.changeDistance('lower')
    }, this)

    this.distanceAdjustText = this.add.bitmapText(800, game.config.height / 2, 'topaz', this.distanceAdjust, 80).setOrigin(.5).setTint(0xffffff).setAlpha(1);
    var distanceUpButton = this.add.image(800, game.config.height / 2 + 100, 'menu_icons', 7).setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(1).setScale(.8);
    distanceUpButton.angle = 90
    // var distanceUpText = this.add.bitmapText(825, game.config.height / 2 + 100, 'topaz', 'D', 80).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    distanceUpButton.on('pointerdown', function () {
      this.changeDistance('raise')
    }, this)

    this.distanceContainer.add(distanceDownButton)
    this.distanceContainer.add(this.distanceAdjustText)
    this.distanceContainer.add(distanceUpButton)
    this.distanceContainer.setAlpha(0)
    ///bullets
    for (var i = 0; i < this.clipCount; i++) {

      var bullet = this.add.image(50 + i * 25, 1525, 'bullet').setScale(.9)
      this.clip.push(bullet)

    }
    this.reloadButton = this.add.image(250, 1150, 'blank').setOrigin(.5).setTint(0xcbf7ff).setAlpha(0).setInteractive();
    this.reloadButton.on('pointerdown', function () {
      if (this.clip.length == this.clipCount) { return }
      var tween = this.tweens.add({
        targets: this.Main.player,
        y: '-=50',
        yoyo: true,
        duration: 300
      })
      for (var i = this.clip.length; i < this.clipCount; i++) {

        var bullet = this.ammoBox.pop()
        bullet.setPosition(50 + i * 25, 1525).setAlpha(1)
        this.clip.push(bullet)

      }

      this.canFire = true
      this.fireButton.setAlpha(1)

    }, this)
    //controls
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




    this.Main.events.on('hit', function (data) {
      // console.log('acc ' + data.acc + ', dist ' + this.distanceFinal)
      this.hits += 1;
      this.hitText.setText(this.hits + '/' + this.shotsFired)
      //console.log('dots ' + string)
      this.score += Math.floor((100 + this.Main.distance) - data.acc)
      this.scoreText.setText(this.score)
      /*  this.hitText.setText(this.hits + '/' + this.shotsFired)
       if (this.hits == this.Main.targetCount) {
         alert('All Targets Dropped')
       }*/
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
      this.windContainer.setAlpha(1)
      this.windAdjust = 0
      this.windSetText.setText(this.windAdjust)
      this.distanceContainer.setAlpha(1)
      this.distanceAdjust = 0
      this.reloadButton.setAlpha(1)
      this.distanceAdjustText.setText(this.distanceAdjust)
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
      this.windContainer.setAlpha(0)
      this.distanceContainer.setAlpha(0)
      this.reloadButton.setAlpha(0)
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
    if (this.canFire) {
      this.shotsFired++
      this.hitText.setText(this.hits + '/' + this.shotsFired)
      this.Main.fire()
      var bullet = this.clip.pop()
      bullet.setAlpha(0)
      this.ammoBox.push(bullet)
      if (this.clip.length == 0) {
        this.canFire = false
        this.fireButton.setAlpha(.2)
      }
    }


  }
  changeWind(dir) {
    if (dir == 'left') {
      this.Main.player.x += 1
      this.windAdjust -= 1
      this.windSetText.setText(this.windAdjust)
    } else {
      this.Main.player.x -= 1
      this.windAdjust += 1
      this.windSetText.setText(this.windAdjust)
    }
  }
  changeDistance(dir) {
    if (dir == 'raise') {
      this.Main.player.y += 1
      this.distanceAdjust += 1
      this.distanceAdjustText.setText(this.distanceAdjust)
    } else {
      this.Main.player.y -= 1
      this.distanceAdjust -= 1
      this.distanceAdjustText.setText(this.distanceAdjust)
    }
  }
}