import * as React from 'react'
import { IconProps } from '../Icon';
import Icon from '../Icon'

const AccountIcon: React.FC<IconProps> = ({ className, color, width, height, onClick }) => {
    let colorResult: string = ''
    if (color === 'primary') {
        colorResult = "#000"
    } else if (color === 'secondary') {
        colorResult = "#AFADB5"
    } else if (color = "accent") {
        colorResult = "#B5460F"
    }
    let classes = `icon_wrapper ${className}`
    return <Icon viewBox="0 0 30 30" onClick={onClick} color={color} width={width ? width : 30} height={height ? height : 30} className={classes} >
        <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#151411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25.7374 27.5C25.7374 22.6625 20.9249 18.75 14.9999 18.75C9.07495 18.75 4.26245 22.6625 4.26245 27.5" stroke="#151411" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Icon>
}

export default AccountIcon;