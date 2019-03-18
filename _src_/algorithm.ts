
type binary_op<T = any> = (l: T, r: T) => boolean;

function less<T>(l: T, r: T) {
  return l < r;
}

export
function  qsort<T = any>(arr: T[], begin: number, end: number, comp: binary_op<T> = less) {
  if (begin >= end) return;

  let i = begin | 0, j = end | 0;
  const base = arr[i];

  while (i < j) {

    while (!comp(arr[j], base) && i < j) {
      j -= 1;
    }
    arr[i] = arr[j];
    while (comp(arr[i], base) && i < j) {
      i += 1;
    }
    arr[j] = arr[i];

  }

  arr[i] = base;

  qsort(arr, begin | 0, i - 1, less);
  qsort(arr, i + 1, end | 0, less);
}

