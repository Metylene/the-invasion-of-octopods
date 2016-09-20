class PowerupSpawnerBehavior extends Sup.Behavior {

  private spawnCooldown = 4*60;
  
  update() {
    if(this.spawnCooldown > 0) this.spawnCooldown --;
    else if(Game.playerIsAlive){
      let currentPowerupWave = PowerupSpawnerBehavior.powerupByWave[Game.wave];
      let randomPowerup = currentPowerupWave[Sup.Math.Random.integer(0, currentPowerupWave.length-1)];
      
      if(randomPowerup === "Armor" && Game.ship.armor === ShipBehavior.armorMax){
        randomPowerup = "Shield";
      }
      
      let powerupActor : Sup.Actor = new Sup.Actor(randomPowerup, null);
      powerupActor.addBehavior(PowerupBehavior);
      powerupActor.setLocalPosition(Sup.Math.Random.float(-Game.bounds.width/2 + 0.5, Game.bounds.width/2 - 0.5), Game.bounds.height + 1, -1);
      
      this.spawnCooldown = (PowerupSpawnerBehavior.spawnCooldownDurationByWave[Game.wave-1] + Sup.Math.Random.integer(1, 5)) * 60;
    }

  }
}
Sup.registerBehavior(PowerupSpawnerBehavior);

namespace PowerupSpawnerBehavior {
  
  export const spawnCooldownDurationByWave = [12, 12, 13, 15, 17, 18, 20, 21]; /* in seconds */
  
  export const powerupByWave = {
    1 : ["Power"],
    2 : ["Armor", "Power", "Shield", "Shield"],
    3 : ["Armor", "Armor", "Power", "Shield"],
    4 : ["Armor", "Power", "Shield"],
    5 : ["Armor", "Power", "Shield"],
    6 : ["Armor", "Power", "Power", "Shield"],
    7 : ["Armor", "Power", "Power", "Shield"],
    8 : ["Power", "Power", "Power", "Shield"]
  }
  
}
