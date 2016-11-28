declare function require(name: string): any;

import {ProgressLogger} from "../index"
import {sleep} from "./sleep"

async function doWork(): Promise<void>{

	let progress = new ProgressLogger({
		label: "my-label",
		logInterval: 2000,
		count: 100
	});

  for (var i = 0; i < 100; i++){
    progress.increment()
    await sleep(200);
  }

  progress.end()

	console.log(progress.stats())
}

doWork();
