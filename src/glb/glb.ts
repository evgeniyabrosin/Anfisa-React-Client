export class Glb {
  static makeEnum<T extends { [index: string]: U }, U extends string>(x: T) {
    return x
  }
}

export type EnumValue<T> = T extends Record<string, infer U> ? U : never
