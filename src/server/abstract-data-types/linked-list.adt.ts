
export interface Node<T> {
  data: T;
  next: Node<T> | null;
}

export class LinkedList<T> {
  private _head: Node<T> | null = null;
  public get head(): Node<T> | null {
    return this._head;
  }
  
  private _tail: Node<T> | null = null;
  public get tail(): Node<T> | null {
    return this._tail;
  }

  public get size(): number {
    let size = 0;
    let currentNode: Node<T> | null = this.head;

    while(currentNode !== null){
      currentNode = currentNode.next;
      size++;
    }

    return size;
  }

  public append(data: T): void {
    const node: Node<T> = {
      next: null,
      data,
    };

    if(this.tail === null){
      this._head = node;
      this._tail = node;
      return;
    }
    
    this.tail.next = node;
    this._tail = node; //Update end
  }

  public prepend(data: T): void {
    const node: Node<T> = {
      next: null,
      data,
    }

    if(this.head === null){
      this._head = node;
      this._tail = node;
      return;
    }

    node.next = this.head;
    this._head = node; //Update start
  }
}