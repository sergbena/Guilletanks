"use strict";
class Rock {
  //-----------------------------------------------------------------------------------------------------------------//
  //Constructor//Rock//
  /*Gets:Nothing
   *Sets:String(type)*/
  //-----------------------------------------------------------------------------------------------------------------//
  constructor() {
    this._type = "rock";
  }
  //-----------------------------------------------------------------------------------------------------------------------//
  //Getters//
  //-----------------------------------------------------------------------------------------------------------------------//
  /*type
   *Returns: String*/
  get type() {
    return this._type;
  }
  /*pos
   *Returns: Object(its position)
   *{r->int(row)
   *c->int(column)}*/
  get pos() {
    return ({
      r : this._row,
      c : this._column
    });
  }
  /*info
   *Returns: Object(all of its information)
   *{t->String(type)
   *r->int(row)
   *c->int(column)}*/
  get info() {
    return ({
      t : this._type,
      r : this._row,
      c : this._column,
    });
  }
  //-----------------------------------------------------------------------------------------------------------------------//
  //Setters//
  //-----------------------------------------------------------------------------------------------------------------------//
  /*pos
   *Receives:Object(a "pos" object, at least{r(int),c(int)})
   *Sets:the new position values(r(int) and c(int))*/
  set pos(value) {
    this._row = value.r;
    this._column = value.c;
  }
}

class Bullet {
  //-----------------------------------------------------------------------------------------------------------------------//
  //Constructor//Bullet//
  /*Gets:String(o->orientation)
   *Sets:String(o) and String(type)*/
  //-----------------------------------------------------------------------------------------------------------------------//
  constructor(o) {
    this._orientation = o;
    this._type = "bullet";
  }
  //-----------------------------------------------------------------------------------------------------------------------//
  //Getters//
  //-----------------------------------------------------------------------------------------------------------------------//
  /*type
   *Returns: String*/
  get type() {
    return this._type;
  }
  /*pos
   *Returns: Object(its position)
   *{r->int(row)
   *c->int(column)
   *o->String(orientation)}*/
  get pos() {
    return ({
      r : this._row,
      c : this._column,
      o : this._orientation
    });
  }
  /*info
   *Returns: Object(all of its information)
   *{t->String(type)
   *r->int(row)
   *c->int(column)
   *o->String(orientation)}*/
  get info() {
    return ({
      t : this._type,
      r : this._row,
      c : this._column,
      o : this._orientation
    });
  }
  //-----------------------------------------------------------------------------------------------------------------------//
  //Setters//
  //-----------------------------------------------------------------------------------------------------------------------//
  /*pos
   *Receives:Object(a "pos" object, at least{r(int),c(int)})
   *Sets:the new position values(r(int) and c(int))*/
  set pos(value) {
    this._row = value.r;
    this._column = value.c;
  }
}
//-----------------------------------------------------------------------------------------------------------------------//
//Exports//Object{class Tank,class Rock and class Bullet}//
//-----------------------------------------------------------------------------------------------------------------------//
module.exports = {
  Rock : Rock,
  Bullet : Bullet
}