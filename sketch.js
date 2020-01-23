let nodes = [], proposals = []

function setup() {
  createCanvas(640, 400);
  nodes.push(new Proposer(width/2, height/2))
  nodes.push(new MovableNode(width/4, height/2))
  proposals.push(new Proposal(nodes[1], nodes[0], {
    type: 'prepare',
    seqNo: 9
  }))
}

function draw() {
  background(220);
  for(let node of nodes) {
    node.display()
    node.makeMovable()
  }
  for(let i=0;i<proposals.length;i++) {
    proposals[i].display()
    proposals[i].update()
    proposals[i].handleArrival()
    destroy(proposals, i)
  }
}

function mouseReleased() {
  for(let node of nodes) {
    node.isMovable = false
  }
  Node.isAnyMoving = false
}

function destroy(items, index) {
  if(items[index].shouldDestroy) {
    items.splice(index, 1)
  }
}