class Proposal extends Message {
    constructor(sender, receiver, content) {
        super(sender, receiver)
        this.received = false
        this.content = content
        this.updates.push(this.checkDestroyStatus)
        this.isDestroying = false
        this.shouldDestroy = false
    }
    
    handleArrival() {
        if(this.isInside() && this.vel.mag() < 0.1) {
            if(this.received == false) {
                this.receiver.acceptMessage(this)
                this.received = true
            }
        }
    }

    reject() {
        this.setDispFromTarget(createVector(0,-50))
        this.destroy()
    }

    checkDestroyStatus = () => {
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

    destroy() {
        this.isDestroying = true
    }
}