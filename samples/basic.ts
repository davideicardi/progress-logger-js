declare function require(name: string): any;
const ProgressLogger = require("../../index.js");

import {sleep} from "./sleep"

async function doWork(): Promise<void>{

	let progress = new ProgressLogger();

  for (var i = 0; i < 100; i++){
    progress.increment()
    await sleep(200);
  }
	
  progress.end()

	console.log(progress.stats())
}

doWork();
