var platformer = platformer || {};

platformer.silverWatcher = function(_game,_x,_y,_speed,_direction,_level){
    Phaser.Sprite.call(this,_game,_x,_y,'silverWatcher');
    this.anchor.setTo(.5);
    this.level = _level;
    this.speed = _speed;
    this.health = 1;
    this.directionX = this.directionY = _direction;
    _game.add.existing(this);
    this.animations.add('silver_Watcher',[0, 1, 2, 3, 4, 5],10,true);
    this.animations.play('silver_Watcher');
    _game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(this.body.width - 2, this.body.height, this.body.offset.x + 1, this.body.offset.y);
    this.tileTarget = this.level.map.getTileWorldXY(this.position.x, this.position.y, 16, 16, 'World');
};


platformer.silverWatcher.prototype = Object.create(Phaser.Sprite.prototype);
platformer.silverWatcher.prototype.constructor = platformer.silverWatcher;

platformer.silverWatcher.prototype.update = function(){
    if(!this.inCamera) {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        return;
    }
    if(Phaser.Point.distance(new Phaser.Point(this.position.x, this.position.y), new Phaser.Point(this.tileTarget.worldX, this.tileTarget.worldY)) < 16)
        {
            var myTilePos = this.level.map.getTileWorldXY(this.position.x, this.position.y, 16, 16, 'World');
            var minDist = 0;
            var minDistTile = myTilePos;
            if(myTilePos.y - 1 >= 0){
            //Above
            minDistTile = this.level.map.getTile(myTilePos.x, myTilePos.y - 1, 'World');//this.level.map.getTileAbove(this.level.map.getLayerIndex('World'), myTilePos.x, myTilePos.y);
            minDist = Phaser.Point.distance(new Phaser.Point(minDistTile.worldX, minDistTile.worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y));
            this.directionX = 0;
            this.directionY = -1;
            }
            
            //Below
            if(myTilePos.y + 1 <= this.level.map.height && Phaser.Point.distance(new Phaser.Point(this.level.map.getTile(myTilePos.x, myTilePos.y + 1, 'World').worldX, this.level.map.getTile(myTilePos.x, myTilePos.y + 1, 'World').worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y)) < minDist)
                {
            minDistTile = this.level.map.getTile(myTilePos.x, myTilePos.y + 1, 'World');//this.level.map.getTileBelow('World', myTilePos.x, myTilePos.y);
            minDist = Phaser.Point.distance(new Phaser.Point(minDistTile.worldX, minDistTile.worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y));
            this.directionX = 0;
            this.directionY = 1;
                }
            
            //Left
            if(myTilePos.x - 1 >= 0 && Phaser.Point.distance(new Phaser.Point(this.level.map.getTile(myTilePos.x - 1, myTilePos.y, 'World').worldX, this.level.map.getTile(myTilePos.x - 1, myTilePos.y, 'World').worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y)) < minDist)
                {
            minDistTile = this.level.map.getTile(myTilePos.x - 1, myTilePos.y, 'World');//this.level.map.getTileLeft('World', myTilePos.x, myTilePos.y);
            minDist = Phaser.Point.distance(new Phaser.Point(minDistTile.worldX, minDistTile.worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y));
            this.directionX = -1;
            this.directionY = 0;
            this.scale.x = -1;
                }
            
            //Right
            if(myTilePos.x + 1 <= this.level.map.width && Phaser.Point.distance(new Phaser.Point(this.level.map.getTile(myTilePos.x + 1, myTilePos.y, 'World').worldX, this.level.map.getTile(myTilePos.x + 1, myTilePos.y, 'World').worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y)) < minDist)
                {
            minDistTile = this.level.map.getTile(myTilePos.x + 1, myTilePos.y, 'World'); //= this.level.map.getTileRight('World', myTilePos.x, myTilePos.y);
            minDist = Phaser.Point.distance(new Phaser.Point(minDistTile.worldX, minDistTile.worldY), new Phaser.Point(this.level.megaman.position.x, this.level.megaman.position.y));
            this.directionX = 1;
            this.directionY = 0;
            this.scale.x = 1;
                }
            this.tileTarget = minDistTile;
        }
    this.body.velocity.x = this.speed*this.directionX;
    this.body.velocity.y = this.speed*this.directionY;
    
    this.game.physics.arcade.overlap(this,this.level.bullets,this.damage); 
}
platformer.silverWatcher.prototype.damage = function(_silverWatcher, _bullet){
 //Whatever
    _silverWatcher.health--;
    if(_silverWatcher.health == 0){ 
        _silverWatcher.kill();
    }
    _bullet.destroy();
};