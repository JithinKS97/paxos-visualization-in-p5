let processes = [], clients = [], proposals = []

function setup() {
  createCanvas(640, 400);
  clients.push(new MovableNode(width/4, height/2))
  processes.push(new Process(width/2, height/2, 0))
  processes.push(new Process(width/1.5, height/4, 1))
  processes.push(new Process(width/1.5, 3*height/4, 2))
  proposals.push(new Proposal(clients[0], processes[0], {
    type: 'prepare',
    seqNo: 11
  }))
}

function draw() {
  background(220);
  for(let client of clients) {
    client.display()
    client.makeMovable()
  }
  for(let process of processes) {
    process.display()
    process.makeMovable()
  }
  for(let i=0;i<proposals.length;i++) {
    proposals[i].display()
    proposals[i].update()
    proposals[i].checkArrival()
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