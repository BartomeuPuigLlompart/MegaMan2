var platformer = platformer || {};

    var time = 2000;

platformer.block = function(_game,_x,_y,_tag,_level, _startTime){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    this.game=_game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5);
    this.level=_level;
    this.body.immovable = true;
    this.timer = this.game.time.create(false);
    this.timer.add(_startTime, this.start, this);
    this.timer.start();
    this.game = _game;
    this.level = _level;
    this.body.allowGravity = false; 
    this.started = false;
    this.see = false;
};


platformer.block.prototype = Object.create(Phaser.Sprite.prototype);
platformer.block.prototype.constructor = platformer.block;

platformer.block.prototype.update = function(){
                this.game.physics.arcade.collide(this,this.level.megaman,this.jumper);
};

platformer.block.prototype.change = function(){
    if(this.see == true){
        this.position.y += 1000;
        this.position.x += 1000;
        this.see = false;
        console.log("+");
                    console.log(this.position.x);
    }
    else{
        this.see = true;
        this.position.y -= 1000;
        this.position.x -= 1000;
                    console.log("-");
        console.log(this.position.x);
    }
};

platformer.block.prototype.start = function(){
    if(this.started == false){
        console.log("HI");
        this.timer2 = this.game.time.create(false);
        this.timer2.loop(time, this.change, this);
        this.timer2.start();
        this.started = true;
    }
};

platformer.block.prototype.jumper = function(_block,_megaman){
console.log("asi e");
_megaman.canJump = true;
};
 
