class Proposal extends Message {
    constructor(sender, receiver, content, color) {
        super(sender, receiver, content)
        this.isDestroying = false
        this.shouldDestroy = false
        this.updates.push(this.carryOutDestruction)
        this.color = color
    }

    reject() {
        this.setDispFromTarget(createVector(0,-50))
        this.destroy()
    }

    destroy() {
        this.isDestroying = true
    }

    carryOutDestruction = () => {
        if(this.isDestroying) {
            let transparency = map(this.pos.y, this.receiver.y, this.receiver.y + this.dispFromTarg.y, 255, 0)
            this.color = [
                this.color[0],
                this.color[1],
                this.color[2],
                transparency
            ]
            if(transparency<0.1) {
                this.shouldDestroy = true
            }
        }
    }

    accept() {
        this.setDispFromTarget(createVector(0,0))
    }
}