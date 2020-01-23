class Message {
    constructor(sender, receiver) {
        this.pos = createVector(sender.x, sender.y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0,0)
        this.d = 10
        this.receiver = receiver
        this.dispFromTarg = createVector(0,0)
        this.color = [255, 0, 0]
        this.updates = []
    }

    update() {
        this.determineAcc()
        this.vel.limit(0.5)
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.updates.map(update => update())
    }

    determineAcc() {
        const target = createVector(this.receiver.x, this.receiver.y)
        target.add(this.dispFromTarg)

        let displacement = p5.Vector.sub(target, this.pos)
        let distance = displacement.mag()
        
        let desiredAcc = displacement.normalize()

        let targetRadius = 50
        let maxAcc = 3

        if(distance<targetRadius) {
            let accFactor = map(distance,0,targetRadius,0,maxAcc);
            desiredAcc.mult(accFactor)
            this.vel.mult(0.8)
          } else {
            desiredAcc.mult(maxAcc)
        }
        this.acc = desiredAcc
    }

    isInside() {
        return dist(this.receiver.x, this.receiver.y, this.pos.x, this.pos.y) < this.d/2
    }

    display() {
        fill(...this.color)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.d, this.d)
    }

    setDispFromTarget(disp) {
        this.dispFromTarg = disp
    }
}