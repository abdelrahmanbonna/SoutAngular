import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Talent } from '../../models/talent'
import { FireService } from '../../services/fire.service';


@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrls: ['./talents.component.scss']
})
export class TalentsComponent implements OnInit, OnDestroy{

  talents : Talent[] = [];
  newTalentName : string ='';
  updateID : string = '';
  subs : Subscription | undefined;

  constructor(private fire : FireService) {}
  
  ngOnInit(): void {
    this.subs = this.fire.getCollection('talents').subscribe((resp)=>{
      this.talents = resp;
    });
    // this.fire.getDocument('talents/4zsOV5U7dSyaOfpIGbcM').subscribe((resp)=>{
    //   console.log(resp)
    // });
  }

  addTalent(){
    if (this.newTalentName != ""){
    if (this.updateID == ''){
    let newTalent : Talent = {name:this.newTalentName};
    this.fire.addDocument('talents',newTalent);
    }
  else{
    let updatedTalent : Talent = {name:this.newTalentName};
    this.fire.updateDocument(`talents/${this.updateID}`, updatedTalent);
    this.updateID = '';
  }
  this.newTalentName = "";
}
  }

  updateTalent(id:string,name:string){
    this.newTalentName = name;
    this.updateID = id;
  }

  deleteTalent(id:string,name:string) {
    if(confirm("Are you sure to delete "+name+" talent")) {
      this.fire.deleteDocument(`talents/${id}`);
    }
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
    console.log("thank you");
  }

}
