import {Msg} from './msg'

export interface IChat {
    id:string,
    sender: string,
    receiver: string,
    startDate: Date,
    messages :  Msg[]
}
