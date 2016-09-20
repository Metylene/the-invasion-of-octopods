class BigBehavior extends EnnemyBehavior {
  
  hSpeed : number;

  shootCooldownDuration : number = 120;
  shootCooldown : number;
  
  awake(){
    new Sup.SpriteRenderer(this.actor, "Ennemies/Big/Sprite");
    this.size = 3.6;
    this.vSpeed = -0.1;
    this.hSpeed = (Sup.Math.Random.integer(0, 1) - 0.5) * 0.1;
    this.armor = 6;
    this.shootCooldown = 100 + Sup.Math.Random.integer(10, 70);
    this.scoreValue = 15;
  };
  
  update() {
    super.update();
    super.checkCollisions();
    this.move();
    
    if(this.shootCooldown > 0) this.shootCooldown --;
    else {
      this.shoot();
      this.shootCooldown = this.shootCooldownDuration;
    }
    
  }
  
  move(){
    if(this.actor.getLocalX() < -Game.bounds.width/2 + this.size/2 || this.actor.getLocalX() > Game.bounds.width/2 - this.size/2){
      this.hSpeed *= -1;
    }
    this.actor.moveLocal(this.hSpeed, this.vSpeed);
    if(this.actor.getLocalPosition().y < Game.bounds.height/2 * -1 -this.size){
      this.actor.destroy();
    }
  }

  shoot(){
    let missileActor = new Sup.Actor("missile", null);
    missileActor.setLocalPosition(this.actor.getLocalPosition().clone().add(0, -1, 0));
    missileActor.addBehavior(MissileBehavior);
    
    Game.musicManager.playSound("Sounds/ennemyShoot");
  }

}
Sup.registerBehavior(BigBehavior);
