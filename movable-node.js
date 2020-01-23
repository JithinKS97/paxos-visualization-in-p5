class MovableNode {

    constructor(x, y) {
      this.x = x
      this.y = y
      this.d = 20
      this.isMovable = false
      this.updates = []
    }
    
    display() {
    
      if((this.isMouseHovering() || this.isMovable)) {
        fill(255)
      } else {
        fill(0)
      }
      if(this.isMovable) {
        this.x += mouseX - pmouseX
        this.y += mouseY - pmouseY
      }
      ellipse(this.x, this.y, this.d, this.d)
      
      this.updates.map(update => update())
    }
    
    isMouseHovering() {
      
      return dist(mouseX, mouseY, this.x, this.y) < this.d/2
    }
    
    makeMovable() {
      
      if(this.isMouseHovering()) {
        
        if(mouseIsPressed && !Node.isAnyMoving) {
  
          this.isMovable = true
          Node.isAnyMoving = true
        }
      }
    }
  }