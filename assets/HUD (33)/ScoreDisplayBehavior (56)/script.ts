class ScoreDisplayBehavior extends Sup.Behavior {
  
  start(){
    Game.scoreDisplay = this;
    new Sup.TextRenderer(this.actor, Game.score, "Font/Space", {alignment:"right", verticalAlignment:"top"});
  }

  setScore(value : number){
    this.actor.textRenderer.setText(value.toString());
  }
  
  onDestroy(){
    Game.scoreDisplay = null;
  }
  
}
Sup.registerBehavior(ScoreDisplayBehavior);
