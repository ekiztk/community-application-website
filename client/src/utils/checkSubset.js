export default function checkSubset(parentArray, subsetArray) {
  return subsetArray.every((el) => {
    return parentArray.includes(el);
  });
}
