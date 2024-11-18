import { WebSocket } from "ws";
export default class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    private board:string;
    private moves: string[];
    private starttime: Date;
    constructor(player1:WebSocket,player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = "**";
        this.moves = [];
        this.starttime = new Date();
    }
    makeMove(socket:WebSocket,move:{
        from:string,
        to:String
    }){
        if(this.moves.length%2==0 && socket!==this.player1){

        }
    }

}