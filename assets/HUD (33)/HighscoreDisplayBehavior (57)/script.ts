class HighscoreDisplayBehavior extends Sup.Behavior {
  
  start(){
    Game.highscoreDisplay = this;
    if(Game.highscore > 0){
      new Sup.TextRenderer(this.actor, Game.highscore, "Font/Space", {alignment:"right", verticalAlignment:"top"});
    }
  }

  setScore(value : number){
    this.actor.textRenderer.setText(value.toString());
  }
  
  onDestroy(){
    Game.highscoreDisplay = null;
  }
  
}
Sup.registerBehavior(HighscoreDisplayBehavior);
