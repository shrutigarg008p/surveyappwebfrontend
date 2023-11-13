export function mapper(mapped: { [key: string]: string }) {
  return function (key?: string) {
    if (key && key in mapped) {
      return mapped[key];
    }
    return 'N/A';
  };
}
