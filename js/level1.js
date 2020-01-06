var platformer = platformer || {};

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
        this.load.spritesheet('block', ruta+'bloquesM.png', 16, 17);
        this.load.spritesheet('heatman', ruta+'heatman.png', 50, 50);
        this.load.spritesheet('fireatack', ruta+'fire_atack.png', 8, 8);
        this.load.audio('music','assets/music/levelSong.wav');
        this.load.audio('bossMusic','assets/music/bossMusic.wav');
        
        this.load.tilemap('HeatManStage','assets/levels/HeatManStage.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.atlas('megaman', ruta + 'megaman.png', ruta +'megaman.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('walker', ruta + 'walker.png', ruta +'walker.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH); 
        this.load.atlas('sniper', ruta + 'sniper.png', ruta +'sniper.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('spring', ruta + 'spring.png', ruta +'spring.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        
        this.load.spritesheet('healthbar', ruta+'healthbar.png', 8, 56);
        this.load.spritesheet('healthbar_boss', ruta+'healthbar_boss.png', 8, 56);
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
        this.bossWalls = this.map.createLayer('bossWalls');
        this.bossWalls.setScale(0.5, 0.5);
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
        this.map.setCollisionBetween(1,1,true,'bossWalls');
        this.map.setCollisionBetween(1,1,true,'Death');
        this.map.setCollisionBetween(1,1,true,'Steps');
        
        //music
        this.music=this.game.add.audio('music');
        this.music.play();
        this.bossMusic = this.game.add.audio('bossMusic');
        
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
        
        //////////////////////////////////////////////////
        //Pones la posición por tiles con estas corderanas this.map.getTile(tileX, tileY, 'World').worldX,this.map.getTile(tileX, tileY, 'World').worldY
        //Puedes ver los tiles abriendo el JSON con el programa Tiled
        //Trata de colocarlos y arreglar la colisión y las demás cosas que faltan
        this.block = new platformer.block(this.game,this.map.getTile(122, 22, 'World').worldX,this.map.getTile(122, 22, 'World').worldY,'block',this,2000);
        this.game.add.existing(this.block);
        this.block2 = new platformer.block(this.game,this.map.getTile(118, 18, 'World').worldX,this.map.getTile(118, 18, 'World').worldY,'block',this,2000);
        this.game.add.existing(this.block2);
        this.block3 = new platformer.block(this.game,this.map.getTile(122, 19, 'World').worldX,this.map.getTile(122, 19, 'World').worldY,'block',this,3000);
        this.game.add.existing(this.block3);
        this.block4 = new platformer.block(this.game,this.map.getTile(119, 20, 'World').worldX,this.map.getTile(119, 20, 'World').worldY,'block',this,4000);
        this.game.add.existing(this.block4);
        this.block5 = new platformer.block(this.game,this.map.getTile(131, 40, 'World').worldX,this.map.getTile(131, 40, 'World').worldY,'block',this,2000);
        this.game.add.existing(this.block5);
        this.block6 = new platformer.block(this.game,this.map.getTile(138, 40, 'World').worldX,this.map.getTile(138, 40, 'World').worldY,'block',this,3000);
        this.game.add.existing(this.block6);
        this.block7 = new platformer.block(this.game,this.map.getTile(138, 38, 'World').worldX,this.map.getTile(138, 38, 'World').worldY,'block',this,4000);
        this.game.add.existing(this.block7);
        this.block8 = new platformer.block(this.game,this.map.getTile(154, 40, 'World').worldX,this.map.getTile(154, 40, 'World').worldY,'block',this,3000);
        this.game.add.existing(this.block8);
        this.block9 = new platformer.block(this.game,this.map.getTile(164, 40, 'World').worldX,this.map.getTile(164, 40, 'World').worldY,'block',this,4000);
        this.game.add.existing(this.block9);
        this.block10 = new platformer.block(this.game,this.map.getTile(164, 37, 'World').worldX,this.map.getTile(164, 37, 'World').worldY,'block',this,3000);
        this.game.add.existing(this.block10);
        this.block11 = new platformer.block(this.game,this.map.getTile(173, 41, 'World').worldX,this.map.getTile(173, 41, 'World').worldY,'block',this,4000);
        this.game.add.existing(this.block11);
        
        this.block12 = new platformer.block(this.game,this.map.getTile(206, 37, 'World').worldX,this.map.getTile(206, 37, 'World').worldY,'block',this,0);
        this.game.add.existing(this.block12);
        this.block13 = new platformer.block(this.game,this.map.getTile(209, 37, 'World').worldX,this.map.getTile(209, 37, 'World').worldY,'block',this,500);
        this.game.add.existing(this.block13);
        this.block14 = new platformer.block(this.game,this.map.getTile(212, 37, 'World').worldX,this.map.getTile(212, 37, 'World').worldY,'block',this,2000);
        this.game.add.existing(this.block14);
        this.block15 = new platformer.block(this.game,this.map.getTile(215, 34, 'World').worldX,this.map.getTile(215, 34, 'World').worldY,'block',this,2500);
        this.game.add.existing(this.block15);
        this.block16 = new platformer.block(this.game,this.map.getTile(212, 35, 'World').worldX,this.map.getTile(212, 35, 'World').worldY,'block',this,3000);
        this.game.add.existing(this.block16);
        this.block17 = new platformer.block(this.game,this.map.getTile(218, 37, 'World').worldX,this.map.getTile(218, 37, 'World').worldY,'block',this,4500);
        this.game.add.existing(this.block17);
        
        this.block177 = new platformer.block(this.game,this.map.getTile(221, 37, 'World').worldX,this.map.getTile(221, 37, 'World').worldY,'block',this,5500);
        this.game.add.existing(this.block177);
        this.block18 = new platformer.block(this.game,this.map.getTile(224, 34, 'World').worldX,this.map.getTile(224, 34, 'World').worldY,'block',this,6000);
        this.game.add.existing(this.block18);
        this.block19 = new platformer.block(this.game,this.map.getTile(221, 34, 'World').worldX,this.map.getTile(221, 34, 'World').worldY,'block',this,6500);
        this.game.add.existing(this.block19);
        this.block20 = new platformer.block(this.game,this.map.getTile(227, 34, 'World').worldX,this.map.getTile(227, 34, 'World').worldY,'block',this,7500);
        this.game.add.existing(this.block20);
        this.block21 = new platformer.block(this.game,this.map.getTile(230, 36, 'World').worldX,this.map.getTile(230, 36, 'World').worldY,'block',this,8500);
        this.game.add.existing(this.block21);
        this.block22 = new platformer.block(this.game,this.map.getTile(233, 36, 'World').worldX,this.map.getTile(233, 36, 'World').worldY,'block',this,9000);
        this.game.add.existing(this.block22);
        this.block23 = new platformer.block(this.game,this.map.getTile(236, 36, 'World').worldX,this.map.getTile(236, 36, 'World').worldY,'block',this,9500);
        this.game.add.existing(this.block23);
        this.block24 = new platformer.block(this.game,this.map.getTile(239, 36, 'World').worldX,this.map.getTile(239, 36, 'World').worldY,'block',this,10000);
        this.game.add.existing(this.block24);
        this.block25 = new platformer.block(this.game,this.map.getTile(242, 36, 'World').worldX,this.map.getTile(242, 36, 'World').worldY,'block',this,10500);
        this.game.add.existing(this.block25);
        this.block26 = new platformer.block(this.game,this.map.getTile(245, 37, 'World').worldX,this.map.getTile(245, 37, 'World').worldY,'block',this,11000);
        this.game.add.existing(this.block26);
        this.block27 = new platformer.block(this.game,this.map.getTile(248, 36, 'World').worldX,this.map.getTile(248, 36, 'World').worldY,'block',this,11500);
        this.game.add.existing(this.block27);
        this.block28 = new platformer.block(this.game,this.map.getTile(251, 35, 'World').worldX,this.map.getTile(251, 35, 'World').worldY,'block',this,12000);
        this.game.add.existing(this.block28);
        this.block29 = new platformer.block(this.game,this.map.getTile(254, 34, 'World').worldX,this.map.getTile(254, 34, 'World').worldY,'block',this,12500);
        this.game.add.existing(this.block29);
        this.block30 = new platformer.block(this.game,this.map.getTile(257, 39, 'World').worldX,this.map.getTile(257, 39, 'World').worldY,'block',this,13000);
        this.game.add.existing(this.block30);
        this.block31 = new platformer.block(this.game,this.map.getTile(260, 39, 'World').worldX,this.map.getTile(260, 39, 'World').worldY,'block',this,13500);
        this.game.add.existing(this.block31);
        this.block32 = new platformer.block(this.game,this.map.getTile(263, 39, 'World').worldX,this.map.getTile(263, 39, 'World').worldY,'block',this,14000);
        this.game.add.existing(this.block32);
        this.block33 = new platformer.block(this.game,this.map.getTile(266, 37, 'World').worldX,this.map.getTile(266, 37, 'World').worldY,'block',this,14500);
        this.game.add.existing(this.block33);
        this.block34 = new platformer.block(this.game,this.map.getTile(269, 36, 'World').worldX,this.map.getTile(269, 36, 'World').worldY,'block',this,15000);
        this.game.add.existing(this.block34);
        
        //////////////////////////////////////////////////
        
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
        
    },
    update:function(){        
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
        
        //HARdCODED STUFF
        if(this.game.input.keyboard.addKey(Phaser.Keyboard.ONE).isDown){
            this.megaman.reset(this.map.getTile(114, 40, 'World').worldX,this.map.getTile(114, 40, 'World').worldY);
            this.stage = 2;
        }
        else if(this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).isDown){
            this.megaman.reset(this.map.getTile(295, 68, 'World').worldX,this.map.getTile(295, 68, 'World').worldY);
            this.stage = 4;
        }
        
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
            if(this.megaman.body.blocked.down || this.megaman.canJump){
                if(this.shooting == true) this.megaman.animations.play('shoot_run');
                else if(!this.shootRun.isPlaying)this.megaman.animations.play('run');
            }
            this.megaman.scale.x = -1;
        }else
        if(this.cursors.right.isDown){
            this.megaman.body.velocity.x = gameOptions.heroSpeed;
            if(this.megaman.body.blocked.down || this.megaman.canJump){
                if(this.shooting == true) this.megaman.animations.play('shoot_run');
                else if(!this.shootRun.isPlaying)this.megaman.animations.play('run');
            }
            
            this.megaman.scale.x = 1;
        }else{
            this.megaman.body.velocity.x = 0;
            if(this.megaman.body.blocked.down || this.megaman.canJump){
                this.megaman.animations.stop();
                if(this.shooting == true) this.megaman.frame = 3;
                if(this.megaman.frame != 3)this.megaman.frame=1;
            }
        }
        if(this.cursors.up.isDown && this.cursors.up.downDuration(1) && (this.megaman.body.blocked.down || this.megaman.canJump)){
            this.megaman.canJump = false;
            this.megaman.body.velocity.y = -gameOptions.heroJump;
            this.megaman.body.position.y--;
            this.megaman.animations.stop();
        }
        if(!this.megaman.body.blocked.down && !this.megaman.canJump){
            if(this.megaman.frame != 12){
                this.megaman.frame = 11;
            }
            if(this.shooting == true){
                this.megaman.frame = 12;
            }
        }
        this.shooting = false;
            console.log(this.megaman.canJump);
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
        //this.game.debug.body(this.boss);
        //this.game.debug.body(this.propTops[0]);
        //this.game.debug.body(this.silverWatchers[0]);
    },
    
    checkLava:function()
    {
        if(this.game.physics.arcade.collide(this.megaman,this.death) && this.megaman.inmuFrames == 60) 
        {
            this.game.sound.stopAll();
            this.game.state.start('main');
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
                    if (this.megaman.position.y < this.map.getTile(114, 29, 'lerp').worldY && this.megaman.position.x < this.map.getTile(115, 30, 'World').worldX && this.lerping == false)
                        {
                            this.lerpPatron = this.game.add.sprite(this.map.getTile(120, 22, 'lerp').worldX, this.map.getTile(120, 22, 'lerp').worldY, 'patron');
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.y < this.map.getTile(114, 29, 'lerp').worldY && this.megaman.position.x < this.map.getTile(115, 30, 'World').worldX)
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
                    if (this.megaman.position.x > this.map.getTile(306, 67, 'lerp').worldX && this.lerping == false)
                        {
                            this.lerpPatron = this.game.add.sprite(this.map.getTile(312, 68, 'lerp').worldX, this.map.getTile(312, 68, 'lerp').worldY, 'patron')
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            this.lerping = true;
                            this.megaman.body.allowGravity = false;
                            this.megaman.body.velocity.set(0, 0);
                        }
                    else if(this.megaman.position.x > this.map.getTile(306, 67, 'lerp').worldX)
                        {
                            
                            this.lerpValue += 0.005;
                            this.camera.follow(this.lerpPatron,Phaser.Camera.FOLLOW_LOCKON, this.lerpValue, this.lerpValue);
                            if(this.lerpValue >= 0.3) {
                                this.game.world.setBounds(0,0,this.map.getTile(319, 60).worldX + this.map.getTile(319, 60).width,1200);
                                this.stage = 6;
                                this.lerpValue = 0;
                                this.lerping = false;
                                this.megaman.body.allowGravity = true;
                                            this.game.sound.stopAll();
                                this.bossMusic.play();
                                 this.boss = new platformer.heatman(this.game,this.map.getTile(317, 62, 'World').worldX,this.map.getTile(317, 62, 'World').worldY,200,1,this);
                                this.boss.lifeFrames = 10;
                                this.bossBar = this.game.add.sprite(40, 10, 'healthbar_boss', this.boss.lifeFrames);
                                this.bossBar.fixedToCamera = true;
                            }
                        }
                    break;
                case 6:
                    this.bossBar.frame = 28 - this.boss.health;
                    if (this.megaman.position.y < this.map.getTile(275, 60, 'lerp').worldY) this.stage = 1;
                    break;
            }
    },
    checkCollisions:function()
    {       
        this.game.physics.arcade.collide(this.megaman,this.walls);
        if(this.stage == 6) this.game.physics.arcade.collide(this.megaman,this.bossWalls);
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
        if(this.game.physics.arcade.overlap(this.boss,this.megaman)) {
                    this.megaman.inmuFrames = 0;
                    this.megaman.lifeFrames += 8;
                }
        if(this.game.physics.arcade.overlap(this.sniper,this.megaman)) {
                    this.megaman.inmuFrames = 0;
                    this.megaman.lifeFrames += 4;
                }
        
        if(this.megaman.lifeFrames >= 28){
            this.game.sound.stopAll();
            this.game.state.start('main');
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
        
    },
}

