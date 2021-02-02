import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/images';
  file!: File;
  url = '';

  constructor(private afStorage: AngularFireStorage) { }

  handleFiles(event: { target: { files: File[]; }; }) {
    this.file = event.target.files[0];
  }

  //method to upload file at firebase storage
  async uploadFile() {
    if (this.file) {
      const filePath = `${this.basePath}/${this.file.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file);    //upload task
      this.getUrl(snap);
    } else { alert('Please select an image'); }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.default.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    console.log(this.url);
  }

}
