import { ReactNode } from 'react'
import style from './GridContainer.module.css'

export const GridContainer = ({children}: {children: ReactNode}) => {
    return (
        <div className={style.grid_container}>
            {children}
        </div>
    )
}