class Cabinet{
    constructor({width,height,depth,color,name}){
        this.width=width||12
        this.height=height||30
        this.depth=depth||12
        this.color=color||0x696969
        this.name=name||''
        this.planedepth=2

        this.open=true

        this.cabinetMesh
        this.nearMesh
        this.createCabinet()
        // this.openNearMesh()
    }
    createCabinet(){
        this.cabinetMesh=new THREE.Object3D()
        var leftgeometry = new THREE.BoxBufferGeometry(this.planedepth,this.height,this.depth)
        var leftmaterial = new THREE.MeshLambertMaterial({color: this.color})
        var leftMesh=new THREE.Mesh(leftgeometry,leftmaterial)
        leftMesh.position.x=-this.width/2+this.planedepth/2
        leftMesh.name='c_left'
        this.cabinetMesh.add(leftMesh)

        var rightMesh=leftMesh.clone()
        rightMesh.position.x=this.width/2-this.planedepth/2
        rightMesh.name='c_right'
        this.cabinetMesh.add(rightMesh)

        var topgeometry = new THREE.BoxBufferGeometry(this.width-this.planedepth*2,this.planedepth,this.depth)
        var topmaterial = new THREE.MeshLambertMaterial({color: this.color})
        var topMesh=new THREE.Mesh(topgeometry,topmaterial)
        topMesh.position.y=this.height/2-this.planedepth/2
        topMesh.name='c_top'
        this.cabinetMesh.add(topMesh)

        var bottomMesh=topMesh.clone()
        bottomMesh.position.y=-this.height/2+this.planedepth/2
        bottomMesh.name='c_bottom'
        this.cabinetMesh.add(bottomMesh)

        var fargeometry = new THREE.BoxBufferGeometry(this.width-this.planedepth*2,this.height-this.planedepth*2,this.planedepth)
        var farmaterial = new THREE.MeshLambertMaterial({color: this.color})
        var farMesh=new THREE.Mesh(fargeometry,farmaterial)
        farMesh.position.z=-this.depth/2+this.planedepth/2
        farMesh.name='c_far'
        this.cabinetMesh.add(farMesh)
        
        this.nearMesh=farMesh.clone()
        this.nearMesh.name='c_door'
        this.nearMesh.position.z=this.depth/2-this.planedepth/2
        this.cabinetMesh.add(this.nearMesh)
        // this.nearMesh.rotation.y=Math.PI*0.5

        var doorhandlerGeometry=new THREE.BoxBufferGeometry(2,4,2)
        var doorhandlermaterial = new THREE.MeshLambertMaterial({color: 0x8EF4FF,transparent:true,opacity:0.8,side: THREE.DoubleSide,})
        this.doorhandler = new THREE.Mesh(doorhandlerGeometry, doorhandlermaterial)
        this.doorhandler.position.set(-(this.width-this.planedepth*2)/2,2,2)
        this.nearMesh.add(this.doorhandler)    
    }
    openNearMesh(){
        if(this.open){
            this.open=!this.open
            this.nearMesh.rotation.y=Math.PI*0.5
            this.nearMesh.position.set((this.width-this.planedepth)/2,0,(this.width-this.planedepth))
        }else{
            this.open=!this.open
            this.nearMesh.rotation.y=0
            this.nearMesh.position.set(0,0,(this.depth/2-this.planedepth/2))
        }
    }
}