import { Actor, Color, Vector } from "excalibur";

export class Room extends Actor {
  //random color
  static randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  constructor(pos: Vector) {
    const color = Room.randomColor();
    super({
      width: 600,
      height: 600,
      pos: pos,
      color: Color.fromHex(color),
    });
  }
}
