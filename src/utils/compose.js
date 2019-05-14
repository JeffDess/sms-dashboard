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
