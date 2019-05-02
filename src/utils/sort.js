function getDynamicProp (path, object) {
  return path.reduce((x, y) => x[y], object)
}

function compareObjectsAsc (a, b, path) {
  return getDynamicProp(path, a) < getDynamicProp(path, b) ? -1 : 1
}

function compareObjectsDesc (a, b, path) {
  return getDynamicProp(path, a) > getDynamicProp(path, b) ? -1 : 1
}

export function orderByProp (collection, fullPath, order = 'asc') {
  const path = fullPath.split('.')
  return collection.sort((a, b) =>
    order === 'asc'
      ? compareObjectsAsc(a, b, path)
      : compareObjectsDesc(a, b, path)
  )
}
