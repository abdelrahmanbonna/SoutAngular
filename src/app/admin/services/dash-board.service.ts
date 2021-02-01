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
        //console.log(user)
        if (user.dateCreated.toDate().getFullYear() == this.yearNow){
          
            this.usersData[user.dateCreated.toDate().getMonth()]++;
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
   };
   
   //not completed
  //  talentsChart(chartId : string) {
  //   this.subs.push(this.fire.getCollection('post').subscribe((resp)=>{
  //     resp.forEach(post => {
  //       console.log(post.talent.toString())
  //       // let talent : string = post.talent;
  //       //   this.subs.push(this.fire.getDocument(talent).subscribe((resp)=>{
  //       //     console.log(resp);
  //       //   }))
  //     });
  //     new Chart(chartId, {
  //       type: 'bar',
  //       data: {
  //           labels: this.labels,
  //           datasets: [{
  //               label: `Posts in ${this.yearNow} (Total: ${this.postsData.reduce((a, b) => a + b, 0)})`,
  //               data: [...this.postsData],
  //               backgroundColor: [
  //                 '#e6194b',
  //                 '#3cb44b',
  //                 '#ffe119', 
  //                 '#4363d8', 
  //                 '#f58231', 
  //                 '#911eb4', 
  //                 '#46f0f0', 
  //                 '#f032e6', 
  //                 '#bcf60c', 
  //                 '#fabebe', 
  //                 '#aaffc3', 
  //                 '#e6beff'
  //               ],
  //               maxBarThickness: 100,
  //               borderWidth: 1
  //           }]
  //       },
  //       options: {
  //         scales: {
  //           yAxes: [{
  //               ticks: {
  //                   beginAtZero: true,
  //                   stepSize : 1
  //               }
  //           }]
  //       }
  //       }
  //     });
  //   }));
  // }

   unsubscribe() {
     this.subs.forEach(sub => {
       sub.unsubscribe();
     });
   }
}
