export function getRecipients (subscriptions, filters) {
  return subscriptions
    .filter(s =>
      filters
        .filter(a => a.length !== 0)
        .every(r =>
          r.some(f => s[Object.entries(f)[0][0]] === Object.entries(f)[0][1])
        )
    )
    .map(s => s.phoneNumber)
}

export function getActiveFilters (filters) {
  return Object.entries(filters).map(f =>
    Object.entries(f[1])
      .filter(v => v[1] === true)
      .map(r => {
        return { [f[0]]: r[0] }
      })
  )
}
