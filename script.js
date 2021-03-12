let slovo = "ldash"
let pismena = []
let pozicepismen = []
// let mistapropismena = []
let prirazenePozice = [] // = na jakou pozici da uzivatel pismeno
let vybranePismeno = null
let posunuti

function setup() {
    createCanvas(800, 600)
    setupZnovu();
    // background(160)
}

function draw() {
    background(160)
     // rgb(160, 160, 160)

    textSize(40)
    textAlign(CENTER)
    stroke(255)
    fill(0)
    for(let i = 0; i < pismena.length; i++) {
        const pos = pozicepismen[i]
        push()
        strokeWeight(8)
        stroke(255, 0, 0)
        // point((i + 0.5) * width / pismena.length, height / 2)
        line((i + 0.4) * width / pismena.length, height / 2 + 10, (i + 0.6) * width / pismena.length, height / 2 + 10)
        pop()
        text(pismena[i], pos.x, pos.y + 10)
    }

    // vypsat text


    let jeVybrane = false
    for(let i = 0; i < pismena.length; i++) {
        const pos = pozicepismen[i]
        // if((mouseX - pos.x) * (mouseX - pos.x) + (mouseY - pos.y) * (mouseY - pos.y) <= 400) {

        if(dist(mouseX, mouseY, pos.x, pos.y) <= 20) {
            jeVybrane = true
            vybranePismeno = i
            break
        }
    }

    if(!jeVybrane)
        vybranePismeno = null

    if(vybranePismeno !== null) {
        // console.log(pismena[vybranePismeno])
        cursor(HAND)
    } else {
        cursor(ARROW)
    }

    for (let i = 0; i < pismena.length; i++) {
        let byloprirazenepismeno = false
        for(let j = 0; j < pismena.length; j++) {
            const pos = pozicepismen[j];
            if (((i+0.5) * width / pismena.length - pos.x) * ((i+0.5) * width / pismena.length - pos.x) + (height / 2 - pos.y) * (height / 2 - pos.y) <= 400) {
                prirazenePozice[i] = pismena[j]
                byloprirazenepismeno = true
            }
        }

        if(!byloprirazenepismeno)
            prirazenePozice[i] = null
    }

    let str = ''
    prirazenePozice.forEach(char => {
        str += char ?? '?';
    })
    if(str === slovo) {
        pismena = []
        pozicepismen = []
        prirazenePozice = [] // = na jakou pozici da uzivatel pismeno
        vybranePismeno = null
        posunuti

        setupZnovu()
    }
    document.querySelector('.slovo').innerText = str;

}

function mousePressed() {
    if(vybranePismeno !== null)
        posunuti = createVector(mouseX - pozicepismen[vybranePismeno].x, mouseY - pozicepismen[vybranePismeno])
}

function mouseDragged() {
    if(vybranePismeno !== null) {
        const p = pozicepismen[vybranePismeno];
        p.set(mouseX, mouseY).sub(posunuti)
        // p.set(mouseX, mouseY)
        for (let i = 0; i < pismena.length; i++) {
            if (((i+0.5) * width / pismena.length - p.x) * ((i+0.5) * width / pismena.length - p.x) + (height / 2 - p.y) * (height / 2 - p.y) <= 400) { 
                p.set((i+0.5) * width / pismena.length, height / 2);
            }
        }
    }
}

function setupZnovu(){
    let buffer = 20
    for (let i = 0; i < slovo.length; i++){
        pismena = [...pismena, slovo[i]]
        pozicepismen = [...pozicepismen, 
            createVector(floor(random(buffer, width - buffer)), floor(random(buffer, height - buffer)))]
        // mistapropismena = [...mistapropismena, null]
        prirazenePozice = [...prirazenePozice, null]
    }

}