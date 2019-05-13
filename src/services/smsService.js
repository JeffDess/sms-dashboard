export function sendSms (msg, recipients) {
  try {
    console.log(
      `Submitted message:\n${msg}
      \n${recipients.length} recipient${
  recipients.length !== 0 ? `s: ${recipients}` : ''
}`
    )
  } catch (ex) {
    return null
  }
}
