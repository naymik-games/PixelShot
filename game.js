let game;
/* health
Ammo 
time

tap to go to target
auto target
radar */


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

    scene: [preloadGame, startGame, selectGame, playGame, UI, loseGame, winGame],
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
    this.UI = this.scene.get('UI');
    this.easy = gameData.easy;
    if (gameMode == 'practice') {
      this.wideZoom = practices[onPractice].wideZoom
      this.scopeZoom = practices[onPractice].scopeZoom
      this.backScale = practices[onPractice].backScale
      this.widthActual = practices[onPractice].widthActual
      this.heightActual = practices[onPractice].heightActual
      this.totalLayers = practices[onPractice].totalLayers
      this.startingClips = practices[onPractice].startingClips
      this.distances = practices[onPractice].distances
      this.targetData = practices[onPractice].targetData
      this.keys = practices[onPractice].keys
      this.initialTime = practices[onPractice].time
    } else {
      this.wideZoom = missions[onMission].wideZoom
      this.scopeZoom = missions[onMission].scopeZoom
      this.backScale = missions[onMission].backScale
      this.widthActual = maps[onMap].widthActual
      this.heightActual = maps[onMap].heightActual
      this.totalLayers = maps[onMap].totalLayers
      this.startingClips = missions[onMission].startingClips
      this.distances = missions[onMission].distances
      if (missions[onMission].targetData == null) {
        this.targetData = []
      } else {
        this.targetData = missions[onMission].targetData
      }

      this.keys = maps[onMap].keys
      this.initialTime = missions[onMission].time
      this.allTargetData = maps[onMap].allPositions

      this.targetObjectives = missions[onMission].objectives
    }
    // map1


    this.isMoving = false
    this.targetScaleFactor = 1 + this.distances.length
    //map 2
    /*  this.wideZoom = 1
     this.scopeZoom = 6
     this.backScale = 2
     this.widthActual = 25600
     this.heightActual = 900 */
    //map 3
    /*  this.wideZoom = 1
     this.scopeZoom = 6
     this.backScale = 2
     this.widthActual = 900
     this.heightActual = 1640 */

    this.maxDistance = 30
    this.minDistance = 0
    this.distance = 0
    this.wind = 0
    this.toggle = 0
    this.cameras.main.setBackgroundColor(0x000000);
    //this.cameras.main.setBounds(0, 0, 805 * 4, 410 * 4)
    this.cameras.main.setBounds(0, 0, this.widthActual * this.backScale, this.heightActual * this.backScale)
    //this.cameras.main.setDeadzone(400, 200);
    this.cameras.main.setZoom(1)

    //add background layers
    for (var i = 0; i < this.totalLayers; i++) {
      this.back = this.add.image(0, 0, this.keys[i]).setOrigin(0).setScale(this.backScale).setDepth(i + 1)
    }

    //add Player
    this.player = this.add.image(this.cameras.main.getBounds().width / 2, game.config.height / 2, 'scope_w').setAlpha(.2).setInteractive().setDepth(8);
    this.player.health = 100
    this.cameras.main.startFollow(this.player, true);
    this.playerSpeed = 5


    //add targets
    this.targetPool = []
    this.targets = []
    //scene, x, y, texture, dis, scale, sway, canShoot
    if (gameMode == 'practice') {
      this.positions = Phaser.Utils.Array.Shuffle(practices[onPractice].allPositions);
      for (var i = 0; i < practices[onPractice].targetGoal; i++) {
        var td = this.positions.pop()
        var shoot = false;
        var move = Phaser.Math.Between(1, 100) > 75
        var target = new Target(this, td.col * this.backScale, td.row * this.backScale, 'spot', this.distances[td.dis], this.targetScaleFactor - td.dis, move, shoot)
      }
    } else {
      if (this.targetData.length == 0) {
        this.positions = Phaser.Utils.Array.Shuffle(maps[onMap].allPositions);
        var tempCount = 0
        for (var i = 0; i < missions[onMission].targetGoal; i++) {
          var td = this.positions.pop()
          if (tempCount < missions[onMission].shootCount) {
            var shoot = true;
          } else {
            var shoot = false;
          }
          tempCount++;
          var move = Phaser.Math.Between(1, 100) > 75
          var target = new Target(this, td.col * this.backScale, td.row * this.backScale, 'spot', this.distances[td.dis], this.targetScaleFactor - td.dis, move, shoot)
        }
      } else {
        for (var i = 0; i < this.targetData.length; i++) {
          var td = this.targetData[i]
          var target = new Target(this, td.col * this.backScale, td.row * this.backScale, 'spot', this.distances[td.dis], this.targetScaleFactor - td.dis, td.move, td.canShoot)
        }
      }


    }

    //extras
    this.extras = []
    this.objectiveCount = 0

    if (gameMode == 'map') {
      this.positions = Phaser.Utils.Array.Shuffle(this.allTargetData);
      //console.log(extraObjects.length)
      for (var i = 0; i < this.targetObjectives.length; i++) {
        var td = this.positions.pop()
        // console.log(td)
        var col = td.col * this.backScale // / this.cameras.main.zoom
        var row = td.row * this.backScale /// this.cameras.main.zoom
        //scene, x, y, texture, frame, dis, scale, sway, type    
        var testItem = new Extra(this, col, row, 'items', extraObjects[this.targetObjectives[i]].index, this.distances[td.dis], 1, false, this.targetObjectives[i])
        //this.extras.push(testItem)

      }
      this.objectiveCount = this.extras.length
      console.log(this.extras)
    }

    //var testItem = new Extra(this, 500, 300, 'items', extraObjects[3].index, 0, 1, false, 3)
    // var testItem = new Extra(this, col, row, 'items', extraObjects[num].index, 0, 1, false, num)
    // var testItem = new Extra(this, 300, 300, 'items', extraObjects[2].index, 0, 1, false, 2)


    //var testItem = new Extra(this, 300, 300, 'items', extraObjects[2].index, 0, 1, false, 2)
    //var testItem = new Extra(this, 500, 300, 'items', extraObjects[3].index, 0, 1, false, 3)

    /*   if (gameMode == 'practice') {
        this.extraLauncher = this.sys.time.addEvent({ delay: 10000, callback: this.launchExtra, callbackScope: this, loop: true });
      } */
    //console.log('ob' + this.objectiveCount)
    //add grapjics settings
    this.graphicsHelp = this.add.graphics({ lineStyle: { width: 4, color: 0x00ff00 }, fillStyle: { color: 0xaa0000 } });
    this.graphicsScope = this.add.graphics({ lineStyle: { width: 4, color: 0x000000 }, fillStyle: { color: 0xaa0000 } });
    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 } });

    this.rect = new Phaser.Geom.Rectangle(this.player.x - 175, this.player.y - 175, 350, 350);

    //this.graphics.strokeRectShape(this.rect).setDepth(8);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spot = this.add.image(0, 0, 'spot').setDepth(8).setScale(2).setTint(0xff0000)
    /* this.input.on("pointerdown", function (pointer) {
      console.log(pointer.x + ',' + pointer.y)
      var col = Math.floor(pointer.worldX / this.backScale)
      var row = Math.floor(pointer.worldY / this.backScale)
      console.log(col + ',' + row)
    }, this) */

    //set callbacks for wind
    if (this.easy) {
      this.wind = 0

    } else {
      this.wind = Phaser.Math.Between(-30, 30)
      this.windAdjustMinor = this.sys.time.addEvent({ delay: 2000, callback: this.adjustWindMinor, callbackScope: this, loop: true });
      this.windAdjustMajor = this.sys.time.addEvent({ delay: 30000, callback: this.adjustWindMajor, callbackScope: this, loop: true });
    }

    //bursts
    const config1 = {
      key: 'burst1',
      frames: 'burst',
      frameRate: 20,
      repeat: 0
    };
    this.anims.create(config1);
    this.bursts = this.add.group({
      defaultKey: 'burst',
      maxSize: 30
    });
    this.eBullets = this.add.group({
      defaultKey: 'spot',
      maxSize: 30
    });

    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */

  }
  update() {
    //movement
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
    //sensing box
    this.graphicsHelp.clear()
    this.graphics.clear()
    this.rect.setPosition(this.player.x - 175, this.player.y - 170)
    //this.graphics.strokeRectShape(this.rect).setDepth(8);
    this.targets.forEach(function (target) {
      if (Phaser.Geom.Rectangle.ContainsPoint(this.rect, target)) {
        if (target.canShoot) {
          this.graphicsHelp.lineStyle(4, 0xff0000, 1)
        } else {
          this.graphicsHelp.lineStyle(4, 0x00ff00, 1)
        }
        //target.setTexture('target_help')
        var circle = new Phaser.Geom.Circle(target.x, target.y, 35);
        this.graphicsHelp.strokeCircleShape(circle).setDepth(7.5);
      } else {
        //target.setTexture('target')
        //this.graphicsHelp.clear()
      }
    }.bind(this));

    //scope sensor
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
  //scene, x, y, texture, frame, dis, scale, sway, type
  launchExtra() {
    //if (Phaser.Math.Between(1, 100) > 85) {
    if (gameMode == 'practice') {
      var num = Phaser.Math.Between(1, 2)
    } else {
      var num = Phaser.Math.Between(0, 2)
    }

    //var col = Phaser.Math.Between(50, this.widthActual - 50) * this.backScale // / this.cameras.main.zoom
    // var row = Phaser.Math.Between(50, this.heightActual - 50) * this.backScale /// this.cameras.main.zoom
    var td = this.positions.pop()
    var col = td.col * this.backScale // / this.cameras.main.zoom
    var row = td.row * this.backScale /// this.cameras.main.zoom

    var testItem = new Extra(this, col, row, 'items', extraObjects[num].index, 0, 1, false, num)
    //}
  }
  toggleScope() {
    if (this.toggle == 1) {
      this.cameras.main.setZoom(this.wideZoom)
      this.player.setTexture('scope_w')
      this.player.setScale(1).setAlpha(2)

      this.graphicsScope.clear()
      //this.player.setAlpha(.8)
      /*  var tween = this.tweens.add({
         targets: this.player,
         delay: 100,
         duration: 300,
         alpha: 1
       }) */

    } else {
      this.cameras.main.setZoom(this.scopeZoom)
      this.player.setTexture('scope_z')
      this.player.setScale(.25).setAlpha(1)


      //this.player.setAlpha(.2)
      /* var tween = this.tweens.add({
        targets: this.player,
        duration: 300,
        alpha: 1
      })
      */
    }
  }
  fire() {
    var tween = this.tweens.add({
      targets: this.player,
      y: '-=25',
      yoyo: true,
      duration: 100
    })
    this.cameras.main.flash();
    //console.log(this.distance)
    var drop = this.distance
    if (this.easy) {
      drop = 0
    }
    this.spot.setPosition(this.player.x + this.wind, this.player.y + drop)

    this.targets.forEach(function (target) {
      var tbound = target.getBounds()
      // target.rect = new Phaser.Geom.Rectangle(tbound.x, tbound.y, tbound.width, tbound.height)
      //var tscale = target.scale
      target.rect = new Phaser.Geom.Rectangle(target.x - target.displayWidth / 2, target.y - target.displayHeight / 2, target.displayWidth, target.displayHeight)
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
        //var color = this.textures.getPixel(1, 1, 'spot');
        // console.log(color)
        target.setTint(0x00ff00)
        //numX = (numX < 0) ? numX * -1 : numX;
        var tween = this.tweens.add({
          targets: target,
          alpha: 0,
          delay: 300,
          scale: 0,
          duration: 200,
          callbackScope: this,
          onComplete: function () {
            target.setPosition(-50, -50)
            if (target.canShoot) {
              //target.shootTimer.paused = true
              this.time.removeEvent(target.shootTimer);
              this.canShoot = false
            }
            if (this.canSway) {
              this.swayTween.remove()
              this.canSway = false
            }
            this.spot.setPosition(-50, -50)
            var ind = this.targets.indexOf(target)
            var removed = this.targets.splice(ind, 1);
            this.targetPool.push(removed[0])
            if (gameMode == 'practice') {
              //this.practiceNext()
            }
          }
        })

        //this.showToast('HIT')
        this.explode(this.spot.x, this.spot.y)
        // console.log('HIT')
        var acc = Math.abs(numX) + Math.abs(numY)
        if (acc == 0 && gameMode == 'practice') {
          this.launchExtra()
        }
        this.addHit(acc, this.distance)

      }

    }.bind(this));


    this.extras.forEach(function (extra) {
      var tbound = extra.getBounds()
      // target.rect = new Phaser.Geom.Rectangle(tbound.x, tbound.y, tbound.width, tbound.height)
      //var tscale = target.scale
      extra.rect = new Phaser.Geom.Rectangle(extra.x - extra.displayWidth / 2, extra.y - extra.displayHeight / 2, extra.displayWidth, extra.displayHeight)
      //target.rect = new Phaser.Geom.Circle(tbound.x + tbound.width / 2, tbound.y + tbound.width / 2, tbound.width / 2)
      if (Phaser.Geom.Rectangle.ContainsPoint(extra.rect, this.spot)) {

        //console.log('X' + Math.abs(target.x - this.spot.x))
        //console.log('Y' + Math.abs(target.y - this.spot.y))
        var numX = extra.x - this.spot.x
        var numY = extra.y - this.spot.y
        console.log('X' + (numX * -1))
        console.log('Y' + (numY * -1))
        /* if (!this.easy) {
          if (Math.abs(numX) > 10 || Math.abs(numY) > 10) {
            return
          }
        } */
        //var color = this.textures.getPixel(1, 1, 'spot');
        // console.log(color)
        console.log(extra.details.name)
        extra.setTint(0x00ff00)
        //numX = (numX < 0) ? numX * -1 : numX;
        var tween = this.tweens.add({
          targets: extra,
          alpha: 0,
          delay: 300,
          scale: 0,
          duration: 200,
          callbackScope: this,
          onComplete: function () {
            extra.setPosition(-50, -50)

            var ind = this.extras.indexOf(extra)
            var removed = this.extras.splice(ind, 1);
            //this.targetPool.push(removed[0])

          }
        })

        //this.showToast('HIT')
        this.explode(this.spot.x, this.spot.y)
        // console.log('HIT')
        // 
        //this.addHit(acc, this.distance)
        var acc = Math.abs(numX) + Math.abs(numY)
        this.addHitExtra(acc, this.distance, extra)

      }

    }.bind(this));



    this.UI.canFire = true



  }
  addHitExtra(acc, dis, extra) {
    var data = { acc: acc, dis: dis, target: extra }
    this.events.emit('hitExtra', data);
  }
  addHit(acc, dis) {
    var data = { acc: acc, dis: dis }
    this.events.emit('hit', data);
  }
  shootPlayer(x, y) {
    console.log('shoot player')
    var ebullet = this.eBullets.get().setActive(true).setDepth(this.totalLayers + 1).setPosition(x, y).setVisible(true);
    var tween = this.tweens.add({
      targets: ebullet,
      x: this.player.x,
      y: this.player.y,
      scale: 16,
      duration: 50,
      callbackScope: this,
      onComplete: function () {
        ebullet.setActive(false);
        ebullet.setVisible(false)
        //duration, intensity, force
        this.cameras.main.shake(100, .05);
        if (Phaser.Math.Between(1, 100) < 75) {
          this.player.health -= 10
        }

        this.events.emit('health', this.player.health);
      }
    })
  }
  practiceNext() {
    var target = this.targetPool.pop()
    //target.setTexture('spot')
    target.setTint(0xff0000)
    target.setAlpha(1)

    var td = this.positions.pop()
    console.log(td)
    target.setScale(this.targetScaleFactor - td.dis)
    target.distance = this.distances[td.dis]
    var col = td.col
    var row = td.row
    if (Phaser.Math.Between(1, 100) < 0) {
      target.setSway()
    }
    target.setPosition(col * this.backScale, row * this.backScale)
    target.setDepth(1.5)
    console.log(target)
    this.targets.push(target)
  }
  loadTargets() {
    for (var i = 0; i < practices[onPractice].targetGoal; i++) {
      var td = this.positions.pop()
      var shoot = false;
      var move = Phaser.Math.Between(1, 100) > 75
      var target = new Target(this, td.col * this.backScale, td.row * this.backScale, 'spot', this.distances[td.dis], this.targetScaleFactor - td.dis, move, shoot)
    }
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
    console.log(force)
    if (this.toggle == 1) {
      this.playerSpeed = 1

    } else {
      if (force > 200) {
        this.playerSpeed = 10
      } else if (force > 90) {
        this.playerSpeed = 5
      } else {
        this.playerSpeed = 1
      }
    }
    //console.log(direction)
    if (direction === "up") {
      if (this.player.y <= this.cameras.main.getBounds().y) { return }
      this.player.y -= this.playerSpeed;
      this.isMoving = true
    } else if (direction === "down") {
      if (this.player.y >= this.cameras.main.getBounds().height) { return }
      this.player.y += this.playerSpeed;
      this.isMoving = true
    } else if (direction === "right") {
      if (this.player.x >= this.cameras.main.getBounds().width) { return }
      this.player.x += this.playerSpeed;
      //this.back.x -= this.playerSpeed / 4
    } else if (direction === "left") {

      if (this.player.x <= this.cameras.main.getBounds().x) { return }
      this.player.x -= this.playerSpeed;
      // this.back.x += this.playerSpeed / 4
      this.isMoving = true
    } else if (direction === "upright") {
      this.player.x += this.playerSpeed;
      this.player.y -= this.playerSpeed;
      this.isMoving = true
    } else if (direction === "downright") {
      this.player.x += this.playerSpeed;
      this.player.y += this.playerSpeed;
      this.isMoving = true
    } else if (direction === "downleft") {
      this.player.x -= this.playerSpeed;
      this.player.y += this.playerSpeed;
      this.isMoving = true
    } else if (direction === "upleft") {
      this.player.x -= this.playerSpeed;
      this.player.y -= this.playerSpeed;
      this.isMoving = true
    } else {
      this.player.x = 0;
      this.player.y = 0;
      this.isMoving = false
      console.log('no move')
    }

    // console.log(this.isMoving)

  }
  addScore() {
    this.events.emit('score');
  }
  showToast(text) {
    if (this.toastBox) {
      this.toastBox.destroy(true);
    }
    var toastBox = this.add.container().setDepth(2);
    var backToastb = this.add.image(0, 0, 'blank').setDepth(2).setTint(0x333333);
    backToastb.setAlpha(1);
    backToastb.displayWidth = 720;
    backToastb.displayHeight = 110;
    toastBox.add(backToastb);
    var backToast = this.add.image(0, 0, 'blank').setDepth(2).setTint(0x000000);
    backToast.setAlpha(1);
    backToast.displayWidth = 700;
    backToast.displayHeight = 90;
    toastBox.add(backToast);
    toastBox.setPosition(game.config.width + 800, 820);
    var toastText = this.add.bitmapText(20, -10, 'topaz', text, 50,).setTint(0x00ff66).setOrigin(.5, .5).setDepth(2);
    //toastText.setMaxWidth(game.config.width - 10);
    toastBox.add(toastText);
    this.toastBox = toastBox;
    this.tweens.add({
      targets: this.toastBox,
      //alpha: .5,
      x: 450,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.sys.time.addEvent({
          delay: 2500,
          callback: this.hideToast,
          callbackScope: this
        });
      }
    });
    //this.time.addEvent({delay: 2000, callback: this.hideToast, callbackScope: this});
  }
  hideToast() {
    this.tweens.add({
      targets: this.toastBox,
      //alpha: .5,
      x: -800,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.toastBox.destroy(true);
      }
    });

  }
  explode(x, y) {
    var explosion = this.bursts.get().setActive(true).setDepth(this.totalLayers + 1);

    // Place the explosion on the screen, and play the animation.
    explosion.setOrigin(0.5, 0.5).setScale(1);
    explosion.x = x
    explosion.y = y
    explosion.play('burst1');
    explosion.on('animationcomplete', function () {
      explosion.setActive(false);
    }, this);
  }

}
