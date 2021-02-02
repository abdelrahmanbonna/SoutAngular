import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Talent } from '../models/talent.model';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  public allTalents: Talent[] = []
  public dataTalent: any;
  constructor(private firestore: AngularFirestore) { }

  getAllTalents(): Observable<any> {
    this.allTalents = [];
    var docs;

    return this.firestore.collection("/talents").get().pipe(map(res => {
      docs = res.docs
      docs.forEach(el => {
        this.dataTalent = el.data()
        this.allTalents.push(this.dataTalent)
      })
      console.log(this.allTalents)
      return this.allTalents;

    }))
  }


}
