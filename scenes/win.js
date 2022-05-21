class winGame extends Phaser.Scene {
  constructor() {
    super("winGame");
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

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'SUCCESS', 150).setOrigin(.5).setTint(0xc76210);

    var startTime = this.add.bitmapText(game.config.width / 2, 275, 'topaz', 'Play', 50).setOrigin(.5).setTint(0xfafafa);
    startTime.setInteractive();
    startTime.on('pointerdown', this.clickHandler, this);



  }
  clickHandler() {
    this.scene.stop()
    this.scene.stop('playGame')
    this.scene.stop('UI')
    this.scene.start('startGame');

  }

}