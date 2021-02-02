export class User {
    constructor(public id: string = "",
        public firstName: string = "",
        public secondName: string = "",
        public gender: string = "",
        public mobile: string = "",
        public picURL: string = "",
        public coverPicURL: string = "",
        public birthDate: Date = new Date(),
        public privateAcc: boolean = false,
        public favColor: string = "",
        public favMode: string = "",
        // public notifications: any[] = [],
        // public bookmarks: any[] = [],
        // public followers: any[] = [],
        // public following: any[] = [],
        public createdDate: Date = new Date(),
        public updatedDate: Date = new Date(),
        public blocked: boolean = false
    ) { }


}
