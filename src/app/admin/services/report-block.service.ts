import { Injectable } from '@angular/core';
import { AdminModule } from '../admin.module'

@Injectable({
  providedIn: AdminModule
})
export class ReportBlockService {

  private userId : any;

  constructor() { }

  setId(id:any) : void{
    this.userId = id;
  }

  getId() : any {
    return this.userId;
  }
}
