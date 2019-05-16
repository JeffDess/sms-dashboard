export async function fetchData (getFunc, setFunc) {
  const res = await getFunc()
  setFunc(res.data)
}
