class Extra extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture, frame, dis, scale, sway, type) {
    super(scene, x, y, texture, frame);
    // ...
    this.x = x
    this.y = y
    this.scene = scene
    this.distance = dis
    this.details = extraObjects[type]
    this.setScale(scale)
    this.setTint(0x0000ff)
    this.setDepth(3)

    scene.add.existing(this);
    scene.extras.push(this)
    if (this.details.type == 'objective') {
      scene.objectiveCount++
    }
    var tween1 = scene.tweens.add({
      targets: this,
      alpha: .1,
      duration: 500,
      yoyo: true,
      loop: -1
    })

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