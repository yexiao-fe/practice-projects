

var textures = {
    window: function () {
      var canvas = document.createElement( 'canvas' );
      var ctx = canvas.getContext( '2d' );
  
      canvas.width = 100
      canvas.height = 100
  
      var colors = {
        border: '#3c3443',
        top: '#9d94a7',
        bottom: '#796e8c'
      }

    ctx.beginPath();
    ctx.fillStyle='rgba(255,255,255,1)'
    ctx.fillRect(0,0,100,100);   
    
    ctx.beginPath();
    // 设置字体
    ctx.font = "normal 30px Arial"; 
    // 设置对齐方式
    ctx.textAlign = "center";
    // 设置填充颜色
    ctx.fillStyle = "#00ff00"; 
    // 设置字体内容，以及在画布上的位置
    ctx.fillText("A区", 50, 50); 

  
      var canvasTexture = new THREE.Texture(canvas);
    //   canvasTexture.wrapS = THREE.RepeatWrapping;
    //   canvasTexture.wrapT = THREE.RepeatWrapping;
      canvasTexture.needsUpdate = true;
      
      return canvasTexture;
    }
  }