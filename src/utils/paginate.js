export function paginate (items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = (pageNumber - 1) * pageSize + pageSize

  return items.slice(startIndex, endIndex)
}
