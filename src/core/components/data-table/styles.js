const styles = ({ palette, spacing }) => ({
  root: {
    width: '100%',
    marginTop: spacing(3)
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: palette.background.default
    }
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  pagination: {
    flexShrink: 0,
    color: palette.text.secondary,
    marginLeft: spacing(2.5)
  },
  title: {
    flex: '0 0 auto'
  }
})

export default styles
