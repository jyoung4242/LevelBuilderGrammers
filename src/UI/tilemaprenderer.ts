import { TileMap, Color, Engine, toRadians, Vector, Actor, Label, Font, Text } from "excalibur";
import { Room, GridUnit, RoomType, Edge } from "../LevelBuilder/levelBuilder";
import { keyRect, treasureRect, startRect, exitRect, bossRect, gpRect, emptyRect, edgeRectClosed, edgeRectOpen } from "./Shapes";

export function drawTilemap(game: Engine, tmap: TileMap, rooms: Room[], edges: Edge[], grid: GridUnit[]) {
  let tileIndex = 0;
  for (let tile of tmap.tiles) {
    let currentRoom;
    if (grid[tileIndex].roomID) {
      currentRoom = rooms.find(r => r.roomID === grid[tileIndex].roomID)!;

      if (currentRoom.roomType === RoomType.Key) {
        tile.addGraphic(keyRect);
      } else if (currentRoom.roomType === RoomType.Treasure) {
        let lockedTreasure = treasureRect.clone();
        lockedTreasure.strokeColor = Color.Black;

        if (currentRoom.locked) tile.addGraphic(lockedTreasure);
        else tile.addGraphic(treasureRect);
      } else if (currentRoom.roomType === RoomType.Start) {
        tile.addGraphic(startRect);
      } else if (currentRoom.roomType === RoomType.Exit) {
        tile.addGraphic(exitRect);
      } else if (currentRoom.roomType === RoomType.Boss) {
        tile.addGraphic(bossRect);
      } else if (currentRoom.roomType === RoomType.General) {
        tile.addGraphic(gpRect);
      }
    } else tile.addGraphic(emptyRect);

    if (currentRoom) {
      const myColor = currentRoom.roomType === RoomType.Boss ? Color.White : Color.Black;
      const label = new Text({
        text: currentRoom.index.toString() as string,
        font: new Font({
          size: 8,
          family: "Arial",
          color: myColor,
        }),
      });
      tile.addGraphic(label);
    }

    // add edge graphics
    const currentEdges = edges.filter(e => e.from.roomID === grid[tileIndex].roomID);
    if (currentRoom && currentEdges.length > 0) {
      for (let edge of currentEdges) {
        let edgeGraphic;

        if (edge.to.locked) edgeGraphic = edgeRectClosed.clone();
        else edgeGraphic = edgeRectOpen.clone();
        let direction: "left" | "right" | "up" | "down" | undefined = undefined;

        //get edge direction

        if (edge.from.roomID === currentRoom.roomID) {
          if (grid[tileIndex - 1] && edge.to.roomID === grid[tileIndex - 1].roomID) direction = "left";
          else if (grid[tileIndex + 1] && edge.to.roomID === grid[tileIndex + 1].roomID) direction = "right";
          else if (grid[tileIndex - 10] && edge.to.roomID === grid[tileIndex - 10].roomID) direction = "up";
          else if (grid[tileIndex + 10] && edge.to.roomID === grid[tileIndex + 10].roomID) direction = "down";
        }

        let edgeOffset: Vector;

        switch (direction) {
          case "left":
            // convert angle to radians
            edgeGraphic.rotation = toRadians(180);
            edgeOffset = new Vector(0, 8);
            break;
          case "right":
            edgeGraphic.rotation = toRadians(0);
            edgeOffset = new Vector(16, 8);
            break;
          case "up":
            edgeGraphic.rotation = toRadians(90);
            edgeOffset = new Vector(8, 0);
            break;
          case "down":
            edgeGraphic.rotation = toRadians(270);
            edgeOffset = new Vector(8, 16);
            break;
          default:
            edgeOffset = new Vector(0, 0);
            break;
        }
        //console.log(currentRoom.roomType, direction, edge, edgeOffset);

        let tempActor = new Actor({
          name: "edge",
          pos: tile.pos.add(edgeOffset),
          anchor: new Vector(0.5, 0.5),
          width: 6,
          height: 3,
          z: 5,
        });

        tempActor.graphics.add(edgeGraphic);
        game.add(tempActor);
      }
    }

    tileIndex++;
  }
  game.add(tmap);
}

export function resetTilemap(game: Engine, tmap: TileMap, rooms: Room[], edges: Edge[], grid: GridUnit[]) {
  const currenttilemap = game.currentScene.tileMaps[0];
  console.log(currenttilemap);
  game.remove(currenttilemap);
  //remove all edge actors
  let edgeActors = game.currentScene.actors.filter(a => a.name === "edge");
  for (let edge of edgeActors) game.remove(edge);
  tmap = new TileMap({
    tileWidth: 16,
    tileHeight: 16,
    rows: 10,
    columns: 10,
  });
  drawTilemap(game, tmap, rooms, edges, grid);
}
