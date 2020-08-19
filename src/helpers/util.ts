import _ from 'lodash';

export const isHorizontalLine = (start: number, end: number) =>
  Math.abs(start - end) === 1;

export const mergeUtil = (
  a: { [key: string]: Array<number> },
  b: { [key: string]: Array<number> }
) => {
  let result: { [key: string]: Array<number> } = a;
  _.forEach(b, (v: Array<number>, k: string) => {
    result[k] = _.has(result, k) ? _.union(result[k], v) : v;
  });
  return result;
};
