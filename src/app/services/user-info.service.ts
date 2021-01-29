import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { User } from '../models/user.model';
import auth from 'firebase/app'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  //Constants


  //Variables
  loggedin: boolean = false;
  user: User = new User();
  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {

    // this.fireAuth.onAuthStateChanged(async (User) => {
    //   if (User) {
    //     this.loggedin = true;
    //     await this.firestore.collection(`users/${User.uid}`).valueChanges().subscribe(data=>{
    //       this.user = data;
    //     })
    //   } else {
    //     this.loggedin = false;
    //   }

    // });

  }

  //Methods
  async login(email: string, password: string) {
    await this.fireAuth.signInWithEmailAndPassword(email, password).then(async res => {
      this.loggedin = true;
      if (res.user) {
        localStorage.setItem('userauth', JSON.stringify(res.user))
        //TODO: Request the user data
        await this.firestore.collection(`users`).doc(res.user.uid).valueChanges().subscribe(data => {
          console.log(data)
        })
      } else {
        throw `User not found`
      }
    }).catch((err) => { console.log(err) })
  }

  async signUp(email: string, password: string, fname: string, sname: string, mobile: string, gender: string, confirmPass: string, birthdate: Date) {
    let gen = ""
    if (password === confirmPass) {
      await this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
        if (res.user) {
          console.log(res)
          this.loggedin = true;
          localStorage.setItem('userauth', JSON.stringify(res.user))
          //TODO: Save the user data
          if (gender === "Male") {
            gen = "./../../../../assets/avatar.png"
          } else {
            gen = "./../../../../assets/avatar2.png"
          }
          this.user = new User(res.user.uid, fname, sname, gender, mobile);
          this.firestore.collection(`Users`).doc(res.user.uid).set({
            id: res.user.uid,
            firstName: fname,
            secondName: sname,
            gender: gender,
            mobile: mobile,
            picURL: gen,
            coverPicURL: "",
            birthDate: birthdate,
            dateCreated: Date.now().toString(),
            dateUpdated: Date.now().toString(),
            privateAcc: false,
            favColor: "grey",
            favMode: "light",
            blocked: false,
            notifications: [],
            bookmarks: [],
            followers: [],
            following: [],
          })
        }

      }).catch((err) => { throw err.message; })
    }
    else {
      throw `Password should be same as confirm password.`;
    }
  }

  async signOut() {
    await this.fireAuth.signOut().then(
      res => {
        console.log(res)
        this.loggedin = false;
        localStorage.removeItem('userauth');
        this.user = new User();
      }
    ).catch((err) => { console.log(err) });
  }

  async forgotPassword(email: string) {
    await this.fireAuth.sendPasswordResetEmail(email).then(res => {
    }).catch((err) => { console.log(err) })
  }


  async editProfile(user: User) {
    //TODO: add method to edit profile using User only
    this.firestore.collection(`users`).doc(this.user.id);
  }


}
