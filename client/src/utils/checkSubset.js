export default function checkSubset(parentArray, subsetArray) {
  if (!Array.isArray(parentArray) || !Array.isArray(subsetArray)) return false;

  return subsetArray.every((el) => {
    return parentArray.includes(el);
  });
}
