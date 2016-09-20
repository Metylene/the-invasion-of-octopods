class LaserBehavior extends Sup.Behavior {
  
  vSpeed : number = 0.4;
  hSpeed : number = 0;
  size : number = 0.6;
  
  position : Sup.Math.Vector2;
  
  awake(){
    new Sup.SpriteRenderer(this.actor, "Ship/Laser/Sprite");
  }
  
  start(){
    Game.lasers.push(this);
    this.position = this.actor.getLocalPosition().toVector2();
  }

  update() {
    this.position = this.actor.getLocalPosition().toVector2();
    
    this.actor.moveLocal(this.hSpeed, this.vSpeed);
    if(this.actor.getLocalPosition().y > Game.bounds.height /2 + 1 ){
      this.actor.destroy();
    }
  }
  
  explode(){
    let hitActor = new Sup.Actor("Hit", null);
    new Sup.SpriteRenderer(hitActor, "Effects/Hit");
    hitActor.spriteRenderer.setColor(Sup.Math.Random.float(0.6, 1), Sup.Math.Random.float(0.2, 0.6), Sup.Math.Random.float(0, 0.2));
    hitActor.addBehavior(ExplosionBehavior);
    hitActor.setLocalPosition(this.actor.getLocalPosition());
    this.actor.destroy();
  }
  
  onDestroy(){
    Game.lasers.splice(Game.lasers.indexOf(this), 1);
  }
}
Sup.registerBehavior(LaserBehavior);
