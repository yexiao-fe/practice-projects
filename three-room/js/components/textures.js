class Text{
    constructor({width,height,bgcolor,color,font,textAlign,text}){
        this.width=width||128
        this.height=height||128
        this.bgcolor=bgcolor||'rgba(255,255,255,0)'
        this.color=color||'#ff0000'
        this.font=font||"normal 30px Arial"
        this.textAlign=textAlign||'center'
        this.text=text||'hello'

        this.canvasTexture
        this.drawText()
    }
    drawText(){
        var canvas = document.createElement( 'canvas' );
        var ctx = canvas.getContext( '2d' );
        canvas.width = this.width
        canvas.height = this.height

        ctx.beginPath();
        ctx.fillStyle=this.bgcolor
        ctx.fillRect(0,0,this.width,this.height);   
    
        ctx.beginPath();
        // 设置字体
        ctx.font = this.font; 
        // 设置对齐方式
        ctx.textAlign = this.textAlign;
        // 设置填充颜色
        ctx.fillStyle = this.color; 
        // 设置字体内容，以及在画布上的位置
        ctx.fillText(this.text, this.width/2, this.height/2); 
        
        this.canvasTexture = new THREE.Texture(canvas);
        //   canvasTexture.wrapS = THREE.RepeatWrapping;
        //   canvasTexture.wrapT = THREE.RepeatWrapping;
        this.canvasTexture.needsUpdate = true;
    }
}
