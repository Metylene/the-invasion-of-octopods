class MissileBehavior extends Sup.Behavior {
  
  vSpeed : number = -0.25;
  size : number = 0.6;
  
  position : Sup.Math.Vector2;
  
  awake(){
    new Sup.SpriteRenderer(this.actor, "Ennemies/Missile/Sprite");
    this.actor.spriteRenderer.setVerticalFlip(true);
  }
  
  start(){
    Game.missiles.push(this);
    this.position = this.actor.getLocalPosition().toVector2();
  }
  
  onDestroy(){
    Game.missiles.splice(Game.missiles.indexOf(this), 1);
  }

  update() {
    this.position = this.actor.getLocalPosition().toVector2();
    
    this.actor.moveLocalY(this.vSpeed);
    if(this.actor.getLocalPosition().y < Game.bounds.height/2 * -1 -1){
      this.actor.destroy();
    }
  }
  
  explode(){
    let hitActor = new Sup.Actor("Hit", null);
    new Sup.SpriteRenderer(hitActor, "Effects/Hit");
    hitActor.spriteRenderer.setColor(0, Sup.Math.Random.float(0.6, 0.8), 1);
    hitActor.addBehavior(ExplosionBehavior);
    hitActor.setLocalPosition(this.actor.getLocalPosition());
    this.actor.destroy();
  }
  
  
}
Sup.registerBehavior(MissileBehavior);
