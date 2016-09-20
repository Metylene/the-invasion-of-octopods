class ArmorBarBehavior extends Sup.Behavior {

  armorRenderers : Sup.SpriteRenderer[] = [];
  
  spriteList : Sup.Sprite[];
  
  start(){
    let children = this.actor.getChildren();
    for(let i = 0; i < children.length; i++){
      this.armorRenderers.push(children[i].spriteRenderer);
    }
  }
    
  refreshDiplay(){
    let shipArmor = 0;
    
    if(Game.playerIsAlive) shipArmor = Game.ship.armor;
    
    for(let i = 0; i < this.armorRenderers.length; i++){
      if(shipArmor > 0 ){
        shipArmor --;
        this.armorRenderers[i].setSprite("HUD/ArmorFull");
      } else {
        this.armorRenderers[i].setSprite("HUD/ArmorEmpty");
      }
    }  
  }
  
}
Sup.registerBehavior(ArmorBarBehavior);
