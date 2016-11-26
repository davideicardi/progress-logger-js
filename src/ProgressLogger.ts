export interface ProgressLoggerOptions {
  label?: string;
  count?: number;
  logger?: ProgressLoggerWriter;
  logInterval?: number;
}

export interface ProgressLoggerWriter {
  log(msg: string);
}

export interface ProgressLoggerStatistics {
  label: string;
  start: Date;
  end: Date,
  elapsed: number;
  avg: number;
  rate: number;
  totals: number;
}

export class ProgressLogger {
  options: ProgressLoggerOptions = {
    label: "Processing",
    logger: console,
    logInterval: 5000, // milliseconds
    count : null
  };

  value : number = 0;
  startTime: Date = new Date();

  lastLogTime: Date;
  lastLogValue: number;
  statistics : ProgressLoggerStatistics;

  constructor(options: ProgressLoggerOptions = null){
    this.options = Object.assign(this.options, options);

    this.log(`started at ${new Date().toISOString()}`);
  }

  private log(msg: string){
    this.lastLogTime = new Date();
    this.lastLogValue = this.value;
    this.options.logger.log(`${this.options.label} ${msg}`);
  }


  increment(incValue : number = 1) : ProgressLogger{
		this.value += incValue;

    let elapsed = this.elapsedFromLastLog();

		if (elapsed >= this.options.logInterval
      || this.value == this.options.count) {

			let rateAtSeconds = this.lastRate(elapsed).toFixed(2);

			if (this.options.count){
        let percentage = this.percentage().toFixed(2);
				this.log(`... ${percentage}% (${this.value} of ${this.options.count}, ${rateAtSeconds}/sec)`);
			}
			else {
				this.log(`... ${this.value} (${rateAtSeconds}/sec)`);
			}
		}

    return this;
	}

  percentage(){
    return this.options.count
      ? this.value * 100 / this.options.count
      : null;
  }

  private lastRate(elapsed : number) {
    return (this.value - this.lastLogValue) / (elapsed / 1000);
  }

  private elapsedFromLastLog(){
    let current = Date.now();
		let elapsed = current - this.lastLogTime.getTime();
		elapsed = elapsed || 1;

    return elapsed;
  }

	end() : ProgressLogger{
		let endTime = new Date();
		let elapsed = (endTime.getTime() - this.startTime.getTime());
		let elapsedSecs = elapsed / 1000;

		let rateAtSeconds = this.value / (elapsedSecs || 1);

		this.log(`completed (${this.value}) in ${elapsedSecs.toFixed(1)} seconds (${rateAtSeconds.toFixed(1)}/sec)`);

		this.statistics = {
			label: this.options.label,
			start: this.startTime,
			end: endTime,
			elapsed: elapsed,
			avg: elapsed / (this.value || 1),
			rate: rateAtSeconds,
			totals: this.value
		};

    return this;
	}

	stats() : ProgressLoggerStatistics{
		return this.statistics;
	}
}
