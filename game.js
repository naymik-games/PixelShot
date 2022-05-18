let game;



window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, startGame, playGame, UI],
    pixelArt: true,
    roundPixels: true
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {
    this.easy = false;
    // map1
    this.wideZoom = 1
    this.scopeZoom = 6
    this.backScale = 4
    this.widthActual = 805
    this.heightActual = 410
    //map 2
    /*  this.wideZoom = 1
     this.scopeZoom = 6
     this.backScale = 2
     this.widthActual = 25600
     this.heightActual = 900 */
    this.distance = 0
    this.wind = 0
    this.toggle = 0
    this.cameras.main.setBackgroundColor(0x000000);
    //this.cameras.main.setBounds(0, 0, 805 * 4, 410 * 4)
    this.cameras.main.setBounds(0, 0, this.widthActual * this.backScale, this.heightActual * this.backScale)
    //this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(1)
    var back = this.add.image(0, 0, 'background').setOrigin(0).setScale(this.backScale).setDepth(0)
    var mb = this.add.image(0, 0, 'middle-back').setOrigin(0).setScale(this.backScale).setDepth(2)
    var mf = this.add.image(0, 0, 'middle-front').setOrigin(0).setScale(this.backScale).setDepth(4)
    var fore = this.add.image(0, 0, 'foreground').setOrigin(0).setScale(this.backScale).setDepth(5)
    var front = this.add.image(0, 0, 'frontground').setOrigin(0).setScale(this.backScale).setDepth(6)
    /* var back = this.add.image(0, 0, 'map2_01').setOrigin(0).setScale(this.backScale).setDepth(0)
    var mb = this.add.image(0, 0, 'map2_02').setOrigin(0).setScale(this.backScale).setDepth(1)
    var mf = this.add.image(0, 0, 'map2_03').setOrigin(0).setScale(this.backScale).setDepth(2)
    var fore = this.add.image(0, 0, 'map2_04').setOrigin(0).setScale(this.backScale).setDepth(3)
    var front = this.add.image(0, 0, 'map2_05').setOrigin(0).setScale(this.backScale).setDepth(4)
    var front = this.add.image(0, 0, 'map2_06').setOrigin(0).setScale(this.backScale).setDepth(5) */

    this.player = this.add.image(game.config.width / 2, game.config.height / 2, 'scope', 1).setAlpha(.2).setInteractive().setDepth(8);
    this.player.on("pointerdown", this.addScore, this);
    this.cameras.main.startFollow(this.player, true);

    this.playerSpeed = 5
    this.targets = []
    var target = this.add.image(220 * this.backScale, 50 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 0
    this.targets.push(target)
    var target = this.add.image(220 * this.backScale, 100 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 5
    this.targets.push(target)
    var target = this.add.image(220 * this.backScale, 150 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 10
    this.targets.push(target)
    var target = this.add.image(220 * this.backScale, 200 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 15
    this.targets.push(target)
    var target = this.add.image(220 * this.backScale, 250 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 20
    this.targets.push(target)
    var target = this.add.image(220 * this.backScale, 300 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 25
    this.targets.push(target)
    var target = this.add.image(220 * this.backScale, 350 * this.backScale, 'target').setDepth(7).setScale(4)
    target.distance = 30
    this.targets.push(target)

    this.graphicsScope = this.add.graphics({ lineStyle: { width: 4, color: 0x000000 }, fillStyle: { color: 0xaa0000 } });
    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });

    this.rect = new Phaser.Geom.Rectangle(this.player.x - 175, this.player.y - 175, 350, 350);

    this.graphics.strokeRectShape(this.rect).setDepth(8);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spot = this.add.image(0, 0, 'spot').setDepth(8).setScale(2).setTint(0xff0000)
    this.input.on("pointerdown", function (pointer) {
      console.log(pointer.x + ',' + pointer.y)
      var col = Math.floor(pointer.worldX / this.backScale)
      var row = Math.floor(pointer.worldY / this.backScale)
      console.log(col + ',' + row)
    }, this)


    if (this.easy) {
      this.wind = 0

    } else {
      this.wind = Phaser.Math.Between(-30, 30)
      this.windAdjustMinor = this.time.addEvent({ delay: 2000, callback: this.adjustWindMinor, callbackScope: this, loop: true });
      this.windAdjustMajor = this.time.addEvent({ delay: 30000, callback: this.adjustWindMajor, callbackScope: this, loop: true });
    }
    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {
    if (this.cursors.left.isDown) {
      this.movePlayer('left')
    }
    else if (this.cursors.right.isDown) {
      this.movePlayer('right')
    }

    if (this.cursors.up.isDown) {
      this.movePlayer('up')
    }
    else if (this.cursors.down.isDown) {
      this.movePlayer('down')
    }
    this.graphics.clear()
    this.rect.setPosition(this.player.x - 175, this.player.y - 170)
    this.graphics.strokeRectShape(this.rect).setDepth(8);
    this.targets.forEach(function (target) {
      if (Phaser.Geom.Rectangle.ContainsPoint(this.rect, target)) {
        target.setTexture('target_help')
      } else {
        target.setTexture('target')
      }
    }.bind(this));

    if (this.toggle == 1) {
      this.graphicsScope.clear()
      this.circle = new Phaser.Geom.Circle(this.player.x, this.player.y, 38);
      this.graphicsScope.strokeCircleShape(this.circle).setDepth(8);
      this.targets.forEach(function (target) {
        if (Phaser.Geom.Circle.ContainsPoint(this.circle, target)) {
          target.setAlpha(.5)
          this.distance = target.distance
        } else {
          target.setAlpha(1)

        }
      }.bind(this));

    }

  }
  toggleScope() {
    if (this.toggle == 1) {
      this.cameras.main.setZoom(this.wideZoom)
      this.player.setFrame(1)
      this.player.setScale(1).setAlpha(2)

      this.graphicsScope.clear()
      //this.player.setAlpha(.8)
      /*  var tween = this.tweens.add({
         targets: this.player,
         delay: 100,
         duration: 300,
         alpha: 1
       }) */
      // this.cameras.main.setBounds(0, 0, 4200 * 3, 4200 * 3);
      // this.physics.world.setBounds(0, 0, 4200 * 3, 4200 * 3);
    } else {
      this.cameras.main.setZoom(this.scopeZoom)
      this.player.setFrame(0)
      this.player.setScale(.25).setAlpha(1)

      //this.circle = new Phaser.Geom.Circle(this.player.x, this.player.y, 38);

      //this.graphicsScope.strokeCircleShape(this.circle).setDepth(8);

      //this.player.setAlpha(.2)
      /* var tween = this.tweens.add({
        targets: this.player,
        duration: 300,
        alpha: 1
      })
      this.cameras.main.setBounds(0, 0, this.camBoundW, this.camBoundH);
      this.physics.world.setBounds(-450, -820, 8192 + 900, 8192 + 1640); */
    }
  }
  fire() {
    var tween = this.tweens.add({
      targets: this.player,
      y: '-=25',
      yoyo: true,
      duration: 100
    })
    console.log(this.distance)
    this.spot.setPosition(this.player.x + this.wind, this.player.y + this.distance)

    this.targets.forEach(function (target) {
      var tbound = target.getBounds()
      // target.rect = new Phaser.Geom.Rectangle(tbound.x, tbound.y, tbound.width, tbound.height)
      target.rect = new Phaser.Geom.Rectangle(target.x - 4, target.y - 4, 8, 8)
      //target.rect = new Phaser.Geom.Circle(tbound.x + tbound.width / 2, tbound.y + tbound.width / 2, tbound.width / 2)
      if (Phaser.Geom.Rectangle.ContainsPoint(target.rect, this.spot)) {

        //console.log('X' + Math.abs(target.x - this.spot.x))
        //console.log('Y' + Math.abs(target.y - this.spot.y))
        var numX = target.x - this.spot.x
        var numY = target.y - this.spot.y
        console.log('X' + (numX * -1))
        console.log('Y' + (numY * -1))
        /* if (!this.easy) {
          if (Math.abs(numX) > 10 || Math.abs(numY) > 10) {
            return
          }
        } */

        //numX = (numX < 0) ? numX * -1 : numX;
        console.log('HIT')

      }

    }.bind(this));



  }
  adjustWindMinor() {
    if (Phaser.Math.Between(1, 100) < 50) {
      if (Phaser.Math.Between(1, 100) < 50) {
        this.wind += Phaser.Math.Between(0, 5)
      } else {
        this.wind -= Phaser.Math.Between(0, 5)
      }
    }
  }
  adjustWindMajor() {
    if (Phaser.Math.Between(1, 100) < 50) {
      if (Phaser.Math.Between(1, 100) < 50) {
        this.wind = Phaser.Math.Between(0, 30)
      } else {
        this.wind = Phaser.Math.Between(-30, 0)
      }
    }
  }
  movePlayer(direction, force) {
    if (this.toggle == 1) {
      this.playerSpeed = 1

    } else {


      if (force > 90) {
        this.playerSpeed = 5
      } else {
        this.playerSpeed = 1
      }
    }

    if (direction === "up") {
      this.player.y -= this.playerSpeed;

    } else if (direction === "down") {
      this.player.y += this.playerSpeed;

    } else if (direction === "right") {
      this.player.x += this.playerSpeed;

    } else if (direction === "left") {
      this.player.x -= this.playerSpeed;

    } else if (direction === "upright") {
      this.player.x += this.playerSpeed;
      this.player.y -= this.playerSpeed;

    } else if (direction === "downright") {
      this.player.x += this.playerSpeed;
      this.player.y += this.playerSpeed;

    } else if (direction === "downleft") {
      this.player.x -= this.playerSpeed;
      this.player.y += this.playerSpeed;

    } else if (direction === "upleft") {
      this.player.x -= this.playerSpeed;
      this.player.y -= this.playerSpeed;

    } else {
      this.player.x = 0;
      this.player.y = 0;
    }



  }
  addScore() {
    this.events.emit('score');
  }
}
