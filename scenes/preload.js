class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {


    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    }




    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
    this.load.spritesheet("menu_icons", "assets/sprites/icons.png", {
      frameWidth: 96,
      frameHeight: 96
    });
    this.load.spritesheet("gems", "assets/sprites/gems.png", {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });
    this.load.spritesheet("rover", "assets/sprites/rover.png", {
      frameWidth: 100,
      frameHeight: 100
    });

    this.load.image('blank', 'assets/sprites/blank.png');
    this.load.image('target', 'assets/sprites/target.png');
    this.load.image('spot', 'assets/sprites/spot.png');
    this.load.image('bullet', 'assets/sprites/bullet.png');
    this.load.image('crosshair', 'assets/sprites/crosshair.png');
    this.load.image('target_help', 'assets/sprites/target_help.png');
    this.load.image('background', 'assets/sprites/background.png');
    this.load.image('middle-back', 'assets/sprites/middle-back.png');
    this.load.image('middle-front', 'assets/sprites/middle-front.png');
    this.load.image('foreground', 'assets/sprites/forground.png');
    this.load.image('frontground', 'assets/sprites/frontground.png');

    this.load.image('map2_01', 'assets/sprites/map2_01.png');
    this.load.image('map2_02', 'assets/sprites/map2_02.png');
    this.load.image('map2_03', 'assets/sprites/map2_03.png');
    this.load.image('map2_04', 'assets/sprites/map2_04.png');
    this.load.image('map2_05', 'assets/sprites/map2_05.png');
    this.load.image('map2_06', 'assets/sprites/map2_06.png');


    this.load.spritesheet("scope", "assets/sprites/scope5.png", {
      frameWidth: 900,
      frameHeight: 1640
    });
  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








