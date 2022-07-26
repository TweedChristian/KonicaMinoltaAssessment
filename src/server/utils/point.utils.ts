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
 * Checks to see if the difference for x and y are less than or equal to 1.
 * 
 * @param pointA
 * @param pointB 
 * @returns if the points make a valid line
 */
export const canPointsConnect = ({x: aX, y: aY}: Point, {x: bX, y: bY}: Point): boolean => {
  const xDifference = Math.abs(bX - aX);
  const yDifference = Math.abs(bY - aY);
  
  //Same line
  if(xDifference === 0 && yDifference === 0){
    return false;
  }

  return xDifference <= 1 && yDifference <= 1;
};

/**
 * Check to see if the point is greater than or equal to zero and less than the 
 * width or height
 * 
 * @param point 
 * @param width 
 * @param height 
 * @returns if the point is is in bounds
 */
export const isPointInBounds = ({x, y}: Point, width: number, height: number): boolean => x < width && x >= 0 && y < height && y >= 0;

/**
 * Create an array of points of neighbors that are in bounds
 * 
 * @param point 
 * @param width 
 * @param height 
 * @returns the valid neighbors
 */
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
