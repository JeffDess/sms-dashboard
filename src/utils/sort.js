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

function desc (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function stableSort (array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

export function getSorting (order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}
