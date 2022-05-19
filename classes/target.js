class Target extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, dis, scale, sway) {
    super(scene, x, y, texture);
    // ...
    this.distance = dis
    this.setScale(scale)
    this.setTint(0xff0000)
    this.setDepth(7)
    scene.add.existing(this);
    scene.targets.push(this)
    if (sway) {
      var tween = scene.tweens.add({
        targets: this,
        x: '+= 8',
        duration: 2500,
        yoyo: true,
        loop: -1
      })
    }

  }
  // ...

  // preUpdate(time, delta) {}
}