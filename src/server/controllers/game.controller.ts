import { GameState, GameStateFactory, Players } from "../data/game-state";
import { Line } from "../interfaces/line.interface";
import { Point } from "../interfaces/point.interface";
import { doesLineIntersectAnyLine, getEndPointOfPath, getStartPointOfPath } from "../utils/line.utils";
import { arePointsEqual, canPointsConnect, generatePointNeighbors, isPointInBounds } from "../utils/point.utils";

const createPointKey = (point: Point) => `(x: ${point.x}, y: ${point.y}`;

//TODO: Make this non-blocking by making it promise based?


class GameStateController {
  private _state: GameState;
  private _lastSelectedPoint: Point | null = null;
  private _pointAvailablityMap: Map<string, boolean> = new Map<string, boolean>();

  constructor(){
    this._state = GameStateFactory();
    this._resetAvailablityMap();
  }

  /**
   * Return the current player
   */
  public get currentPlayer(): Players {
    return this._state.currentPlayer;
  }

  /**
   * Check to see if we are selecting the first node
   */
  public get isStartingNode(): boolean {
    return this._lastSelectedPoint === null;
  }

  /**
   * Check to see if the game is over
   */
  public get isGameOver(): boolean {
    return this._state.isOver;
  }

  /**
   * Reset the game state, available points, and the lastSelectedPoint
   */
  public initialize(): void {
    this._state = GameStateFactory();
    this._lastSelectedPoint = null;
    this._resetAvailablityMap();
  }

  /**
   * Clear the start node
   */
  public clearStartNode(): void {
    this._lastSelectedPoint = null;
  }

  /**
   * Checks to see if the given point can be connected to
   * either the start of the head of the list, or the
   * end of the tail of the list, or if the point
   * is out of bounds
   * 
   * @param point 
   * @returns is the node is valid
   */
  public isStartNodeValid(point: Point): boolean {
    const pathStart = getStartPointOfPath(this._state.lines);
    const pathEnd = getEndPointOfPath(this._state.lines);

    if(!isPointInBounds(point, this._state.width, this._state.height)){
      return false;
    }

    if(pathStart === null || pathEnd === null){
      return true;
    }

    return arePointsEqual(point, pathStart) || arePointsEqual(point, pathEnd);
  }

  /**
   * Checks to see if the end node can be connected to
   * the lastSelectedPoint, and will not cause any intersections,
   * loops, or will be out of bounds
   * 
   * @param endPoint 
   * @returns if the end node is valid
   */
  public isEndNodeValid(endPoint: Point): boolean {
    //There should always be a lastSelectedPoint when this is called
    //But this is a safety catch.
    if(this._lastSelectedPoint === null){
      return false;
    }

    if(!isPointInBounds(endPoint, this._state.width, this._state.height)){
      return false;
    }

    if(!canPointsConnect(endPoint, this._lastSelectedPoint)){
      return false;
    }

    const newLine: Line = {
      start: this._lastSelectedPoint,
      end: endPoint,
    };

    //Check if end point is available
    if(this._pointAvailablityMap.get(createPointKey(endPoint)) === false){
      return false;
    }

     //Check if any possible intersection can occur
     return doesLineIntersectAnyLine(newLine, this._state.lines) === false;
  }

  /**
   * Save the start node to the _lastSelectedPoint
   * 
   * @param point 
   */
  public saveStartNode(point: Point): void {
    this._lastSelectedPoint = point;
  }

  /**
   * Saves the endPoint to the list of lines. Checks to
   * see if the addition is to the head of the path, or the 
   * tail of the path
   * 
   * @param endPoint 
   * @returns the new line or null
   */
  public saveEndNode(endPoint: Point): Line | null {
    if(this._lastSelectedPoint === null){
      return null;
    }

    const pathStart = getStartPointOfPath(this._state.lines);
    const pathEnd = getEndPointOfPath(this._state.lines);

    //Mark both points as unavailable
    this._pointAvailablityMap.set(createPointKey(this._lastSelectedPoint), false);
    this._pointAvailablityMap.set(createPointKey(endPoint), false);

    if(pathStart === null || pathEnd === null){
      const line = {
        start: this._lastSelectedPoint,
        end: endPoint,
      }
      this._state.lines.append(line);
      return line;
    }

    //Want to keep the Start-End-Start-End pipeline so that way the start
    //point of the head is the start, and the end point of the tail is the end
    if(arePointsEqual(pathStart, this._lastSelectedPoint)){
      const line = {start: endPoint, end: this._lastSelectedPoint};
      this._state.lines.prepend(line);
      //Prepend
      return line;
    }

    const line = {
      start: this._lastSelectedPoint,
      end: endPoint,
    }

    this._state.lines.append(line);
    return line;
  }

  /**
   * Check to see if there are any available moves left.
   * It checks the neighbors of the start and end of the path,
   * and if no valid lines can be made it marks the game as over
   * 
   */
  public updateGameOverStatus(): void {
    //Don't need to check availability of neighbors if there are none
    const head = this._state.lines.head;
    const tail = this._state.lines.tail
    if(head === null || tail === null){
      return;
    }
    let foundAvailablePoint = false;
    const headNeighbors = generatePointNeighbors(head.data.start, this._state.width, this._state.height);
    const tailNeighbors = generatePointNeighbors(tail.data.end, this._state.width, this._state.height);

    headNeighbors.forEach((point) => {
      if(this._pointAvailablityMap.get(createPointKey(point))){
        const pointHeadLine = {start: point, end: head.data.start};
        const doesPointHeadLineIntersect = doesLineIntersectAnyLine(pointHeadLine, this._state.lines);
        foundAvailablePoint = doesPointHeadLineIntersect ? foundAvailablePoint : true;
      }
    });
   
    tailNeighbors.forEach((point) => {
      if(this._pointAvailablityMap.get(createPointKey(point))){
        const tailPointLine = {start: tail.data.end, end: point};
        const doesPointHeadLineIntersect = doesLineIntersectAnyLine(tailPointLine, this._state.lines);
        foundAvailablePoint = doesPointHeadLineIntersect ? foundAvailablePoint : true;
      }
    });

    this._state.isOver = !foundAvailablePoint;
  }

  /**
   * Change Players
   */
  public switchPlayers(): void {
    this._state.currentPlayer = this._state.currentPlayer === "Player1" ? "Player2" : "Player1";
  }

  /**
   * Mark all points as available
   */
  private _resetAvailablityMap(): void {
    for(let x = 0; x < this._state.width; x++){
      for(let y = 0; y < this._state.height; y++){
        this._pointAvailablityMap.set(createPointKey({x,y}), true);
      }
    }
  }
}

/**
 * Controls the logic of the game and interfaces with the game's state. It is
 * a singleton.
 */
export const GameController = new GameStateController();