import { Rectangle, Color } from "excalibur";
export let edgeRectOpen = new Rectangle({
  width: 6,
  height: 3,
  color: Color.Green,
});
export let edgeRectClosed = new Rectangle({
  width: 6,
  height: 3,
  color: Color.Red,
});

export let keyRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.Yellow,
  lineWidth: 1,
  strokeColor: Color.fromHex("#111111"),
});
export let bossRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.Black,
  lineWidth: 1,
  strokeColor: Color.fromHex("#F9F9F9"),
});
export let treasureRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.fromHex("#A02B93"),
  lineWidth: 1,
  strokeColor: Color.fromHex("#F9F9F9"),
});
export let gpRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.fromHex("#156082"),
  lineWidth: 1,
  strokeColor: Color.fromHex("#F9F9F9"),
});
export let startRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.fromHex("#E97132"),
  lineWidth: 1,
  strokeColor: Color.fromHex("#F9F9F9"),
});
export let exitRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.Red,
  lineWidth: 1,
  strokeColor: Color.fromHex("#F9F9F9"),
});
export let emptyRect = new Rectangle({
  width: 16,
  height: 16,
  color: Color.Transparent,
});
