class PowerupBehavior extends Sup.Behavior {
  
  position : Sup.Math.Vector2;
  speed : Sup.Math.Vector2;
  
  name : string;
  
  awake(){
    this.name = this.actor.getName();
    new Sup.SpriteRenderer(this.actor, "Powerup/" + this.name);
    
    let hSpeed = Sup.Math.Random.float(0.03, 0.15);
    hSpeed *= Sup.Math.Random.integer(0,1) > 0 ? 1 : -1 ;
    this.speed = new Sup.Math.Vector2(hSpeed, -0.07);
    
    this.position = this.actor.getLocalPosition().toVector2();
  }
  
  update() {
    this.position = this.actor.getLocalPosition().toVector2();
    if(this.actor.getLocalX() < -Game.bounds.width/2 + 0.5 || this.actor.getLocalX() > Game.bounds.width/2 - 0.5){
      this.speed.x *= -1;
    }
    
    if(this.actor.getLocalPosition().y < -Game.bounds.height/2 -0.5){
      this.actor.destroy();
      return;
    }
    
    // check collision with player ship
    if(Game.ship.position.distanceTo(this.position) < Game.ship.size/2 + 0.5){
      Game.ship.powerup(this.name);
      this.explode();
    }
    
    this.actor.move(this.speed);
  }
  
  explode(){
    this.actor.destroy();
  }
  
}
Sup.registerBehavior(PowerupBehavior);
