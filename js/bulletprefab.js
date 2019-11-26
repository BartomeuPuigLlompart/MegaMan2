var platformer = platformer || {};

platformer.bulletPrefab = function(game,x,y){
    Phaser.Sprite.call(this,game,x,y,'bullet');
    this.anchor.setTo(.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.allowGravity = false;
};

platformer.bulletPrefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.bulletPrefab.prototype.constructor = platformer.bulletPrefab;