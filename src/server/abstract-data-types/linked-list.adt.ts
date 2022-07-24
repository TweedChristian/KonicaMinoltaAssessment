
export interface Node<T> {
  data: T;
  next: Node<T> | null;
}

export class LinkedList<T> {
  private _head: Node<T> | null = null;
  public get head(): Node<T> | null {
    return this._head;
  }
  public set head(value: Node<T> | null) {
    if(value === null){
      this.head = null;
      return;
    }

    value.next = this._head;
    this.head = value;
  }

  public get size(): number {
    let size = 0;
    let currentNode: Node<T> | null = this._head;

    while(currentNode !== null){
      currentNode = currentNode.next;
      size++;
    }

    return size;
  }

  public end(): Node<T> | null {
    let currentNode: Node<T> | null = this._head;

    if(currentNode === null){
      return null;
    }

    while(currentNode.next !== null){
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}