export class Glb {
  static makeEnum<T extends { [index: string]: U }, U extends string>(x: T) {
    return x
  }
}
