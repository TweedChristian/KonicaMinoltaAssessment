import { Line } from "../interfaces/line.interface";
import { Point } from "../interfaces/point.interface";
import { arePointsEqual } from "./point.utils";

/**
 * Check to see if the lines share the same two points,
 * regardless of 'orientation' of the points
 * 
 * @param lineA 
 * @param lineB 
 * @returns
 */
 export const areLinesIdentical = ({start: startA, end: endA}: Line, {start: startB, end: endB}: Line): boolean => {
  return (arePointsEqual(startA, startB) && arePointsEqual(endA, endB)) || //Same orientation
      (arePointsEqual(startA, endB) && arePointsEqual(endA, startB)); //Reverse orientation
};

/**
 * Checks to see if there is a difference in the x and y coordinates
 * of a line.
 * 
 * @param line 
 * @returns if the line is diagonal
 */
export const isLineDiagonal = ({start, end}: Line): boolean => {
  const xDifference = start.x - end.x;
  const yDifference = start.y - end.y;
  return xDifference !== 0 && yDifference !== 0;
};

/**
 * Find the line that crosses the given line. Works by finding the
 * corresponding corners of a 'bounding box'. It is strangely close
 * to how a determinant works.
 * 
 * @param line
 * @returns a line that runs perpendicular through the source line
 */
export const createExpectedCrossLine = (line: Line): Line => {
  const {start: {x: aX, y: aY}, end: {x: bX, y: bY}} = line;
  const pointC: Point = {x: bX, y: aY};
  const pointD: Point = {x: aX, y: bY};

  return {
    start: pointC,
    end: pointD
  }
};

/**
 * Check to see if the lines intersect with one another.
 * Only works for line segments with lengths of 1.
 * 
 * @param lineA 
 * @param lineB 
 * @returns whether the lines intersect
 */
export const doLinesIntersect = (lineA: Line, lineB: Line): boolean => {
  if(areLinesIdentical(lineA, lineB)){
    return true;
  }

  if(!isLineDiagonal(lineA) || !isLineDiagonal(lineB)){
    return false;
  }
  
  const expectedCrossLine = createExpectedCrossLine(lineA);

  return areLinesIdentical(expectedCrossLine, lineB);
};

