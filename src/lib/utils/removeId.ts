export function removeId<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeId(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    const { id, ...rest } = obj as { id?: any; [key: string]: any };
    for (const key in rest) {
      rest[key] = removeId(rest[key]);
    }
    return rest as T;
  }
  return obj;
}
