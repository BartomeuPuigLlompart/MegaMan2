var platformer = platformer || {};

    var health = 10;
    var attackDist = 100;
    var maxDist = 300;
    var jumpSpeed = 300;
    var direction = 1;
platformer.walker = function(_game,_x,_y,_tag,_level){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    this.game=_game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0);
    this.level=_level;
    this.body.immovable = true;
    this.timer = this.game.time.create(false);
    this.timer.loop(2000, this.jump, this);
    this.timer.start();
    this.game = _game;
    this.level = _level;
};


platformer.walker.prototype = Object.create(Phaser.Sprite.prototype);
platformer.walker.prototype.constructor = platformer.walker;

platformer.walker.prototype.update = function(){
    if(!this.inCamera) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    
 //Whatever
    this.game.physics.arcade.collide(this,this.level.walls);

    
    if(this.x - this.level.megaman.position.x < 0) direction = 1;
    else direction = -1
    this.scale.x = direction;
    if(this.body.blocked.down){
        this.body.velocity.x = 0;
        this.animations.stop();
        this.frame = 0;
    }
    this.game.physics.arcade.collide(this,this.level.bullets,this.damage);
    
};

platformer.walker.prototype.jump = function(){
    if(this.body){
        if(Phaser.Math.distance(this.level.megaman.position.x,this.level.megaman.position.y,this.x,this.y) > attackDist && this.body.blocked.down && Phaser.Math.distance(this.level.megaman.position.x,this.level.megaman.position.y,this.x,this.y) < maxDist){
            this.animations.play('jump');
            this.body.velocity.y = -jumpSpeed;
            this.body.velocity.x = jumpSpeed / 3 * direction;
        }
    }
}
platformer.walker.prototype.damage = function(_walker,_bullet){
 //Whatever
    //console.log('entro o no?');
    health--;
    if(health == 0){ 
        platformer.level1.sniper.position.x = _walker.position.x;
        _walker.kill();
        platformer.level1.dismount = true;
    }
    _bullet.destroy();
};