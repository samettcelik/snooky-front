// @ts-nocheck
import { FC } from 'react'
import { ColumnInstance } from 'react-table'
import { Domain } from '../../core/_models'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

type Props = {
    column: ColumnInstance<Domain>
}

const CustomHeaderColumn: FC<Props> = ({ column }) => {
    // if (column.id === 'last_login') {
    //     return <th {...column.getHeaderProps()}>
    //         <tr className='d-flex align-items-center border-bottom-0'>
    //             <div className='mt-1'>INSTALLATION</div>
    //             <div className='d-flex ms-2'>
    //                 <OverlayTrigger
    //                     placement="bottom"
    //                     overlay={
    //                         <Tooltip id="tooltip-website-status">
    //                             <p>You need to paste the Snooky setup code in your website code to display campaigns</p>
    //                         </Tooltip>
    //                     }
    //                 >
    //                     <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
    //                         <i className="bi bi-info-circle-fill"></i>
    //                     </span>
    //                 </OverlayTrigger>
    //             </div>
    //         </tr>
    //     </th>
    // }
    return <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
}

export { CustomHeaderColumn }