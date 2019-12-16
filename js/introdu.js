var platformer = platformer || {};

var _bg,_menu,_flecha;
var keyR, keyL, keyU, keyD, cursores,flag,spacebar,flipFlop;
var _link;

platformer.introduc ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth ,gameOptions.gameHeight);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
           },
    preload:function(){ //cargar assets
        this.stage.backgroundColor='#000000';
       var ruta='assets/sprites/';
       this.load.image('menu',ruta+'intro.PNG');
         this.load.image('flecha',ruta+'flecha.PNG');
        this.load.audio('intro','assets/music/introduction.mp3');
        
      
    },
    create:function(){ //pintamos assets
       
       _menu = this.game.add.image(-10,40,'menu');
        
      
       _menu.scale.setTo(0.7);
        
       _flecha=this.game.add.image(80,343,'flecha');
        
       _flecha.scale.setTo(0.7);
        
       cursores=this.game.input.keyboard.createCursorKeys();
        
        this.spacebar=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
      
    },
    update:function(){ //actualizamos assets
      
        this.intro=this.game.add.audio('intro');
        this.intro.volume = 0.01;
        this.intro.play();
         if(this.spacebar.isDown){
            this.game.sound.stopAll();
            this.game.state.start('menu');
            
        }

        if(cursores.up.isDown){
            if (!flipFlop) {
            
           _flecha.position.y=343;
                flipFlop=true;
            }
           
        }else
        if(cursores.down.isDown){
            if (!flipFlop) {
           
            _flecha.position.y=373;
                
                flipFlop=true;
            }
        }else
        if(cursores.right.isUp) {
        flipFlop = false;
    }
       
        
    }
};