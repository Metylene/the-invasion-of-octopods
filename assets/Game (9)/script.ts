namespace Game {
  
  export let score : number;
  export let highscore : number = 0;
  
  export let bounds : { width: number; height: number; };
  
  export let wave : number;
  let waveTimeDuration : number = 15; // in second
  let maxNumberWave : number = 8;
  
  export let ennemies : EnnemyBehavior[];
  export let missiles : MissileBehavior[];
  export let lasers : LaserBehavior[];
  
  export let scoreDisplay : ScoreDisplayBehavior;
  export let highscoreDisplay : ScoreDisplayBehavior;
  
  export let musicManager : MusicManagerBehavior;

  export let playerIsAlive : boolean;
  
  export let ship : ShipBehavior;

  export let cameraActor : Sup.Actor;
  
  let lastTimeoutIndex : number;
  
  // Play music
  Game.musicManager = new Sup.Actor("MusicManager").addBehavior(MusicManagerBehavior);
  Game.musicManager.play();
  
  // Load saved highscore
  let storedScore = Sup.Storage.get("score", "0");
  highscore = +storedScore;
  Sup.Input.on("exit", () => {
    Sup.Storage.set("score", Game.highscore.toString());
  });
  
  export function start(){
    Sup.clearTimeout(lastTimeoutIndex);
    
    wave = 1;
    score = 0;
    ennemies = [];
    missiles = [];
    lasers = [];
    playerIsAlive = true;
    
    Sup.loadScene("Scene/Space");
    
    Sup.getActor("Buttons").getChild("Menu").setVisible(false);
    Sup.getActor("Buttons").getChild("Play").setVisible(false);

    cameraActor = Sup.getActor("Camera");
    ship = Sup.getActor("Ship").getBehavior(ShipBehavior);

    bounds = {
      height: cameraActor.camera.getOrthographicScale(),
      width: cameraActor.camera.getOrthographicScale() * cameraActor.camera.getWidthToHeightRatio()
    };
    
     lastTimeoutIndex = Sup.setTimeout( waveTimeDuration * 1000, changeWave);
  }
  
  export function addPoints(value : number){
    score += value;
    highscore = Math.max(highscore, score);
    if(scoreDisplay) {
      scoreDisplay.setScore(score);
    }
  }
  
  export function screenshake(){
    cameraActor.getBehavior(CameraBehavior).screenshake();
  }
  
  function changeWave(){
    wave ++;
    Sup.log("Wave up !", wave);
    if(wave < maxNumberWave) {
      if (playerIsAlive) {
         lastTimeoutIndex = Sup.setTimeout( waveTimeDuration * 1000, changeWave);
      }
    }
    else Sup.log("Wave max reach");
  }
  
  export function showMenuButton(){
    let buttons = Sup.getActor("Buttons");
    buttons.getChild("Menu").setVisible(true);
    buttons.getChild("Play").setVisible(true);
  }

  export function menu(){
    Sup.loadScene("Menu/Main");
  }
}