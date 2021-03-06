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
    await sleep(200);

		if (Math.random() > 0.8)
	    progress.increment(new Error("some error"));
		else
			progress.increment();
  }

  progress.end()

	console.log(progress.stats())
}

doWork();
