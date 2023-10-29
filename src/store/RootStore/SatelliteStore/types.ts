// export type ClientData = {
//     xPosition: number,
//     yPosition: number
// }

export type RoverData = {
    uuid: string;
    name: string;
    x: number;
    y: number;
    angle: number;
    charge: number;
};

export type MoveData = {
  uuid: string;
  // move: 'up' | 'down' | 'left' | 'right' | '';
  move: string;
};

export type ImmersionData = {
  uuid: string;
  move: string;
  depth: number;
};