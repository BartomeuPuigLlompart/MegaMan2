var platformer = platformer || {};

platformer.propTop = function(_game,_x,_y,_speed,_direction,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'propTop');
    this.anchor.setTo(.5);
    this.level = _level;
    this.speed = _speed;
    this.direction = _direction;
    _game.add.existing(this);
    this.animations.add('propTop',[0, 1, 2, 3, 4, 5, 6],30,true);
    this.animations.add('propTop_fly',[7, 8, 9, 10, 11, 12, 13],30,true);
    this.animations.play('propTop_fly');
    _game.physics.arcade.enable(this);
    this.body.allowGravity = true;
    this.frameCount = 180;
    this.target = 0;
    this.initialX = this.position.x;
    
};


platformer.propTop.prototype = Object.create(Phaser.Sprite.prototype);
platformer.propTop.prototype.constructor = platformer.propTop;

platformer.propTop.prototype.update = function(){
    this.frameCount++;
    if(this.level.megaman.position.x > this.position.x)
        {
            this.scale.x = -1;
        }
    else
        {
            this.scale.x = 1;
        }
    if(this.body.blocked.down)
        {
            if(this.frameCount > 60 && this.frameCount < 180)
            {
            this.animations.play('propTop_fly');
            this.frameCount = 0;
            this.body.velocity.y = this.speed*this.direction;
            }
            else if(this.frameCount > 180)
                {
                this.animations.play('propTop');
                this.frameCount = 0;
                }
        }
    else if(!this.body.blocked.down)
        {
            if(this.frameCount < 180)
                {
                    this.initialX = this.position.x;
                    this.target = this.level.megaman.position.x - this.initialX;
                    this.body.velocity.y = this.speed*this.direction;
                }
            else if(((this.frameCount - 180) / 33) <= 1)
                {
                this.body.position.x = this.initialX + this.target * ((this.frameCount - 180) / 33);
                }
        }    
};