class ServerText{
    constructor({width,height,bgcolor,color,font,textAlign,name,cpu,tem}){
        this.width=width||128
        this.height=height||128
        this.bgcolor=bgcolor||'rgba(255,255,255,0)'
        this.color=color||'#ff0000'
        this.font=font||"normal 24px Arial"
        this.textAlign=textAlign||'center'

        this.name=name||'hello'
        this.cpu=cpu||'x'
        this.tem=tem||'?'

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
        ctx.fillText(this.name, this.width/2, 20); 

        ctx.beginPath();
        // 设置字体
        ctx.font = this.font; 
        // 设置对齐方式
        ctx.textAlign = 'left';
        // 设置填充颜色
        ctx.fillStyle = this.color; 
        // 设置字体内容，以及在画布上的位置
        ctx.fillText('CPU：'+this.cpu, 0, 50); 

        ctx.beginPath();
        // 设置字体
        ctx.font = this.font; 
        // 设置对齐方式
        ctx.textAlign = 'left';
        // 设置填充颜色
        ctx.fillStyle = this.color; 
        // 设置字体内容，以及在画布上的位置
        ctx.fillText('温度：'+this.tem, 0, 90); 
        
        this.canvasTexture = new THREE.Texture(canvas);
        //   canvasTexture.wrapS = THREE.RepeatWrapping;
        //   canvasTexture.wrapT = THREE.RepeatWrapping;
        this.canvasTexture.needsUpdate = true;
    }
}
