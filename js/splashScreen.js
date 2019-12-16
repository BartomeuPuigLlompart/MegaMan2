var platformer = platformer || {};

var _bg,_men,_cuadrado;
var keyR, keyL, keyU, keyD, cursores,flag,spacebar,flipFlop;
var _link;

platformer.splashScreen ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth / 2,gameOptions.gameHeight / 2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
           },
    preload:function(){ //cargar assets
        this.stage.backgroundColor='#000000';
       var ruta='assets/sprites/';
      
         this.load.spritesheet('personajes',ruta+'introAnim.png',255,224);
       
      
    },
    create:function(){ //pintamos assets
       
      
          this.intro=this.game.add.sprite(10,10,'personajes',0);
       
      
             
        this.intro.animations.add('run',[1,2],6,true);
      
    },
    update:function(){ //actualizamos assets
        //_bg.tilePosition.x--;
       
         
        this.intro.animations.play('run');
    }
};








