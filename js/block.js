var platformer = platformer || {};

    var time = 2000;
    var started = false;

platformer.block = function(_game,_x,_y,_tag,_level, _startTime){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    this.game=_game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0);
    this.level=_level;
    this.body.immovable = true;
    this.timer = this.game.time.create(false);
    this.timer.add(_startTime, this.start, this);
    this.timer.start();
    this.game = _game;
    this.level = _level;
    this.body.allowGravity = false; 
};


platformer.block.prototype = Object.create(Phaser.Sprite.prototype);
platformer.block.prototype.constructor = platformer.block;

platformer.block.prototype.update = function(){
    this.game.physics.arcade.collide(this.level.megaman,this);
};

platformer.block.prototype.change = function(){
    if(this.visible == true) this.visible = false;
    else this.visible = true;
};

platformer.block.prototype.start = function(){
    if(started == false){
        this.timer2 = this.game.time.create(false);
        this.timer2.loop(time, this.change, this);
        this.timer2.start();
    }
};