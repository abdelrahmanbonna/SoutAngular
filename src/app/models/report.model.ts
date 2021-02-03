export class Report {
    constructor(
        public id: string = "",
        public date: Date = new Date(),
        public audio: string = "",
        public description: string = "",
        public image: string = "",
        public reportedId: string = "",
        public title: string = "",
        public type: string = "",
        public userId: string = ""
    ) { }

}