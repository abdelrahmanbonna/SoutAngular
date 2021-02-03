export interface User {
  id: string, //res.user.uid,
  firstName: string, // fname,
  secondName: string, //sname,
  gender: string, //gender,
  mobile: string, //mobile,
  picURL: string, //gen,
  coverPicURL: string, //"",
  birthDate: string, //birthdate,
  dateCreated: string, //Date.now().toString(),
  dateUpdated: string, //Date.now().toString(),
  privateAcc: boolean, //false,
  favColor: string, //"grey",
  favMode: string, //"light",
  blocked: boolean,//false,
  // notifications: any[]
  // bookmarks: any[]
  // followers: any[]
  // following: any[]
}
//  {
//     birth_date : any
//     blocked : boolean
//     bookmarks : string[]
//     chat : string[]
//     color : string
//     cover_photo : string
//     deactivate : boolean
//     first_name : string
//     followers : string[]
//     following : string[]
//     gender : string
//     interests : string[]
//     mobile : string
//     mode : string
//     notifications : string[]
//     posts : string[]
//     private : boolean
//     profile_pic : string
//     reports : string[]
//     second_name : string
//     date_created : any
// }
