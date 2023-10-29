// export type ClientData = {
//     xPosition: number,
//     yPosition: number
// }

export type RoverData = {
    uuid: string;
    name: string;
    x: number;
    y: number;
    z: number;
    temperature: number;
    charge: number;
};

export type MoveData = {
  uuid: string;
  x: number;
  y: number;
  z: number;
};

export type ImmersionData = {
  uuid: string;
  move: string;
  depth: number;
};