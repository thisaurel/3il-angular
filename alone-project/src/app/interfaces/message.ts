export interface Message {
    id: number;
    datetime: string;
    emitterId : number;
    receiverId : number;
    picture: string;
    content: string;
}
