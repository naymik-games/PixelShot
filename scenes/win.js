class winGame extends Phaser.Scene {
  constructor() {
    super("winGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  init(data) {
    console.log('init', data);
    this.score = data.score
    this.hits = data.hits
    this.shots = data.shots

  }
  create() {



    gameData = JSON.parse(localStorage.getItem('PSdata'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('PSdata', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }

    this.cameras.main.setBackgroundColor(0x000000);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'SUCCESS', 150).setOrigin(.5).setTint(0xc76210);

    var startTime = this.add.bitmapText(game.config.width / 2, 275, 'topaz', 'Main Menu', 50).setOrigin(.5).setTint(0xfafafa);
    startTime.setInteractive();
    startTime.on('pointerdown', this.clickHandler, this);

    var score = this.add.bitmapText(game.config.width / 2 - 10, 475, 'topaz', 'Score:', 50).setOrigin(1, .5).setTint(0xfafafa);
    var score2 = this.add.bitmapText(game.config.width / 2 + 10, 475, 'topaz', this.score, 50).setOrigin(0, .5).setTint(0xfafafa);
    var per = Math.floor((this.hits / this.shots) * 100)
    var text = this.hits + '/' + this.shots + ' ' + per + '%'
    var accuracy = this.add.bitmapText(game.config.width / 2 - 10, 575, 'topaz', 'Accuracy:', 50).setOrigin(1, .5).setTint(0xfafafa);
    var accuracy2 = this.add.bitmapText(game.config.width / 2 + 10, 575, 'topaz', text, 50).setOrigin(0, .5).setTint(0xfafafa);

    var tscore = this.add.bitmapText(game.config.width / 2 - 10, 675, 'topaz', 'Total Score:', 50).setOrigin(1, .5).setTint(0xfafafa);

    var tscorenum = Math.floor(this.score * (this.hits / this.shots))
    var tscore2 = this.add.bitmapText(game.config.width / 2 + 10, 675, 'topaz', tscorenum, 50).setOrigin(0, .5).setTint(0xfafafa);
    var tscoreObj = tscore2.getTextBounds(true)
    // console.log(tscoreObj)
    var newText = this.add.bitmapText(game.config.width / 2 + (tscoreObj.global.width + 20), 675, 'topaz', 'NEW', 50).setOrigin(0, .5).setTint(0xff0000).setAlpha(0);

    if (gameMode == 'practice') {
      if (tscorenum > gameData.practiceHighScore) {
        newText.setAlpha(1)
        gameData.practiceHighScore = tscorenum
        gameData.practiceMostTargets = this.hits
        localStorage.setItem('PSdata', JSON.stringify(gameData));
      }

    }
  }
  clickHandler() {
    this.scene.stop()
    this.scene.stop('playGame')
    this.scene.stop('UI')
    this.scene.start('startGame');

  }

}