import React from 'react'
import {Button, Snackbar} from '@material-ui/core'

const SnackbarContext = React.createContext()

export function SnackbarProvider({children}) {
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)
  const queueRef = React.useRef([])

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift())
      setOpen(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    processQueue()
  }

  const snackbar = React.useCallback(
    message => {
      queueRef.current.push({
        message,
        key: new Date().getTime()
      })
      if (open) {
        setOpen(false)
      } else {
        processQueue()
      }
    },
    [open]
  )

  return (
    <SnackbarContext.Provider value={snackbar}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        message={messageInfo ? messageInfo.message : undefined}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={3000}
        onClose={handleClose}
        onExited={handleExited}
        action={[
          <Button
            aria-label="Dismiss"
            key="close"
            color="secondary"
            size="small"
            onClick={handleClose}>
            Dismiss
          </Button>
        ]}
      />
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const context = React.useContext(SnackbarContext)

  if (context === undefined) {
    throw new Error(`useSnackbar must be used within a SnackbarProvider`)
  }

  return context
}
