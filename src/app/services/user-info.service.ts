import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { User } from '../models/user.model';
import auth from 'firebase/app'
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  //Constants


  //Variables
  public loggedin: boolean = false;
  public user: User = new User();
  subscribtion: Subscription[] = [];
  constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore, private firestorage: AngularFireStorage) {
  }

  //Methods
  async login(email: string, password: string) {
    await this.fireAuth.signInWithEmailAndPassword(email, password).then(async res => {
      this.loggedin = true;
      let x: any;
      if (res.user) {
        localStorage.setItem('userauth', JSON.stringify(res.user))
        this.subscribtion.push(await this.firestore.collection(`Users`).doc(res.user.uid).get().subscribe(res => {
          if (res.data()) {
            x = res.data();
            console.log(res.data())
            localStorage.setItem('userdata', JSON.stringify(res.data()))
            this.user = new User(x.id, x.firstName, x.secondName, x.gender, x.mobile, x.picURL, x.coverPicURL, x.birthDate, x.privateAcc, x.favColor, x.favMode, x.dateCreated, x.dateUpdated, x.blocked!)
          } else if (!res.exists) {
            throw `User not found.`
          }
        }))
      } else {
        throw `User not found`
      }
    }).catch((err) => {
      this.loggedin = false;
      console.log(`${err}`)
      location.reload();
    })
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
            gen = "./../../../../assets/avatar2.png"
          } else {
            gen = "./../../../../assets/avatar.png"
          }
          this.user = new User(res.user.uid, fname, sname, gender, mobile, gen, "", birthdate, false, "grey", "light");
          this.firestore.collection(`Users`).doc(res.user.uid).set({
            id: res.user.uid,
            firstName: fname,
            secondName: sname,
            gender: gender,
            mobile: mobile,
            picURL: gen,
            coverPicURL: "",
            birthDate: birthdate,
            dateCreated: new Date().toISOString(),
            dateUpdated: new Date().toISOString(),
            privateAcc: false,
            favColor: "grey",
            favMode: "light",
            blocked: false,
          })
        }

      }).catch((err) => {
        this.loggedin = false;
        console.log(`${err}`)
        location.reload();
      })
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
        localStorage.removeItem('userdata');
        this.user = new User();
      }
    ).catch((err) => { console.log(`${err}`) });
  }

  async forgotPassword(email: string) {
    await this.fireAuth.sendPasswordResetEmail(email).then(res => {
      alert(`we sent an email to your email.`);
    }).catch((err) => { console.log(`${err}`) })
  }


  async editProfile(user: User) {
    if (this.user.id !== "") {
      this.firestore.collection(`Users`).doc(this.user.id).update({
        id: this.user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        gender: user.gender,
        mobile: user.mobile,
        picURL: user.picURL,
        coverPicURL: user.coverPicURL,
        birthDate: user.birthDate,
        dateUpdated: new Date().toISOString(),
        privateAcc: user.privateAcc,
        favColor: user.favColor,
        favMode: user.favMode,
        blocked: this.user.blocked,
        // notifications: user.notifications,
        // bookmarks: user.bookmarks,
        // followers: user.followers,
        // following: user.following,
      }).catch(err => { console.log(`${err}`) });
    } else if (this.user.id === "") {
      let userlocal = JSON.parse(localStorage.getItem('userdata')!)
      this.firestore.collection(`Users`).doc(userlocal.id).update({
        id: userlocal.id,
        firstName: user.firstName,
        secondName: user.secondName,
        gender: user.gender,
        mobile: user.mobile,
        picURL: user.picURL,
        coverPicURL: user.coverPicURL,
        birthDate: user.birthDate,
        dateUpdated: new Date().toISOString(),
        privateAcc: user.privateAcc,
        favColor: user.favColor,
        favMode: user.favMode,
        blocked: userlocal.blocked,
        // notifications: user.notifications,
        // bookmarks: user.bookmarks,
        // followers: user.followers,
        // following: user.following,
      }).catch(err => { console.log(`${err}`) });
    }

  }

  ngOnDestroy(): void {
    this.subscribtion.forEach(element => {
      element.unsubscribe();
    });

  }


}


