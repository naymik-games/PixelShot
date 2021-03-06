class Target extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, dis, scale, sway, canShoot, multi, double) {
    super(scene, x, y, texture);
    // ...
    this.x = x
    this.y = y
    this.scene = scene
    this.distance = dis

    this.strength = 0
    this.saveScale = scale
    this.setScale(scale)
    this.setTint(0xff0000)
    this.setDepth(1.5)
    this.shootTimes = [8000, 10000, 12000, 15000, 20000]
    this.swaySpeed = [2250, 3000, 3500, 3750, 4000]
    scene.add.existing(this);
    scene.targets.push(this)
    //console.log(this.scale)
    if (canShoot) {
      this.setShoot()

    }
    if (sway) {
      this.setSway()
    }
    if (multi) {
      this.multi = true
    }
    if (double) {
      this.double = true
      this.setTint(0xD319C5)
      this.strength = 1
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
      x: this.x + 35,
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