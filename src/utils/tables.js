import { camelToNormalCase } from './strings'

export function generateHeaders (rows) {
  return [
    ...new Set(
      rows.map(s =>
        Object.keys(s).map(k => ({
          id: k,
          label: camelToNormalCase(k)
        }))
      )
    )
  ].reduce((acc, x) => acc.indexOf(x) && x)
}
