var platformer = platformer || {};

    var health = 10;
platformer.sniper = function(_game,_x,_y,_tag,_level){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    this.game=_game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0);
    this.level=_level;
    this.body.immovable = true;
    this.timer = this.game.time.create(false);
    //this.timer.loop(2000, this.attack, this);
    this.timer.start();
};


platformer.sniper.prototype = Object.create(Phaser.Sprite.prototype);
platformer.sniper.prototype.constructor = platformer.sniper;

platformer.sniper.prototype.update = function(){
    if(!this.inCamera) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    
 //Whatever
    if(this.body){
        this.game.physics.arcade.collide(this,this.level.walls);


        if(this.x - this.level.megaman.position.x < 0) direction = 1;
        else direction = -1
        this.scale.x = direction;
        this.game.physics.arcade.collide(this,this.level.bullets,this.damage);
    }
};

platformer.sniper.prototype.jump = function(){
    if(this.body){
    }
}
platformer.sniper.prototype.damage = function(_sniper,_bullet){
    health--;
    console.log(health);
    if(health == -10){ 
        _sniper.kill();
    }
    _bullet.destroy();
};