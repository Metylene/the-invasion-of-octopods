class ShipPropulsorBehavior extends Sup.Behavior {
  
  spriteRenderer : Sup.SpriteRenderer;
  
  positionOffset : Sup.Math.Vector2 = new Sup.Math.Vector2(0.41, -1.1);
  
  awake() {
    this.spriteRenderer =  new Sup.SpriteRenderer(this.actor, "Effects/Ship propulsor");
    this.spriteRenderer.setVerticalFlip(true);
    this.spriteRenderer.setAnimation("Animation", false);
    this.spriteRenderer.setColor(0.1, 0.6, 0.8);
    this.actor.setLocalScale(0.8, 0.8, 1);
    
    this.actor.setLocalZ(-0.1);
    
    if(this.actor.getName() === "Left" ) {
      this.positionOffset.x *= -1;
      this.actor.rotateEulerZ(0.1);
    } else {
      this.actor.rotateEulerZ(-0.1);
    }
    
    this.actor.setLocalPosition(Game.ship.position.clone().add(this.positionOffset));
    
    this.spriteRenderer.setOpacity(0.9);
    let tween = new Sup.Tween(this.actor, { opacity: 0.9 })
      .to({ opacity: 0 }, 200).easing(TWEEN.Easing.Cubic.In)
      .onUpdate((object) => { this.spriteRenderer.setOpacity(object.opacity); });
    tween.start();
  }

  update() {
    let frameIndex = this.spriteRenderer.getAnimationFrameIndex();

    if (frameIndex < 2){
      this.actor.setLocalPosition(Game.ship.position.clone().add(this.positionOffset));      
    }
    
    if(!this.spriteRenderer.isAnimationPlaying()){
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(ShipPropulsorBehavior);
