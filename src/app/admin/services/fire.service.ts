import { Injectable } from '@angular/core';
import { AdminModule } from '../admin.module'
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument} from '@angular/fire/firestore';


@Injectable({
  providedIn: AdminModule
})
export class FireService {

  private collection: AngularFirestoreCollection<any> |undefined;
  private document: AngularFirestoreDocument<any> |undefined;

  constructor(private afs: AngularFirestore) { }

  getCollection(collectionName : string) {
    this.collection = this.afs.collection<any>(collectionName);
     return this.collection.valueChanges({ idField: 'ID' });
  }

  getDocument(documentPath : string) { //collection/id
    this.document = this.afs.doc<any>(documentPath);
    return this.document.valueChanges();
  }

  addDocument(collectionName : string, newDoc : any) {
    this.collection = this.afs.collection<any>(collectionName);
    this.collection?.add(newDoc);
  };

  updateDocument(documentPath : string, updateObject : any) {
    this.document = this.afs.doc<any>(documentPath);
    this.document.update(updateObject);
  };

  setDocument(documentPath : string, newObject : any) {
    this.document = this.afs.doc<any>(documentPath);
    this.document.set(newObject);
  };

  deleteDocument(documentPath : string) {
    this.document = this.afs.doc<any>(documentPath);
    this.document.delete();
  }
}
