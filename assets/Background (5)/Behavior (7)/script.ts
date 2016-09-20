class BackgroundBehavior extends Sup.Behavior {
  
  public vSpeed : number = -0.05;
  
  // alarmLimit = 5*60;
  // alarmTimer = 0;
  // alarmFinished = false;
  
  randomSprite = false;

  update() {
    
    // if(this.alarmTimer > this.alarmLimit && !this.alarmFinished){
    //   this.vSpeed *= 2;
    //   this.alarmFinished = true;
    // } else {
    //   this.alarmTimer += 1;
    // }
   
    
    let posY = this.actor.getLocalPosition().y;
    if(posY <= -25){
      posY += 60;
      if(this.randomSprite) this.changeSprite();
    }
    this.actor.setLocalY(posY + this.vSpeed);
  }
  
  changeSprite(){
    let rdm = Sup.Math.Random.integer(1,4);
    this.actor.spriteRenderer.setSprite("Background/Far/"+rdm);
  }
  
}
Sup.registerBehavior(BackgroundBehavior);
