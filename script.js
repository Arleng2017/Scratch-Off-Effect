window.onload = () => {
    const gameConfig = {
        type: Phaser.AUTO,
        renderer: Phaser.AUTO,
        with: window.screen.width,
        height: window.screen.height,
        backgroundColor: '#FFFfff',
        scene: [playGame]
    }
    game = new Phaser.Game(gameConfig);
}

class playGame extends Phaser.Scene {

    constructor() {
        super('playGame');
    }

    preload() {
        this.load.image('gift', 'assets/imgs/card.jpg')
        this.load.image('brush', './assets/imgs/brush.png')
    }

    create() {

        const x = 100;
        const y = 100;

        // reveal image
        const gift = this.add.image(x, y, 'gift');
        gift.displayHeight =500;
        gift.displayWidth =500;

        const cover = this.make.image({
            key: 'gift',
            add: false
        })

        cover.setOrigin(0, 0);
        // const width = cover.width
        // const height = cover.height

        var rt = this.add.renderTexture(x, y,500,500)
        rt.setOrigin(0.5, 0.5)
        rt.draw(cover, 0, 0)
        rt.setTint(0x000)

        rt.setInteractive()
        rt.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this)
        rt.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this)
        rt.on(Phaser.Input.Events.POINTER_UP, () => this.isDown = false)

        var ctx = rt.context;
        
        this.brush = this.make.image({
            key: 'brush',
            add: false
        }).setScale(0.1);

        this.renderTexture = rt;
    }

    handlePointerDown(pointer) {
        this.isDown = true
        this.handlePointerMove(pointer)
    }

    handlePointerMove(pointer,gameObject) {
        if (!this.isDown) { return }
         console.log(this.data.get('gift'));

        const x = pointer.x - this.renderTexture.x + this.renderTexture.width * 0.5
        const y = pointer.y - this.renderTexture.y + this.renderTexture.height * 0.5

        // console.log("Ok",gameObject);
        
        this.renderTexture.erase(this.brush, x, y);
        // gameObject.erase(this.brush, x, y);
        
    }

   

      
}