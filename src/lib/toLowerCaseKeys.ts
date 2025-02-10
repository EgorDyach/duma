export default function toLowerCaseKeys<T extends Record<string, any>>(
  obj: T,
): { [K in keyof T as Lowercase<K & string>]: T[K] } {
  const result: Partial<{ [K in keyof T as Lowercase<K & string>]: T[K] }> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key.toLowerCase() as Lowercase<typeof key>] = obj[key];
    }
  }

  return result as unknown as { [K in keyof T as Lowercase<K & string>]: T[K] };
}
