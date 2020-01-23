class Proposal extends Message {
    constructor(sender, receiver, content) {
        super(sender, receiver)
        this.content = content
        this.isDestroying = false
        this.finishedDestruction = false
        this.updates.push(this.carryOutDestruction)
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
                this.finishedDestruction = true
            }
        }
    }
}