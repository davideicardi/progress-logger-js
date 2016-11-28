# progress-logger-js
Node.js module for logging progress information and statistics about long-lasting activities


## Usage

Installation:

    npm install progress-logger-js --save

usage:

    const ProgressLogger = require("progress-logger-js");

or for typescript:

    import ProgressLogger from "progress-logger-js"


Consider the following fake long-lasting process:

    let progress = new ProgressLogger();

    for (var i = 0; i < 100; i++){
      progress.increment()
      await sleep(200);
    }

    progress.end()

Output will be:

    Processing started at 2016-11-16T00:24:49.317Z
    Processing ... 26 (5.2/sec)
    Processing ... 51 (5.0/sec)
    Processing ... 76 (5.0/sec)
    Processing completed (100) in 20.0 seconds (5.0/sec)


You can also customize some options:

    let progress = new ProgressLogger({
      label: "my-label",
      logInterval: 2000,
      count: 100
    });

In this case output will be:

    my-label started at 2016-11-16T00:20:37.382Z
    my-label ... 11.00% (11 of 100, 5.5/sec)
    my-label ... 21.00% (21 of 100, 5.0/sec)
    my-label ... 31.00% (31 of 100, 5.0/sec)
    my-label ... 41.00% (41 of 100, 5.0/sec)
    my-label ... 51.00% (51 of 100, 5.0/sec)
    my-label ... 61.00% (61 of 100, 5.0/sec)
    my-label ... 71.00% (71 of 100, 5.0/sec)
    my-label ... 81.00% (81 of 100, 5.0/sec)
    my-label ... 91.00% (91 of 100, 5.0/sec)
    my-label ... 100.00% (100 of 100, 5.0/sec)
    my-label completed (100) in 20.0 seconds (5.0/sec)

Some more statistics are also available using `ProgressLogger.stats` method:

    { label: 'Processing',
      start: 2016-11-16T00:24:49.317Z,
      end: 2016-11-16T00:25:09.359Z,
      elapsed: 20042,
      avg: 200.42,
      rate: 4.989522003792036,
      totals: 100 }
