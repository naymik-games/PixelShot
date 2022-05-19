class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {
    /*
      gameSettings = JSON.parse(localStorage.getItem('SDsave'));
      if (gameSettings === null || gameSettings.length <= 0) {
        localStorage.setItem('SDsave', JSON.stringify(defaultValues));
        gameSettings = defaultValues;
      }
    */
    this.cameras.main.setBackgroundColor(0x000000);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelShot', 150).setOrigin(.5).setTint(0xc76210);

    var startTime = this.add.bitmapText(game.config.width / 2, 275, 'topaz', 'Play', 50).setOrigin(.5).setTint(0xfafafa);
    startTime.setInteractive();
    startTime.on('pointerdown', this.clickHandler, this);
    var startTime = this.add.bitmapText(game.config.width / 2, 1075, 'topaz', 'Easy Mode', 50).setOrigin(.5).setTint(0xfafafa);
    var easySwitch = this.add.image(game.config.width / 2, 1175, 'switch', (easy) ? 1 : 0).setInteractive()
    easySwitch.on('pointerdown', function () {
      if (easy) {
        easy = false
        easySwitch.setFrame(0)
      } else {
        easy = true
        easySwitch.setFrame(1)
      }
    }, this)

  }
  clickHandler() {

    this.scene.start('playGame');
    this.scene.launch('UI');
  }

}