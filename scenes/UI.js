class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {
    //this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);




  }
  create() {
    this.Main = this.scene.get('playGame');

    this.header = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.5);
    this.header.displayWidth = 900;
    this.header.displayHeight = 150;
    this.zoom = this.add.image(game.config.width - 25, game.config.height - 25, 'crosshair').setOrigin(1).setTint(0xffffff).setInteractive();
    this.zoom.on('pointerdown', function () {
      this.scopeToggle()
    }, this)
    this.canFire = true
    this.hits = 0;
    this.hitsTemp = 0
    this.hitsObjective = 0
    this.hitsCollect = 0
    this.hitsMult = 0
    this.score = 0;
    this.scoreBuffer = 0
    this.shotsFired = 0
    this.objectivesFound = false
    this.bulletCount = 3
    this.perfectCount = 0
    this.healthTotal = 100
    this.initialTime = this.Main.initialTime
    this.clipCount = this.Main.startingClips
    this.clip = []
    this.bulletPool = []
    this.ammoBox = []
    this.clipPool = []
    this.canScore = true
    if (gameMode == 'practice') {
      this.targetCount = practices[onPractice].targetGoal
    } else {

      this.targetCount = this.Main.targets.length


    }
    //main texts
    this.scoreText = this.add.bitmapText(450, 75, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);
    this.shotText = this.add.bitmapText(875, 75, 'topaz', '0', 80).setOrigin(1, .5).setTint(0xcbf7ff).setAlpha(1);
    this.windText = this.add.bitmapText(110, 75, 'topaz', '0', 80).setOrigin(1, .5).setTint(0x00ff66).setAlpha(1);
    this.distanceText = this.add.bitmapText(135, 75, 'topaz', '0', 80).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(0);

    this.perfectText = this.add.bitmapText(game.config.width / 2, game.config.height / 2 - 75, 'topaz', 'PERFECT!', 50).setOrigin(.5).setTint(0xff0000).setAlpha(0);
    this.accText = this.add.bitmapText(game.config.width - 225, game.config.height - 75, 'topaz', '0', 60).setOrigin(.5).setTint(0xcbf7ff).setAlpha(0);

    this.showToast('READY?')

    //fire button
    this.fireButton = this.add.image(650, 1045, 'fire').setOrigin(.5).setTint(0xffffff).setInteractive().setAlpha(0);
    this.fireButton.on('pointerdown', this.fireShot, this)

    //RESET ADJUSTMENTS
    this.reset = this.add.image(650, 595, 'reset').setInteractive()
    this.reset.on('pointerdown', function () {
      this.windAdjust = 0
      this.windSetText.setText(this.windAdjust)

      this.distanceAdjust = 0
      this.distanceAdjustText.setText(this.distanceAdjust)
    }, this)

    //WIND SET
    this.windAdjust = 0
    this.windContainer = this.add.container()

    this.horizontalAdjust = this.add.image(game.config.width / 2, game.config.height / 2 - 350, 'hAdjustment').setInteractive({ draggable: true })
    this.horizontalAdjust.displayHeight = 80
    this.horizontalAdjust.displayWidth = 300
    this.horizontalAdjust.on('dragstart', function (pointer, dragX, dragY) {
      this.dragging = true
      this.dragStart = { x: pointer.x, y: pointer.y }
      this.horizontalAdjust.setAlpha(.8)
    }, this);
    this.horizontalAdjust.on('drag', function (pointer, dragX, dragY) {
      if (this.dragging) {
        if (dragX < this.dragStart.x) {
          this.Main.player.x -= 1
          this.windAdjust -= 1
        } else if (dragX > this.dragStart.x) {
          this.Main.player.x += 1
          this.windAdjust += 1
        }

        this.windSetText.setText(this.windAdjust)
        this.dragStart.x = dragX
        this.dragStart.y = dragY
      }
      /* ... */
    }, this);
    this.horizontalAdjust.on('dragend', function (pointer, dragX, dragY, dropped) {
      this.horizontalAdjust.setAlpha(1)
    }, this);
    this.windSetText = this.add.bitmapText(game.config.width / 2 - 235, game.config.height / 2 - 360, 'topaz', this.windAdjust, 80).setOrigin(.5).setTint(0x00ff66).setAlpha(1);

    this.windContainer.add(this.windSetText)
    this.windContainer.add(this.horizontalAdjust)
    this.windContainer.add(this.reset)
    //this.windContainer.add(windRightButton)
    this.windContainer.setAlpha(0)



    //DISTANCE SET
    this.distanceAdjust = 0
    this.distanceContainer = this.add.container()

    this.distanceAdjustText = this.add.bitmapText(800, game.config.height / 2 - 225, 'topaz', this.distanceAdjust, 80).setOrigin(.5).setTint(0x00ff66).setAlpha(0);

    this.verticalAdjust = this.add.image(800, game.config.height / 2, 'vAdjustment').setInteractive({ draggable: true })
    this.verticalAdjust.displayHeight = 300
    this.verticalAdjust.displayWidth = 80
    this.verticalAdjust.on('dragstart', function (pointer, dragX, dragY) {
      this.dragging = true
      this.dragStart = { x: pointer.x, y: pointer.y }
      this.verticalAdjust.setAlpha(.8)
    }, this);
    this.verticalAdjust.on('drag', function (pointer, dragX, dragY) {
      if (this.dragging) {
        if (dragY < this.dragStart.y) {
          this.Main.player.y -= 1
          this.distanceAdjust -= 1
        } else if (dragY > this.dragStart.y) {
          this.Main.player.y += 1
          this.distanceAdjust += 1
        }

        this.distanceAdjustText.setText(this.distanceAdjust * -1)

        this.dragStart.x = dragX
        this.dragStart.y = dragY
      }
      /* ... */
    }, this);
    this.verticalAdjust.on('dragend', function (pointer, dragX, dragY, dropped) {
      this.verticalAdjust.setAlpha(1)
      //console.log('start: ' + this.dragStart.y)
      // console.log('End: ' + dragY)






    }, this);

    this.distanceContainer.add(this.verticalAdjust)
    this.distanceContainer.add(this.distanceAdjustText)

    this.distanceContainer.setAlpha(0)

    ///SET UP CLIPS
    this.ammoGroup = this.add.container()
    for (var i = 0; i < this.clipCount; i++) {

      var clip = this.add.image(175 + i * 75, 1395, 'clip').setScale(.6)
      this.ammoGroup.add(clip)
      this.ammoBox.push(clip)

    }
    //SET UP BULLETS
    for (var i = 0; i < this.bulletCount; i++) {

      var bullet = this.add.image(50 + i * 25, 1395, 'bullet').setScale(.6)
      this.ammoGroup.add(bullet)
      this.clip.push(bullet)

    }
    //RELOAD BUTTON
    this.reloadButton = this.add.image(250, 1045, 'reload').setOrigin(.5).setTint(0xcbf7ff).setAlpha(0).setInteractive();
    this.reloadButton.on('pointerdown', function () {
      if (this.clip.length == this.bulletCount || this.ammoBox.length == 0) { return }
      var tween = this.tweens.add({
        targets: this.Main.player,
        y: '-=50',
        yoyo: true,
        duration: 300
      })
      var clip = this.ammoBox.pop()
      var tween = this.tweens.add({
        targets: clip,
        y: game.config.height + 100,
        duration: 150,
        callbackScope: this,
        onComplete: function () {
          clip.setAlpha(0)
          if (this.ammoBox.length == 0) {
            this.reloadButton.setAlpha(.2)

          }
        }
      })
      for (var i = this.clip.length; i < this.bulletCount; i++) {

        var bullet = this.bulletPool.pop()
        bullet.setPosition(50 + i * 25, 1395).setAlpha(1)
        this.clip.push(bullet)

      }

      this.canFire = true
      this.fireButton.setAlpha(1).setInteractive()

    }, this)
    this.ammoGroup.setVisible(false)
    //OBJECTIVE UI
    if (gameMode == 'map') {
      this.objectiveContainer = this.add.container()
      if (missions[onMission].objectives.indexOf(3) > -1) {
        this.power = this.add.image(50, 200, 'items', 3).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.power)
      }
      if (missions[onMission].objectives.indexOf(4) > -1) {
        this.laptop = this.add.image(150, 200, 'items', 4).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.laptop)
      }
      if (missions[onMission].objectives.indexOf(5) > -1) {
        this.satalite = this.add.image(250, 200, 'items', 5).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.satalite)
      }
      if (missions[onMission].objectives.indexOf(6) > -1) {
        this.wifi = this.add.image(350, 200, 'items', 6).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.wifi)
      }
      if (missions[onMission].objectives.indexOf(7) > -1) {
        this.security = this.add.image(450, 200, 'items', 7).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.security)
      }
      if (missions[onMission].objectives.indexOf(8) > -1) {
        this.server = this.add.image(550, 200, 'items', 8).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.server)
      }
      if (missions[onMission].objectives.indexOf(9) > -1) {
        this.keypad = this.add.image(650, 200, 'items', 9).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.keypad)
      }
      if (missions[onMission].objectives.indexOf(10) > -1) {
        this.documents = this.add.image(750, 200, 'items', 10).setScale(4).setAlpha(.5)
        this.objectiveContainer.add(this.documents)
      }
      this.objectiveContainer.setVisible(false)
    } else {
      this.objectiveContainer = this.add.container()
      this.objectiveContainer.setVisible(false)
    }

    //SET UP MOVEMENT CONTROLS
    this.staticXJsPos = 450
    this.staticYJsPos = 1200
    this.jBase = this.add.image(0, 0, 'jBase').setTint(0x0000ff)
    this.jTip = this.add.image(0, 0, 'jTip')
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: this.staticXJsPos,
      y: this.staticYJsPos,
      radius: 100,
      base: this.jBase,
      thumb: this.jTip,
      dir: '8dir',
      // forceMin: 16,
      // fixed: true,
      // enable: true
    }).on('update', this.updateJoystickState, this);
    this.cursorKeys = this.joyStick.createCursorKeys();


    //HANDLE HEALTH UPDATES
    this.Main.events.on('health', function (data) {
      this.healthUpdate(data)

    }, this);
    //HANDLE ESCAPE
    this.Main.events.on('escape', function () {
      this.hitsMult++
      this.showToast('TARGET ESCAPED!')
      this.initialTime += 15
      if (this.initialTime > this.Main.initialTime) {
        this.initialTime = this.Main.initialTime
      }
    }, this)
    //HANDLE UI HIT TARGET
    this.Main.events.on('hit', function (data) {
      // console.log('acc ' + data.acc + ', dist ' + this.distanceFinal)
      this.showToast('HIT')
      if (this.canScore) {
        this.hits += 1;
        this.hitsTemp++
      }
      var rounded = Math.round(data.acc * 10) / 10
      this.accText.setText(rounded)
      if (data.acc == 0) {
        this.perfectCount++
        var tween1 = this.tweens.add({
          targets: this.perfectText,
          alpha: 1,
          duration: 500
        })
        var tween2 = this.tweens.add({
          targets: this.perfectText,
          alpha: 0,
          duration: 500,
          delay: 1500
        })
        this.perfectText.setAlpha(1)
      }
      this.canScore = false
      if (gameMode == 'practice' && data.acc < 3) {

        this.initialTime += 15
        if (this.initialTime > this.Main.initialTime) {
          this.initialTime = this.Main.initialTime
        }
      }
      //console.log('dots ' + string)
      this.scoreBuffer += Math.floor((100 + this.Main.distance) - data.acc)
      //this.scoreText.setText(this.score)
      this.hitText.setText(this.hitsTemp)


      if (gameMode == 'map') {
        if (this.hitsTemp == this.targetCount && this.objectivesFound) {
          this.winGame()
        }
      } else {
        if (this.hitsTemp == this.targetCount) {
          this.hitsTemp = 0
          this.hitText.setText(this.hitsTemp)
          this.Main.loadTargets()
        }
      }


    }, this);
    //HANDLE UI HIT TARGET EXTRA
    this.Main.events.on('hitExtra', function (data) {
      // console.log('acc ' + data.acc + ', dist ' + this.distanceFinal)

      this.showToast('HIT ' + data.target.details.name)
      //this.hits += 1;
      if (this.canScore) {
        if (data.target.details.type == 'collect') {
          this.doCollect(data.target)
        } else if (data.target.details.type == 'objective') {
          this.doObjective(data.target)
        }
        //console.log('dots ' + string)
        this.scoreBuffer += Math.floor((100 + this.Main.distance) - data.acc)
      }
      this.canScore = false

    }, this);

    //SET UP LEVEL STATUS--HEALTHBAR, TARGET PROGRESS, TIMER
    this.levelProgressBarB = this.add.image(20, 1630, 'blank').setOrigin(0, 1).setTint(0x000000).setAlpha(.8)
    this.levelProgressBarB.displayWidth = 260;
    this.levelProgressBarB.displayHeight = 150;
    this.hitText = this.add.bitmapText(65, 1525, 'topaz', this.hits, 50).setOrigin(1, .5).setTint(0x00ff66).setAlpha(1);
    //this.totalTargetText = this.add.bitmapText(125, 1525, 'topaz', this.hits, 60).setOrigin(.5).setTint(0x00ff66).setAlpha(1);
    this.totalTargetText = this.add.bitmapText(85, 1525, 'topaz', this.targetCount, 50).setOrigin(0, .5).setTint(0xff0000).setAlpha(1);

    this.timedEvent = this.sys.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    this.time = this.add.bitmapText(140, 1525, 'topaz', this.formatTime(this.initialTime), 50).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);


    this.levelProgressBar = this.add.image(25, 1600, 'blank').setOrigin(0, .5).setTint(0xffb000)
    this.levelProgressBar.displayWidth = 250 * this.Main.player.health / this.healthTotal;
    this.levelProgressBar.displayHeight = 25;

    /*  this.input.on('pointerdown', function (e) {
       this.Main.player.setPosition(e.worldX, e.worldY)
     }, this)
    */
    //CALL SET UP FOR MENU
    this.makeMenu()

  }

  update() {
    this.distanceText.setText(this.Main.distance)
    this.windText.setText(this.Main.wind)
    this.updateJoystickState();

    if (this.scoreBuffer > 0) {
      this.incrementScore();
      this.scoreBuffer--;
    }
  }
  loseGame() {
    var endTimer = this.sys.time.addEvent({
      delay: 2000, callback: function () {
        this.scene.pause()
        this.scene.pause('playGame')
        var extraHits = this.hitsObjective + this.hitsCollect
        if (gameMode == 'practice') {
          this.scene.launch('winGame', { score: this.score, hits: this.hits, shots: this.shotsFired, hitsExtra: extraHits, perfectCount: this.perfectCount })
        } else {
          this.scene.launch('loseGame', { score: this.score, hits: this.hits, shots: this.shotsFired, hitsExtra: extraHits })
        }

      }, callbackScope: this, loop: false
    });
    //this.time.removeEvent(this.timedEvent)

  }
  winGame() {
    var extraHits = this.hitsObjective + this.hitsCollect + this.hitsMult
    var endTimer = this.sys.time.addEvent({
      delay: 2000, callback: function () {
        this.scene.pause()
        this.scene.pause('playGame')
        this.scene.launch('winGame', { score: this.score, hits: this.hits, shots: this.shotsFired, hitsExtra: extraHits, perfectCount: this.perfectCount })
      }, callbackScope: this, loop: false
    });
    //this.time.removeEvent(this.timedEvent)

  }
  incrementScore() {
    this.score += 1;
    this.scoreText.setText(this.score);
  }
  onEvent() {
    this.initialTime -= 1; // One second
    if (this.initialTime == 0) {
      this.showToast('OUT OF TIME')
      this.loseGame()
    }
    this.time.setText(this.formatTime(this.initialTime));
  }
  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }
  healthUpdate(data) {
    var per = data / this.healthTotal
    var tween = this.tweens.add({
      targets: this.levelProgressBar,
      displayWidth: 250 * Phaser.Math.Clamp(per, 0, 1),
      duration: 500,
      callbackScope: this,
      onComplete: function () {
        if (data <= 0) {
          //this.showToast('YOU ARE DEAD')
          this.loseGame()
        }
      }
    })
  }
  addClip() {

    var clip = this.add.image(175 + this.ammoBox.length * 75, 1395, 'clip').setScale(.6)
    this.ammoGroup.add(clip)
    this.ammoBox.push(clip)
  }
  doCollect(extra) {
    this.hitsCollect++
    if (extra.details.name == 'Health') {
      this.healthUpdate(this.Main.player.health + 20)
    } else if (extra.details.name == 'Time') {
      this.initialTime += 30
    } else if (extra.details.name == 'Ammo') {
      this.addClip()
    }
  }
  doObjective(extra) {
    this.hitsObjective++
    if (extra.details.name == 'Power') {
      this.power.setAlpha(1)
    } else if (extra.details.name == 'Laptop') {
      this.laptop.setAlpha(1)
    } else if (extra.details.name == 'Satalite Dish') {
      this.satalite.setAlpha(1)
    } else if (extra.details.name == 'WiFi') {
      this.wifi.setAlpha(1)
    } else if (extra.details.name == 'Security Camera') {
      this.security.setAlpha(1)
    } else if (extra.details.name == 'Server') {
      this.server.setAlpha(1)
    } else if (extra.details.name == 'Alarm Keypad') {
      this.keypad.setAlpha(1)
    } else if (extra.details.name == 'Documents') {
      this.documents.setAlpha(1)
    }
    console.log('objective count: ' + this.Main.objectiveCount)
    console.log('objectives hit: ' + this.hitsObjective)
    if (this.hitsObjective == this.Main.objectiveCount) {
      this.objectivesFound = true
    }
    if (this.hitsTemp == this.targetCount && this.objectivesFound) {
      this.winGame()
    }
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
      if (this.clip.length > 0) {
        this.fireButton.setAlpha(1).setInteractive()
      } else {
        this.fireButton.setAlpha(.2)
      }
      this.accText.setAlpha(1)
      this.distanceText.setAlpha(1)
      this.windContainer.setAlpha(1)
      this.windAdjust = 0
      this.windSetText.setText(this.windAdjust)
      this.distanceContainer.setAlpha(1)
      this.distanceAdjust = 0
      this.objectiveContainer.setVisible(true)
      this.ammoGroup.setVisible(true)
      if (this.ammoBox.length > 0) {
        this.reloadButton.setAlpha(1)
      } else {
        this.reloadButton.setAlpha(.2)
      }

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
      this.accText.setAlpha(0)
      this.distanceContainer.setAlpha(0)
      this.reloadButton.setAlpha(0)
      this.ammoGroup.setVisible(false)
      this.objectiveContainer.setVisible(false)
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
      this.canFire = false
      if (this.Main.easy) {
        this.fireShot2()

      } else {
        this.fireTimer = this.sys.time.addEvent({ delay: this.Main.distance * 10, callback: this.fireShot2, callbackScope: this, loop: false });

      }

    }


  }
  fireShot2() {
    this.canScore = true
    this.shotsFired++
    this.shotText.setText(this.shotsFired)
    this.Main.fire()
    var bullet = this.clip.pop()
    bullet.setAlpha(0)
    this.bulletPool.push(bullet)
    if (this.clip.length == 0) {
      this.canFire = false
      this.fireButton.setAlpha(.2)
      if (this.ammoBox.length == 0) {
        this.showToast('OUT OF AMMO')
        this.loseGame()
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
    toastBox.setPosition(game.config.width + 800, game.config.height / 2 - 450);
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
        var end = this.sys.time.addEvent({
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
  toggleMenu() {

    if (this.menuGroup.y == 0) {
      var menuTween = this.tweens.add({
        targets: this.menuGroup,
        y: -270,
        duration: 500,
        ease: 'Bounce'
      })

    }
    if (this.menuGroup.y == -270) {
      var menuTween = this.tweens.add({
        targets: this.menuGroup,
        y: 0,
        duration: 500,
        ease: 'Bounce'
      })
    }
  }
  makeMenu() {
    ////////menu
    this.menuGroup = this.add.container().setDepth(5);
    var menuBG = this.add.image(game.config.width / 2, game.config.height - 85, 'blank').setOrigin(.5, 0).setTint(0x333333).setAlpha(.8)
    menuBG.displayWidth = 300;
    menuBG.displayHeight = 600
    this.menuGroup.add(menuBG)
    var menuButton = this.add.image(game.config.width / 2, game.config.height - 40, "menu").setInteractive().setDepth(3);
    menuButton.on('pointerdown', this.toggleMenu, this)
    menuButton.setOrigin(0.5);
    this.menuGroup.add(menuButton);
    var homeButton = this.add.bitmapText(game.config.width / 2, game.config.height + 50, 'topaz', 'HOME', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    homeButton.on('pointerdown', function () {
      this.scene.stop()
      this.scene.stop('playGame')
      this.scene.start('startGame')

    }, this)
    this.menuGroup.add(homeButton);
    var wordButton = this.add.bitmapText(game.config.width / 2, game.config.height + 140, 'topaz', 'WORDS', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    wordButton.on('pointerdown', function () {
      var data = {
        yesWords: this.foundWords,
        noWords: this.notWords
      }
      this.scene.pause()
      //this.scene.launch('wordsPlayed', data)
    }, this)
    this.menuGroup.add(wordButton);
    var helpButton = this.add.bitmapText(game.config.width / 2, game.config.height + 230, 'topaz', 'RESTART', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    helpButton.on('pointerdown', function () {
      this.scene.stop()
      this.scene.stop('playGame')

      this.scene.start('playGame')
      this.scene.launch('UI')
    }, this)
    this.menuGroup.add(helpButton);
    //var thankYou = game.add.button(game.config.width / 2, game.config.height + 130, "thankyou", function(){});
    // thankYou.setOrigin(0.5);
    // menuGroup.add(thankYou);    
    ////////end menu
  }

}
