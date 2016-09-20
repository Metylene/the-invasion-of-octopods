class LittleBehavior extends EnnemyBehavior {
  
  awake(){
    new Sup.SpriteRenderer(this.actor, "Ennemies/Little/Sprite");
    this.size = 1.4;
  };
  
  update() {
    super.update();
    super.checkCollisions();
    super.move();
  }

}
Sup.registerBehavior(LittleBehavior);
