import React, { Component } from 'react'
import Sketch from 'react-p5'
import { TweenLite, Expo } from "gsap"

const IMAGES = ['what01.png', 'what02.png', 'what03.png']
const SLOGANS = [['Fish', 'Data'], ['Mathematical', 'Modeling'], ['Easy', 'Interface']]
const FRACTION_SIZE = 50;
const ORIGIN_CIRCLE_RADIUS = 12;
const PADDING = 70;
const CIRCLE_BORDER = -3

let repulsionChangeDistance = 100;
let pointSystem = null;
let targetImage;

let circles = []
let pixels = []
let points = []
let width = 1000
let height = 1000
let step = 1
let startSize = 64
let currentId = 0
let previousId = 0


export default class BlobHow extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {
    this.canvas.remove()
  }

  // Preload of assets, input @p5 canvas
  preload = p5 => {
    this.canvas = p5
    targetImage = p5.loadImage(IMAGES[currentId])
  }

  // P5 canvas setup, input @p5 canvas, @canvasParentRef
  setup = (p5, canvasParentRef) => {
    p5.clear()
    points = []
    circles = []
    p5.pixelDensity(2);
    p5.frameRate(30)
    p5.createCanvas(width, height).parent(canvasParentRef)
    createImage(p5)

    const newFirstLine = document.getElementById("newFirstLine")
    const newSecondLine = document.getElementById("newSecondLine")

    newFirstLine.innerHTML = SLOGANS[currentId][0]
    newSecondLine.innerHTML = SLOGANS[currentId][1]

    TweenLite.fromTo(newFirstLine, .8, {y:-270, alpha:0}, {y:-220, alpha:1, ease: Expo.easeInOut, delay:.4});
    TweenLite.fromTo(newSecondLine, .8, {y:-270, alpha:0}, {y:-220, alpha:1, ease: Expo.easeInOut, delay:.3});
  }

  // On Scroll Handler, input @p5 canvas
  mouseWheel = p5 => {
    this.nextSlide()
  }

  // Canvas redraw loop, input @p5 canvas
  draw = p5 => {
    p5.updatePixels()
    drawBubbles(p5)
  }

  // Switch to Next Slide
  nextSlide = () => {
    console.log('nextslide');
    currentId ++
    this.clickHandler(currentId)
  }

  // Change the text, 2 text lines
  changeSlogan = () => {

    const oldFirstLine = document.getElementById("oldFirstLine")
    const oldSecondLine = document.getElementById("oldSecondLine")

    const newFirstLine = document.getElementById("newFirstLine")
    const newSecondLine = document.getElementById("newSecondLine")

    newFirstLine.innerHTML = SLOGANS[currentId][0]
    newSecondLine.innerHTML = SLOGANS[currentId][1]

    oldFirstLine.innerHTML = SLOGANS[previousId][0]
    oldSecondLine.innerHTML = SLOGANS[previousId][1]

    TweenLite.fromTo(oldFirstLine, .8, {y:-16, alpha:1}, {y:66, alpha:0, ease: Expo.easeInOut, delay:.2});
    TweenLite.fromTo(oldSecondLine, .8, {y:-16, alpha:1}, {y:66, alpha:0, ease: Expo.easeInOut});

    TweenLite.fromTo(newFirstLine, .8, {y:-270, alpha:0}, {y:-220, alpha:1, ease: Expo.easeInOut, delay:.4});
    TweenLite.fromTo(newSecondLine, .8, {y:-270, alpha:0}, {y:-220, alpha:1, ease: Expo.easeInOut, delay:.3});
  }

  // Click Handler
  clickHandler = id => {

    let p5 = this.canvas

    if(id > IMAGES.length-1) {
      console.log(currentId, id)
      id = 0
      currentId = 0
    }
    currentId = id
    var activeDot = document.getElementById("movingDot")
    TweenLite.to(activeDot, .9, {top:(20+(id*30))+"px", ease: Expo.easeInOut})
    p5.clear()
    points = []
    circles = []
    //arrayRotate(IMAGES, 1)
    targetImage = p5.loadImage(IMAGES[currentId], onLoad)
    this.changeSlogan()
    previousId = currentId

    function onLoad() {
      createImage(p5)
      p5.loop()
    }
  }

  render() {
    return (
    <div style={{ height: '80vh' }}>
      <div>
        <div className="dotwrapper">
          <div id="movingDot" className="dot dotactive"/>
        	<ul>
        		<li><div id="dot0" onClick={() => this.clickHandler('0')} className="dot"/></li>
        		<li><div id="dot1" onClick={() => this.clickHandler('1')} className="dot"/></li>
        		<li><div id="dot2" onClick={() => this.clickHandler('2')} className="dot"/></li>
        	</ul>
        </div>
      </div>
      <Sketch preload={this.preload} setup={this.setup} draw={this.draw} mouseWheel={throttle(this.nextSlide, 2200)} style={{ height: '100vh' }}	 />
    </div>
    )
  }
}

// Event throtle
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

// Create Image from
function createImage(p5) {
    p5.image(targetImage, 0, 0)
    targetImage.loadPixels()

    for (var x = 0; x < targetImage.width; x++) {
      for (var y = 0; y < targetImage.height; y++) {
        var c = p5.get(x,y)
        var b = p5.brightness(c)
        if(b > 0) {
          points.push({ x: x, y: y });
        }
      }
    }

    p5.clear()
    p5.background(242, 247, 250)
}

function drawBubbles (p5) {

      // All the circles
      for (var i = 0; i < circles.length; i++) {
         var c = circles[i];
         c.show(p5);

         // Is it a growing one?
         if (c.growing) {
           c.grow();
           // Does it overlap any previous circles?
           for (var j = 0; j < circles.length; j++) {
             var other = circles[j];
             if (other != c) {
               var d = p5.dist(c.x, c.y, other.x, other.y);
               if (d - 1 < c.r + other.r + CIRCLE_BORDER) {
                 c.growing = false;
               }
             }
           }

           // Is it stuck to an edge?
           if (c.growing) {
             c.growing = !c.edges();
           }
         }
      }

       // Let's try to make a certain number of new circles each frame
       // More later
       var target = 1 + p5.constrain(p5.floor(p5.frameCount / 120), 10, 20)
       // How many
       var count = 0;
       // Try N times
       for (var i = 0; i < 100; i++) {
         if (addBubble(p5)) {
           count++;
         }
         // We made enough
         if (count == target) {
           break;
         }
       }

       // We can't make any more
       if (count < 1) {
         p5.noLoop()
       }
}

function addBubble (p5) {


    var rndm = p5.int(p5.random(0, points.length))
    if(!points[rndm]) return
    var xpos = points[rndm].x * (width/targetImage.width)
    var ypos = points[rndm].y * (width/targetImage.width)

    // Here's a new circle
    var newCircle = new Bubble(p5, xpos, ypos, 1)
    // Is it in an ok spot?
    for (var i = 0; i < circles.length; i++) {
      var other = circles[i];
      var d = p5.dist(newCircle.x, newCircle.y, other.x, other.y);
      if (d < other.r+5) {
        newCircle = undefined;
        break;
      }
    }
    // If it is, add it
    if (newCircle) {
      circles.push(newCircle);
      return true;
    } else {
      return false;
    }
}


class Bubble {
  constructor(...props) {
    this.show(props[0])
    this.growing = true;
    this.x = props[1];
    this.y = props[2];
    this.r = props[3] + 5;
  }

  edges = p5 => {
    return (this.r > width - this.x || this.r > this.x || this.r > height - this.y || this.r > this.y);
  }

  grow = p5 => {
    this.r += 1;
  }

  show = p5 => {
    if(this.x) {
      p5.noFill()
      p5.fill(18, 225, 196)
      p5.strokeWeight(0)
      p5.ellipse(this.x, this.y, this.r * 1.2)
    }
  }
}

function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}

/*
    function getPoints(step) {
        let points = [];

        // Save all points
        for(let x = 0; x < width; x+= step) {
            for(let y = 0; y < height; y+= step) {
                let index = (x + y * width) * 4;

                points.push({
                    x,
                    y,
                    c: [
                        pixels[index],
                        pixels[index+1],
                        pixels[index+2]
                    ],
                    s: step
                });
            }
        }

        return points;
    }

    function drawImageFromPoints(p5, step, space, img) {
    	step = parseInt(step)
    	p5.clear();

       if(step < 7) {
                p5.image(img, 0, 0);

        } else {
        	const points = p5.getPoints(step);
            points.forEach(p => {
                let color = p.c;
                p5.noStroke();
                p5.fill(...color);

               if(space == 1){
                  p5.rect(p.x * space, p.y * space, p.s, p.s);
               }
    			   p5.ellipse(p.x * space, p.y * space, p.s, p.s);

            });

    	}
    }
    */
