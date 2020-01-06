var platformer = platformer || {};

platformer.heatman = function(_game,_x,_y,_speed,_direction,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'heatman');
    this.anchor.setTo(.5);
    this.game = _game;
    this.level = _level;
    this.speed = _speed;
    this.direction = _direction;
    this.health = 28;
    _game.add.existing(this);
    this.animations.add('heatman_fall',[0],60,true);
    this.animations.add('heatman_transition',[1, 2, 3, 4],5,false);
    this.animations.add('heatman_atack',[5, 6, 7, 8],2,false);
    this.animations.add('heatman_firemove',[9, 10, 11, 12, 13, 14, 15, 16, 17,18, 19],10,false);
    this.actualAnim = this.animations.play('heatman_fall');
    

    
    _game.physics.arcade.enable(this);
    this.body.allowGravity = true;
    this.body.setSize(20, 25, this.body.offset.x+16, this.body.offset.y+16);
    this.shot = false;
    this.spawn = false;
};


platformer.heatman.prototype = Object.create(Phaser.Sprite.prototype);
platformer.heatman.prototype.constructor = platformer.heatman;

platformer.heatman.prototype.update = function(){
    if(this.level.stage != 6 && this.spawn == false) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        return;
    }
    else this.spawn = true;
    
    if(this.level.megaman.position.x > this.position.x)
        {
            this.scale.x = -1;
            if(this.actualAnim != this.animations.getAnimation('heatman_firemove'))this.direction = 1;
        }
    else
        {
            this.scale.x = 1;
            if(this.actualAnim != this.animations.getAnimation('heatman_firemove'))this.direction = -1;
        }
    
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.bullets,this.damage);

    if(this.actualAnim == this.animations.getAnimation('heatman_firemove') && this.actualAnim.currentFrame.index > 11 && this.actualAnim.currentFrame.index < 17)
        {
            this.body.setSize(45, 20, 0, this.body.offset.y);
            this.body.velocity.x = this.speed * this.direction;
        }
    else {
        this.body.setSize(20, 25, 16, this.body.offset.y);
        this.body.velocity.x = 0;
        if(this.actualAnim == this.animations.getAnimation('heatman_atack') && this.actualAnim.currentFrame.index == 7 && this.shot == false)
        {
            this.shot = true;
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,1,this.level.megaman.body.center.x,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.9,this.level.megaman.body.center.x,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.8,this.level.megaman.body.center.x,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.7,this.level.megaman.body.center.x,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.6,this.level.megaman.body.center.x,this.level);
            
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,1,this.level.megaman.body.center.x + 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.9,this.level.megaman.body.center.x + 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.8,this.level.megaman.body.center.x + 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.7,this.level.megaman.body.center.x + 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.6,this.level.megaman.body.center.x + 50,this.level);
            
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,1,this.level.megaman.body.center.x - 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.9,this.level.megaman.body.center.x - 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.8,this.level.megaman.body.center.x - 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.7,this.level.megaman.body.center.x - 50,this.level);
            new platformer.fireatack(this.game,this.body.center.x + 20*this.direction,this.body.center.y,0.6,this.level.megaman.body.center.x - 50,this.level);
        }
        else if(this.actualAnim == this.animations.getAnimation('heatman_atack') && this.actualAnim.currentFrame.index == 8) this.shot = false;
    }
    
    if(this.body.blocked.down && this.animations.getAnimation('heatman_fall').isPlaying) this.actualAnim = this.animations.play('heatman_transition');
    if(this.actualAnim.isFinished && this.actualAnim == this.animations.getAnimation('heatman_transition')) {
        if(Phaser.Point.distance(new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y), new Phaser.Point(this.position.x, this.position.y)) < 100) this.actualAnim = this.animations.play('heatman_firemove');
        else this.actualAnim = this.animations.play('heatman_atack');
        if(this.health < 28 / 2 && this.health > 28 / 4) this.animations.getAnimation('heatman_transition').speed = 10;
        else if(this.health < 28 / 4) this.animations.getAnimation('heatman_transition').speed = 20;
    }
    else if(this.actualAnim.isFinished){
        this.actualAnim = this.animations.play('heatman_transition');
    }
}
platformer.heatman.prototype.damage = function(_heatman, _bullet){
 //Whatever
    _heatman.health--;
    if(_heatman.health == 0){ 
        _heatman.kill();
    }
    _bullet.destroy();
};