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