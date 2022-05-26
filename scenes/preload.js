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



    this.load.plugin('rexvirtualjoystickplugin', 'classes/virtualjoystick.js', true);
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
    this.load.image('clip', 'assets/sprites/clip.png');
    this.load.image('menu', 'assets/sprites/menu.png');
    this.load.image('crosshair', 'assets/sprites/crosshair.png');
    this.load.image('target_help', 'assets/sprites/target_help.png');
    this.load.image('vAdjustment', 'assets/sprites/vAdjustment.png');
    this.load.image('hAdjustment', 'assets/sprites/hAdjustment.png');
    this.load.image('practice', 'assets/sprites/practice_map.png');
    this.load.image('fire', 'assets/sprites/fire.png');
    this.load.image('reload', 'assets/sprites/reload.png');
    this.load.image('reset', 'assets/sprites/reset.png');
    this.load.image('jBase', 'assets/sprites/joystick_base_outline.png');
    this.load.image('jTip', 'assets/sprites/joystick_tip_arrows.png');

    this.load.image('map1_full_', 'assets/sprites/map1/map1_full_.png');
    this.load.image('map1_full', 'assets/sprites/map1/map1_full.png');
    this.load.image('map1_thumb', 'assets/sprites/map1/map1_thumb.png');



    this.load.image('map2_full_', 'assets/sprites/map2/map2_full_.png');
    this.load.image('map2_full', 'assets/sprites/map2/map2_full.png');
    this.load.image('map2_thumb', 'assets/sprites/map2/map2_thumb.png');

    this.load.image('map3_00', 'assets/sprites/map3/map3_00.png');
    this.load.image('map3_01', 'assets/sprites/map3/map3_01.png');
    this.load.image('map3_02', 'assets/sprites/map3/map3_02.png');
    this.load.image('map3_03', 'assets/sprites/map3/map3_03.png');
    this.load.image('map3_04', 'assets/sprites/map3/map3_04.png');
    this.load.image('map3_05', 'assets/sprites/map3/map3_05.png');
    this.load.image('map3_06', 'assets/sprites/map3/map3_06.png');
    this.load.image('map3_thumb', 'assets/sprites/map3/map3_thumb.png');

    this.load.image('map4_00', 'assets/sprites/map4/map4_00.png');
    this.load.image('map4_01', 'assets/sprites/map4/map4_01.png');
    this.load.image('map4_02', 'assets/sprites/map4/map4_02.png');
    this.load.image('map4_03', 'assets/sprites/map4/map4_03.png');
    this.load.image('map4_04', 'assets/sprites/map4/map4_04.png');
    this.load.image('map4_05', 'assets/sprites/map4/map4_05.png');
    this.load.image('map4_06', 'assets/sprites/map4/map4_06.png');
    this.load.image('map4_thumb', 'assets/sprites/map4/map4_thumb.png');

    this.load.image('map5_full_', 'assets/sprites/map5/map5_full_.png');
    this.load.image('map5_full', 'assets/sprites/map5/map5_full.png');
    this.load.image('map5_thumb', 'assets/sprites/map5/map5_thumb.png');

    this.load.image('map8_full_', 'assets/sprites/map8/map8_full_.png');
    this.load.image('map8_full', 'assets/sprites/map8/map8_full.png');



    this.load.image('map6_full', 'assets/sprites/map6/map6_full.png');
    this.load.image('map6_thumb', 'assets/sprites/map6/map6_thumb.png');

    this.load.image('map7_full_', 'assets/sprites/map7/map7_full_.png');
    this.load.image('map7_full', 'assets/sprites/map7/map7_full.png');
    this.load.image('map7_thumb', 'assets/sprites/map7/map7_thumb.png');

    this.load.image('map9_full_', 'assets/sprites/map9/map9_full_.png');
    this.load.image('map9_full', 'assets/sprites/map9/map9_full.png');
    this.load.image('map9_thumb', 'assets/sprites/map9/map9_thumb.png');

    this.load.image('map3', 'assets/sprites/map3.png');

    this.load.spritesheet("switch", "assets/sprites/switch.png", {
      frameWidth: 150,
      frameHeight: 75
    });
    this.load.spritesheet("items", "assets/sprites/items2.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 1,
      spacing: 1

    });
    this.load.spritesheet("scope", "assets/sprites/scope5.png", {
      frameWidth: 900,
      frameHeight: 1640
    });
    this.load.spritesheet("burst", "assets/sprites/burst.png", {
      frameWidth: 100,
      frameHeight: 100
    });
  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








