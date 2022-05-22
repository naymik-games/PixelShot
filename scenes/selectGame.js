class selectGame extends Phaser.Scene {
  constructor() {
    super("selectGame");
  }
  preload() {


  }
  create() {
    this.cameras.main.setBackgroundColor(0xf7eac6);

    this.input.on('gameobjectup', this.clickHandler, this);
    // this.input.on('poimterdown', this.down,this);
    // this.input.on('pointermove', this.move,this);
    //this.input.on('pointerup', this.up,this);

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





}