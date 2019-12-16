var platformer = platformer || {};

var double=false;
platformer.level1 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth / 2,gameOptions.gameHeight / 2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.heroGravity;
        this.timer = this.game.time.create(false);
        this.timer.loop(200, this.stairAnimation, this);
        
    },
    preload:function(){
        var ruta = 'assets/sprites/';
        this.load.image('bg',ruta+'MegaMan2HeatManMapBG.png');
        this.load.image('patron',ruta+'patron.png');
        this.load.image('Death',ruta+'patron.png');        
        this.load.image('bullet', ruta+'bullet.png');
        this.load.spritesheet('silverWatcher',ruta+'silverWatcher.png',18,16);
        this.load.spritesheet('propTop',ruta+'propTop.png',32,38);
        
         this.load.spritesheet('bloque', ruta+'bloquesM.png', 16, 17);
        
        this.load.audio('music','assets/music/levelSong.wav');
        
        this.load.tilemap('HeatManStage','assets/levels/HeatManStage.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.atlas('megaman', ruta + 'megaman.png', ruta +'megaman.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('walker', ruta + 'walker.png', ruta +'walker.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); 
        this.load.atlas('sniper', ruta + 'sniper.png', ruta +'sniper.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('spring', ruta + 'spring.png', ruta +'spring.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        
        this.load.spritesheet('healthbar', ruta+'healthbar.png', 8, 56);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        var ruta = 'assets/sounds/';
        
        this.load.audio('shoot',ruta+'shoot.wav');
        this.load.audio('endJump',ruta+'endJump.wav');
        this.shooting = false;
        this.dismount = false;
    },
    create:function(){
        this.bg = this.game.add.tileSprite(0,0,10240,2400,'bg');
        this.bg.scale.setTo(0.5, 0.5);
        this.map = this.game.add.tilemap('HeatManStage');
        this.map.addTilesetImage('patron');
        this.walls = this.map.createLayer('Walls');
        this.walls.setScale(0.5, 0.5);
        this.tileWorld = this.map.createLayer('World');
        this.tileWorld.setScale(0.5, 0.5);
        this.death = this.map.createLayer('Death');
        this.death.setScale(0.5, 0.5);
        this.steps = this.map.createLayer('Steps');
        this.steps.setScale(0.5, 0.5);
        this.lerp = this.map.createLayer('lerp');
        this.lerp.setScale(0.5, 0.5);
        this.silverWatcherRes = this.map.createLayer('silverWatcherRes');
        this.silverWatcherRes.setScale(0.5, 0.5);
        this.propTopRes = this.map.createLayer('propTopRes');
        this.propTopRes.setScale(0.5, 0.5);
        this.springHeadRes = this.map.createLayer('springHeadRes');
        this.springHeadRes.setScale(0.5, 0.5);
        this.joeRes = this.map.createLayer('joeRes');
        this.joeRes.setScale(0.5, 0.5);
        this.map.setCollisionBetween(1,1,true,'Walls');
        this.map.setCollisionBetween(1,1,true,'Death');
        this.map.setCollisionBetween(1,1,true,'Steps');
        
         
        this.bloques=this.add.group();
        this.bloques.enableBody=true;
        this.bloques1=this.add.group();
        this.bloques1.enableBody=true;
        this.bloques2=this.add.group();
        this.bloques2.enableBody=true;
            
        
        this.bloque1 = this.game.add.sprite(1955, 365, 'bloque');
        this.bloques.add(this.bloque1);
        this.bloque2 = this.game.add.sprite(1880, 300, 'bloque');
        this.bloques.add(this.bloque2);
        
        this.bloque3 = this.game.add.sprite(1955, 310, 'bloque');
        this.bloques1.add(this.bloque3);
        
          this.bloque4 = this.game.add.sprite(1900, 320, 'bloque');
        this.bloques2.add(this.bloque4);
       
        this.bloque1.body.immovable=true;
        this.bloque1.body.allowGravity=false;
        this.bloque2.body.immovable=true;
        this.bloque2.body.allowGravity=false;
        
         this.bloque3.body.immovable=true;
        this.bloque3.body.allowGravity=false;
        
         this.bloque4.body.immovable=true;
        this.bloque4.body.allowGravity=false;
        
        this.bloques.visible=false;
        this.bloques1.visible=false;
        this.bloques2.visible=false;
        
        
        this.bloque1.animations.add('change',[0,1,2,3],10,true);
        
        this.bloque2.animations.add('change',[0,1,2,3],10,true);
        
        this.bloque3.animations.add('change',[0,1,2,3],10,true);
        this.bloque4.animations.add('change',[0,1,2,3],10,true);
        
        this.groupBloques=this.add.group();
        this.groupBloques.enableBody=true;
       
         this.gbloque = this.game.add.sprite(2208, 630, 'bloque');
        this.groupBloques.add(this.gbloque);
        this.gbloque1 = this.game.add.sprite(2093, 640, 'bloque');
        this.groupBloques.add(this.gbloque1);
         this.gbloque2 = this.game.add.sprite(2208, 580, 'bloque');
        this.groupBloques.add(this.gbloque2);
         this.gbloque3 = this.game.add.sprite(2768, 630, 'bloque');
        this.groupBloques.add(this.gbloque3);
        
        this.gbloque.body.immovable=true;
        this.gbloque.body.allowGravity=false;
         this.gbloque1.body.immovable=true;
        this.gbloque1.body.allowGravity=false;
        this.gbloque2.body.immovable=true;
        this.gbloque2.body.allowGravity=false;
        this.gbloque3.body.immovable=true;
        this.gbloque3.body.allowGravity=false;
        
        
        this.gbloque.animations.add('change',[0,1,2,3],10,true);
        this.gbloque1.animations.add('change',[0,1,2,3],10,true);
         this.gbloque2.animations.add('change',[0,1,2,3],10,true);
         this.gbloque3.animations.add('change',[0,1,2,3],10,true);
        
        
        //music
         this.music=this.game.add.audio('music');
        this.music.play();
    

        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          
        this.megaman = this.game.add.sprite(100, 100, 'megaman', 3);
        this.megaman.anchor.setTo(0.5, 0);
        this.game.physics.arcade.enable(this.megaman);
        this.megaman.body.setSize(this.megaman.body.width - 18, this.megaman.body.height, 4.5, 0);
        this.megaman.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 3), 5, true);
        this.megaman.lifeFrames = 0;
        this.megaman.inmuFrames = 60;
        this.shootRun = this.megaman.animations.add('shoot_run', Phaser.Animation.generateFrameNames('shoot_run', 1, 3), 5, true);
        
        this.healthbar = this.game.add.sprite(20, 10, 'healthbar', this.megaman.lifeFrames);
        this.healthbar.fixedToCamera = true;
        
        this.stage = 1;
        
        this.loadBullets();
        this.space.onDown.add(this.createBullet,this);
        
        this.shoot = this.game.add.audio('shoot');
        
        this.lerping = false;
        this.lerpValue = 0;
        this.camera.follow(this.megaman,Phaser.Camera.FOLLOW_PLATFORMER);
        
        this.game.world.setBounds(0,0,this.map.getTile(127, 9).worldX + this.map.getTile(127, 9).width,this.map.getTile(13, 13).worldY + this.map.getTile(13,13).height);
        
        this.loadStairs();
        this.loadEnemies();
        
        
        //Hardcoded stuff
        //this.spring = new platformer.spring(this.game,100,100,'spring',this);
        //this.game.add.existing(this.spring);
        //this.spring.animations.add('attack',[2,1,0],5,false);
        //this.megaman.position.set(this.map.getTile(280, 52, 'lerp').worldX, this.map.getTile(280, 52, 'lerp').worldY, 'patron');
        //this.game.world.setBounds(0,0,this.map.getTile(287, 40).worldX + this.map.getTile(287, 40).width,1200);
    },
    update:function(){
        
         this.bloque1.animations.play('change',false);
         this.bloque2.animations.play('change',false);
        this.bloque3.animations.play('change',false);
        this.bloque4.animations.play('change',false);
        this.gbloque.animations.play('change',false);
        this.gbloque1.animations.play('change',false);
        this.gbloque2.animations.play('change',false);
        this.gbloque3.animations.play('change',false);
        
       
        if(this.megaman.position.y>300){
            this.bloques.visible=true;
            this.bloques2.visible=false;
        }
         if(this.megaman.position.y>300&&this.megaman.position.x<1958){
            this.bloques1.visible=true;
        }
        
         if(this.megaman.position.y<305&&this.megaman.position.x<1955){
             this.bloques.visible=false;
             this.bloques2.visible=true;
        }
        
        this.game.physics.arcade.collide(this.megaman,this.bloques);
        this.game.physics.arcade.collide(this.megaman,this.bloques1);
        this.game.physics.arcade.collide(this.megaman,this.bloques2);
         this.game.physics.arcade.collide(this.megaman,this.groupBloques);
       
        if(this.dismount == true) {
            this.game.add.existing(this.sniper);
        }
        this.checkCollisions();
        if(this.megaman.inmuFrames == 60)
        {
        this.checkAtacks();
        }
        else
            {
                this.megaman.inmuFrames++;
            }
        this.checkLava();
        this.checkStage();
        if(this.lerping == false) this.checkMegamanMovement();
        this.healthbar.frame = this.megaman.lifeFrames;
        
    },
    loadEnemies:function()
    {
        //Silver Watchers
        this.silverWatchers = [];
        this.silverWatchers[0] = new platformer.silverWatcher(this.game,this.map.getTile(42, 5, 'silverWatcherRes').worldX,this.map.getTile(42,5, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[1] = new platformer.silverWatcher(this.game,this.map.getTile(46, 7, 'silverWatcherRes').worldX,this.map.getTile(46,7, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[2] = new platformer.silverWatcher(this.game,this.map.getTile(52, 4, 'silverWatcherRes').worldX,this.map.getTile(52,4, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[3] = new platformer.silverWatcher(this.game,this.map.getTile(56, 6, 'silverWatcherRes').worldX,this.map.getTile(56,6, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[4] = new platformer.silverWatcher(this.game,this.map.getTile(61, 9, 'silverWatcherRes').worldX,this.map.getTile(61,9, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[5] = new platformer.silverWatcher(this.game,this.map.getTile(66, 5, 'silverWatcherRes').worldX,this.map.getTile(66,5, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[6] = new platformer.silverWatcher(this.game,this.map.getTile(72, 5, 'silverWatcherRes').worldX,this.map.getTile(72,5, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[7] = new platformer.silverWatcher(this.game,this.map.getTile(78, 3, 'silverWatcherRes').worldX,this.map.getTile(78,3, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[8] = new platformer.silverWatcher(this.game,this.map.getTile(84, 5, 'silverWatcherRes').worldX,this.map.getTile(84,5, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[9] = new platformer.silverWatcher(this.game,this.map.getTile(92, 5, 'silverWatcherRes').worldX,this.map.getTile(92,5, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[10] = new platformer.silverWatcher(this.game,this.map.getTile(123, 35, 'silverWatcherRes').worldX,this.map.getTile(123,35, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[11] = new platformer.silverWatcher(this.game,this.map.getTile(126, 37, 'silverWatcherRes').worldX,this.map.getTile(126,37, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[12] = new platformer.silverWatcher(this.game,this.map.getTile(133, 34, 'silverWatcherRes').worldX,this.map.getTile(133,34, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[13] = new platformer.silverWatcher(this.game,this.map.getTile(144, 38, 'silverWatcherRes').worldX,this.map.getTile(144,38, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[14] = new platformer.silverWatcher(this.game,this.map.getTile(147, 37, 'silverWatcherRes').worldX,this.map.getTile(147,37, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[15] = new platformer.silverWatcher(this.game,this.map.getTile(150, 34, 'silverWatcherRes').worldX,this.map.getTile(150,34, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[16] = new platformer.silverWatcher(this.game,this.map.getTile(157, 34, 'silverWatcherRes').worldX,this.map.getTile(157,34, 'silverWatcherRes').worldY,20,1,this);
        this.silverWatchers[17] = new platformer.silverWatcher(this.game,this.map.getTile(169, 34, 'silverWatcherRes').worldX,this.map.getTile(169,34, 'silverWatcherRes').worldY,20,1,this);
        
        //Prop-Tops
        this.propTops = [];
        this.propTops[0] = new platformer.propTop(this.game,this.map.getTile(23, 1, 'propTopRes').worldX,this.map.getTile(23, 1, 'propTopRes').worldY,50,-1,this); 
        this.propTops[1] = new platformer.propTop(this.game,this.map.getTile(31, 1, 'propTopRes').worldX,this.map.getTile(31, 1, 'propTopRes').worldY,50,-1,this); 
        this.propTops[2] = new platformer.propTop(this.game,this.map.getTile(41, 1, 'propTopRes').worldX,this.map.getTile(41, 1, 'propTopRes').worldY,50,-1,this); 
        
        //Joe sniper/walker
        this.walker = new platformer.walker(this.game,this.map.getTile(277, 51, 'joeRes').worldX,this.map.getTile(277, 51, 'joeRes').worldY,'walker',this);
        this.game.add.existing(this.walker);
        this.walker.animations.add('jump', Phaser.Animation.generateFrameNames('walker', 1, 3), 10, false);
        
        this.sniper = new platformer.sniper(this.game,this.map.getTile(277, 51, 'joeRes').worldX,this.map.getTile(277, 51, 'joeRes').worldY,'sniper',this);
        
        //Springs
        this.springs = [];
        this.springs[0] = new platformer.spring(this.game,this.map.getTile(122, 5, 'springHeadRes').worldX,this.map.getTile(122, 5, 'springHeadRes').worldY,'spring',this);
        this.springs[0].animations.add('attack',[2,1,0],5,false);
        this.game.add.existing(this.springs[0]);
        this.springs[1] = new platformer.spring(this.game,this.map.getTile(121, 9, 'springHeadRes').worldX,this.map.getTile(121, 9, 'springHeadRes').worldY,'spring',this);
        this.springs[1].animations.add('attack',[2,1,0],5,false);
        this.game.add.existing(this.springs[1]);
        this.springs[2] = new platformer.spring(this.game,this.map.getTile(116, 27, 'springHeadRes').worldX,this.map.getTile(116, 27, 'springHeadRes').worldY,'spring',this);
        this.springs[2].animations.add('attack',[2,1,0],5,false);
        this.game.add.existing(this.springs[2]);
        this.springs[3] = new platformer.spring(this.game,this.map.getTile(203, 41, 'springHeadRes').worldX,this.map.getTile(203, 41, 'springHeadRes').worldY,'spring',this);
        this.springs[3].animations.add('attack',[2,1,0],5,false);
        this.game.add.existing(this.springs[3]);
    },
    checkMegamanMovement:function()
    {
        this.checkStairs();
        if(this.stair == -1)
        {
            this.megaman.body.allowGravity = true;
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
                if(this.shooting == true) this.megaman.frame = 3;
                if(this.megaman.frame != 3)this.megaman.frame=1;
            }
        }
<<<<<<< HEAD
        /*if(double){
        if(this.cursors.up.isDown&&this.cursors.up.downDuration(1)){ // && this.megaman.body.blocked.down
            this.megaman.body.velocity.y = -gameOptions.heroJump;
            this.megaman.animations.stop();
        }
        }*/
            if(this.cursors.up.isDown&&this.cursors.up.downDuration(1)){ // && this.megaman.body.blocked.down
=======
        if(this.cursors.up.isDown &&this.cursors.up.downDuration(1) && this.megaman.body.blocked.down){
>>>>>>> 8114cfe75c3056f9672605fc0e9fe5b44e2291cf
            this.megaman.body.velocity.y = -gameOptions.heroJump;
            this.megaman.animations.stop();
        }
        if(!this.megaman.body.blocked.down){
            if(this.megaman.frame != 12){
                this.megaman.frame = 11;
            }
            if(this.shooting == true){
                this.megaman.frame = 12;
            }
        }
        this.shooting = false;
        }
        else{
            if(this.timer.running  == false){
                this.timer.start();
            }
            this.timer.pause();
            this.megaman.body.allowGravity = false;           
            if(this.cursors.up.isDown){
            this.megaman.body.velocity.y = -gameOptions.heroSpeed;
            this.timer.resume();
        }
            else if(this.cursors.down.isDown){
            this.megaman.body.velocity.y = gameOptions.heroSpeed;
            this.timer.resume();
            }
            else {
                this.megaman.body.velocity.set(0, 0);
            }
            if(this.map.getTileWorldXY(this.megaman.position.x, this.megaman.position.y + this.megaman.height + 8, 16, 16, 'Walls') != null)
                {
                    if(this.cursors.left.isDown){
            this.megaman.body.velocity.x = -gameOptions.heroSpeed;
        }
            else if(this.cursors.right.isDown){
            this.megaman.body.velocity.x = gameOptions.heroSpeed;
            }
                }
            else {
                this.megaman.position.x = this.stairs[this.stair].centerX + 2.5;
                if(this.cursors.left.isDown)
                {
                    this.megaman.frame = 2;
                    this.megaman.scale.x = -1;
                }
            else if(this.cursors.right.isDown)
            {
                this.megaman.frame = 2;
            this.megaman.scale.x = 1;
            }
            else
            {
            this.megaman.frame = 4;
            }
            }
        }
    },
    loadBullets:function(){
        this.bullets=this.add.group();
        this.bullets.enableBody = true;
    },
    stairAnimation:function(){
        if(this.megaman.frame != 4) return;
        this.megaman.scale.x *= -1;
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
        //this.game.debug.body(this.megaman);
        this.game.debug.body(this.springs[0]);
        //this.game.debug.body(this.propTops[0]);
        //this.game.debug.body(this.silverWatchers[0]);
    },
    
    checkLava:function()
    {
        if(this.game.physics.arcade.collide(this.megaman,this.death) && this.megaman.inmuFrames == 60) 
        {
            this.megaman.reset(100,100);
            this.stage = 1;
            this.megaman.inmuFrames = 60;
            this.megaman.lifeFrames = 0;
        }
    },
    checkStage:function()
    {
        switch(this.stage)
            {
                case 1:
                    if (this.megaman.position.y > this.map.getTile(125, 15, 'lerp').worldY && this.lerping == false)
                        {
                            this.lerpPatron = this.game.add.sprite(this.map.getTile(120, 22, 'lerp').worldX, this.map.getTile(120, 22, 'lerp').worldY, 'patron')
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y > this.map.getTile(125, 15, 'lerp').worldY)
                        {
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(127, 9).worldX + this.map.getTile(127, 9).width,1200);
                                this.stage = 2;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    break;
                case 2:
                    if (this.megaman.position.y < this.map.getTile(125, 15, 'lerp').worldY &&
                        this.megaman.position.x > this.map.getTile(125, 15, 'lerp').worldX && this.lerping == false)
                        {
                            this.lerpPatron = this.megaman;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y < this.map.getTile(125, 15, 'lerp').worldY &&
                           this.megaman.position.x > this.map.getTile(125, 15, 'lerp').worldX)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(127, 9).worldX + this.map.getTile(127, 9).width,this.map.getTile(13, 13).worldY + this.map.getTile(13,13).height);
                                this.stage = 1;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    
                    else if (this.megaman.position.y > this.map.getTile(114, 29, 'lerp').worldY && this.lerping == false)
                        {
                            this.lerpPatron = this.megaman;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y > this.map.getTile(114, 29, 'lerp').worldY)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(287, 40).worldX + this.map.getTile(287, 40).width,this.map.getTile(132,44).worldY + this.map.getTile(132,44).height);
                                this.stage = 3;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    break;
                case 3:
                    if (this.megaman.position.y < this.map.getTile(114, 29, 'lerp').worldY && this.lerping == false)
                        {
                            this.lerpPatron = this.game.add.sprite(this.map.getTile(120, 22, 'lerp').worldX, this.map.getTile(120, 22, 'lerp').worldY, 'patron');
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y < this.map.getTile(114, 29, 'lerp').worldY)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(127, 9).worldX + this.map.getTile(127, 9).width,1200);
                                this.stage = 2;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    else if (this.megaman.position.y > this.map.getTile(285, 45, 'lerp').worldY && this.lerping == false)
                        {
                            this.lerpPatron = this.game.add.sprite(this.map.getTile(280, 52, 'lerp').worldX, this.map.getTile(280, 52, 'lerp').worldY, 'patron')
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y > this.map.getTile(285, 45, 'lerp').worldY)
                        {
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(287, 40).worldX + this.map.getTile(287, 40).width,1200);
                                this.stage = 4;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    break;
                case 4:
                    if (this.megaman.position.y < this.map.getTile(285, 45, 'lerp').worldY &&
                        this.megaman.position.x > this.map.getTile(285, 45, 'lerp').worldX && this.lerping == false)
                        {
                            this.lerpPatron = this.megaman;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y < this.map.getTile(285, 45, 'lerp').worldY &&
                           this.megaman.position.x > this.map.getTile(285, 45, 'lerp').worldX)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(287, 40).worldX + this.map.getTile(287, 40).width,this.map.getTile(132,44).worldY + this.map.getTile(132,44).height);
                                this.stage = 3;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    else if (this.megaman.position.y > this.map.getTile(275, 60, 'lerp').worldY && this.lerping == false)
                        {
                            this.lerpPatron = this.megaman;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y > this.map.getTile(275, 60, 'lerp').worldY)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(319, 60).worldX + this.map.getTile(319, 60).width,1200);
                                this.stage = 5;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    break;
                case 5:
                    if (this.megaman.position.y < this.map.getTile(275, 60, 'lerp').worldY && this.lerping == false)
                        {
                            this.lerpPatron = this.game.add.sprite(this.map.getTile(280, 52, 'lerp').worldX, this.map.getTile(280, 52, 'lerp').worldY, 'patron')
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y < this.map.getTile(275, 60, 'lerp').worldY)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(287, 40).worldX + this.map.getTile(287, 40).width,1200);
                                this.stage = 4;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                            }
                        }
                    break;
            }
    },
    checkCollisions:function()
    {
        this.game.physics.arcade.collide(this.megaman,this.walls);
        for(var i = 0; i < this.propTops.length; i++)
            {
                this.game.physics.arcade.collide(this.propTops[i],this.walls);
            }
    },
    checkAtacks:function()
    {
        for(var j = 0; j < this.silverWatchers.length; j++)
            {
                if(this.game.physics.arcade.overlap(this.silverWatchers[j],this.megaman)) {
                    this.megaman.lifeFrames += 2;
                    this.megaman.inmuFrames = 0;
                }
            }
        
        for(var i = 0; i < this.propTops.length; i++)
            {
                if(this.game.physics.arcade.overlap(this.propTops[i],this.megaman)) {
                    this.megaman.inmuFrames = 0;
                    this.megaman.lifeFrames += 4;
                }
            }
        
        for(var k = 0; k < this.springs.length; k++)
            {
                if(this.game.physics.arcade.overlap(this.springs[k],this.megaman)) {
                    this.megaman.inmuFrames = 0;
                    this.megaman.lifeFrames += 4;
                }
            }
        
        if(this.game.physics.arcade.overlap(this.walker,this.megaman)) {
                    this.megaman.inmuFrames = 0;
                    this.megaman.lifeFrames += 4;
                }
        if(this.game.physics.arcade.overlap(this.sniper,this.megaman)) {
                    this.megaman.inmuFrames = 0;
                    this.megaman.lifeFrames += 4;
                }
        
        if(this.megaman.lifeFrames >= 28){
            this.megaman.reset(100,100);
            this.stage = 1;
            this.megaman.inmuFrames = 60;
            this.megaman.lifeFrames = 0;
        }
    },
    loadStairs:function()
    {
         var stair_one = new Phaser.Rectangle(this.map.getTile(125, 11, 'Steps').worldX, this.map.getTile(125, 11, 'Steps').worldY, this.map.getTile(125, 11, 'Steps').width, this.map.getTile(125, 11, 'Steps').height * 14);
        
        var stair_two = new Phaser.Rectangle(this.map.getTile(114, 18, 'Steps').worldX, this.map.getTile(114, 18, 'Steps').worldY, this.map.getTile(114, 18, 'Steps').width, this.map.getTile(114, 18, 'Steps').height * 14);
        
        var stair_three = new Phaser.Rectangle(this.map.getTile(285, 40, 'Steps').worldX, this.map.getTile(285, 40, 'Steps').worldY, this.map.getTile(285, 40, 'Steps').width, this.map.getTile(285, 40, 'Steps').height * 16);
        var stair_four = new Phaser.Rectangle(this.map.getTile(275, 54, 'Steps').worldX, this.map.getTile(275, 54, 'Steps').worldY, this.map.getTile(275, 54, 'Steps').width, this.map.getTile(275, 54, 'Steps').height * 9);
        
        this.stairs = [];
        this.stairs[0] = stair_one;
        this.stairs[1] = stair_two;
        this.stairs[2] = stair_three;
        this.stairs[3] = stair_four;
    },
   
    checkStairs:function()
    {
        this.stair = -1;
        
        for (var i=0;i < this.stairs.length;i++)
        {
            if(this.stairs[i].intersectsRaw(this.megaman.position.x, this.megaman.position.x, this.megaman.position.y, this.megaman.position.y))
            {
                this.stair = i;
            }
        }
        
    }
};












