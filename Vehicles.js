"use strict";
class Vehicle {
    constructor(name) {
        this._id=Math.random();
        this._name = name;
        this._type="vehicle";
    }
    get id(){
        return this._id;
    }
    get type() {
        return this._type;
    }
    get hp() {
        return this._hp;
    }
    get category(){
        return this._category;
    }
    set orientation(value) {
        this._orientation = value;
    }
    set hp(value) {
        this._hp = value;
    }
    set pos(value) {
        this._row = value.r;
        this._column = value.c;
    }
    get pos() {
        return ({
            r: this._row,
            c: this._column,
            o: this._orientation
        });
    }
    get name() {
        return this._name;
    }
    get info() {
        return ({
            t: this._type,
            cat:this._category,
            r: this._row,
            c: this._column,
            o: this._orientation,
            n: this._name,
            hp: this._hp,
            speed:this._speed,
            ammo:this._ammo
        });
    }
}




class Tank extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=10;
        this._category = "tank";
    }
}

class Bicycle extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=1;
        this._category = "bicycle";     
    }
}

class Hovercraft extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=3;
        this._category = "hovercraft";   
    }
}

class Unicorn extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=2;
        this._category = "unicorn";   
    }
}
class Stone extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=25;
        this._category = "stone";   
    }
}
class Bunker extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=15;
        this._category = "bunker";     
    }
}
class Scooter extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=1;
        this._category = "scooter";    
    }
}
class Transformer extends Vehicle {
    constructor(name) {
        super(name);
        this._hp=30;
        this._category = "transformer";      
    }
}

module.exports = {
  Tank : Tank,
  Bicycle : Bicycle,
  Hovercraft : Hovercraft,
  Unicorn:Unicorn,
  Stone:Stone,
  Bunker:Bunker,
  Scooter:Scooter,
  Transformer:Transformer
}