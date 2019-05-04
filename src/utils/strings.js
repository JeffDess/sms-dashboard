export function plurialize (str) {
  switch (str[str.length - 1]) {
    case 'y':
      return str.substring(0, str.length - 1) + 'ies'
    case 'f':
      return str.substring(0, str.length - 1) + 'ves'
    case 's':
    case 'h':
    case 'o':
      return str + 'es'
    default:
      return str + 's'
  }
}

export function camelToNormalCase (str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
}
