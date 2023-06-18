export function exclude<T, Key extends keyof T>(
  item: T,
  keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete item[key]
  }
  return item
}