export interface ProgressLoggerOptions {
	label?: string;
	count?: number;
	logger?: ProgressLoggerWriter;
	logInterval?: number;
}

export interface ProgressLoggerWriter {
	log(msg: string) : void;
}

export interface ProgressLoggerStatistics {
	label: string;
	start: Date;
	end: Date,
	elapsed: number;
	avg: number;
	rate: number;
	count: number;
	success : number;
	errors : string[];
}

export class ProgressLogger {
	options: ProgressLoggerOptions = {
		label: "Processing",
		logger: console,
		logInterval: 5000, // milliseconds
		count : null
	};

	private successItems : number = 0;
	private errorItems : number = 0;
	private startTime: Date = new Date();

	private lastLogTime: Date;
	private lastLogItems: number;
	private statistics : ProgressLoggerStatistics;
	private errors = new Set<string>();

	constructor(options: ProgressLoggerOptions = null){
		this.options = Object.assign(this.options, options);

		this.log(`started at ${new Date().toISOString()}`);
	}

	increment(error : Error = null, incValue : number = 1) : ProgressLogger{
		if (error){
			this.errorItems += incValue;
			this.errors.add(error.message);
		}
		else
			this.successItems += incValue;

		let elapsed = this.elapsedFromLastLog();

		if (elapsed >= this.options.logInterval
			|| this.items() == this.options.count) {

			let rateAtSeconds = this.lastRate(elapsed).toFixed(2);

			let errorsStatus = this.errorItems > 0 ? `, ${this.errorItems} errors` : "";

			if (this.options.count){
				let percentage = this.percentage().toFixed(2);
				this.log(`... ${percentage}% (${this.items()} of ${this.options.count}${errorsStatus}, ${rateAtSeconds}/sec)`);
			}
			else {
				this.log(`... ${this.items()}${errorsStatus} (${rateAtSeconds}/sec)`);
			}
		}

		return this;
	}

	async incrementPromise(incPromise : Promise<void>) : Promise<void>{
		try
		{
			await incPromise;
		}
		catch (err) {
			this.increment(err);

			return;
		}

		this.increment();
	}

	percentage(){
		return this.options.count
			? this.items() * 100 / this.options.count
			: null;
	}

	items() : number {
		return this.successItems + this.errorItems;
	}

	end() : ProgressLogger{
		let endTime = new Date();
		let elapsed = (endTime.getTime() - this.startTime.getTime());
		let elapsedSecs = elapsed / 1000;

		const itemsCount = this.items();

		let rateAtSeconds = this.round2(itemsCount / (elapsedSecs || 1));

		this.log(`completed (${this.successItems} success, ${this.errorItems} errors) in ${elapsedSecs.toFixed(1)} seconds (${rateAtSeconds}/sec)`);

		this.statistics = {
			label: this.options.label,
			start: this.startTime,
			end: endTime,
			elapsed: elapsed,
			avg: elapsed / (itemsCount || 1),
			rate: rateAtSeconds,
			count: itemsCount,
			success: itemsCount > 0 ? this.successItems / itemsCount : 0,
			errors : Array.from(this.errors)
		};

		return this;
	}

	stats() : ProgressLoggerStatistics{
		return this.statistics;
	}

	private lastRate(elapsed : number) {
		return (this.items() - this.lastLogItems) / (elapsed / 1000);
	}

	private elapsedFromLastLog(){
		let current = Date.now();
		let elapsed = current - this.lastLogTime.getTime();
		elapsed = elapsed || 1;

		return elapsed;
	}

	private round2(n : number) : number {
		return Math.round(n * 100) / 100
	}

	private log(msg: string){
		this.lastLogTime = new Date();
		this.lastLogItems = this.items();
		this.options.logger.log(`${this.options.label} ${msg}`);
	}
}
