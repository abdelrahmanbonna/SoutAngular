import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import * as Chart from 'chart.js'
import { AdminModule } from '../admin.module'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: AdminModule
})
export class DashBoardService {
  
  private monthNow = new Date().getMonth()
  private yearNow = new Date().getFullYear();
  private months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  private labels : any[] = []
  private usersData : any[] = []
  private postsData : any[] = []
  private subs : Subscription[] = []
  private talents : any[] = []


  constructor(private fire : FireService) {
    for (let i = 0;i<=this.monthNow;i++){
      this.labels.push(this.months[i])
      this.usersData[i] = 0;
      this.postsData[i] = 0;
    }
   }

   usersChart(chartId : string) {
    this.subs.push(this.fire.getCollection('Users').subscribe((resp)=>{
      resp.forEach(user => {
        //console.log(Number(user.dateCreated.split("-")[1]))
        if (Number(user.dateCreated.split("-")[0]) == this.yearNow){
          
            this.usersData[(Number(user.dateCreated.split("-")[1])-1) ]++;
        }

      });
      new Chart(chartId, {
        type: 'bar',
        data: {
            labels: this.labels,
            datasets: [{
                label: `Users in ${this.yearNow} (Total: ${this.usersData.reduce((a, b) => a + b, 0)})`,
                data: [...this.usersData],
                backgroundColor: [
                  '#e6194b',
                  '#3cb44b',
                  '#ffe119', 
                  '#4363d8', 
                  '#f58231', 
                  '#911eb4', 
                  '#46f0f0', 
                  '#f032e6', 
                  '#bcf60c', 
                  '#fabebe', 
                  '#aaffc3', 
                  '#e6beff'
                ],
                maxBarThickness: 100,
                borderWidth: 1
            }]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize : 1
                }
            }]
        }
        }
      });
    }));
   }

   postsChart(chartId : string) {
    this.subs.push(this.fire.getCollection('post').subscribe((resp)=>{
      resp.forEach(post => {
       
        if (post.date.toDate().getFullYear() == this.yearNow){
            this.postsData[post.date.toDate().getMonth()]++;
        }

      });
      new Chart(chartId, {
        type: 'bar',
        data: {
            labels: this.labels,
            datasets: [{
                label: `Posts in ${this.yearNow} (Total: ${this.postsData.reduce((a, b) => a + b, 0)})`,
                data: [...this.postsData],
                backgroundColor: [
                  '#46f0f0', 
                  '#f032e6', 
                  '#bcf60c', 
                  '#fabebe', 
                  '#aaffc3', 
                  '#e6beff',
                  '#e6194b',
                  '#3cb44b',
                  '#ffe119', 
                  '#4363d8', 
                  '#f58231', 
                  '#911eb4'
                ],
                maxBarThickness: 100,
                borderWidth: 1
            }]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize : 1
                }
            }]
        }
        }
      });
    }));
   };
   
   //not completed
   talentsChart(chartId : string) {

    //talents
    let talents : any[] =[];
    let talentsIds : any[] =[];
    let associativeTalents :any[] =[];
    let talentsNumbers : any[] =[];

    this.subs.push(this.fire.getCollection('talents').subscribe((resp)=>{
      resp.forEach(talent => { 
        talents.push(talent.name);
        talentsIds.push(talent.ID);
        associativeTalents[talent.ID] = 0;
      });
      //console.log(talents)
      //console.log(talentsIds)
    

    //posts-talent
    this.subs.push(this.fire.getCollection('post').subscribe((resp)=>{
      resp.forEach(post => {
        //console.log(post.talent[0]._.S_.path.segments[6])
        for(let i = 0;i<post.talent.length;i++){
          //console.log(post.talent[i]._.S_.path.segments[6])
          associativeTalents[post.talent[i]._.S_.path.segments[6]]++
        }
        // let talent : string = post.talent;
        //   this.subs.push(this.fire.getDocument(talent).subscribe((resp)=>{
        //     console.log(resp);
        //   }))
      });
      for (let i=0;i<talents.length;i++){
        talentsNumbers.push(associativeTalents[talentsIds[i]])
      }
      new Chart(chartId, {
        type: 'bar',
        data: {
            labels: talents,
            datasets: [{
                label: `Talents in ${this.yearNow} (Total: ${talentsNumbers.reduce((a, b) => a + b, 0)})`,
                data: [...talentsNumbers],
                backgroundColor: [
                  '#fabebe', 
                  '#aaffc3', 
                  '#e6beff',
                  '#e6194b',
                  '#3cb44b',
                  '#ffe119', 
                  '#4363d8', 
                  '#f58231', 
                  '#911eb4', 
                  '#46f0f0', 
                  '#f032e6', 
                  '#bcf60c'
                ],
                maxBarThickness: 100,
                borderWidth: 1
            }]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize : 1
                }
            }]
        }
        }
      });
    }));
  }));
  }

   unsubscribe() {
     this.subs.forEach(sub => {
       sub.unsubscribe();
     });
   }
}
