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
    this.hitsTarget = data.hits
    this.shots = data.shots
    this.hitsExtra = data.hitsExtra

  }
  create() {

    this.hits = this.hitsTarget + this.hitsExtra

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
      if (gameData.easy) {
        var scoreData = gameData.practice[gameData.onPractice]
      } else {
        var scoreData = gameData.practiceHard[gameData.onPractice]
      }
      if (tscorenum > scoreData.highScore) {
        newText.setAlpha(1)
        if (gameData.easy) {
          gameData.practice[gameData.onPractice].highScore = tscorenum
          gameData.practice[gameData.onPractice].numTargets = this.hits
          gameData.practice[gameData.onPractice].easy = gameData.easy
        } else {
          gameData.practiceHard[gameData.onPractice].highScore = tscorenum
          gameData.practiceHard[gameData.onPractice].numTargets = this.hits
          gameData.practiceHard[gameData.onPractice].easy = gameData.easy
        }

        localStorage.setItem('PSdata', JSON.stringify(gameData));
      }

    } else {
      if (gameData.easy) {
        gameData.missions[onMission].completeEasy = true
        if (tscorenum > gameData.missions[onMission].scoreEasy) {
          gameData.missions[onMission].scoreEasy = tscorenum
        }
      } else {
        gameData.missions[onMission].completeHard = true
        if (tscorenum > gameData.missions[onMission].scoreHard) {
          gameData.missions[onMission].scoreHard = tscorenum
        }
      }
      localStorage.setItem('PSdata', JSON.stringify(gameData));
    }
  }
  clickHandler() {
    this.scene.stop()
    this.scene.stop('playGame')
    this.scene.stop('UI')
    this.scene.start('startGame');

  }

}