/**
 * 机房模型 包括（地板、围墙、机柜、门...）
 * **/ 
let computerRoom={
    // 创建地板
    // floorCoords:array  depth:number color:string
    createFloor:function(floorCoords,depth,color,type){
        var floorCoords=floorCoords||[]
        var depth=depth||6
        var color=color||0xCBBFB3
        var type=type||''
        var floorShap=computerRoom._makeShape(floorCoords)
        var floorGeometry=computerRoom._makeExtrudeGeometry(floorShap,depth)
        var floorMaterial
        if(type==='toon'){
            floorMaterial = new THREE.MeshToonMaterial({color: color,transparent:true,opacity:0.8,side: THREE.DoubleSide,})
        }else{
            floorMaterial = new THREE.MeshLambertMaterial({
                color: color,
                // map:new THREE.TextureLoader().load('../../images/floor.png')
            })
        }
        
        
        var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
        return floorMesh

    },
    // 创建墙
    // wallCoords:array otherWallCoords:array translateY:number height:number color:遵循three写法 opacity:number
    createWall:function(wallCoords,otherWallCoords,translateY,height,color,opacity){
        var wallCoords=wallCoords||[]
        var otherWallCoords=otherWallCoords||[]
        var translateY=translateY||6
        var height=height||60
        var color=color||0xffffff
        var opacity=opacity||0.8
        var wallShap=computerRoom._makeShape(wallCoords,otherWallCoords)
        var wallGeometry=computerRoom._makeExtrudeGeometry(wallShap,height)
        var material = new THREE.MeshLambertMaterial({color: color,transparent:true,opacity:opacity})
        var plane = new THREE.Mesh(wallGeometry, material)
        plane.position.y=translateY
        return plane
    },
    // 创建线缆
    createLine:function(lineCoords,maxY,color){
        var color=color||0x00FF00
        var maxY=maxY||0
        var linePoint=[]
        lineCoords.map(item=>{
            var body = new THREE.Box3().setFromObject(item);
            var center=body.getCenter()
            linePoint.push(center)
        })
        var newPoint=[]
        linePoint.map((item,index)=>{
            if(index===0){
                newPoint.push([item.x,item.y,item.z])
                newPoint.push([item.x,maxY,item.z])
            }else{
                newPoint.push([item.x,maxY,linePoint[index-1].z])
                newPoint.push([item.x,maxY,item.z])
                newPoint.push([item.x,item.y,item.z])
                newPoint.push([item.x,maxY,item.z])
            }
        })
        var material = new THREE.LineDashedMaterial({
            color: color,
            linewidth: 1,
            // linecap: 'round', 
            // linejoin:  'round',
        });
        var geometry = new THREE.Geometry();
        newPoint.map(item=>{
            geometry.vertices.push(
                new THREE.Vector3( item[0], item[1], item[2] ),
            );
        })
        // console.log(geometry)
        
        var line = new THREE.Line( geometry, material );
        return line
    },
    // 制作shape 参数为数组 （array1,array2）连点成线
    _makeShape: function () {
        var shape
        if (window.THREE && arguments.length) {
            var arry = arguments[0]
            shape = new THREE.Shape()
            shape.moveTo(arry[0][0], arry[0][1])
            for (var i=1; i<arry.length; i++) {
                shape.lineTo(arry[i][0], arry[i][1])
            }
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i ++) {
                    var pathCoords = arguments[i]
                    var path = new THREE.Path()
                    path.moveTo(pathCoords[0][0], pathCoords[0][1])
                    for (var i = 1; i < pathCoords.length; i++) {
                    path.lineTo(pathCoords[i][0], pathCoords[i][1])
                    }
                    shape.holes.push(path)
                } 
            }
            return shape
        }else {
            console.error('Something wrong!')
        }
    },
    // 制作ExtrudeBufferGeometry几何
    _makeExtrudeGeometry: function (shape, amount) {
        var extrudeSetting = {
          steps: 1,
          amount: amount,
          bevelEnabled: false
        }
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSetting)
        geometry.rotateX( -0.5 * Math.PI)
        return geometry
    },
    // 制作shape几何
    _makeShapeGeometry: function (shapeCoords) {
        console.log(shapeCoords)
        var shape = this.makeShape(shapeCoords)
        var geometry = new THREE.ShapeGeometry(shape)
        return geometry
    },
}