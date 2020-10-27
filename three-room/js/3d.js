var scene,camera,renderer,controls;
// var url='/demo/3dc2/json/crew.json'
var url='../json/crew.json'
var floorCoords=[{"x":-50,"y":-180},{"x":250,"y":-180},{"x":250,"y":140},{"x":-50,"y":140},{"x":-50,"y":180},{"x":-250,"y":180},{"x":-250,"y":-140},{"x":-50,"y":-140},{"x":-50,"y":-180}]
var serverJson=[]
// 围墙
var outCoords=[[-50,-180],[250,-180],[250,140],[-50,140],[-50,180],[-250,180],[-250,-140],[-50,-140],[-50,-180]]
var inCoords=[[-46,-176],[246,-176],[246,136],[-56,136],[-56,176],[-246,176],[-246,-136],[-46,-136],[-46,-176]]
var walls=[
    {
        wallCoords:[[-246,-50],[-124,-50],[-124,-54],[-246,-54],[-246,-50]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[-136,0],[-136,60],[176,60],[176,0],[0,0],[0,40],[-20,40],[-20,0],[-60,0],[-60,40],[-80,40],[-80,0],[-136,0]],
        depth:6,
        position:[-124,6,0],
        rotation:[Math.PI*0.5,0,-Math.PI*0.5]
    },{
        wallCoords:[[-120,0],[-120,60],[100,60],[100,0],[-60,0],[-60,40],[-80,40],[-80,0],[-120,0]],
        depth:6,
        position:[0,6,-10],
        rotation:[Math.PI*0.5,0,0]
    },{
        wallCoords:[[-120,120],[100,120],[100,10],[96,10],[96,116],[-120,116],[-120,120]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[-136,0],[-136,60],[-50,60],[-50,0],[-105,0],[-105,40],[-125,40],[-125,0],[-136,0]],
        depth:6,
        position:[-51,6,0],
        rotation:[Math.PI*0.5,0,-Math.PI*0.5]
    },{
        wallCoords:[[-50,-50],[140,-50],[140,-54],[90,-54],[90,-176],[86,-176],[86,-54],[-50,-54],[-50,-50]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[-50,0],[-50,60],[138,60],[138,0],[120,0],[120,40],[100,40],[100,0],[60,0],[60,40],[40,40],[40,0],[0,0],[0,40],[-20,40],[-20,0],[-50,0]],
        depth:6,
        position:[134,6,0],
        rotation:[Math.PI*0.5,0,-Math.PI*0.5]
    },{
        wallCoords:[[136,20],[246,20],[246,16],[136,16],[136,20]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[136,96],[246,96],[246,92],[136,92],[136,96]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[136,70],[180,70],[180,66],[136,66],[136,70]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[70,0],[70,60],[96,60],[96,0],[93,0],[93,40],[73,40],[73,0],[70,0]],
        depth:6,
        position:[174,6,0],
        rotation:[Math.PI*0.5,0,-Math.PI*0.5]
    },{
        wallCoords:[[-180,-100],[-124,-100],[-124,-104],[-180,-104],[-180,-100]],
        depth:60,
        position:[0,6,0],
        rotation:[0,0,0]
    },{
        wallCoords:[[-136,60],[-104,60],[-104,0],[-116,0],[-116,40],[-136,40],[-136,60]],
        depth:6,
        position:[-180,6,0],
        rotation:[Math.PI*0.5,0,-Math.PI*0.5]
    }
]
// 添加门
var doors=[
    {
        position:[-70,-8],
        rotationy:0,
    },{
        position:[-120,10],
        rotationy:Math.PI*0.5,
    },{
        position:[-120,70],
        rotationy:Math.PI*0.5,
    },{
        position:[-176,126],
        rotationy:-Math.PI*0.5,
    },{
        position:[-48,116],
        rotationy:-Math.PI*0.5,
    },{
        position:[136,10],
        rotationy:-Math.PI*0.5,
    },{
        position:[136,-50],
        rotationy:-Math.PI*0.5,
    },{
        position:[136,-110],
        rotationy:-Math.PI*0.5,
    },{
        position:[178,-83],
        rotationy:Math.PI*0.5,
    }
]
// 机组坐标 [100,104],[100,144],[190,104],[190,144],[190,64]
var crewCoords=[{position:[-230,25],rotation:[Math.PI*0.5]},{position:[-190,25],rotation:[Math.PI*0.5]},{position:[-220,-40],rotation:[0]},{position:[-220,-80],rotation:[0]},{position:[-220,-124],rotation:[0]},{position:[-220,-162],rotation:[0]},
{position:[-150,-40],rotation:[0]},{position:[-150,-80],rotation:[0]},{position:[-150,-124],rotation:[0]},{position:[-150,-162],rotation:[0]},
{position:[-40,-90],rotation:[-Math.PI*0.5]},{position:[0,-90],rotation:[-Math.PI*0.5]},{position:[40,-90],rotation:[-Math.PI*0.5]},{position:[80,-90],rotation:[-Math.PI*0.5]},{position:[-40,-30],rotation:[-Math.PI*0.5]},
{position:[0,-30],rotation:[-Math.PI*0.5]},{position:[40,-30],rotation:[-Math.PI*0.5]},{position:[80,-30],rotation:[-Math.PI*0.5]},
{position:[-10,150],rotation:[-Math.PI*0.5]},{position:[25,150],rotation:[-Math.PI*0.5]},{position:[65,150],rotation:[-Math.PI*0.5]},{position:[-10,80],rotation:[-Math.PI*0.5]},{position:[25,80],rotation:[-Math.PI*0.5]},
{position:[65,80],rotation:[-Math.PI*0.5]},
{position:[120,94],rotation:[0]},{position:[120,140],rotation:[0]},{position:[210,140],rotation:[0]},{position:[210,94],rotation:[0]},{position:[210,44],rotation:[0]}
]
// 房间标签
var roomA=new Text({text:"A区",bgcolor:'rgb(203,191,179)'})
var roomB=new Text({text:"B区",bgcolor:'rgb(203,191,179)'})
var roomC=new Text({text:"C区",bgcolor:'rgb(203,191,179)'})
var roomD=new Text({text:"D区",bgcolor:'rgb(203,191,179)'})
var room=[roomA,roomB,roomC,roomD]
var roomCoords=[
    {position:[-160,0],rotation:[Math.PI*0.5]},{position:[-80,-50],rotation:[0]},{position:[20,120],rotation:[0]},{position:[190,20],rotation:[0]}
]




// ******************************事件*********************************************
var doorOpen=[],cabinetOpen=[],serverOpen=[],showText=[],spaceCube=[],planeCube=[];
var cabinetOpen1=[],serverOpen1=[],showText1=[],spaceCube1=[],planeCube1=[];
var cabinetOpen2=[],serverOpen2=[],showText2=[],spaceCube2=[],planeCube2=[];
var cabinetOpen3=[],serverOpen3=[],showText3=[],spaceCube3=[],planeCube3=[];
// 点击事件
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function onDblClick( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    //新建一个三维单位向量 假设z方向就是0.5
    //根据照相机，把这个向量转换到视点坐标系
    var vector = new THREE.Vector3(mouse.x, mouse.y,0.5).unproject(camera);

    //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    //射线和模型求交，选中一系列直线
    // console.log(scene.children)
    var intersects = raycaster.intersectObjects(scene.children,true);

    console.log('imtersrcts=' ,intersects)

    if (intersects.length > 0) {
        //选中第一个射线相交的物体
        SELECTED = intersects[0].object;
        var intersected = intersects[0].object;
        // 门
        doorOpen.forEach(function(door){
            if(door.doorMesh===intersected.parent){
                door.openDoor()
                return
            }
        })
        // 机柜门
        cabinetOpen.forEach(function(cabinet){
            if(cabinet.nearMesh===intersected){
                cabinet.openNearMesh()
                return
            }
        })
        // 服务器
        var show=true
        serverOpen.forEach(function(server,index){
            if(server.serverMesh===intersected){
                showText[index].isMesh=!showText[index].isMesh
                server.openServer()
                return
            }
        })
    }

}
window.addEventListener( 'dblclick', onDblClick, false );

// ?*****************************事件**************************************
var lines=[],controlEnable=true;
function _init(){
    controlEnable=true
    camera.fov=60
    camera.updateProjectionMatrix();
    controls.target.set(0,0,0);
    floor1.position.z=0
    floor2.position.z=0
    floor3.position.z=0
    $('.right_side  ul li').removeClass('cyan')
    $('.left_side  ul li').removeClass('cyan')
    $('.left_side  ul li').eq(0).addClass('cyan')

    if(lines.length>0){
        lines.map(item=>{
            item.isLine=false
        })
    }

    cabinetOpen.map((item,i)=>{
        var index = Math.floor(Math.random() * length)
        item.cabinetMesh.children.map(item2=>{
            item2.isMesh=true
            if(item2.name==='c_door'){
                item2.children[0].isMesh=true
                return
            }
        })
    })
    planeCube.map(item=>{
        item.isMesh=true
    })
    spaceCube.map(item=>{
        item.SpaceCube.children[0].isLine=false
        item.SpaceCube.children[1].isMesh=false
    })
}

// 初始
var onKeyDown=function(e){
    switch( event.keyCode ){
        case 27:
        _init()
        break
    }
}
document.addEventListener( 'keydown', onKeyDown, false );
$('.init').click(function(){
    _init()
})

// 左边
$('.db').click(function(){
    var length=serverOpen.length
    var index = Math.floor(Math.random() * length)
    var index2 = Math.floor(Math.random() * length)
    var tem = Math.floor(Math.random() * 80)
    var tem2 = Math.floor(Math.random() * 80)
    var cpu = Math.floor(Math.random() * 60)
    var cpu2 = Math.floor(Math.random() * 60)
    var div=document.createElement('div')
    div.innerHTML='<div><nav>x</nav><table><tr><th>name</th><th>cpu</th><th>temperature</th></tr>'
    +'<tr><th>server'+index+'</th><th>'+cpu+'</th><th>'+tem+'℃</th></tr>'
    +'<tr><th>server'+index2+'</th><th>'+cpu2+'</th><th>'+tem2+'℃</th></tr>'+'</table></div>'
    div.setAttribute('class','box')
    document.body.appendChild(div)
    $('nav').click(function(){
        var thisnode=this.parentElement.parentElement
        thisnode.parentNode.removeChild(thisnode)
    })
})

$('.line').click(function(){
    if(lines.length>0){
        lines.map(item=>{
            item.isLine=false
        })
    }
    var length=cabinetOpen.length
    var index = Math.floor(Math.random() * length)
    var index2 = Math.floor(Math.random() * length)
    var lineCoords=[cabinetOpen[index]['cabinetMesh'],cabinetOpen[index2]['cabinetMesh']]

    var y1,y2,max;
    var body = new THREE.Box3().setFromObject(cabinetOpen[index]['cabinetMesh']);
    var center=body.getCenter()
    y1=center.y
    var body = new THREE.Box3().setFromObject(cabinetOpen[index2]['cabinetMesh']);
    var center=body.getCenter()
    y2=center.y
    if(y1>120||y2>120){
        max=200
    }else if(y1>0||y2>0){
        max=80
    }else{
        max=-20
    }
    var line=computerRoom.createLine(lineCoords,max)
    lines.push(line)
    scene.add(line)
})
var spaceshow=true
$('.space').click(function(){
    var colors=[0xff0000,0x00ff00,0xffff00]
    var length=colors.length
    cabinetOpen.map((item,i)=>{
        var index = Math.floor(Math.random() * length)
        var color=colors[index]
        item.cabinetMesh.children.map(item2=>{
            // item2.material.color.setHex(color)
            item2.isMesh=!spaceshow
            if(item2.name==='c_door'){
                item2.children[0].isMesh=!spaceshow
                return
            }
        })
    })
    planeCube.map(item=>{
        item.isMesh=!spaceshow
    })
    spaceCube.map(item=>{
        item.SpaceCube.children[0].isLine=spaceshow
        item.SpaceCube.children[1].isMesh=spaceshow
    })
    spaceshow=!spaceshow
})


// 右边
$('.right_side  ul li').eq(0).click(function(){
    scene.children[3].children.map(item=>{
        if(item.name==='wallfloor1'){
            controls.target.set(0,0,0);
            controlz(item)            
            floor3.position.y=-120
            return
        }
    })
})
$('.right_side  ul li').eq(1).click(function(){
    scene.children[4].children.map(item=>{
        if(item.name==='wallfloor2'){
            controls.target.set(0,0,0);
            controlz(item)
            floor1.position.z=-500
            floor3.position.z=500
            return
        }
    })
})
$('.right_side  ul li').eq(2).click(function(){
    scene.children[5].children.map(item=>{
        if(item.name==='wallfloor3'){
            controls.target.set(0,0,0);
            controlz(item)
            floor1.position.z=-1000
            floor2.position.z=-500
            return
        }
    })
})

function controlz(item){
    floor1.position.z=0
    floor2.position.z=0
    floor3.position.z=0
    var body = new THREE.Box3().setFromObject(item);
    var center=body.getCenter()
    var radius=item.geometry.boundingSphere.radius
    var distance=600
    if(controlEnable){
        controlEnable=false
        new TWEEN.Tween( camera ).to({fov:Math.atan(radius/distance)*50}, 2000 )
        .easing( TWEEN.Easing.Linear.None).onUpdate(function(){
            camera.updateProjectionMatrix();
        }).start();

        controls.target.set(center.x,center.y,center.z);
    }else{
        
    }
}

// ****************************************************************************************


// 3d初始化
com.init('.td_room')

var floor1=addFloor1()
floor1.position.y=120
scene.add(floor1)

var floor2=addFloor2()
scene.add(floor2)

var floor3=addFloor3()
floor3.position.y=-120
scene.add(floor3)


// 第一层
function addFloor1(){
    var building=new THREE.Object3D()
    var floor=new Hatchway({coords:floorCoords})
    building.add(floor.floorMesh)

    roomCoords.map((item,index)=>{
        var p=new THREE.BoxBufferGeometry(50,1,50)
        var m=new THREE.MeshLambertMaterial({map:room[index].canvasTexture})
        var mesh=new THREE.Mesh(p,m)
        mesh.position.set(item.position[0],5.6,item.position[1])
        mesh.rotation.y=item.rotation[0]
        building.add(mesh)
    })
    

    var wall=computerRoom.createWall(outCoords,inCoords)
    var wallTop=computerRoom.createWall(outCoords,inCoords,66,6,0x8EF4FF,0.6)
    var wallBottom=computerRoom.createWall(outCoords,inCoords,-4,4,0x8EF4FF,0.6)
    wall.name='wallfloor1'
    building.add(wall)
    building.add(wallTop)
    building.add(wallBottom)
    walls.map(item=>{
        var wall=computerRoom.createFloor(item.wallCoords,item.depth,0xffffff,'toon')
        wall.position.set(item.position[0],item.position[1],item.position[2])
        wall.rotation.set(item.rotation[0],item.rotation[1],item.rotation[2])
        building.add(wall)
    })

    doors.map(item=>{
        var door=new THREE.Object3D()
        var doorinit=new Door({
            width:20,height:40,depth:4,color:0xFFCC33
        })
        doorOpen.push(doorinit)
        door.add(doorinit.doorMesh)
        door.position.set(item.position[0],26,item.position[1])
        door.rotation.y=item.rotationy
        door.name='door'
        building.add(door)
    })


    $.get(url).done(function(data){
        // console.log(data)
        data.map((item,index)=>{
            var crew=new THREE.Object3D()
            crew.name=item.name
            // ?
            var length=item.cabinetJson.length
            var centernum=Math.ceil(length/2)-1
            item.cabinetJson.map((item2,index2)=>{
                var width=12;
                var height=30;
                var cabinet=new Cabinet({color:item2.color})
                cabinetOpen.push(cabinet)
                cabinetOpen1.push(cabinet)
                cabinet.cabinetMesh.name=item2.name

                // space 空间剩余量
                var long = Math.floor(Math.random() * 30)
                var space=new SpaceCube({long:long})
                spaceCube.push(space)
                spaceCube1.push(space)
                space.SpaceCube.children[0].isLine=false
                space.SpaceCube.children[1].isMesh=false
                crew.add(space.SpaceCube)

                if(length%2===0){
                    cabinet.cabinetMesh.position.set((index2-centernum)*13-6.5,20,0)

                    space.SpaceCube.position.set((index2-centernum)*13-6.5,20,0)
                }else{
                    cabinet.cabinetMesh.position.set((index2-centernum)*13,20,0)

                    space.SpaceCube.position.set((index2-centernum)*13,20,0)
                }
                
                crew.add(cabinet.cabinetMesh)
                // ?
                item2.serverJson.map((item3,index3)=>{
                        var server=new Server(item3)
                        serverOpen.push(server)
                        serverOpen1.push(server)
                        server.serverMesh.name=item3.name
                        server.serverMesh.position.set(item3.position.x,item3.position.y,item3.position.z)
                        cabinet.cabinetMesh.add(server.serverMesh)

                        var serverText=new ServerText({name:item3.name,cpu:item3.cpu,tem:item3.tem,bgcolor:'#fff'})
                        var g=new THREE.BoxBufferGeometry(32,16,1)
                        var m=new THREE.MeshLambertMaterial({color:0xffffff,map:serverText.canvasTexture})
                        var mesh=new THREE.Mesh(g,m)
                        mesh.position.y=50
                        mesh.isMesh=false
                        showText.push(mesh)
                        showText1.push(mesh)
                        crew.add(mesh)
                })

                // 隔线
                if(index2>0){
                    var planeGeometryLine = new THREE.BoxBufferGeometry(1,height,width)
                    var materialLine = new THREE.MeshToonMaterial({color: 0x8EF4FF,transparent:true,opacity:1,side: THREE.DoubleSide,})
                    var planeLine = new THREE.Mesh(planeGeometryLine, materialLine)
                    planeCube.push(planeLine)
                    planeCube1.push(planeLine)
                    if(length%2===0){
                        planeLine.position.set((index2-centernum-1)*13,20,0)
                    }else{
                        planeLine.position.set((index2-centernum)*13-6.5,20,0)
                    }
                    crew.add(planeLine)
                }
            })
            crew.rotation.y=crewCoords[index].rotation[0]
            crew.position.set(crewCoords[index].position[0],0,crewCoords[index].position[1])
            building.add(crew)
        })
    })
    
    return building
}
// 第二层
function addFloor2(){
    var building=new THREE.Object3D()
    var floor=new Hatchway({coords:floorCoords})
    building.add(floor.floorMesh)

    roomCoords.map((item,index)=>{
        var p=new THREE.BoxBufferGeometry(50,1,50)
        var m=new THREE.MeshLambertMaterial({map:room[index].canvasTexture})
        var mesh=new THREE.Mesh(p,m)
        mesh.position.set(item.position[0],5.6,item.position[1])
        mesh.rotation.y=item.rotation[0]
        building.add(mesh)
    })
    

    var wall=computerRoom.createWall(outCoords,inCoords)
    var wallTop=computerRoom.createWall(outCoords,inCoords,66,6,0x8EF4FF,0.6)
    var wallBottom=computerRoom.createWall(outCoords,inCoords,-4,4,0x8EF4FF,0.6)
    wall.name='wallfloor2'
    building.add(wall)
    building.add(wallTop)
    building.add(wallBottom)
    walls.map(item=>{
        var wall=computerRoom.createFloor(item.wallCoords,item.depth,0xffffff,'toon')
        wall.position.set(item.position[0],item.position[1],item.position[2])
        wall.rotation.set(item.rotation[0],item.rotation[1],item.rotation[2])
        building.add(wall)
    })

    doors.map(item=>{
        var door=new THREE.Object3D()
        var doorinit=new Door({
            width:20,height:40,depth:4,color:0xFFCC33
        })
        doorOpen.push(doorinit)
        door.add(doorinit.doorMesh)
        door.position.set(item.position[0],26,item.position[1])
        door.rotation.y=item.rotationy
        door.name='door'
        building.add(door)
    })


    $.get(url).done(function(data){
        // console.log(data)
        data.map((item,index)=>{
            var crew=new THREE.Object3D()
            crew.name=item.name
            // ?
            var length=item.cabinetJson.length
            var centernum=Math.ceil(length/2)-1

            var randomcolor;
            var name=item.name.slice(0,3)
            if(name==='机组a'){
                randomcolor='rgb(255,165,3)'
            }else if(name==='机组b'){
                randomcolor='rgb(240,251,255)'
            }else if(name==='机组c'){
                randomcolor='rgb(105,105,105)'
            }else if(name==='机组d'){
                randomcolor='rgb(187,187,187)'
            }
            item.cabinetJson.map((item2,index2)=>{
                var width=12;
                var height=30;
                var cabinet=new Cabinet({color:randomcolor})
                cabinetOpen.push(cabinet)
                cabinetOpen2.push(cabinet)
                cabinet.cabinetMesh.name=item2.name

                // space 空间剩余量
                var long = Math.floor(Math.random() * 30)
                var space=new SpaceCube({long:long})
                spaceCube.push(space)
                spaceCube2.push(space)
                space.SpaceCube.children[0].isLine=false
                space.SpaceCube.children[1].isMesh=false
                crew.add(space.SpaceCube)

                if(length%2===0){
                    cabinet.cabinetMesh.position.set((index2-centernum)*13-6.5,20,0)

                    space.SpaceCube.position.set((index2-centernum)*13-6.5,20,0)
                }else{
                    cabinet.cabinetMesh.position.set((index2-centernum)*13,20,0)

                    space.SpaceCube.position.set((index2-centernum)*13,20,0)
                }
                
                crew.add(cabinet.cabinetMesh)
                // ?
                item2.serverJson.map((item3,index3)=>{
                        var server=new Server(item3)
                        serverOpen.push(server)
                        serverOpen2.push(server)
                        server.serverMesh.name=item3.name
                        server.serverMesh.position.set(item3.position.x,item3.position.y,item3.position.z)
                        cabinet.cabinetMesh.add(server.serverMesh)

                        var serverText=new ServerText({name:item3.name,cpu:item3.cpu,tem:item3.tem,bgcolor:'#fff'})
                        var g=new THREE.BoxBufferGeometry(32,16,1)
                        var m=new THREE.MeshLambertMaterial({color:0xffffff,map:serverText.canvasTexture})
                        var mesh=new THREE.Mesh(g,m)
                        mesh.position.y=50
                        mesh.isMesh=false
                        showText.push(mesh)
                        showText2.push(mesh)
                        crew.add(mesh)
                })

                // 隔线
                if(index2>0){
                    var planeGeometryLine = new THREE.BoxBufferGeometry(1,height,width)
                    var materialLine = new THREE.MeshToonMaterial({color: 0x8EF4FF,transparent:true,opacity:1,side: THREE.DoubleSide,})
                    var planeLine = new THREE.Mesh(planeGeometryLine, materialLine)
                    planeCube.push(planeLine)
                    planeCube2.push(planeLine)
                    if(length%2===0){
                        planeLine.position.set((index2-centernum-1)*13,20,0)
                    }else{
                        planeLine.position.set((index2-centernum)*13-6.5,20,0)
                    }
                    crew.add(planeLine)
                }
            })
            crew.rotation.y=crewCoords[index].rotation[0]
            crew.position.set(crewCoords[index].position[0],0,crewCoords[index].position[1])
            building.add(crew)
        })
    })
    
    return building
}
// ?第三层
function addFloor3(){
    var building=new THREE.Object3D()
    var floor=new Hatchway({coords:floorCoords})
    building.add(floor.floorMesh)

    roomCoords.map((item,index)=>{
        var p=new THREE.BoxBufferGeometry(50,1,50)
        var m=new THREE.MeshLambertMaterial({map:room[index].canvasTexture})
        var mesh=new THREE.Mesh(p,m)
        mesh.position.set(item.position[0],5.6,item.position[1])
        mesh.rotation.y=item.rotation[0]
        building.add(mesh)
    })
    

    var wall=computerRoom.createWall(outCoords,inCoords)
    var wallTop=computerRoom.createWall(outCoords,inCoords,66,6,0x8EF4FF,0.6)
    var wallBottom=computerRoom.createWall(outCoords,inCoords,-4,4,0x8EF4FF,0.6)
    wall.name='wallfloor3'
    building.add(wall)
    building.add(wallTop)
    building.add(wallBottom)
    walls.map(item=>{
        var wall=computerRoom.createFloor(item.wallCoords,item.depth,0xffffff,'toon')
        wall.position.set(item.position[0],item.position[1],item.position[2])
        wall.rotation.set(item.rotation[0],item.rotation[1],item.rotation[2])
        building.add(wall)
    })

    doors.map(item=>{
        var door=new THREE.Object3D()
        var doorinit=new Door({
            width:20,height:40,depth:4,color:0xFFCC33
        })
        doorOpen.push(doorinit)
        door.add(doorinit.doorMesh)
        door.position.set(item.position[0],26,item.position[1])
        door.rotation.y=item.rotationy
        door.name='door'
        building.add(door)
    })


    $.get(url).done(function(data){
        // console.log(data)
        data.map((item,index)=>{
            var crew=new THREE.Object3D()
            crew.name=item.name
            // ?
            var length=item.cabinetJson.length
            var centernum=Math.ceil(length/2)-1

            var randomcolor;
            var name=item.name.slice(0,3)
            if(name==='机组c'){
                randomcolor='rgb(255,165,3)'
            }else if(name==='机组b'){
                randomcolor='rgb(240,251,255)'
            }else if(name==='机组d'){
                randomcolor='rgb(105,105,105)'
            }else if(name==='机组a'){
                randomcolor='rgb(187,187,187)'
            }
            item.cabinetJson.map((item2,index2)=>{
                var width=12;
                var height=30;
                var cabinet=new Cabinet({color:randomcolor})
                cabinetOpen.push(cabinet)
                cabinetOpen3.push(cabinet)
                cabinet.cabinetMesh.name=item2.name

                // space 空间剩余量
                var long = Math.floor(Math.random() * 30)
                var space=new SpaceCube({long:long})
                spaceCube.push(space)
                spaceCube3.push(space)
                space.SpaceCube.children[0].isLine=false
                space.SpaceCube.children[1].isMesh=false
                crew.add(space.SpaceCube)

                if(length%2===0){
                    cabinet.cabinetMesh.position.set((index2-centernum)*13-6.5,20,0)

                    space.SpaceCube.position.set((index2-centernum)*13-6.5,20,0)
                }else{
                    cabinet.cabinetMesh.position.set((index2-centernum)*13,20,0)

                    space.SpaceCube.position.set((index2-centernum)*13,20,0)
                }
                
                crew.add(cabinet.cabinetMesh)
                // ?
                item2.serverJson.map((item3,index3)=>{
                        var server=new Server(item3)
                        serverOpen.push(server)
                        serverOpen3.push(server)
                        server.serverMesh.name=item3.name
                        server.serverMesh.position.set(item3.position.x,item3.position.y,item3.position.z)
                        cabinet.cabinetMesh.add(server.serverMesh)

                        var serverText=new ServerText({name:item3.name,cpu:item3.cpu,tem:item3.tem,bgcolor:'#fff'})
                        var g=new THREE.BoxBufferGeometry(32,16,1)
                        var m=new THREE.MeshLambertMaterial({color:0xffffff,map:serverText.canvasTexture})
                        var mesh=new THREE.Mesh(g,m)
                        mesh.position.y=50
                        mesh.isMesh=false
                        showText.push(mesh)
                        showText3.push(mesh)
                        crew.add(mesh)
                })

                // 隔线
                if(index2>0){
                    var planeGeometryLine = new THREE.BoxBufferGeometry(1,height,width)
                    var materialLine = new THREE.MeshToonMaterial({color: 0x8EF4FF,transparent:true,opacity:1,side: THREE.DoubleSide,})
                    var planeLine = new THREE.Mesh(planeGeometryLine, materialLine)
                    planeCube.push(planeLine)
                    planeCube3.push(planeLine)
                    if(length%2===0){
                        planeLine.position.set((index2-centernum-1)*13,20,0)
                    }else{
                        planeLine.position.set((index2-centernum)*13-6.5,20,0)
                    }
                    crew.add(planeLine)
                }
            })
            crew.rotation.y=crewCoords[index].rotation[0]
            crew.position.set(crewCoords[index].position[0],0,crewCoords[index].position[1])
            building.add(crew)
        })
    })
    
    return building
}
