class Server{
    constructor({width,height,depth,color,name}){
        this.width=width||8
        this.height=height||10
        this.depth=depth||2
        this.color=color||0x696969
        this.name=name||''
        this.open=true

        this.serverMesh
        this.createServer()

    }
    createServer(){
        // var url='/demo/3dc2/images/server.png'
        var url='../../images/server.png'
        var geometry = new THREE.BoxBufferGeometry(this.width,this.height,this.depth)
        var material = new THREE.MeshLambertMaterial({
            // color: this.color,
            map:new THREE.TextureLoader().load(url,)
        })
        this.serverMesh=new THREE.Mesh(geometry,material)
        this.serverMesh.name=this.name
        this.serverMesh.rotateX(Math.PI*0.5)
    }
    openServer(){
        if(this.open){
            this.open=!this.open
            this.serverMesh.position.z=10
        }else{
            this.open=!this.open
            this.serverMesh.position.z=0
        }
    }
}