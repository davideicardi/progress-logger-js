declare function require(name: string): any;

import {ProgressLogger} from "../index"
import {sleep} from "./sleep"

async function doWorkItem() {
  await sleep(200);

  if (Math.random() > 0.8)
    throw new Error("some error");
}

async function doWork(): Promise<void>{

	let progress = new ProgressLogger();

  for (var i = 0; i < 100; i++){
    await progress.incrementPromise(doWorkItem())
  }

  progress.end()

	console.log(progress.stats())
}

doWork();
