class Door {
    constructor({width,height,color,depth}){
        this.width=width
        this.height=height
        this.color=color
        this.depth=depth

        this.doorMesh
        this.doorplank
        this.doorhandler
        this.open=true

        this.createDoor()
    }

    createDoor(){
        this.doorMesh=new THREE.Object3D()
        this.doorMesh.name='door'
        var doorplankGeometry=new THREE.BoxBufferGeometry(this.width,this.height,this.depth)
        var doorplankmaterial = new THREE.MeshLambertMaterial({color: this.color,transparent:true,opacity:0.8,side: THREE.DoubleSide,})
        this.doorplank = new THREE.Mesh(doorplankGeometry, doorplankmaterial)
        this.doorMesh.add(this.doorplank)

        var doorhandlerGeometry=new THREE.BoxBufferGeometry(2,4,2)
        var doorhandlermaterial = new THREE.MeshLambertMaterial({color: 0x8EF4FF,transparent:true,opacity:0.8,side: THREE.DoubleSide,})
        this.doorhandler = new THREE.Mesh(doorhandlerGeometry, doorhandlermaterial)
        this.doorhandler.position.set(this.width/2-2,2,2)
        this.doorMesh.add(this.doorhandler)
    }

    openDoor(){
        if(this.open){
            this.open=!this.open
            this.doorMesh.rotateY(-Math.PI*0.5)
            this.doorMesh.position.set(-this.width/2,0,this.width/2)
        }else{
            this.open=!this.open
            this.doorMesh.rotation.set(0,0,0)
            this.doorMesh.position.set(0,0,0)
        }
        
    }

}
