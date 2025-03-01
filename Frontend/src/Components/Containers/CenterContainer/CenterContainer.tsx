import style from './CenterContainer.module.css'
import { ReactNode } from "react"

interface centerContainerProps{
    horizontal?: boolean
    vertical?: boolean
    children?: ReactNode
}

export const CenterContainer = ({horizontal=true, vertical, children}: centerContainerProps) => {
    return (
        <div className={style.center_container} style={{justifyContent: vertical?'center':'start', alignItems: horizontal ?'center':'start'}}>
            {children}
        </div>
    )
}