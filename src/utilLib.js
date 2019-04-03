const isWithin = function (topLeft, bottomRight, position) {
  return isGreaterOrEqual(position[0], topLeft[0]) &&
    isGreaterOrEqual(bottomRight[0], position[0]) &&
    isGreaterOrEqual(position[1], topLeft[1]) &&
    isGreaterOrEqual(bottomRight[1], position[1]);
}

const isGreaterOrEqual = function (element1, element2) {
  return element1 >= element2;
}

export { isWithin };
