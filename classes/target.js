class Target extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, dis, scale, sway, canShoot) {
    super(scene, x, y, texture);
    // ...
    this.x = x
    this.y = y
    this.scene = scene
    this.distance = dis


    this.setScale(scale)
    this.setTint(0xff0000)
    this.setDepth(1.5)
    this.shootTimes = [8000, 10000, 12000, 15000, 20000]
    this.swaySpeed = [2250, 3000, 3250, 3500]
    scene.add.existing(this);
    scene.targets.push(this)
    if (canShoot) {
      this.setShoot()

    }
    if (sway) {
      this.setSway()
    }

  }
  setShoot() {
    this.canShoot = true
    var delay = Phaser.Math.RND.pick(this.shootTimes)
    this.shootTimer = this.scene.time.addEvent({ delay: delay, callback: this.shoot, callbackScope: this, loop: true });

  }
  setSway() {
    this.canSway = true
    var speed = Phaser.Math.RND.pick(this.swaySpeed)
    this.swayTween = this.scene.tweens.add({
      targets: this,
      x: '+= 8',
      duration: speed,
      yoyo: true,
      loop: -1
    })
  }
  // ...

  // preUpdate(time, delta) {}
  shoot() {
    //
    this.scene.explode(this.x, this.y)
    this.scene.shootPlayer(this.x, this.y)
    var tween = this.scene.tweens.add({
      targets: this,
      scale: 9,
      duration: 50,
      yoyo: true,

    })
  }
  remove() {

  }
}