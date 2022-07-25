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

export const canPointsConnect = ({x: aX, y: aY}: Point, {x: bX, y: bY}: Point): boolean => {
  const xDifference = Math.abs(bX - aX);
  const yDifference = Math.abs(bY - aY);
  
  //Same line
  if(xDifference === 0 && yDifference === 0){
    return false;
  }

  return xDifference <= 1 && yDifference <= 1;
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
