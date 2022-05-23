class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
    this.cameras.main.setBackgroundColor(0x000000);

    // this.input.on('gameobjectup', this.clickHandler, this);
    this.currentGroup = onMap
    // this.input.on('poimterdown', this.down,this);
    // this.input.on('pointermove', this.move,this);
    //this.input.on('pointerup', this.up,this);
    this.showGroup(this.currentGroup, 'left')
    this.input.on('pointerup', this.endSwipe, this);
  }

  down(e) {

  }
  move(e) {
    // console.log(e.downX - e.x)
    if ((e.downX - e.x) > 55 || (e.downX - e.x) > -55) {
      this.swipe = true;

    }
  }
  up(e) {
    if (e.downX < e.x) {
      console.log('right')
    } else {
      console.log('left')
    }
  }

  endSwipe(e, obj) {
    var swipeTime = e.upTime - e.downTime;
    var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
    var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
    var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
    if (swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
      this.swipe = true
      if (swipeNormal.x > 0.8) {
        console.log('right')
        //this.handleMove(0, 1, );
        this.preGroup('right')
      }
      if (swipeNormal.x < -0.8) {
        console.log('left')
        this.nextGroup('left')

      }
      if (swipeNormal.y > 0.8) {

        //this.handleMove(1, 0);
      }
      if (swipeNormal.y < -0.8) {

        //this.handleMove(-1, 0);
      }
    } else {

      this.swipe = false

    }
  }

  showGroup(groupNum, dir) {
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(2);
    var tempGroup = groupNum + 1;
    var groupTitle = this.add.bitmapText(game.config.width / 2, 150, 'topaz', maps[groupNum].name, 100).setTint(0xff8045).setOrigin(.5).setMaxWidth(800);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1550, 'topaz', tempGroup + '/' + maps.length, 60).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);

    var thumb = this.add.image(game.config.width / 2, 250, maps[groupNum].thumb).setScale(2).setOrigin(.5, 0)
    groupBox.add(thumb)
    for (var i = 0; i < maps[groupNum].missions.length; i++) {
      var missionIndex = maps[groupNum].missions[i]
      var missionTitle = this.add.bitmapText(50, 750 + i * 275, 'topaz', missions[missionIndex].mission, 60).setTint(0xff8045).setOrigin(0, .5).setMaxWidth(800).setInteractive();
      missionTitle.level = missionIndex
      missionTitle.on('pointerup', this.selectLevel.bind(this, missionTitle));
      groupBox.add(missionTitle);
      var missionText = this.add.bitmapText(50, missionTitle.y + 85, 'topaz', missions[missionIndex].text, 40).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
      groupBox.add(missionText);
      var targetText = this.add.bitmapText(50, missionText.y + 85, 'topaz', 'Targets: ' + missions[missionIndex].targetData.length, 40).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
      groupBox.add(targetText);
    }
    //console.log(gameSettings.highestSolved)
    /* for (var i = 0; i < maps[groupNum].puzzleCount; i++) {7
      var tempLevel = groups[groupNum].levelStart + i
      var levelBack = this.add.image(game.config.width / 2, 300 + i * 250, 'blank')
      levelBack.displayWidth = 800
      levelBack.displayHeight = 100
      groupBox.add(levelBack);
      var levelTitle = this.add.bitmapText(150, 300 + i * 250, 'lato', (tempLevel + 1) + ' - ' + levels[tempLevel].theme, 70).setTint(0x000000).setOrigin(0, .5).setInteractive();
      if (levels[tempLevel].key in gameSettings.results) {

      } else {
        gameSettings.results[levels[tempLevel].key] = { best: 0, stars: 0 }
      }
      console.log(gameSettings.results[levels[onLevel].key].best)
      if (levels[tempLevel].level < gameSettings.highestSolved) {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', gameSettings.results[levels[tempLevel].key].stars, 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      } else if (levels[tempLevel].level == gameSettings.highestSolved) {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', gameSettings.results[levels[tempLevel].key].stars, 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      } else if (levels[tempLevel].level == gameSettings.highestSolved + 1) {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', 'Not Solved', 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        levelTitle.on('pointerup', this.selectLevel.bind(this, levelTitle));
      } else {
        var status = this.add.bitmapText(game.config.width / 2, levelTitle.y + 100, 'lato', 'Locked', 70).setTint(0xffffff).setOrigin(.5).setInteractive();
        var lock = this.add.image(levelTitle.x - 45, levelTitle.y, 'lock').setScale(1.5).setDepth(5).setAlpha(1)
        groupBox.add(lock)
        groupBox.bringToTop(lock)
      }

      levelTitle.level = tempLevel

      groupBox.add(levelTitle);
      groupBox.add(status)

    }
    this.saveSettings() */

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
        this.showGroup(num, dir);
      }
    });

  }
  nextGroup(dir) {
    if (this.currentGroup < maps.length - 1) {
      this.currentGroup++;
    } else {
      this.currentGroup = 0
    }
    this.hideGroup(this.currentGroup, dir);
  }
  preGroup(dir) {
    if (this.currentGroup > 0) {
      this.currentGroup--;
    } else {
      this.currentGroup = maps.length - 1
    }
    this.hideGroup(this.currentGroup, dir);
  }
  selectLevel(t) {
    if (this.swipe) { return }
    //console.log(t.level)
    onMission = t.level
    onMap = this.currentGroup
    this.scene.start('playGame');
    this.scene.launch('UI');
  }



}