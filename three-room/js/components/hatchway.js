class Hatchway{
    constructor({coords,depth,color}){
        this.coords=coords||[]
        this.depth=depth||6
        this.color=color||0xCBBFB3
        this.floorMesh
        this.createHatchway()
    }

    createHatchway(){

        var floorShap=this._makeShape(this.coords)
        var floorGeometry=this._makeExtrudeGeometry(floorShap,this.depth)
        var floorMaterial= new THREE.MeshLambertMaterial({color: this.color})
        this.floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
    }

    _makeShape(){
        var shape
        if (window.THREE && arguments.length) {
            var arry = arguments[0]
            shape = new THREE.Shape()
            shape.moveTo(arry[0]['x'], arry[0]['y'])
            for (var i=1; i<arry.length; i++) {
                shape.lineTo(arry[i]['x'], arry[i]['y'])
            }
            return shape
        }else {
            console.error('Something wrong!')
        }
    }

    // 制作ExtrudeBufferGeometry几何
    _makeExtrudeGeometry(shape,amount) {
        var extrudeSetting = {
          steps: 1,
          amount: amount,
          bevelEnabled: false
        }
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSetting)
        geometry.rotateX( -0.5 * Math.PI)
        return geometry
    }

}