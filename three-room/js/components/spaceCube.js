class SpaceCube{
    constructor({width,height,depth,color,long}){
        this.width=width||12
        this.height=height||30
        this.depth=depth||12
        this.color=color||0xFFC0CB
        this.long=long||20

        this.SpaceCube
        this.createSpaceCube()
    }
    createSpaceCube(){
        this.SpaceCube=new THREE.Object3D()
        var width=this.width
        var height=this.height
        var depth=this.depth
        var cubePoints=[[width/2,height/2,-depth/2],[-width/2,height/2,-depth/2],[-width/2,-height/2,-depth/2],[width/2,-height/2,-depth/2],[width/2,height/2,-depth/2],
            [width/2,height/2,depth/2],[-width/2,height/2,depth/2],[-width/2,height/2,-depth/2],[-width/2,height/2,depth/2],[-width/2,-height/2,depth/2],
            [-width/2,-height/2,-depth/2],[-width/2,-height/2,depth/2],[width/2,-height/2,depth/2],[width/2,-height/2,-depth/2],[width/2,-height/2,depth/2],[width/2,height/2,depth/2]
        ]
        var material = new THREE.LineDashedMaterial({
            color: this.color,
            linewidth: 1,
            // linecap: 'round', 
            // linejoin:  'round',
        });
        var geometry = new THREE.Geometry();
        cubePoints.map(item=>{
            geometry.vertices.push(
                new THREE.Vector3( item[0], item[1], item[2] ),
            );
        })
        var line = new THREE.Line( geometry, material );
        this.SpaceCube.add(line)

        var cubegeometry=new THREE.BoxBufferGeometry(this.width,this.long,this.depth)
        var num=this.long/this.height
        var cubecolor;
        if(num>(3/5)){
            cubecolor=0x00ff00;
        }else if(num>=(2/5)){
            cubecolor=0xffff00;
        }else{
            cubecolor=0xff0000;
        }
        var cubematerial=new THREE.MeshToonMaterial({color:cubecolor,transparent:true,opacity:0.6})
        var mesh=new THREE.Mesh(cubegeometry,cubematerial) 
        mesh.position.y=-(this.height-this.long)/2
        this.SpaceCube.add(mesh)
    }
}