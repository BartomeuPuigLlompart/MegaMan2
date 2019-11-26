var platformer = platformer || {};

platformer.megaman = function(_game,_x,_y,_speed,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'jumper');
    this.anchor.setTo(.5);
    this.animations.add('walk',[0,1,2,3],10,true);
    this.animations.play('walk');
    this.patrolA = _pointA;
    this.patrolB = _pointB;
    this.speed = _speed;
    this.direction = _direction;
    this.level = _level;
    this.game.physics.arcade.enable(this);
    this.chase = false;
    this.range = 100;
};

platformer.jumper_prefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.jumper_prefab.prototype.constructor = platformer.jumper_prefab;

platformer.jumper_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.body.velocity.x = this.speed*this.direction;
    //Giro al chocar con una pared
    if(this.body.blocked.right ||this.body.blocked.left){
        this.direction *=-1;
        this.scale.x = this.direction;
        this.body.velocity.x = this.speed*this.direction;
    }
};











