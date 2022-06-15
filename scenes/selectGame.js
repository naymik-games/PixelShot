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
    console.log(missions.length)
    console.log(Math.ceil(missions.length / 4))
    this.currentPage = 0
    console.log(missions.length)
    console.log(Math.ceil(missions.length / 4))
    console.log(this.currentPage)
    this.totalPages = Math.ceil(missions.length / 4)
    this.showGroup(this.currentGroup, 0, 'left')
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

  showGroup(groupNum, start, dir) {
    console.log('current page: ' + this.currentPage)
    console.log(start)
    if (this.groupBox) {
      //  this.groupBox.destroy(true);
      //this.hideGroup();
    }
    var groupBox = this.add.container().setDepth(2);
    var tempPage = this.currentPage + 1;
    // var groupTitle = this.add.bitmapText(game.config.width / 2, 75, 'topaz', maps[groupNum].name, 100).setTint(0xff8045).setOrigin(.5).setMaxWidth(800);
    //groupBox.add(groupTitle);
    var groupText = this.add.bitmapText(game.config.width / 2, 1550, 'topaz', tempPage + '/' + this.totalPages, 60).setTint(0xff8045).setOrigin(.5).setMaxWidth(500);
    groupBox.add(groupText);

    //var thumb = this.add.image(game.config.width / 2, 175, maps[groupNum].thumb).setScale(.5).setOrigin(.5, 0)
    // groupBox.add(thumb)
    var startInfo = 100
    var count = 0
    for (var i = start; i < start + 4; i++) {
      var missionBack = this.add.image(0, (startInfo - 50) + count * 375, 'file').setOrigin(0)
      // missionBack.displayWidth = 900
      //missionBack.displayHeight = 350
      groupBox.add(missionBack)
      var missionIndex = i
      if (missionIndex < missions.length) {
        var text = missions[missionIndex].mission
        var tempMission = missionIndex + 1
        var missionTitle = this.add.bitmapText(50, startInfo + count * 375, 'topaz', tempMission + ' ' + text.toUpperCase(), 45).setTint(0x000000).setOrigin(0, .5).setMaxWidth(800).setInteractive();
        missionTitle.level = missionIndex
        missionTitle.map = missions[missionIndex].mapID
        missionTitle.on('pointerup', this.selectLevel.bind(this, missionTitle));
        groupBox.add(missionTitle);
        /* var missionText = this.add.bitmapText(50, missionTitle.y + 85, 'topaz', missions[missionIndex].text, 40).setTint(0xcccccc).setOrigin(0, .5).setMaxWidth(800);
        groupBox.add(missionText); */
        if (missions[missionIndex].targetData == null) {
          var tc = missions[missionIndex].targetGoal
        } else {
          var tc = missions[missionIndex].targetData.length
        }
        var targetText = this.add.bitmapText(40, missionTitle.y + 85, 'topaz', 'Targets: ' + tc, 35).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
        groupBox.add(targetText);
        var objectiveText = this.add.bitmapText(550, missionTitle.y + 85, 'topaz', 'Objectives: ' + missions[missionIndex].objectives.length, 35).setTint(0xfafafa).setOrigin(1, .5).setMaxWidth(800);
        groupBox.add(objectiveText);

        var timeText = this.add.bitmapText(40, targetText.y + 75, 'topaz', 'Time: ' + this.formatTime(missions[missionIndex].time), 35).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
        groupBox.add(timeText);

        var mapText = this.add.bitmapText(250, targetText.y + 75, 'topaz', 'Location: ' + missions[missionIndex].map, 35).setTint(0xfafafa).setOrigin(0, .5).setMaxWidth(800);
        groupBox.add(mapText);





        if (gameData.easy) {
          if (gameData.missions[missionIndex].completeEasy) {
            var completeText = this.add.bitmapText(40, mapText.y + 75, 'topaz', 'Score: ' + gameData.missions[missionIndex].scoreEasy, 35).setTint(0x00ff00).setOrigin(0, .5).setMaxWidth(800);
            groupBox.add(completeText);
          } else {
            var completeText = this.add.bitmapText(40, mapText.y + 75, 'topaz', 'Not Completed', 35).setTint(0xff0000).setOrigin(0, .5).setMaxWidth(800);
            groupBox.add(completeText);
          }

        } else {

          if (gameData.missions[missionIndex].completeHard) {
            var completeText = this.add.bitmapText(40, mapText.y + 75, 'topaz', 'Score: ' + gameData.missions[missionIndex].scoreHard, 35).setTint(0x00ff00).setOrigin(0, .5).setMaxWidth(800);
            groupBox.add(completeText);
          } else {
            var completeText = this.add.bitmapText(40, mapText.y + 75, 'topaz', 'Not Completed', 35).setTint(0xff0000).setOrigin(0, .5).setMaxWidth(800);
            groupBox.add(completeText);
          }

        }

        var thumb = this.add.image(game.config.width - 25, missionTitle.y + 75, maps[missions[missionIndex].mapID].thumb).setScale(.6).setOrigin(1, 0)
        groupBox.add(thumb)
        count++

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
        this.showGroup(num, this.currentPage * 4, dir);
      }
    });

  }
  nextGroup(dir) {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    } else {
      this.currentPage = 0
    }
    this.hideGroup(this.currentGroup, dir);
  }
  preGroup(dir) {
    if (this.currentPage > 0) {
      this.currentPage--;
    } else {
      this.currentPage = this.totalPages - 1
    }
    this.hideGroup(this.currentGroup, dir);
  }
  selectLevel(t) {
    if (this.swipe) { return }
    //console.log(t.level)
    onMission = t.level
    onMap = t.map
    this.scene.start('playGame');
    this.scene.launch('UI');
  }

  formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
  }

}