var platformer = platformer || {};

var _bg,_menu,_flecha;
var keyR, keyL, keyU, keyD, cursores,flag,spacebar,flipFlop;
var _link;

platformer.introduc ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight / 2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
           },
    preload:function(){ //cargar assets
        this.stage.backgroundColor='#000000';
       var ruta='assets/sprites/';
       this.load.image('menu',ruta+'intro.PNG');
         this.load.image('flecha',ruta+'flecha.PNG');
        
      
    },
    create:function(){ //pintamos assets
       
       _menu = this.game.add.image(50,-40,'menu');
        
      
       _menu.scale.setTo(0.5);
        
       _flecha=this.game.add.image(106,176,'flecha');
        
       _flecha.scale.setTo(0.5);
        
       cursores=this.game.input.keyboard.createCursorKeys();
        
        this.spacebar=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
      
    },
    update:function(){ //actualizamos assets
      
       
         if(this.spacebar.isDown && _flecha.position.y==176){
            
            this.game.state.start('menu');
        }

        if(cursores.up.isDown){
            if (!flipFlop) {
            
           _flecha.position.y=176;
                flipFlop=true;
            }
           
        }else
        if(cursores.down.isDown){
            if (!flipFlop) {
           
            _flecha.position.y=198;
                
                flipFlop=true;
            }
        }else
        if(cursores.right.isUp) {
        flipFlop = false;
    }
       
        
    }
};








