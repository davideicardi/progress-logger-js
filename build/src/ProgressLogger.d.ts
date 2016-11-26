export interface ProgressLoggerOptions {
    label?: string;
    count?: number;
    logger?: ProgressLoggerWriter;
    logInterval?: number;
}
export interface ProgressLoggerWriter {
    log(msg: string): any;
}
export interface ProgressLoggerStatistics {
    label: string;
    start: Date;
    end: Date;
    elapsed: number;
    avg: number;
    rate: number;
    totals: number;
}
export declare class ProgressLogger {
    options: ProgressLoggerOptions;
    value: number;
    startTime: Date;
    lastLogTime: Date;
    lastLogValue: number;
    statistics: ProgressLoggerStatistics;
    constructor(options?: ProgressLoggerOptions);
    private log(msg);
    increment(incValue?: number): ProgressLogger;
    percentage(): number;
    private lastRate(elapsed);
    private elapsedFromLastLog();
    end(): ProgressLogger;
    stats(): ProgressLoggerStatistics;
}
