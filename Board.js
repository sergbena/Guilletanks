"use strict";
// ----------------- Requires ----------------- //
const Tile = require('./Tile.js');
const Elements = require('./Elements.js');
// Clase que define el tablero del juego
class board {
   // Constructor donde se le pasa el numero de filas y columnas y un nombre del mismo.
    constructor(rows,columns,name){
        this._rows = rows;
        this._columns = columns;
        this._name = name;
		this._users = new Map();
		this._bullets = new Map();
		this._timer = new setInterval(this.playGame,3000, this);
		this._ended = false;
		this._started = false;
		
		// Se crea un array de filas
        this._board = new Array(rows);
        for (let i = 0; i < rows; i++) {
           // Se crea un array de columnas dentro de cada array de filas
            this._board[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                this._board[i][j] = new Tile(i, j);
            }
        }
    }
    // ---------------------- Getters ---------------------- //
    // Devuelve el nombre del tablero
    get name(){
        return this._name;
    }
    // Devuelve las filas del tablero
    get rows(){
        return this._rows;
    }
    // Devuelve las columnas del tablero
    get columns(){
        return this._columns;
    }
    // Devuelve las filas y columnas del tablero
    get board(){
        return this._board;
    }
	get users(){
		return this._users;
	}
	get bullets(){
		return this._bullets;
	}
	get ended(){
		return this._ended;
	}
	get started(){
		return this._started;
	}
    // Devuelve el interior de todas las casillas del tablero
    get info(){
        let full = [];
        for (let i=0;i <this._rows;i++){
            for (let j=0;j <this._columns;j++){
                if (this._board[i][j].hasBullets != null) {
                    full.push(this._board[i][j].In);
                }
            }
        }
        return full;
    }
	get vehicles(){
		let vehicles = new Map();
		for (let i=0;i <this._rows;i++){
            for (let j=0;j <this._columns;j++){
                if (this._board[i][j].hasBullets == false) {
					if (this._board[i][j].In.type == "vehicle")
						vehicles.set(this._board[i][j].In.id, this._board[i][j].In);
                }
            }
        }
        return vehicles;
	}
	
// -------------------------- Functions --------------------------- //
	trueComprobation(user){
		return this._users.get(user);
	}
	setFalse(user){
		this._users.set(user,false);
	}
	setAllTrue(){
		for(let key of this._users.keys()){
			this._users.set(key,true);
		}
	}
      // Funcion que inserta un objeto en una casilla, siempre que esté dentro de los limites
    setIn(r,c,object){
        if (r < 0 || r > this._rows - 1 || c < 0 || c > this._columns - 1) {
            console.log("Error: Fuera de rango");
        } else {
            this._board[r][c].In = object;
            object.pos = this._board[r][c].pos;
        }
    }
    // Funcion que inserta un vehiculo en una casilla random de la partida
	setInRandom(vehicle){
		let Rran = Math.floor(Math.random()*this._rows);
		let Cran = Math.floor(Math.random()*this._columns);
		let orIndx = Math.floor(Math.random()*4);
		let orientations = ["north","south","east","west"];
		if (this.info.length != this._rows * this._columns){
			while (this._board[Rran][Cran].hasBullets != null){
				Rran =Math.floor(Math.random()*this._rows);
				Cran = Math.floor(Math.random()*this._columns);
            orIndx = orIndx = Math.floor(Math.random()*4);
			}
			if (this._board[Rran][Cran].hasBullets == null){
				vehicle.orientation = orientations[orIndx];
				this.setIn(Rran,Cran,vehicle);
			}
		} else {
			console.log("Error: Mapa lleno");
		}
		
	}
   // Encuentra un objeto por su id
	findObject(id){
		let info = this.info;
		for (let value of info){
			if (value.length){
				for (let object of value){
					if (object.id == id){
						return object;
					}
				}
			} else {
				if (value.id == id){
					return value;
				}	
			}
		}
		return false;
	}
   // Devuelve la casilla siguiente a un objeto, según donde esté mirando
   nextTile(object){
      let veh = object.pos;
      switch (veh.o){
         case "north":if(veh.r>0){return this.board[veh.r-1][veh.c]}else{return false};
         case "east":if(veh.c<this.columns-1){return this.board[veh.r][veh.c+1]}else{return false};
         case "south":if(veh.r<this.rows-1){return this.board[veh.r+1][veh.c]}else{return false};
         case "west":if(veh.c>0){return this.board[veh.r][veh.c-1]}else{return false};
      }
   }
   // Hola
   findMove (object,next){
	   next.In = object;
	   if (object.type=="bullet"){
		   this.deleteIn(object);
	   } else {
		   this._board[object.pos.r][object.pos.c].clearIn();
	   }
	   object.pos = next.pos;
   }
   deleteBullet(object){
	   this.deleteIn(object);
	   this._bullets.delete(object.id);
   }
   // Funcion que mueve un objeto a su casilla siguiente
	move(id){
      let object = this.findObject(id);
		let next = this.nextTile(object);  
	  if (object.type=="bullet" && next == false){
		  this.deleteBullet(object);
		  return;
	  }
	  if (object.move){
		if (next){
			if (!next.hasBullets){
				if (next.In.type=="vehicle"){
					if (object.type=="vehicle"){
						next.In.hpOnGame -=2;
						object.hpOnGame--;
						return;
					} else if (object.type=="bullet"){
						next.In.hpOnGame -= object.damage;
						this.deleteBullet(object);
						return;
					}
				} else {
					if (next.In.type!="rock"){
							this.findMove(object,next);
							return;  
					} else if (object.type =="bullet"){
						this.deleteBullet(object);
						return;
					}
				}
			} else {
				if (object.type=="vehicle"){
					for (let value in next.In){
						this.deleteBullet(next.In[value]);
						object.hpOnGame--;
					}
				}
				this.findMove(object,next);
				return;
			}
		}
	  }
	}
	moveBullets(){
		for (let value of this.bullets.values()){
			this.move(value.id);
		}
	}
   rotate(id,direction){
      let object = this.findObject(id);
      let orientations = ["north", "east", "south", "west"];
      let index = orientations.indexOf(object.pos.o);
      switch (direction) {
		 case "right": object.orientation = orientations[(++index)%orientations.length]; break;
         case "left": if (index == 0) { object.orientation = orientations[orientations.length - 1]; }
         else { object.orientation = orientations[index - 1]; } break;
      }
   }
   deleteIn(object){
		if (object.type == "bullet") {
		   this._board[object.pos.r][object.pos.c].deleteFromIn(object);
		} else {
		   this._board[object.pos.r][object.pos.c].clearIn();
		}
   }
   shoot(id){
	   let object = this.findObject(id);
	   let next = this.nextTile(object);
	   if (object.ammoOnGame>0){
		   object.ammoOnGame--;
		if(next){
			if (!next.hasBullets && next.In.type == "vehicle"){
				next.In.hpOnGame -= object.damage;
			} else if (next.In.type !="rock"){
				let bullet = new Elements.Bullet(object.pos.o,object.damage);
				this._bullets.set(bullet.id,bullet);
				this.setIn(next.pos.r,next.pos.c,bullet);
			}
		}
	   }

   }
   endComprobation(){
	   let vehicles = this.vehicles;
	   for (let value of vehicles.values()){
		  if (value.hpOnGame <= 0){
			  this.deleteIn(value);
		  }
	   }
	   if (this._started){
			if (vehicles.size<2){
				clearInterval(this._timer);
				this._ended = true;
			} 
	   } else {
		   if (vehicles.size>1){
			   this._started=true;
		   }
	   }
   }
   // Parametro PAR para usar como this, ya que el timer no se usa dentro de la clase
   playGame(par){
	   par.moveBullets();
	   par.endComprobation();
	   par.setAllTrue();
   }
   whoWon(){
	   let veh=this.vehicles;
	   if (veh.size>0){
			for (let tank of veh.values()){
				return tank.name;
			}	  
	   } else {
		   return "empate";
	   }
  
   }
   isUser(user){
	   if(this._users.get(user)!=undefined){
		   return true;
	   } else {
		   return false;
	   }
   }
   exitUser(user,vehicle){
	   if(this._users.get(user)!=undefined){
		   this._users.delete(user);
		   if (this.findObject(vehicle.id)){
			   this.deleteIn(vehicle);
		   }
	   }
   }
}
// Export

module.exports = board;