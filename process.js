class Proposer extends MovableNode {
    constructor(x, y) {
        super(x, y)
        this.largestSeqNoSeenSoFar = 10
        this.pendingProposals = null
    }
    acceptMessage(message) {
        this.handleMessages(message)
    }
    handleMessages(message) {
        switch(message.content.type) {
            case 'prepare':
                this.handlePrepareMessage(message)
                break;
        }
    }
    handlePrepareMessage(proposal) {
        if(this.largestSeqNoSeenSoFar<proposal.content.seqNo) {
            this.pendingProposal = proposal
            proposal.setDispFromTarget(createVector(20,-20))
        } else {
            proposal.reject()
        }
    }
}