class Accept extends Message {
    constructor(receiver, sender, content) {
        super(receiver, sender, content)
        this.updates.push(this.setTransparency)
        this.updates.push(this.checkDestroyStatus)
    }
    setTransparency = () => {
        this.color = [
            this.color[0],
            this.color[1],
            this.color[2], 
            map(this.vel.mag(), 0, 2, 0, 255)
        ]
    }
    checkDestroyStatus = () => {
        if(this.color[3] < 0.1) {
            this.shouldDestroy = true
        }
    }
}