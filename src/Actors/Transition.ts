import { Actor, Color, Vector } from "excalibur";

export class Transition extends Actor {
  //random color

  constructor(pos: Vector, orientation: "Horizontal" | "Vertical") {
    let width = 0;
    let height = 0;
    if (orientation === "Horizontal") {
      width = 600;
      height = 100;
    } else {
      width = 100;
      height = 600;
    }

    super({
      width,
      height,
      pos: pos,
      color: Color.White,
    });
  }
}
