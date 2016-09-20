class MusicManagerBehavior extends Sup.Behavior {

  musicPlayer : Sup.Audio.SoundPlayer;
  
  musicPath : string = "Music/Ozzed_GameAtHeart";
  volume : number = 0.3;
  
  soundMuted : boolean;
  
  awake(){
    this.soundMuted = false;
    this.musicPlayer = new Sup.Audio.SoundPlayer(this.musicPath, this.volume);
    this.musicPlayer.setLoop(true);
  }
  
  // Switch between muted State and non muted State
  switchMusicState(){
    if(this.soundMuted){
      this.soundMuted = false;
      this.musicPlayer.play();
    } else {
      this.soundMuted = true;
      this.musicPlayer.pause();
    }
  }
  
  play(){
      this.musicPlayer.play();
  }
  
  playSound(soundName : string){
    if(!this.soundMuted){
      let pitch = Sup.Math.Random.float(-0.1, 0.1);
      Sup.Audio.playSound(soundName, 1, {loop : false, pitch : pitch});
    }
  }
  
}
Sup.registerBehavior(MusicManagerBehavior);