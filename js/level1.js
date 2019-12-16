var platformer = platformer || {};
var once=1;
var counter = 0;
var timer=0;
platformer.level1 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth / 2,gameOptions.gameHeight / 2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.heroGravity;
        
        this.game.world.setBounds(0,0,5120,1200);
        
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        this.load.image('bg',ruta+'MegaMan2HeatManMapBG.png');
        this.load.image('patron',ruta+'patron.png');
        this.load.image('Death',ruta+'patron.png');        
        this.load.image('bullet', ruta+'bullet.png');
        
       
        this.load.spritesheet('bloque', ruta+'bloquesM.png', 16, 17);
        
      this.load.tilemap('HeatManStage','assets/levels/HeatManStage.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.atlas('megaman', ruta + 'megaman.png', ruta +'megaman.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        
        this.load.spritesheet('healthbar', ruta+'healthbar.png', 8, 56);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        var ruta = 'assets/sounds/';
        
        this.load.audio('shoot',ruta+'shoot.wav');
        this.load.audio('endJump',ruta+'endJump.wav');
        
        this.load.audio('music','assets/music/levelSong.wav');
        
         
        this.shooting = false;
        
    },
    create:function(){
        this.bg = this.game.add.tileSprite(0,0,10240,2400,'bg');
        this.bg.scale.setTo(0.5, 0.5);
        this.map = this.game.add.tilemap('HeatManStage');
        this.map.addTilesetImage('patron');
        this.walls = this.map.createLayer('Walls');
        this.walls.setScale(0.5, 0.5);
        this.death = this.map.createLayer('Death');
        this.death.setScale(0.5, 0.5);
        this.map.setCollisionBetween(1,1,true,'Walls');
        this.map.setCollisionBetween(1,1,true,'Death');
       
        this.music=this.game.add.audio('music');
        this.music.play();
       

        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        this.healthbar = this.game.add.sprite(20, 10, 'healthbar', 0);
        this.healthbar.fixedToCamera = true;
        this.healthbar.fixedToCamera = true;
        
        this.bloques=this.add.group();
        this.bloques.enableBody=true;
        this.bloque = this.game.add.sprite(1900, 360, 'bloque');
        this.bloques.add(this.bloque);
        this.bloque.body.immovable=true;
        this.bloque.body.allowGravity=false;
        
       /*//  Create our Timer
        timer = this.game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
        timer.loop(2000, updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
        timer.start();*/
        
     
        this.bloque.animations.add('change',[0,1,2,3],10,true);
         
       
        
        this.megaman = this.game.add.sprite(1980, 320, 'megaman', 3);
        
        this.megaman.anchor.setTo(0.5, 0);
        this.game.physics.arcade.enable(this.megaman);
        this.walkInAnim=this.megaman.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 3), 5, true);
        
        
        
        this.shootRun = this.megaman.animations.add('shoot_run', Phaser.Animation.generateFrameNames('shoot_run', 1, 3), 5, true);
        this.megaman.body.collideWorldBounds = true;
         
        
        this.loadBullets();
        this.space.onDown.add(this.createBullet,this);
        
    
        
        this.shoot = this.game.add.audio('shoot');
        
        this.camera.follow(this.megaman,Phaser.Camera.FOLLOW_PLATFORMER);
         this.game.add.existing(this.bloques);
        this.game.physics.arcade.collide(this.megaman,this.bloques);
      
         
              
    }, 
    update:function(){
        
        this.game.physics.arcade.collide(this.walls,this.megaman);
        
           this.bloque.animations.play('change',false);
         this.game.physics.arcade.collide(this.megaman,this.bloques);
        
        
        
        /*if(counter>60000){
            this.megaman.reset(100,100);
            
        }*/
        /*if(standing){
         
            if(this.cursors.up.isDown && (this.megaman.body.touching.down||this.megaman.body.blocked.down)&&this.cursors.up.downDuration(1)){
                this.king.body.velocity.y = -gameOptions.kingJump;
                this.steps.stop();
            }
           
               
            this.megaman.animations.stop();
            
        }*/
        
      
            
        
      
      
        //this.bloques.animations.stop(null, true);

        if(this.game.physics.arcade.collide(this.megaman,this.death)) 
        {
            this.megaman.reset(100,100);
        }
        
        if(this.cursors.left.isDown){
            this.megaman.body.velocity.x = -gameOptions.heroSpeed;
            if(this.megaman.body.blocked.down){
                if(this.shooting == true) this.megaman.animations.play('shoot_run');
                else if(!this.shootRun.isPlaying)this.megaman.animations.play('run');
            }
            this.megaman.scale.x = -1;
        }else
        if(this.cursors.right.isDown){
            this.megaman.body.velocity.x = gameOptions.heroSpeed;
            if(this.megaman.body.blocked.down){
                if(this.shooting == true) this.megaman.animations.play('shoot_run');
                else if(!this.shootRun.isPlaying)this.megaman.animations.play('run');
            }
            this.megaman.scale.x = 1;
        }else{
            this.megaman.body.velocity.x = 0;
            if(this.megaman.body.blocked.down){
                this.megaman.animations.stop();
                if(this.shooting == true) this.megaman.frame = 9;
                if(this.megaman.frame != 9)this.megaman.frame=3;
            }
        }
        if(this.cursors.up.isDown && (this.megaman.body.blocked.down|| this.megaman.body.touching.down)&&this.cursors.up.downDuration(1)){
            this.megaman.body.velocity.y = -gameOptions.heroJump;
            this.megaman.animations.stop();
        }
        if(!this.megaman.body.blocked.down){
            if(this.megaman.frame != 1){
                this.megaman.frame = 0;
            }
            if(this.shooting == true){
                this.megaman.frame = 1;
            }
        }
        this.shooting = false;
    },
    
    
    loadBullets:function(){
        this.bullets=this.add.group();
        this.bullets.enableBody = true;
    },
    createBullet:function(){
        var _bullet = this.bullets.getFirstExists(false);
        if(!_bullet){
            _bullet = new platformer.bulletPrefab(this.game,this.megaman.right,this.megaman.y +this.megaman.height/2);
            this.bullets.add(_bullet);
        }else{
            //reset/reciclado
            _bullet.reset(this.megaman.right,this.megaman.y + this.megaman.height/2);
        }
        //dar velocidad a la bala 
        if(this.megaman.scale.x == 1)_bullet.body.velocity.x= gameOptions.bulletSpeed;
        else _bullet.body.velocity.x= -gameOptions.bulletSpeed;
        _bullet.body.allowGravity = false;
        this.shoot.play();
        this.shooting = true;
    },
   
    updateCounter:function(){
        counter++;
        
        
    }
    
};