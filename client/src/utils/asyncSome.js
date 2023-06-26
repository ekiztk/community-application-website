export default async function asyncSome(arr, predicate) {
  for (let e of arr) {
    if (await predicate(e)) return true;
  }
  return false;
}
