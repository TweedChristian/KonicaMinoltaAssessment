import { Line } from "../interfaces/line.interface";
import { Point } from "../interfaces/point.interface";

/**
 * Check to see if the points are equal
 * 
 * @param pointA
 * @param pointB
 * @returns whether the points match
 */
export const arePointsEqual = ({x: xA, y: yA}: Point, {x: xB, y: yB}: Point): boolean => {
  return xA === xB && yA === yB;
};

/**
 * Checks to see if either of the points in the line
 * are equivalent to the given point
 * 
 * @param line the test line
 * @param point the test point
 * @returns if the point is in the line
 */
export const doesLineContainPoint = ({start, end}: Line, point: Point): boolean => {
  return arePointsEqual(start, point) || arePointsEqual(end, point);
};

export const canPointConnectToLine = (point: Point, {start, end}: Line): boolean => {
  const canPointsConnect = ({x: aX, y: aY}: Point, {x: bX, y: bY}: Point): boolean => {
    const xDifference = bX - aX;
    const yDifference = bY - aY;
    
    //Same line
    if(xDifference === 0 && yDifference === 0){
      return false;
    }

    return xDifference <= 1 && yDifference <= 1;
  };

  return canPointsConnect(point, start) || canPointsConnect(point, end);
};

export const isPointInBounds = ({x, y}: Point, width: number, height: number): boolean => x < width && x >= 0 && y < height && y >= 0;

export const generatePointNeighbors = ({x, y}: Point, width: number, height: number): Point[] => {
  const inBoundsFilter = (width: number, height: number) => {
    return (point: Point) => isPointInBounds(point, width, height);
  };

  const neighbors: Point[] = [];
  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      if(i !== 0 || j !== 0){
        neighbors.push({x: x + i, y: y + j});
      }
    }
  }

  return neighbors.filter(inBoundsFilter(width, height));
}
