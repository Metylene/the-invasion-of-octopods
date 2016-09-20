class CameraBehavior extends Sup.Behavior {

  private screenshakeTimer : number = 0;
  private screenshakeAmplitude : number = 0.2;
  private doingScreenshake : boolean = false;
  
  private startPos : Sup.Math.Vector3;
  
  awake(){
    this.startPos = this.actor.getLocalPosition();
  }
  
  update() {
    if(this.screenshakeTimer > 0) {
      this.doingScreenshake = true;
      this.screenshakeTimer --;
      let randomPos = new Sup.Math.Vector2(Sup.Math.Random.float(-this.screenshakeAmplitude,this.screenshakeAmplitude), Sup.Math.Random.float(-this.screenshakeAmplitude-0.1,this.screenshakeAmplitude+0.1));
      this.actor.setLocalPosition(randomPos);
    } else if (this.doingScreenshake){
      this.doingScreenshake = false;
      this.actor.setLocalPosition(this.startPos);
    }
  }
  
  screenshake(timerValue ? : number){
    let value = timerValue;
    if (timerValue === null || timerValue === undefined) value = 8;
    this.screenshakeTimer = Math.max(value, this.screenshakeTimer);
  }
}
Sup.registerBehavior(CameraBehavior);
