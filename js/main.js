var platformer = platformer || {};

var gameOptions={
    gameWidth:512,
    gameHeight:480,
    level1Width:1280,
    level1Height:800,
    heroGravity:800,
    heroSpeed:100,
    heroJump:300,
    bulletSpeed:300
}

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

platformer.game.state.add('menu',platformer.menu);

platformer.game.state.add('main',platformer.level1);

platformer.game.state.add('introd',platformer.introduc);

platformer.game.state.start('introd');






