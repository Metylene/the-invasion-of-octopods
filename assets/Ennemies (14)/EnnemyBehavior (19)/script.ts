class EnnemyBehavior extends Sup.Behavior {
  
  position : Sup.Math.Vector2;
  size : number = 1.5;

  vSpeed : number = -0.25;
  
  armor : number = 2;
  
  scoreValue : number = 5;
  
  start(){
    Game.ennemies.push(this);
    this.position = this.actor.getLocalPosition().toVector2();
  }
  
  update(){
    this.position = this.actor.getLocalPosition().toVector2();
  }
  
  checkCollisions(){
    for(let i = 0; i < Game.lasers.length; i++){
      let laser = Game.lasers[i];
      if(laser.position.distanceTo(this.position) < this.size/2 + laser.size/2){
        laser.explode();
        this.takeDamage();
      }
    }
  }
  
  takeDamage(){
    this.armor --;
    Game.musicManager.playSound('Sounds/ennemyHit');
    if(this.armor === 0){
      this.die();
    }
  }
  
  move(){
    this.actor.moveLocalY(this.vSpeed);
    if(this.actor.getLocalPosition().y < Game.bounds.height/2 * -1 -1){
      this.actor.destroy();
    }
  }
  
  die(){
    Game.addPoints(this.scoreValue);
    
    let scale = this.size/8 + 0.4;
    let explosionActor = new Sup.Actor("Explosion", null);
    new Sup.SpriteRenderer(explosionActor, "Effects/Explosion");
    explosionActor.spriteRenderer.setColor(Sup.Math.Random.float(0, 0.1), Sup.Math.Random.float(0.7, 0.9), Sup.Math.Random.float(0.2, 0.4));
    explosionActor.setLocalScale(scale);
    explosionActor.addBehavior(ExplosionBehavior);
    explosionActor.setLocalPosition(this.actor.getLocalPosition());
    
    Game.musicManager.playSound('Sounds/ennemyExplosion');
    Game.screenshake();
    
    this.actor.destroy();
  }
  
  onDestroy(){
    Game.ennemies.splice(Game.ennemies.indexOf(this), 1);
  }
  
}
Sup.registerBehavior(EnnemyBehavior);
