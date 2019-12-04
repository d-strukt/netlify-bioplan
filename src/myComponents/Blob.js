import React, { Component } from 'react'
import Sketch from 'react-p5'


export default class Blob extends Component {

  x = 50
  y = 50

  componentDidMount() {

  }

  componentWillUnmount() {
    this.canvas.remove()
  }

  setup = (p5, canvasParentRef) => {
    
    this.canvas = p5
    p5.createCanvas(500, 500).parent(canvasParentRef)
  }

  draw = p5 => {

    p5.background(242, 247, 250)
    let c = p5.color(19, 101, 244) // Define color 'c'
    p5.fill(c) // Use color variable 'c' as fill color
    p5.noStroke()
    p5.ellipse(250, 250, 500, 500)

    //this.x++
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />
  }
}
