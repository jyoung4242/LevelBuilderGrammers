import { Signal } from "../Lib/Signals";

const genLevel = new Signal("generateLevel");

export const model = {
  genLevel: (e: Event, m: any) => {
    console.clear();

    let level = parseInt(m.level);
    genLevel.send([level]);
  },
  level: 1,
};

export const template = `
<style> 
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%);
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
    <button \${click@=>genLevel}>Gen Level</button>
    <label>Level: </label>
    <input type='number' \${value<=>level} value='1' />
</div>`;
