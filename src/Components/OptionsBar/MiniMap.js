import React from 'react';

export default class MiniMap extends React.Component {

    render = () => (
        <div className="mini-map__main">
            <canvas width="100px" height="100px" id="minimap"></canvas>
        </div>
    )

    canvas;
    ctx;

    isCurrentLocation = (x,y) => (this.props.currentLocation.X ===x && this.props.currentLocation.Y === y?true:false)

    componentDidUpdate = () => {
        this.clearCanvas(this.ctx, this.canvas);
        this.DrawTiles(this.props.currentLocation.X, this.props.currentLocation.Y, 3, this.props.mapList);
    }

    componentDidMount = () => {
        this.canvas = document.getElementById('minimap');
        this.ctx = this.canvas.getContext('2d');
    }

    clearCanvas = (ctx, cnv) => {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.restore();
        ctx.beginPath();
    }
    DrawTiles = (rX, rY, r, map) => {
        this.clearCanvas(this.ctx, this.canvas);
        const Draw = (obj, x, y) => this.Draw(15, this.ctx, this.canvas, obj, x, y);
        /*1 = immediatelly adjacent, others are aditional 'layers'
        1 -> -1,-1 -1,0 -1,1 | 0,-1 0,1 | 1,-1 1,0 1,1
        2 -> 1 + ... -2,-2 -2,-1 -2,0 -2,1 -2,2 | -1,-2 0,-2 1,-2 | -1,2 0,2 1,2 | 2,-2 2,-1 2,0 2,1 2,2
        We start at the bottom left corner*/
        for (var x = -1 * r; x <= r; x++) {
            for (var y = -1 * r; y <= r; y++) {
                Draw(map.find((e) => {
                    return e.X === rX + x && e.Y === rY + y;
                }), x, y);
            }
        }
    }

    Draw = (size, ctx, cnv, obj, x, y) => {
        // if (!obj) { obj = {color:"black"}; }        
        if (!obj) { return null; }
        //Spacing between each tile
        var spacing = size;
        //Center of canvas and its origin
        var centerCoord = { X: (cnv.width) / 2, Y: (cnv.height) / 2 };
        //Center of whatever tile we wish to draw:
        var tileCoord = { X: x * (size + spacing) + centerCoord.X, Y: centerCoord.Y - y * (size + spacing)};
        //Origin for the triangle, this is the tiles upper left corner
        var rectOrigin = { X: tileCoord.X - size / 2, Y: tileCoord.Y - size / 2 };
        //color for the tile
        ctx.fillStyle = "#613333";
        x===0&&y===0?ctx.fillStyle = "#b09231":ctx.fillStyle = "#613333";
        ctx.fillRect(rectOrigin.X, rectOrigin.Y, size, size);
        //Rectangular outline 
        ctx.clearRect(tileCoord.X - size / 3, tileCoord.Y - size / 3, size / 3 * 2, size / 3 * 2);
        //Center dot
        ctx.fillRect(tileCoord.X - 1, tileCoord.Y - 1, 2, 2);

        //Returns unitary vectors for each of the directions the tile connects to
        //we invert X Y and Y value is negative due to operating in different planes:
        //Render has origin 0,0 on top left and inf,inf on bottom right
        //Cartesian (how the map's json is organized) has origin 0,0 on bottom left and inf,inf on top right
        this.GetVectors(obj).map((vector) => {
            //drawing vertically
            var lnOrig = {
                X:tileCoord.X + Math.cos(Math.atan2(-vector.Y, vector.X))*(0.5*size + 0.2*spacing),
                Y:tileCoord.Y + Math.sin(Math.atan2(-vector.Y, vector.X))*(0.5*size + 0.2*spacing)
            }
            var lnDest = {
                X:tileCoord.X + Math.cos(Math.atan2(-vector.Y, vector.X))*(0.5*size + 0.8*spacing),
                Y:tileCoord.Y + Math.sin(Math.atan2(-vector.Y, vector.X))*(0.5*size + 0.8*spacing)
            }
            
            ctx.strokeStyle = "#0b0a0f";
            ctx.moveTo(lnOrig.X, lnOrig.Y);
            ctx.lineTo(lnDest.X, lnDest.Y);
            ctx.stroke();

        })

        /*
        var thickness = size / 5;
        var centerOfCanvas = { X: (cnv.width) / 2, Y: (cnv.height) / 2 }
        var addX = x * (size + spacing) - (size) / 2;
        var addY = y * (size + spacing) - (size) / 2;
        var localCenterX = (addX + centerOfCanvas.X) + (size) / 2 - 1;
        var localCenterY = (addY + centerOfCanvas.Y) + (size) / 2 - 1;
        ctx.fillStyle = obj.color;
        ctx.fillRect(addX + centerOfCanvas.X, addY + centerOfCanvas.Y, size, size);
        ctx.clearRect(addX + centerOfCanvas.X + thickness, addY + centerOfCanvas.Y + thickness, size - thickness * 2, size - thickness * 2);
        ctx.fillRect(localCenterX, localCenterY, 2, 2);
        console.log(this.GetVectors(obj));
        
        */
    }

    GetVectors = (obj) =>
        (
            obj.leadsTo.map((mbr) =>
                ({
                    X: (mbr.X - obj.X) / ((mbr.X - obj.X) ** 2 + (mbr.Y - obj.Y) ** 2) ** 0.5,
                    Y: (mbr.Y - obj.Y) / ((mbr.X - obj.X) ** 2 + (mbr.Y - obj.Y) ** 2) ** 0.5
                })
            )
        )
}