import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  public allTalents: Array<unknown> = []
  constructor(private firestore: AngularFirestore) { }

  getAllTalents(): Array<unknown> {
    this.allTalents = [];
    this.firestore.collection("/talents").get().subscribe(res => {
      if (res) {
        res.docs.forEach(element =>
          this.allTalents.push(element.data())
        );
        // console.log(this.allTalents)
      } else if (!res) {
        throw `Talent not found`
      }
    });
    return this.allTalents;
  }
}
