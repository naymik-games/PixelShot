class Target extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, dis, scale, sway, canShoot) {
    super(scene, x, y, texture);
    // ...
    this.x = x
    this.y = y
    this.scene = scene
    this.distance = dis
    this.canShoot = canShoot
    this.setScale(scale)
    this.setTint(0xff0000)
    this.setDepth(7)
    this.shootTimes = [8000, 10000, 12000, 15000, 20000]
    scene.add.existing(this);
    scene.targets.push(this)
    if (canShoot) {
      this.setShoot()

    }
    if (sway) {
      var tween = scene.tweens.add({
        targets: this,
        x: '+= 8',
        duration: 3000,
        yoyo: true,
        loop: -1
      })
    }

  }
  setShoot() {
    var delay = Phaser.Math.RND.pick(this.shootTimes)
    this.shootTimer = this.scene.time.addEvent({ delay: delay, callback: this.shoot, callbackScope: this, loop: true });

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