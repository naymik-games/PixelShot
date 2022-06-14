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
    var backText = this.add.bitmapText(50, 1550, 'topaz', 'BACK', 60).setTint(0xff8045).setOrigin(0, .5).setInteractive();
    backText.on('pointerdown', function () {
      this.scene.start('startGame');
    }, this)
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
    var groupTitle = this.add.bitmapText(game.config.width / 2, 75, 'topaz', maps[groupNum].name, 100).setTint(0xff8045).setOrigin(.5).setMaxWidth(800);
    groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1550, 'topaz', tempGroup + '/' + maps.length, 60).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);

    var thumb = this.add.image(game.config.width / 2, 175, maps[groupNum].thumb).setScale(.5).setOrigin(.5, 0)
    groupBox.add(thumb)
    var startInfo = thumb.y + thumb.displayHeight + 50
    for (var i = 0; i < maps[groupNum].missions.length; i++) {
      var missionIndex = maps[groupNum].missions[i]
      var text = missions[missionIndex].mission

      var missionTitle = this.add.bitmapText(50, startInfo + i * 275, 'topaz', text.toUpperCase(), 50).setTint(0xff8045).setOrigin(0, .5).setMaxWidth(800).setInteractive();
      missionTitle.level = missionIndex
      missionTitle.on('pointerup', this.selectLevel.bind(this, missionTitle));
      groupBox.add(missionTitle);
      /* var missionText = this.add.bitmapText(50, missionTitle.y + 85, 'topaz', missions[missionIndex].text, 40).setTint(0xcccccc).setOrigin(0, .5).setMaxWidth(800);
      groupBox.add(missionText); */
      if (missions[missionIndex].targetData == null) {
        var tc = missions[missionIndex].targetGoal
      } else {
        var tc = missions[missionIndex].targetData.length
      }
      var targetText = this.add.bitmapText(50, missionTitle.y + 85, 'topaz', 'Targets: ' + tc, 40).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
      groupBox.add(targetText);
      var objectiveText = this.add.bitmapText(850, missionTitle.y + 85, 'topaz', 'Objectives: ' + missions[missionIndex].objectives.length, 40).setTint(0xfafafa).setOrigin(1, .5).setMaxWidth(800);
      groupBox.add(objectiveText);
      if (gameData.easy) {
        var completeText = this.add.bitmapText(50, targetText.y + 85, 'topaz', 'Complete: ' + gameData.missions[missionIndex].completeEasy, 40).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
        groupBox.add(completeText);
        var scoreText = this.add.bitmapText(850, targetText.y + 85, 'topaz', 'Score: ' + gameData.missions[missionIndex].scoreEasy, 40).setTint(0xfafafa).setOrigin(1, .5).setMaxWidth(800);
        groupBox.add(scoreText);
      } else {
        var completeText = this.add.bitmapText(50, targetText.y + 85, 'topaz', 'Complete: ' + gameData.missions[missionIndex].completeHard, 40).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
        groupBox.add(completeText);
        var scoreText = this.add.bitmapText(850, targetText.y + 85, 'topaz', 'Score: ' + gameData.missions[missionIndex].scoreHard, 40).setTint(0xfafafa).setOrigin(1, .5).setMaxWidth(800);
        groupBox.add(scoreText);
      }

    }



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