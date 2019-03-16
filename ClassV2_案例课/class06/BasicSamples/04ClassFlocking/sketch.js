/*
 * Basic  Drawing 基础图形绘画
 * Yuli Cai caiyuli.com
 */

// Example 10-5: nature of code flocking
// 示例810-5: nature of code, 物理模拟进阶
// https://p5js.org/examples/simulate-flocking.html
// 改译自 Dan Shiffman的示例， 注解：Yuli Cai caiyuli.com 

let movers = [];
let moverNum = 100;
let mouse_force_weight = 0.5;
let mouse;

let attracting = true; //鼠标是吸引还是抵抗


let mouth;
let counter = 0.0;

function preload() {
    mouth = loadImage("mouth.png");
}


function setup() {
    createCanvas(800, 600);
    noStroke();
    // 在setup中定义声明每一个小boid
    for (let i = 0; i < moverNum; i++) {
        let boid = new Boid(random(0.5, 3), random(50, 100), random(height));
        movers.push(boid);
    }

    ellipseMode(CENTER);

}

function draw() {
    background(255,0,222);
    // 鼠标的位置转换成向量
    mouse = createVector(mouseX, mouseY);
    if (attracting) {
        // 如果是吸引模式
        // 将鼠标的吸引力赋予给每一个mover
        for (let i = 0; i < movers.length; i++) {
            let mouseForce = movers[i].seek(mouse); //先通过每个mover自带的seek函数得出吸引力
            movers[i].applyForce(mouseForce);
        }
    } else {
        //如果是反抗模式
        for (let i = 0; i < movers.length; i++) {
            let mouseForce = movers[i].repel(mouse); //变换为通过每个mover自带的repel函数得出反抗力
            movers[i].applyForce(mouseForce);
        }
    }


    // 对每一个mover进行操控， 更新，显示
    for (let i = 0; i < movers.length; i++) {
        movers[i].flock(movers);
        movers[i].update();
        movers[i].display();
        movers[i].checkEdges();
    }

    counter++;
}

function keyPressed() {
    // 每当敲击一次键盘，吸引模式就转换
    attracting = !attracting;
}
