export const toFormattedDate = date => {
  const dateObj = new Date(date)
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return new Intl.DateTimeFormat('es-MX', options).format(dateObj)
}
