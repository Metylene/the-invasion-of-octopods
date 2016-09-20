class ExplosionBehavior extends Sup.Behavior {
  
  awake() {
    this.actor.rotateEulerAngles(0, 0, Sup.Math.Random.integer(1, 360));
    this.actor.spriteRenderer.setOpacity(0.9);
    let sprite = this.actor.spriteRenderer.getSprite();
    this.actor.spriteRenderer.setAnimation(sprite.getAnimationList()[0], false);
  }
  
  update() {
    let opacity = this.actor.spriteRenderer.getOpacity();
    if(opacity > 0){
      this.actor.spriteRenderer.setOpacity(opacity - 0.02);
    } else {
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(ExplosionBehavior);
