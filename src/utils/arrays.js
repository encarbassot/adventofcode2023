export class BorderlessMatrix {
  constructor(width, height, cellCallback = ()=>undefined) {
    this.width = width;
    this.height = height;
    this.cellCallback = cellCallback;
    this.matrix = this.createMatrix(width, height)
    this.xoff = 0
    this.yoff = 0
  }
  
  createMatrix(width, height) {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => this.cellCallback())
    );
  }
  
  static fromMatrix(mat){
    const result =  new BorderlessMatrix(mat[0].length,mat.length)
    result.matrix = mat
    return result
  }

  
  insert(y, x, value) {
    // console.log(y,x,value)
    if (y < this.yoff) {
      const newOffset = this.yoff - y
      // console.log("INSERT",newOffset,"ROWS TOP")
      this.matrix = [
        ...Array.from({ length: newOffset }, () =>
          Array.from({ length: this.width }, () => this.cellCallback())
        ),
        ...this.matrix
      ]
      this.height = this.matrix.length
      this.yoff -= newOffset
    }
    
    if (x < this.xoff) {
      const newOffset = this.xoff - x
      // console.log("INSERT",newOffset,"COLUMNS LEFT")
      this.matrix = this.matrix.map(line=>[
        ...Array.from({ length: newOffset }, () => this.cellCallback()),
        ...line
      ])
      this.width = this.matrix[0].length
      this.xoff -= newOffset
    }

    if (y >= this.height + this.yoff){
      const newOffset = y - (this.height + this.yoff) +1
      // console.log("INSERT",newOffset,"ROWS BOTTOM")
      this.matrix = [
        ...this.matrix,
        ...Array.from({ length: newOffset }, () =>
          Array.from({ length: this.width }, () => this.cellCallback())
        ),
      ]

      this.height = this.matrix.length
    }
    
    if(x >= this.width + this.xoff) {
      const newOffset = x - (this.width + this.xoff) +1
      // console.log("INSERT",newOffset,"COLUMNS RIGHT")
      this.matrix = this.matrix.map(line=>[
        ...line,
        ...Array.from({ length: newOffset }, () => this.cellCallback()),
      ])
      this.width = this.matrix[0].length
    }

    // console.log(this.matrix)
    // console.log(value)
    // console.log(y-this.yoff,x-this.xoff)
    // console.log(this.matrix.length, this.matrix[0].length)
    // console.log(this.matrix.map(x=>x.join(",")).join("\n"),"\n");

    this.matrix[y-this.yoff][x-this.xoff] = value;


  }

  get(y,x){

    if(y<this.yoff || y >= this.height+this.yoff || x<this.xoff || x>= this.width + this.xoff) 
      return this.cellCallback()

    return this.matrix[y-this.yoff][x-this.xoff]
  }
  
  getMatrix() {
    return this.matrix;
  }
}
  
// Example usage:
// const matrix = new BorderlessMatrix(1,1, () => 0);

// matrix.insert(1, 1, 1);
// matrix.insert(-1, 1, 2);
// matrix.insert(-2, 0, 3);
// matrix.insert(-2, -5, 4);
// matrix.insert(2, -1, 5);
// matrix.insert(2, 2, 6);
// matrix.insert(3, 2, 7);



// matrix.insert(3, 2, 7);
// matrix.insert(2,3,1);
// matrix.insert(2,4,2);
// matrix.insert(2,5,3);
// matrix.insert(1,5,4);
