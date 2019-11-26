var platformer = platformer || {};

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
        
        this.load.tilemap('HeatManStage','assets/levels/HeatManStage.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.atlas('megaman', ruta + 'megaman.png', ruta +'megaman.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        
        this.load.spritesheet('healthbar', ruta+'healthbar.png', 8, 56);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        var ruta = 'assets/sounds/';
        
        this.load.audio('shoot',ruta+'shoot.wav');
        this.load.audio('endJump',ruta+'endJump.wav');
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
    

        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        this.healthbar = this.game.add.sprite(20, 10, 'healthbar', 0);
        this.healthbar.fixedToCamera = true;
        
        
        this.megaman = this.game.add.sprite(100, 100, 'megaman', 3);
        this.megaman.anchor.setTo(0.5, 0);
        this.game.physics.arcade.enable(this.megaman);
        this.megaman.body.setSize(this.megaman.body.width - 5, this.megaman.body.height, 2.5, 0);
        this.megaman.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 3), 5, true);
        this.shootRun = this.megaman.animations.add('shoot_run', Phaser.Animation.generateFrameNames('shoot_run', 1, 3), 5, true);
        
        this.loadBullets();
        this.space.onDown.add(this.createBullet,this);
        
        this.shoot = this.game.add.audio('shoot');
        
        this.camera.follow(this.megaman,Phaser.Camera.FOLLOW_PLATFORMER);
              
    },
    update:function(){
        this.game.physics.arcade.collide(this.megaman,this.walls);
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
        if(this.cursors.up.isDown && this.megaman.body.blocked.down&&this.cursors.up.downDuration(1)){
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
    render:function()
    {
        this.game.debug.body(this.megaman);
    }
    
};












