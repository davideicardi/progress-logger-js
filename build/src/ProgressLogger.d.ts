export interface ProgressLoggerOptions {
    label?: string;
    count?: number;
    logger?: ProgressLoggerWriter;
    logInterval?: number;
}
export interface ProgressLoggerWriter {
    log(msg: string): void;
}
export interface ProgressLoggerStatistics {
    label: string;
    start: Date;
    end: Date;
    elapsed: number;
    avg: number;
    rate: number;
    count: number;
    success: number;
    errors: string[];
}
export declare class ProgressLogger {
    options: ProgressLoggerOptions;
    private successItems;
    private errorItems;
    private startTime;
    private lastLogTime;
    private lastLogItems;
    private statistics;
    private errors;
    constructor(options?: ProgressLoggerOptions);
    increment(error?: Error, incValue?: number): ProgressLogger;
    incrementPromise(incPromise: Promise<void>): Promise<void>;
    percentage(): number;
    items(): number;
    end(): ProgressLogger;
    stats(): ProgressLoggerStatistics;
    private lastRate(elapsed);
    private elapsedFromLastLog();
    private round2(n);
    private log(msg);
}
