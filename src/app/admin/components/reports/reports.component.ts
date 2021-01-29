
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Report } from '../../models/report';
import { FireService } from '../../services/fire.service';
import { SoutplayerService } from '../../services/soutplayer.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReportBlockService } from '../../services/report-block.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {


  @ViewChild ('audio')    audio : ElementRef | undefined;
  @ViewChild ('slider')   slider : ElementRef | undefined;
  @ViewChild ('auddur')   auddur : ElementRef | undefined;
  @ViewChild ('audtime')  audtime : ElementRef | undefined;
  @ViewChild ('vol')      vol : ElementRef | undefined;
  @ViewChild ('volicon')  volicon : ElementRef | undefined;

  subs : Subscription[] =[];
  reports : Report[] = [];
  myimg : any[] = [];
  myaudio : any[] = [];
  meta: Observable<any> | undefined;


  constructor(private soutPlayer : SoutplayerService,
              private fire : FireService,
              private storage : AngularFireStorage,
              private report_block : ReportBlockService,
              private router : Router) {
   }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
     this.soutPlayer.start(this.audio,this.slider,this.auddur,this.audtime,this.vol,this.volicon);
  }

  playAudio(){
    this.soutPlayer.playAudio(this.audio);
  }

  pauseAudio(){
    this.soutPlayer.pauseAudio(this.audio);
  }

  goToBlock(id : any){
    console.log(id);
    this.report_block.setId(id);
    this.router.navigate(['admin/block']);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }



}
