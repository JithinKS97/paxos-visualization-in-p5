class Process extends MovableNode {
    constructor(x, y, index, seqNo) {
        super(x, y)
        this.largestSeqNoSeenSoFar = seqNo
        this.pendingProposal = null,
        this.index = index
        this.responses = {}
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
                break;
            case 'proposal_response':
                this.handleProposalResponses(message)
                break;
            case 'accept_or_reject':
                this.handleAccept(message)
        }
    }
    handlePrepareMessage(proposal) {
        if(this.largestSeqNoSeenSoFar<proposal.content.seqNo) {
            if(this.pendingProposal) {
                this.pendingProposal.reject()
            }
            this.largestSeqNoSeenSoFar = proposal.content.seqNo
            this.pendingProposal = proposal
            proposal.setDispFromTarget(createVector(20,-20))
            this.sendProposalToAllOtherProcesses()
        } else {
            proposal.reject()
        }
    }
    sendProposalToAllOtherProcesses = () => {
        processes.map(process => {
            if(process.index!==this.index) {
                proposals.push(
                    new Proposal(this, process, {
                        type: 'proposal',
                        seqNo: this.pendingProposal.content.seqNo,
                        sender: this.index
                    }, this.pendingProposal.color)
                )
            }
        })
    }
    handleProposalMessage = (proposal) => {
        if(this.largestSeqNoSeenSoFar<proposal.content.seqNo) {
            if(this.pendingProposal) {
                this.pendingProposal.reject()
            }
            this.largestSeqNoSeenSoFar = proposal.content.seqNo
            this.pendingProposal = proposal
            proposal.setDispFromTarget(createVector(20,-20))
            this.sendProposalResponse("accept")
        } else {
            proposal.reject()
            this.sendProposalResponse("reject")
        }
    }
    sendProposalResponse = (status) => {
        messages.push(new Accept(this, processes[this.pendingProposal.content.sender], {
            type:'proposal_response',
            status,
            seqNo: this.pendingProposal.content.seqNo,
            sender: this.index
        }, [0, 255, 0]))
    }
    handleProposalResponses = (message) => {
        const totalNoOfProcesses = processes.length-1
        if(!this.responses[message.content.seqNo]) {
            this.responses[message.content.seqNo] = { 
                sent:false, 
                agreements:message.content.status === 'accept'? 1 : 0, 
                responses:1 
            }
        } else {
            this.responses[message.content.seqNo].responses++
            if(message.content.status === 'accept') {
                this.responses[message.content.seqNo].agreements++
            }
        }
        if(this.responses[message.content.seqNo].sent === false && this.responses[message.content.seqNo].responses > totalNoOfProcesses/2) {
            if(this.responses[message.content.seqNo].agreements > this.responses[message.content.seqNo].responses/2) {
                this.sendAcceptOrRejectMessage("accept")
                this.pendingProposal.accept()
                this.color = this.pendingProposal.color
            } else {
                this.sendAcceptOrRejectMessage("reject")
            }
        }
    }
    sendAcceptOrRejectMessage = (status) => {
        if(!this.pendingProposal.sent) {
            processes.map(process => {
                if(process.index!==this.index) {
                    messages.push(
                        new Accept(this, process, {
                            type: 'accept_or_reject',
                            seqNo: this.pendingProposal.content.seqNo,
                            status,
                            sender: this.index
                        }, [0, 255, 0])
                    )
                }
            })
            this.pendingProposal.sent = true
        }
    }
    handleAccept = (message) => {
        if(message.content.status === 'accept' && this.pendingProposal.content.seqNo === message.content.seqNo) {
            this.pendingProposal.accept()
            this.color = this.pendingProposal.color
            this.largestSeqNoSeenSoFar = this.pendingProposal.content.seqNo
        }
    }
    doAfter(time, task) {
        setTimeout(()=>{
            task()
        }, time*1000)
    }
}