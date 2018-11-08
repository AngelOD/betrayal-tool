const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
const UP = 1;

const STATE_CHARSELECT = 4;
const STATE_ERROR = 2;
const STATE_INIT = 1;
const STATE_MAIN = 3;

const Directions = {
  DOWN, LEFT, RIGHT, UP,
};

const States = {
  STATE_MAIN, STATE_CHARSELECT, STATE_ERROR, STATE_INIT,
};

export { Directions, States };
