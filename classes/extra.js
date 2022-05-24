class Extra extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, dis, scale, sway, type) {
    super(scene, x, y, texture, frame);
    // ...
    this.x = x
    this.y = y
    this.scene = scene
    this.distance = dis

    this.setScale(scale)
    //this.setTint(0xff0000)
    this.setDepth(7)

    scene.add.existing(this);
    scene.extras.push(this)

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

  remove() {

  }
}