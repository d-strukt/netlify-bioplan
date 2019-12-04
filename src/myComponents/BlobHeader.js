import React, { Component } from 'react'
import Sketch from 'react-p5'
//import 'react-p5/node_modules/p5/lib/addons/p5.dom'
//import '../../node_modules/p5/lib/p5.min.js'
import p5 from "p5/lib/p5.min.js"

const width = 1400
const height = 200
const points = []
let t = 0
let noiseScale=0.02
let vid


export default class BlobHeader extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {
    this.canvas.remove()
  }

  setup = (p5, canvasParentRef) => {
    this.canvas = p5
    p5.createCanvas(width, 600).parent(canvasParentRef)
    //p5.createVideo('salmon.mp4')
/*
    vid = p5.createVideo('salmon.mp4').parent(canvasParentRef)
    vid.size(100, 100)

    function vidLoad() {
      vid.loop();
      vid.volume(0);
    }
*/
  }

  draw = p5 => {

    p5.background(242, 247, 250)
    let c1 = p5.color(19, 101, 244) // Define color 'c'
    let c2 = p5.color(119, 101, 244) // Define color 'c'
    let inter = p5.map(0, 0, height, 0, 1)
    let c = p5.lerpColor(c1, c2, 0.33)
    p5.noStroke()
    p5.fill(c1)

    p5.translate(width/2, height/2);
    p5.beginShape()
     for (var i = 0; i < 100; i++) {
       var ang = p5.map(i, 0, 100, 0, p5.TWO_PI)
       var rand = p5.random(90,95)
       var rad = 400 + 150*(p5.noise(i * 0.02, t * 0.002))

       var x = rad * p5.cos(ang)
       var y = rad * p5.sin(ang)
       p5.curveVertex(x, y)
     }
    p5.endShape(p5.CLOSE)

    t += 1;

  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} className={"centerBlob"} />
  }
}
