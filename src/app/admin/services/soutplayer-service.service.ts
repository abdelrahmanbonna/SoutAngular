import { ElementRef, Injectable } from '@angular/core';
import { AdminModule } from '../admin.module'

@Injectable({
  providedIn: AdminModule
})
export class SoutplayerService {


  constructor() { }

  playAudio(audio: any) {
    //audio.nativeElement.load();
    audio.nativeElement.play();
  }

  pauseAudio(audio: any) {
    audio.nativeElement.pause();
  }

  start(audio: any, slider: any, auddur: any, audtime: any, vol: any, volicon: any) {
    audio.nativeElement.oncanplay = () => {
      slider.nativeElement.max = audio.nativeElement.duration;
      if ((audio.nativeElement.duration % 60) < 10) {
        auddur.nativeElement.innerHTML = Math.floor(audio.nativeElement.duration / 60)
          + ":0"
          + Math.floor(audio.nativeElement.duration % 60);
      }
      else {
        auddur.nativeElement.innerHTML = Math.floor(audio.nativeElement.duration / 60)
          + ":"
          + Math.floor(audio.nativeElement.duration % 60);
      }
    }

    audio.nativeElement.ontimeupdate = () => {
      if ((audio.nativeElement.currentTime % 60) < 10) {
        audtime.nativeElement.innerHTML = Math.floor(audio.nativeElement.currentTime / 60)
          + ":0"
          + Math.floor(audio.nativeElement.currentTime % 60);
      }
      else {
        audtime.nativeElement.innerHTML = Math.floor(audio.nativeElement.currentTime / 60)
          + ":"
          + Math.floor(audio.nativeElement.currentTime % 60);
      }

      slider.nativeElement.value = audio.nativeElement.currentTime;
    }

    slider.nativeElement.onmouseup = () => {
      audio.nativeElement.currentTime = slider.nativeElement.value;
    }

    vol.nativeElement.onmouseup = () => {
      audio.nativeElement.volume = (vol.nativeElement.value) / 100;

      if (vol.nativeElement.value == 0) {
        volicon.nativeElement.classList.remove("fa-volume-up");
        volicon.nativeElement.classList.remove("fa-volume-down");
        volicon.nativeElement.classList.remove("fa-volume-mute");
        volicon.nativeElement.classList.add("fa-volume-mute");
      }
      else if (vol.nativeElement.value < 30) {
        volicon.nativeElement.classList.remove("fa-volume-up");
        volicon.nativeElement.classList.remove("fa-volume-down");
        volicon.nativeElement.classList.remove("fa-volume-mute");
        volicon.nativeElement.classList.add("fa-volume-down");
      }
      else {
        volicon.nativeElement.classList.remove("fa-volume-up");
        volicon.nativeElement.classList.remove("fa-volume-down");
        volicon.nativeElement.classList.remove("fa-volume-mute");
        volicon.nativeElement.classList.add("fa-volume-up");
      }
    }

  }


}