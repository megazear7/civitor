// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function intersection(array1: any[], array2: any[]): any[] {
  return array1.filter((value) => array2.includes(value));
}
