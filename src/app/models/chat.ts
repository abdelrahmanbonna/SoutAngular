import {Msg} from './msg'
export class Chat {
    constructor(
        public senders: string='',
        public receiver: string='',
        public startDate: Date = new Date(),
        public messages :  Msg[]=[]
    ){}
}
