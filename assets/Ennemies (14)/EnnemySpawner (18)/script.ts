class EnnemySpawnerBehavior extends Sup.Behavior {

  private spawnCooldown = 2*60;
  
  update() {
    if(this.spawnCooldown > 0) this.spawnCooldown --;
    else if (Game.playerIsAlive){
      let currentEnnemyWave = EnnemySpawnerBehavior.ennemyWaves[Game.wave];
      let randomEnnemy = currentEnnemyWave[Sup.Math.Random.integer(0, currentEnnemyWave.length-1)];
      
      let ennemy : Sup.Actor = new Sup.Actor("ennemy", null);
      
      switch(randomEnnemy){
        case "Little" :
          ennemy.addBehavior(LittleBehavior);
          break;
        case "Big" :
          ennemy.addBehavior(BigBehavior);
          break;
        default :
          Sup.log("Ennemy Spawner Switch - Ennemy name not found")
          break;
      }
      ennemy.setLocalPosition(Sup.Math.Random.float(-Game.bounds.width/2 + ennemy.getBehavior(EnnemyBehavior).size/2, Game.bounds.width/2 - ennemy.getBehavior(EnnemyBehavior).size/2), Game.bounds.height + 2, -2);
      
      this.spawnCooldown = EnnemySpawnerBehavior.spawnCooldownDurationByWave[Game.wave-1] + Sup.Math.Random.integer(0, EnnemySpawnerBehavior.cooldownAdding[Game.wave-1]);
    }
  }
}
Sup.registerBehavior(EnnemySpawnerBehavior);

namespace EnnemySpawnerBehavior {
  
  export const spawnCooldownDurationByWave = [75, 75, 60, 50, 40, 35, 30, 30];
  
  export const cooldownAdding = [35, 25, 30, 30, 30, 25, 25, 23];
  
  export const ennemyWaves = {
    1 : ["Little"],
    2 : ["Little", "Little", "Big"],
    3 : ["Little", "Little", "Big"],
    4 : ["Little", "Big"],
    5 : ["Little", "Big"],
    6 : ["Little", "Big"],
    7 : ["Little", "Big"],
    8 : ["Little", "Little", "Big", "Big", "Big"]
  }
  
}
