class ShipBehavior extends Sup.Behavior {
  
  position : Sup.Math.Vector2;
  size : number;
  
  private leftCannon = new Sup.Math.Vector3(-0.8, 0.9, -0.5);
  private rightCannon = new Sup.Math.Vector3(0.8, 0.9, -0.5);
  
  private shootCooldown : number = 10;
  private shootCooldownDuration : number;
  
  armor : number;
  private armorBarActor : ArmorBarBehavior;
  
  private invicibilityTimer = 0;
  
  private hasShield : boolean;
  private shieldActor : Sup.Actor;
  
  canShoot : boolean;
  canMove : boolean;
  
  private powerTimer : number = 0;
  
  private spawnPropulsorTimer : number = 0;
  
  awake(){
    this.armor = ShipBehavior.armorMax;
    this.size = ShipBehavior.size;
    this.shootCooldownDuration = ShipBehavior.shootCooldownDuration;
    
    this.shieldActor = this.actor.getChild("Shield");
    this.shieldActor.setVisible(false);
    this.canShoot = true;
    this.canMove = true;
    
    Game.ship = this;
  }
  
  start(){
    this.armorBarActor = Game.cameraActor.getChild("Armor").getBehavior(ArmorBarBehavior);
  }

  update() {
    this.position = this.actor.getLocalPosition().toVector2();
    
    // Movement
    if(this.canMove){
      let mousePos = Sup.Input.getMousePosition().unproject(Sup.getActor("Camera").camera);
      let nextX = Sup.Math.clamp(mousePos.x, -Game.bounds.width/2 + this.size/2, Game.bounds.width/2 - this.size/2)
      this.actor.setLocalX(nextX);
    }
    
    // Invicibility
    if(this.invicibilityTimer > 0 ) {
      this.invicibilityTimer --;
      
      let blink = this.invicibilityTimer % (ShipBehavior.invicibilityBlinkInterval * 2);
      this.actor.setVisible(blink < ShipBehavior.invicibilityBlinkInterval);
    }
    
    // Check collisions    
    if(this.invicibilityTimer === 0){
      for(let i = 0; i < Game.ennemies.length; i++){
        let ennemy = Game.ennemies[i];
        if(ennemy.position.distanceTo(this.position) < this.size/2 + ennemy.size/2){
          this.takeDamage();
          ennemy.die();
        }
      }
      for(let i = 0; i < Game.missiles.length; i++){
        let missile = Game.missiles[i];
        if(missile.position.distanceTo(this.position) < this.size/2 + missile.size/2){
          this.takeDamage();
          missile.explode();
        }
      }
    }
    
    // Shield
    if(this.hasShield) this.shieldActor.rotateLocalEulerZ(0.1);
    
    // Power Fire
    if(this.powerTimer > 0) this.powerTimer --;
    
    // Animate propulsor
    if(this.spawnPropulsorTimer === 0){
      let rightPropulsor : Sup.Actor = new Sup.Actor("Right", null);
      rightPropulsor.addBehavior(ShipPropulsorBehavior);
    
      let leftPropulsor : Sup.Actor = new Sup.Actor("Left", null);
      leftPropulsor.addBehavior(ShipPropulsorBehavior);
      
      this.spawnPropulsorTimer = 21;
    } else {
      this.spawnPropulsorTimer --;
    }
    
    //Shoot
    if (this.shootCooldown > 0) this.shootCooldown --;
    if(this.canShoot) this.shoot();
    
  } /* /update */
  
  upFireRate(){
    this.shootCooldownDuration -= 2;
  }
  
  shoot(){
    if(this.shootCooldown === 0){
      let leftLaser : Sup.Actor = new Sup.Actor("shipLaser", null);
      leftLaser.addBehavior(LaserBehavior);
      leftLaser.setLocalPosition(this.actor.getLocalPosition().clone().add(this.leftCannon));

      let rightLaser : Sup.Actor = new Sup.Actor("shipLaser", null);
      rightLaser.addBehavior(LaserBehavior);
      rightLaser.setLocalPosition(this.actor.getLocalPosition().clone().add(this.rightCannon));

      this.shootCooldown = ShipBehavior.shootCooldownDuration;
      
      if(this.powerTimer > 0){
        let leftLaser : Sup.Actor = new Sup.Actor("shipLaser", null);
        leftLaser.addBehavior(LaserBehavior).hSpeed = -0.05;
        leftLaser.setLocalPosition(this.actor.getLocalPosition().clone().add(this.leftCannon));

        let rightLaser : Sup.Actor = new Sup.Actor("shipLaser", null);
        rightLaser.addBehavior(LaserBehavior).hSpeed = 0.05;
        rightLaser.setLocalPosition(this.actor.getLocalPosition().clone().add(this.rightCannon));
        
        this.shootCooldown -= 5;
      
        Game.musicManager.playSound("Sounds/shipShoot");
        Game.musicManager.playSound("Sounds/shipShoot");
      }
      
      Game.musicManager.playSound("Sounds/shipShoot");
      Game.musicManager.playSound("Sounds/shipShoot");
    }
  }
    
  takeDamage(){
    Game.musicManager.playSound('Sounds/shipHit');
    if(this.hasShield){
      this.looseShield();
      return;
    }
    this.armor --;
    this.armorBarActor.refreshDiplay();
    if(this.armor === 0){
      this.die();
    } else {
      this.invicibilityTimer = ShipBehavior.invicibilityTimerDuration;
    }
  }
  
  die(){
    let explosionActor = new Sup.Actor("Explosion", null);
    new Sup.SpriteRenderer(explosionActor, "Effects/Explosion");
    explosionActor.spriteRenderer.setColor(Sup.Math.Random.float(0.7, 1), Sup.Math.Random.float(0.2, 0.4), 0);
    explosionActor.addBehavior(ExplosionBehavior);
    explosionActor.setLocalPosition(this.actor.getLocalPosition());
    
    Game.musicManager.playSound('Sounds/shipExplosion');
    Game.cameraActor.getBehavior(CameraBehavior).screenshake(60);
    
    Game.showMenuButton();
    
    Game.playerIsAlive = false;
    this.actor.destroy();
  }
  
  powerup(powerupName : string){
    switch(powerupName){
      case "Armor" :
        this.addArmor();
        break;
      case "Shield" :
        this.addShield();
        break;
      case "Power" :
        this.powerTimer = ShipBehavior.powerTimerDuration;
        Game.musicManager.playSound('Sounds/powerupGetPower');
        break;
    }
  }
  
  addShield(){
    if(!this.hasShield){
      Game.musicManager.playSound('Sounds/powerupGetShield');
      this.shieldActor.setVisible(true);
      this.hasShield = true;
    }
  }
  
  looseShield(){
    this.shieldActor.setVisible(false);
    this.hasShield = false;
  }
  
  addArmor(){
    if(this.armor < ShipBehavior.armorMax){
      this.armor = Sup.Math.clamp(this.armor+1, 0, ShipBehavior.armorMax);
      Game.musicManager.playSound('Sounds/powerupGetArmor');
    }
    this.armorBarActor.refreshDiplay();
  }
  
}
Sup.registerBehavior(ShipBehavior);

namespace ShipBehavior{

  export const spawnPropulsorTimerDuration = 21;
  
  export const powerTimerDuration = 360;
  
  export const invicibilityTimerDuration = 100;
  export const invicibilityBlinkInterval = 4;
  
  export const size : number = 2.1;
  
  export const shootCooldownDuration : number = 20;
  
  export const armorMax : number = 4;
  
}
