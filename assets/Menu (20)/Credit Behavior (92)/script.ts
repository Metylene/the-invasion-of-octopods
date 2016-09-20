declare var window;

class CreditBehavior extends Sup.Behavior {
  
  private links : Sup.Actor[];
  private menuButton : Sup.Actor;
  
  private ray = new Sup.Math.Ray();
  
  private hasHoveredLinks : boolean = false;
  private hasHoveredButton : boolean = false;
  
  private destination : string = "None";
  
  // Without that links are activated with the clic on "Credit" button in Menu Scene
  private hasreleasedMouseButton : boolean = false;
  
  awake() {
    this.links = Sup.getActor("Links").getChildren();
    this.menuButton = Sup.getActor("Buttons").getChild("Menu");
    for(let i=0; i < this.links.length; i++){
      this.links[i].textRenderer.setColor(0.6, 0.8, 1);
    }
  }

  update() {
    if(Sup.Input.wasMouseButtonJustReleased(0)) this.hasreleasedMouseButton = true;
    
    this.ray.setFromCamera(Sup.getActor("Camera").camera, Sup.Input.getMousePosition());
    let hits = this.ray.intersectActors(this.links);
    
    if (hits.length > 0 && this.hasreleasedMouseButton){
      this.hasHoveredLinks = true;
      let link = hits[0].actor;
      link.textRenderer.setColor(0, 0.6, 1);
      this.destination = link.getName();
    } else if (this.hasHoveredLinks){
      this.destination = "None";
      this.hasHoveredLinks = false;
      for(let i=0; i < this.links.length; i++){
        this.links[i].textRenderer.setColor(0.6, 0.8, 1);
      }
    }
    
    if(this.ray.intersectActor(this.menuButton).length > 0 && this.hasreleasedMouseButton){
      this.hasHoveredButton = true;
      this.menuButton.setLocalScale(1.3, 1.3, 1);
      this.destination = "Menu";
    } else if (this.hasHoveredButton){
      this.destination = "None";
      this.hasHoveredButton = false;
      this.menuButton.setLocalScale(1, 1, 1);
    }
    
    if(Sup.Input.isMouseButtonDown(0)) this.activateButton();
  }
  
  activateButton(){
    switch(this.destination){
      case "Metylene" :
        window.open("https://twitter.com/Metylene");
        break;
      case "Sparklin Labs" :
        window.open("https://twitter.com/SparklinLabs");
        break;
      case "Ozzed" :
        window.open("http://ozzed.net");
        break;
      case "Superpowers" :
        window.open("http://superpowers-html5.com");
        break;
      case "Menu" :
        Game.menu();
        break;
    }
  }
}
Sup.registerBehavior(CreditBehavior);
