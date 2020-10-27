var com={
    getDate:function(sign){
        var sign=sign||'-'
        var time=new Date();
        var year=time.getFullYear();
        var month=time.getMonth()+1;
        var day=time.getDate()
        if(month<10){
            month='0'+month
        }
        return year+sign+month+sign+day
    },
    getTime:function(sign){
        var sign=sign||':'
        var time=new Date();
        var hour=time.getHours();
        var min=time.getMinutes();
        var second=time.getSeconds();
        if(hour<10){
            hour='0'+hour
        }
        if(min<10){
            min='0'+min
        }
        if(second<10){
            second='0'+second
        }
        return hour+sign+min+sign+second
    },
    // 3d初始化
    init:function(target){
        var width=window.innerWidth;
        var height=window.innerHeight;
        scene=new THREE.Scene();//创建场景
        camera=new THREE.PerspectiveCamera(60,width/height,1,5000);//相机
        camera.position.set(330,500,600);
        // camera.lookAt(scene.position);
        camera.lookAt(new THREE.Vector3(1000,0,0));
        scene.add(camera);
    
        // 渲染 
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        renderer.setClearColor(0x2A2B2D);
        renderer.getClearAlpha(0)
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.querySelector(target).appendChild(renderer.domElement);
        
        com.render()
        com.moveView()
        com.light()
    },
    // 灯光
    light:function(){
        if (true) {
            var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.1);
            directionalLight.position.set( 300, 1000, 500 );
            directionalLight.target.position.set( 0, 0, 0 );
            directionalLight.castShadow = true;
    
            var d = 300;
            directionalLight.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 );
            directionalLight.shadow.bias = 0.0001;
            directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
            scene.add(directionalLight)
    
            var light = new THREE.AmbientLight( 0xffffff, 0.3 )
            scene.add( light )
        } else {
            var hemisphereLight = new THREE.HemisphereLight( 0xffffff, 1)
            scene.add( hemisphereLight)
    
            var light = new THREE.AmbientLight( 0xffffff, 0.15 )
            scene.add( light )
        }
    },
    // 移动视角
    moveView:function(){
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 0.35
        controls.enableZoom = true;
        controls.enablePan = false;
    },
    // render
    render:function(){
        TWEEN.update();
        renderer.render(scene, camera);
        requestAnimationFrame(com.render);
    },
    // 地板
    hatchway:function(){
        // floor 地板样式
        var floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 10, 20 );
        floorGeometry.rotateX( - Math.PI / 2 );
        // for ( var i = 0, l = floorGeometry.vertices.length; i < l; i ++ ) {
        //     var vertex = floorGeometry.vertices[ i ];
        //     vertex.x += Math.random() * 20 - 10;
        //     vertex.y += Math.random() * 2;
        //     vertex.z += Math.random() * 20 - 10;
        // }
        for ( var i = 0, l = floorGeometry.faces.length; i < l; i ++ ) {
            var face = floorGeometry.faces[ i ];
            face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        }
        var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
        var floor = new THREE.Mesh( floorGeometry, floorMaterial );
    }
}