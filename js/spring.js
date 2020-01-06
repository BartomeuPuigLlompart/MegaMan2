var platformer = platformer || {};


    var speed = 30;
    var direction = 1;
    var maxDist = 100;
    var attackDist = 50;
    var playing = false;
platformer.spring = function(_game,_x,_y,_tag,_level){
    Phaser.Sprite.call(this,_game,_x,_y,_tag);
    this.game=_game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0);
    this.level=_level;
    this.body.immovable = true;
    this.timer = this.game.time.create(false);
    this.timer.loop(500, this.turn, this);
    this.frame = 2;
    this.body.allowGravity = true; 
    this.anchor.setTo(0.5, 0.9);
    this.body.setSize(16, 11, this.body.offset.x, this.body.offset.y);
    this.health = 3;
};


platformer.spring.prototype = Object.create(Phaser.Sprite.prototype);
platformer.spring.prototype.constructor = platformer.spring;

platformer.spring.prototype.update = function(){
    
    if(!this.inCamera) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        //return;
    }
    
 //Whatever
    this.game.physics.arcade.collide(this,this.level.walls);
    if(this.body.blocked.down || this.body.allowGravity == false)
    {
            this.body.allowGravity = false; 
    
    
    if(this.x - this.level.megaman.x < 0) direction = 1;
    else direction = -1
        
    if(this.x - this.level.megaman.x <= maxDist && this.x - this.level.megaman.x >= -maxDist)
    {
        this.body.velocity.x = speed * direction;
        if(this.x - this.level.megaman.x <= attackDist && this.x - this.level.megaman.x >= -attackDist)
        {
            if(!playing){
                this.animations.play('attack');
                playing = true;
            }
            if(this.frame == 0){
                playing = false;
                this.timer.start();
            }
        }
        else{
            this.animations.stop();
            playing = false;
            this.frame = 2;
            this.body.allowGravity = true; 
            this.scale.x = direction;
            //this.body.setSize(16, 11, this.body.offset.x / 2, this.body.offset.y / 2);
        }
    }
    }
    this.game.physics.arcade.collide(this,this.level.bullets,this.damage);
    

    
};
platformer.spring.prototype.turn = function(){
    this.scale.x *= -1;
    
}
platformer.spring.prototype.damage = function(_spring,_bullet){
 //Whatever
    console.log(this.health);
    _spring.health--;
    if(_spring.health == 0){ 
        _spring.kill();
    }
    _bullet.destroy();
};