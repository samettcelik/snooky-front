// @ts-nocheck
import { Column } from 'react-table'
import { Domain } from '../../core/_models'
import { CouponCustomHeader } from './CouponCustomHeader'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import moment from 'moment'
import { IoPauseOutline } from "react-icons/io5";
import { CouponAction } from './CouponActionsCell'
import CouponDeactivateCell from './CouponDeactivateCell'

const couponColumns: ReadonlyArray<Column<Domain>> = [
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Status' className='' />,
        id: 'two_steps',
        Cell: ({ ...props }) => {
            const status = props.data[props.row.index].two_steps
            return <div className='w-100'>
                <span className={`px-2 badge ${status ? 'badge-light-success' : 'badge-light-danger'} fw-bolder`}>
                    {status ? 'Active' : 'Expired'}
                </span>
            </div>
        },
    },
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Type' className='' />,
        id: 'test',
        Cell: ({ ...props }) => {
            const status = props.data[props.row.index].two_steps
            return <div className='w-100'>
                <span className={`px-2 badge badge-light-secondary fw-bolder text-gray-700`}>
                    {status ? 'Generic' : 'Unique'}
                </span>
            </div>
        },
    },
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Name' className='min-w-100px' />,
        id: 'name',
        Cell: ({ ...props }) => {
            return <span>{props.data[props.row.index].name}</span>
        }
    },
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Coupon Usage' className='min-w-150px' />,
        id: 'couponUsage',
        Cell: ({ ...props }) => {
            const progress = Math.floor(Math.random() * 101)
            return (
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="tooltip-user-websites">
                            <div className='d-flex flex-column'>
                                <span>{progress}/100</span>
                            </div>
                        </Tooltip>
                    }
                >
                    <div className='w-100 d-flex flex-row align-items-center gap-1'>
                        <div className='flex-fill'>
                            <div class="progress" role="progressbar" aria-label="Coupon Usage" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                                <div class="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <span>{progress}%</span>
                    </div>
                </OverlayTrigger>
            )
        }
    },
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Created At' className='min-w-100px' />,
        id: 'joined_day',
        Cell: ({ ...props }) => {
            return <span>{moment(props.data[props.row.index].joined_day).format('DD.MM.YYYY')}</span>
        }
    },
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Expires Date' className='min-w-100px' />,
        id: 'expiresDate',
        Cell: ({ ...props }) => {
            return <span>{moment(props.data[props.row.index].expiresDate).format('DD.MM.YYYY')}</span>
        }
    },
    {
        Header: (props) => <CouponCustomHeader tableProps={props} title='Actions' className='' />,
        id: 'actions',
        Cell: ({ ...props }) => <CouponAction id={props.data[props.row.index].id} action={props.data[props.row.index].two_steps} />,
    },
    // {
    //     Header: (props) => <CouponCustomHeader tableProps={props} title='Actions' className='text-end ' />,
    //     id: 'actions',
    //     Cell: ({ ...props }) => <CouponDeactivateCell action={props.data[props.row.index].two_steps} />
    // },
    // {
    //     Header: (props) => <DomainCustomHeader tableProps={props} title='URL Address' className='min-w-125px' />,
    //     id: 'name',
    //     Cell: ({ ...props }) => <DomainInfoCell user={props.data[props.row.index]} />,
    // },
]

export { couponColumns }
