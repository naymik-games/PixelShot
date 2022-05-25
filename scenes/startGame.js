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

    this.cameras.main.setBackgroundColor(0x000000);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelShot', 150).setOrigin(.5).setTint(0xc76210);

    var startPractice = this.add.bitmapText(game.config.width / 2, 475, 'topaz', 'Practice', 50).setOrigin(.5).setTint(0xfafafa);
    startPractice.setInteractive();
    startPractice.on('pointerdown', this.clickHandler2, this);
    var highScore = this.add.bitmapText(game.config.width / 2 - 10, 575, 'topaz', 'Best Score:', 40).setOrigin(1, .5).setTint(0xfafafa);
    var highScore2 = this.add.bitmapText(game.config.width / 2 + 10, 575, 'topaz', gameData.practiceHighScore, 40).setOrigin(0, .5).setTint(0xfafafa);
    var highTarget = this.add.bitmapText(game.config.width / 2 - 10, 675, 'topaz', 'Most Targets:', 40).setOrigin(1, .5).setTint(0xfafafa);
    var highTarget2 = this.add.bitmapText(game.config.width / 2 + 10, 675, 'topaz', gameData.practiceMostTargets, 40).setOrigin(0, .5).setTint(0xfafafa);


    var startTime = this.add.bitmapText(game.config.width / 2, 275, 'topaz', 'Play', 50).setOrigin(.5).setTint(0xfafafa);
    startTime.setInteractive();
    startTime.on('pointerdown', this.clickHandler, this);

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