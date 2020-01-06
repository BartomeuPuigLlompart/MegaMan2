var platformer = platformer || {};

platformer.fireatack = function(_game,_x,_y,_bounce, _target, _level){
    Phaser.Sprite.call(this,_game,_x,_y,'fireatack');
    this.anchor.setTo(.5);
    this.level = _level;
    _game.add.existing(this);
    this.animations.add('fireatack',[0, 1, 2],10,true);
    this.actualAnim = this.animations.play('fireatack');
    _game.physics.arcade.enable(this);
    this.body.allowGravity = true;
    this.initialX = _x;
    this.target = _target - this.position.x;
    this.body.velocity.y = -200;
    this.body.bounce.set(_bounce);
    this.collided = false;
};


platformer.fireatack.prototype = Object.create(Phaser.Sprite.prototype);
platformer.fireatack.prototype.constructor = platformer.fireatack;

platformer.fireatack.prototype.update = function(){
    if(!this.inCamera) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.kill();
        return;
    }
    this.game.physics.arcade.collide(this,this.level.walls);
    if(this.game.physics.arcade.overlap(this,this.level.megaman))
        {
            this.level.megaman.inmuFrames = 0;
    this.level.megaman.lifeFrames += 1;
    if(this.level.megaman.lifeFrames >= 28){
        this.level.game.sound.stopAll();
            this.game.state.start('main');
        }
    this.kill();
        }
    
    if(this.body.blocked.down == false && this.collided == false){
        this.body.velocity.y += 0.01;
    this.body.position.x += this.target * 0.033;
    }
    else if(this.body.blocked.down == true && this.collided == true) this.kill();
    else if(this.collided == false) this.collided = true;
}