class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {



    gameData = JSON.parse(localStorage.getItem('PSdata'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('PSdata', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }
    if (gameData.practice.length < practices.length) {
      for (var i = 0; i < practices.length - gameData.practice.length; i++) {
        var temp = {
          highScore: 0,
          numTargets: 0,
          easy: true
        }
        gameData.practice.push(temp)
      }
      for (var i = 0; i < practices.length - gameData.practiceHard.length; i++) {
        var temp = {
          highScore: 0,
          numTargets: 0,
          easy: true
        }
        gameData.practiceHard.push(temp)
      }
    }
    if (gameData.missions.length < missions.length) {
      for (var i = 0; i < missions.length - gameData.missions.length; i++) {
        var temp = {
          id: 0,
          scoreEasy: 0,
          scoreHard: 0,
          completeEasy: false,
          completeHard: false
        }
        gameData.missions.push(temp)
      }
    }
    this.cameras.main.setBackgroundColor(0x000000);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelShot', 150).setOrigin(.5).setTint(0xc76210);

    var startTime = this.add.bitmapText(game.config.width / 2, 275, 'topaz', 'Mission', 65).setOrigin(.5).setTint(0x00ff00);
    startTime.setInteractive();
    startTime.on('pointerdown', this.clickHandler, this);


    this.practiceOffset = 575
    var startPractice = this.add.bitmapText(game.config.width / 2, this.practiceOffset, 'topaz', 'Practice', 65).setOrigin(.5).setTint(0x00ff00);
    //startPractice.setInteractive();


    this.prePractice = this.add.image(25, this.practiceOffset + 150, 'icons_pixel', 1).setInteractive().setOrigin(0)
    this.prePractice.on('pointerdown', function () {
      this.preGroup('right')
    }, this)
    this.nextPractice = this.add.image(875, this.practiceOffset + 150, 'icons_pixel', 2).setInteractive().setOrigin(1, 0)
    this.nextPractice.on('pointerdown', function () {
      this.nextGroup('left')
    }, this)
    this.showPractice(gameData.onPractice, 'left')



    var startTime = this.add.bitmapText(game.config.width / 2, 1375, 'topaz', 'Easy Mode', 50).setOrigin(.5).setTint(0xfafafa);
    var easySwitch = this.add.image(game.config.width / 2, 1475, 'switch', (gameData.easy) ? 1 : 0).setInteractive()
    easySwitch.on('pointerdown', function () {
      if (gameData.easy) {
        gameData.easy = false
        easySwitch.setFrame(0)
      } else {
        gameData.easy = true
        easySwitch.setFrame(1)
      }
      localStorage.setItem('PSdata', JSON.stringify(gameData));
    }, this)

  }
  showPractice(num, dir) {

    if (gameData.easy) {
      var scoreData = gameData.practice[num]
    } else {
      var scoreData = gameData.practiceHard[num]
    }
    var groupBox = this.add.container().setDepth(2);
    var practiceThumb = this.add.image(game.config.width / 2, this.practiceOffset + 150, practices[num].thumb).setOrigin(.5, 0)
    var practiceName = this.add.bitmapText(practiceThumb.x - practiceThumb.displayWidth / 2, this.practiceOffset + 100, 'topaz', practices[num].map, 40).setOrigin(0, .5).setTint(0xc76210);

    var startInfo = practiceThumb.y + practiceThumb.displayHeight
    var highScore = this.add.bitmapText(game.config.width / 2, startInfo + 35, 'topaz', 'Best Score:', 40).setOrigin(1, .5).setTint(0xfafafa);
    var highScore2 = this.add.bitmapText(game.config.width / 2 + 20, startInfo + 35, 'topaz', scoreData.highScore, 40).setOrigin(0, .5).setTint(0xfafafa);
    var highTarget = this.add.bitmapText(game.config.width / 2, startInfo + 100, 'topaz', 'Most Targets:', 40).setOrigin(1, .5).setTint(0xfafafa);
    var highTarget2 = this.add.bitmapText(game.config.width / 2 + 20, startInfo + 100, 'topaz', scoreData.numTargets, 40).setOrigin(0, .5).setTint(0xfafafa);

    var easy = this.add.bitmapText(game.config.width / 2, startInfo + 165, 'topaz', 'Easy:', 40).setOrigin(1, .5).setTint(0xfafafa);
    if (scoreData.easy) {
      var eas = 'Yes'
    } else {
      var eas = 'No'
    }
    var easy2 = this.add.bitmapText(game.config.width / 2 + 20, startInfo + 165, 'topaz', eas, 40).setOrigin(0, .5).setTint(0xfafafa);

    var playPractice = this.add.image(game.config.width / 2, startInfo + 200, 'icons_pixel', 0).setOrigin(.5, 0).setTint(0xff0000).setInteractive()
    playPractice.on('pointerdown', this.clickHandler2, this);
    groupBox.add(easy)
    groupBox.add(easy2)
    groupBox.add(practiceName)
    groupBox.add(practiceThumb)
    groupBox.add(highScore)
    groupBox.add(highScore2)
    groupBox.add(highTarget)
    groupBox.add(highTarget2)
    groupBox.add(playPractice)
    gameData.onPractice = num
    localStorage.setItem('PSdata', JSON.stringify(gameData));
    if (dir == 'left') {
      var xstart = 850
    } else {
      var xstart = -850
    }
    groupBox.setPosition(xstart, 0);
    this.groupBox = groupBox;
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      x: 0,
      duration: 500,

      //delay: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {

      }
    });
  }
  hideGroup(num, dir) {
    if (dir == 'left') {
      var xmove = -850
    } else {
      var xmove = 850
    }
    this.tweens.add({
      targets: this.groupBox,
      //alpha: .5,
      //  x: game.config.width,
      x: xmove,
      duration: 500,
      //  yoyo: true,
      callbackScope: this,
      onComplete: function () {
        this.groupBox.destroy(true);
        this.showPractice(num, dir);
      }
    });

  }
  nextGroup(dir) {
    if (gameData.onPractice < practices.length - 1) {
      var next = gameData.onPractice + 1
    } else {
      var next = 0
    }
    this.hideGroup(next, dir);
  }
  preGroup(dir) {
    if (gameData.onPractice > 0) {
      var pre = gameData.onPractice - 1
    } else {
      var pre = practices.length - 1
    }
    this.hideGroup(pre, dir);
  }

  clickHandler() {
    gameMode = 'map'
    this.scene.start('selectGame')
    //this.scene.start('playGame');
    // this.scene.launch('UI');
  }
  clickHandler2() {
    gameMode = 'practice'
    onPractice = gameData.onPractice
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
}