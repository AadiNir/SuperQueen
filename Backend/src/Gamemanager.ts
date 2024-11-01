import { WebSocket } from "ws";
import Game from "./Game";
export default class Gamemanager{
    private games:Game[];
    private pendinguser:WebSocket | null;
    private users:WebSocket[];
    constructor(){
        this.games = [];
        this.pendinguser = null;
        this.users = [];
    }
    addUser(socket:WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket:WebSocket){
        this.users.filter(user=>user!==socket);
    }
    addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());
            if(message.type === "INIT_GAME"){
                if(this.pendinguser){
                    //start a game
                    const game = new Game(this.pendinguser,socket);
                    this.games.push(game);
                    this.pendinguser = null; 
                }else{
                    this.pendinguser = socket;
                }
            }
            if(message.type ==="MOVE"){
                const game = this.games.find(game=>(game.player1==socket ||game.player2==socket));
                if(game){
                    game.makeMove(socket,message.move);
                }
            }
        })
    }

}