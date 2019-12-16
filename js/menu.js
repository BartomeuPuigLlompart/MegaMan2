var platformer = platformer || {};

var _bg,_menu,_cuadrado;
var keyR, keyL, keyU, keyD, cursores,flag,spacebar,flipFlop;
var _link;

platformer.menu ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight / 2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
           },
    preload:function(){ //cargar assets
        this.stage.backgroundColor='#000000';
       var ruta='assets/sprites/';
       this.load.image('menu',ruta+'MenuM.png');
         this.load.spritesheet('personajes',ruta+'Personajes.png',32,33);
        this.load.spritesheet('cuadrados',ruta+'Cuadrados.png',49,65);
      
    },
    create:function(){ //pintamos assets
       
       _menu = this.game.add.image(100,00,'menu');
        
      
        _menu.scale.setTo(1);
    
        _bg=this.game.add.sprite(148,29,'personajes');
        _bg.scale.setTo(1);
         _bg=this.game.add.sprite(212,29,'personajes');
        _bg.frame=1;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(274,29,'personajes');
        _bg.frame=2;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(149,94.5,'personajes');
        _bg.frame=3;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(212,94.5,'personajes');
        _bg.frame=4;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(274,95,'personajes');
        _bg.frame=5;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(149,159,'personajes');
        _bg.frame=6;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(212,159,'personajes');
        _bg.frame=7;
        _bg.scale.setTo(1);
        _bg=this.game.add.sprite(274,159,'personajes');
        _bg.frame=8;
        _bg.scale.setTo(1);
         
      
        _cuadrado=this.game.add.sprite(203,78,'cuadrados');
        _cuadrado.frame=1;
        _cuadrado.scale.setTo(1);
        
     
       
       cursores=this.game.input.keyboard.createCursorKeys();
        
        this.spacebar=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
      
    },
    update:function(){ //actualizamos assets
        //_bg.tilePosition.x--;
       
         if(this.spacebar.isDown&&_cuadrado.position.x>100&&_cuadrado.position.x<160&&_cuadrado.position.y>50&&_cuadrado.position.y<100){
            
            this.game.state.start('main');
        }
        else{
            spacebar=false;
        }
        if(cursores.right.isDown&&_cuadrado.position.x<240){
            if (!flipFlop) {
           
            _cuadrado.position.x+=64;
            flipFlop=true;
            }
            
        }else
        if(cursores.left.isDown&&_cuadrado.position.x>140){
            if (!flipFlop) {
           
            _cuadrado.position.x-=64;
                flipFlop=true;
            }
        }else
        if(cursores.up.isDown&&_cuadrado.position.y>50){
            if (!flipFlop) {
            
           _cuadrado.position.y-=64;
                flipFlop=true;
            }
           
        }else
        if(cursores.down.isDown&&_cuadrado.position.y<130){
            if (!flipFlop) {
         
            _cuadrado.position.y+=64;
                
                flipFlop=true;
            }
        }else
        if(cursores.right.isUp) {
        flipFlop = false;
    }
       
        
    }
};








