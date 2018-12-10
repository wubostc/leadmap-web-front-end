declare type binary_op<T = any> = (l: T, r: T) => boolean;
export declare function qsort<T = any>(arr: T[], begin: number, end: number, comp?: binary_op<T>): void;
export {};
