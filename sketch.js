let processes = [], clients = [], proposals = [], messages = [],
send, seqNo = 11

function setup() {
  createCanvas(640, 400);

  clients.push(new Client(width/5, 3*height/4, 0))
  clients.push(new Client(width/5, height/4, 1))
  
  createNodesInCircle(10, width/5)
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
  for(let i=0;i<messages.length;i++) {
    messages[i].display()
    messages[i].update()
    messages[i].checkArrival()
    destroy(messages, i)
  }
}

function mouseReleased() {
  for(let process of processes) {
    process.isMovable = false
  }
  for(let client of clients) {
    client.isMovable = false
  }
  Node.isAnyMoving = false
}

function destroy(items, index) {
  if(items[index].shouldDestroy) {
    items.splice(index, 1)
  }
}

function createNodesInCircle(noOfNodes, radius) {
  for (let i = 0; i < noOfNodes; i++) {
    processes.push(
      new Process(
        width / 1.7 + radius * sin( i * (2*PI/noOfNodes)),
        height / 2 + radius * cos(i * (2*PI/noOfNodes)),
        i,
        10
      )
    )
  }
}