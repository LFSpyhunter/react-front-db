export const formatToClientDate = (date?: Date) => {
  if (!date) {
    return ""
  }
  const dateString = new Date(date).toLocaleDateString().split('/')
  const newDate = `${dateString[1].padStart(2,'0')}.${dateString[0].padStart(2,'0')}.${dateString[2]}`
  return newDate
}
