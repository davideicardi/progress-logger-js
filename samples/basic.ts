declare function require(name: string): any;

import {ProgressLogger} from "../index"
import {sleep} from "./sleep"

async function doWork(): Promise<void>{

	let progress = new ProgressLogger();

  for (var i = 0; i < 100; i++){
    await sleep(200);

    progress.increment()
  }

  progress.end()

	console.log(progress.stats())
}

doWork();
