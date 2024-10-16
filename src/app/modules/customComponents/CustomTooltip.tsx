import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import './styles.css'

type Props = {
    description: string,
    iconClassName?: string
    CustomIcon?: any
    CustomDescription?: any
    descriptionClassName?: string
    descriptionBodyClassName?: string
}

function CustomTooltip({ description, iconClassName, CustomIcon, descriptionClassName, CustomDescription, descriptionBodyClassName }: Props) {
    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id="customTooltip">
                    <div className={`d-flex flex-column ${descriptionBodyClassName ? descriptionBodyClassName : 'w-200px'}`}>
                        {CustomDescription ? CustomDescription() : (
                            <span className={descriptionClassName && descriptionClassName}>{description}</span>
                        )}
                    </div>
                </Tooltip>
            }
        >
            {CustomIcon ? CustomIcon() :
                <span className={`symbol-label rounded-circle text-inverse-primary fw-bolder ${iconClassName ? iconClassName : 'ms-2'}`}>
                    <i className="bi bi-info-circle-fill"></i>
                </span>
            }
        </OverlayTrigger>
    )
}

export default CustomTooltip
