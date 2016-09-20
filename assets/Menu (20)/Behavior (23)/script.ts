class MenuBehavior extends Sup.Behavior {
  
  private buttons: Sup.Actor[];
  private buttonIndex = 0;
  
  private ray = new Sup.Math.Ray();
  
  awake(){
    this.buttons = Sup.getActor("Buttons").getChildren();
    this.updateFocusedButton();
  }

  update() {
    this.ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());
    
    let hits = this.ray.intersectActors(this.buttons);
    if (hits.length > 0){
      let hoveredButtonIndex = this.buttons.indexOf(hits[0].actor);
      if(hoveredButtonIndex !== this.buttonIndex){
        this.buttonIndex = hoveredButtonIndex;
        this.updateFocusedButton();
      }
    }
    
    if (Sup.Input.wasMouseButtonJustPressed(0)) this.activateButton();
  }
  
  updateFocusedButton(){
    for(let i = 0; i < this.buttons.length; i++){
      let button = this.buttons[i];
      button.textRenderer.setOpacity(i === this.buttonIndex ? 1 : 0.3);
    }
  }

  activateButton(){
    let buttonName = this.buttons[this.buttonIndex].getName();
    if(Sup.getActor(buttonName).getVisible()){
      switch (buttonName){
        case "Play":
          Game.start();
          break;
        case "Menu":
          Game.menu();
          break;
      }
    }
  }
  
}
Sup.registerBehavior(MenuBehavior);
