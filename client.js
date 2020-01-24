class Client extends MovableNode {
    constructor(x, y, index) {
        super(x, y)
        this.button = createButton('send')
        this.updates.push(this.updateSendPosition)
        this.button.mousePressed(this.handleButtonPress)
        this.index = index
    }
    updateSendPosition = () => {
        this.button.position(this.x-20, this.y-40)
    }
    handleButtonPress = () => {
        seqNo++
        proposals.push(
            new Proposal(
                this,
                processes[floor(random(processes.length))],
                {
                    type:'prepare',
                    seqNo,
                    sender: this.index
                },
                [random(255), random(255), random(255)]
            )
        )
    }
}