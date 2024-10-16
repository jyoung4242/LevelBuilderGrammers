// main.ts
import "./style.css";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, TileMap, Rectangle, Color, Vector } from "excalibur";
import { model, template } from "./UI/UI";
import { LevelBuilder, RoomType } from "./LevelBuilder/levelBuilder";
import { keyRect, treasureRect, startRect, exitRect, bossRect, gpRect, emptyRect } from "./UI/Shapes";
import { Signal } from "./Lib/Signals";
import { drawTilemap, resetTilemap } from "./UI/tilemaprenderer";

await UI.create(document.body, model, template).attached;
const genLevel = new Signal("generateLevel");

const game = new Engine({
  width: 1200, // the width of the canvas
  height: 800, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
  backgroundColor: Color.fromHex("#11111107"),
});

await game.start();

const myLevelBuilder = new LevelBuilder();
let { rooms, edges, grid } = myLevelBuilder.generateRooms(1);

genLevel.listen((params: CustomEvent) => {
  let level = params.detail.params[0];

  //reset tilemap
  ({ rooms, edges, grid } = myLevelBuilder.generateRooms(level));
  console.log("Rooms", rooms);
  console.log("Edges", edges);
  console.log("Grid", grid);
  resetTilemap(game, tmap, rooms, edges, grid);
});

console.log("Rooms", rooms);
console.log("Edges", edges);
console.log("Grid", grid);

let tmap = new TileMap({
  tileWidth: 16,
  tileHeight: 16,
  rows: 10,
  columns: 10,
});

drawTilemap(game, tmap, rooms, edges, grid);
game.add(tmap);
const camera = game.currentScene.camera;
camera.pos = new Vector(80, 80);
camera.zoom = 2.5;
