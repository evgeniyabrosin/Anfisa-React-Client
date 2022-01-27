type DistributiveValues<T extends Record<string, any>> = T extends T ? T[keyof T] : never
export type InnerValues<T extends Record<keyof T, Record<string, unknown>>, K extends keyof T> = DistributiveValues<T[K]>
