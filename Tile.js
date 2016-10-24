"use strict";
  // Esta clase define las casillas del juego
class Tile {
  // Constructor con la fila y columna de la casilla
  constructor(r, c) {
    this._r = r;
    this._c = c;
    this._In = [];
	  this._hasBullets = null;    
  }

  // ------------ Setters ------------ //
  // Inserta un contenido en una casilla
  // Si es una bala, convierte la casilla en un array 
  // e indica que en esa casilla hay balas.
 set In(value) {
    if (value.type != "bullet") {
      this._In = value;
      this._hasBullets = false;
    } else {
      this._In.push(value);
      this._hasBullets = true;
    }
  }
  // ------------ Getters ------------ //
  // Devuelve la posicion de fila y columna
  get pos() {
    return ({
      r : this._r,
      c : this._c
    });
  }
  // Devuelve un boolean si hay balas o no en una casilla
  get hasBullets() {
    return this._hasBullets;
  }
  //Devuelve el contenido de una casilla
  get In() {
    return this._In;
  }
  // ------------ Funciones ------------ //
  // Borra el contenido de una casilla
  clearIn() {
    this._In = [];
	  this._hasBullets = null;
  }
  // Busca el indice de un valor en la casilla y lo borra (Esto se usa en arrays);
  deleteFromIn(value){
    this._In.splice(this._In.indexOf(value),1);
    if(this._In.length==0){
      this._hasBullets=null;
    }
  }
} // Acaba clase tile

// Exportación de la casilla
module.exports = Tile;
