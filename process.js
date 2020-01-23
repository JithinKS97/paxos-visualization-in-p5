class Process extends MovableNode {
    constructor(x, y, index) {
        super(x, y)
        this.largestSeqNoSeenSoFar = 10
        this.pendingProposal = null,
        this.index = index
    }
    acceptMessage(message) {
        this.handleMessages(message)
    }
    handleMessages(message) {
        switch(message.content.type) {
            case 'prepare':
                this.handlePrepareMessage(message)
                break;
            case 'proposal':
                this.handleProposalMessage(message)
        }
    }
    handlePrepareMessage(proposal) {
        if(this.largestSeqNoSeenSoFar<proposal.content.seqNo) {
            this.pendingProposal = proposal
            proposal.setDispFromTarget(createVector(20,-20))  
            this.sendProposalToAllOtherProcesses()         
        } else {
            proposal.reject()
        }
    }
    handleProposalMessage(proposal) {
        if(this.largestSeqNoSeenSoFar<proposal.content.seqNo) {
            this.pendingProposal = proposal
            proposal.setDispFromTarget(createVector(20,-20))
        } else {
            proposal.reject()
        }
    }
    sendProposalToAllOtherProcesses() {
        processes.map(process => {
            if(process.index!==this.index) {
                proposals.push(
                    new Proposal(this, process, {
                        type: 'proposal',
                        seqNo: this.pendingProposal.content.seqNo,
                        sender: this.index
                    })
                )
            }
        })
    }
}