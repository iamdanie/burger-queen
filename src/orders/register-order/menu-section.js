import React from 'react'
import { Paper, Typography, Tooltip, IconButton } from '@material-ui/core'
import { FreeBreakfast, Fastfood, LocalDrink, AddCircle } from '@material-ui/icons'

const MenuSection = ({ currentMenu, classes, handleAddToOrder, menuTab }) => {
    return (
        currentMenu.map(item => (
            <Paper key={item.id} elevation={1} className={classes.menuItem} onClick={handleAddToOrder(item)}>
                <div>
                    {menuTab === 0 ? <FreeBreakfast /> : menuTab === 1 ? <Fastfood /> : <LocalDrink />}
                </div>
                <div>
                    <Typography variant="subtitle1">
                        {item.name}
                    </Typography>
                </div>
                <div>
                    <Typography component={'h1'} variant="h6">
                        {`$ ${item.price}`}
                    </Typography>
                </div>
                {item.available ? (<div className={classes.disabledButton}>
                    <Tooltip title={'Disponible'}>
                        <IconButton
                            aria-label="disponible"
                            color="primary"
                        >
                            <AddCircle color={'secondary'} />
                        </IconButton>
                    </Tooltip>
                </div>) : (<div className={classes.disabledButton}>
                    <Tooltip title={'Agotado'}>
                        <AddCircle color={'disabled'} aria-label="agotado" />
                    </Tooltip>
                </div>)}
            </Paper>
        ))
    )
}

export default MenuSection