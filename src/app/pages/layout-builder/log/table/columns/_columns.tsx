// @ts-nocheck
import { Column } from 'react-table'
import { Domain } from '../../core/_models'
import { LogCustomHeader } from './LogCustomHeader'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import moment from 'moment'

const logColumns: ReadonlyArray<Column<Domain>> = [
    {
        Header: (props) => <LogCustomHeader tableProps={props} title='#' className='w-40px' />,
        id: 'selection',
        Cell: ({ ...props }) => {
            return <span>#</span>
        }
    },
    {
        Header: (props) => <LogCustomHeader tableProps={props} title='Locations' className='min-w-125px' />,
        id: 'name',
        Cell: ({ ...props }) => {
            return <span>{props.data[props.row.index].name}</span>
        }
    },
    {
        Header: (props) => <LogCustomHeader tableProps={props} title='Status' className='min-w-80px' />,
        id: 'two_steps',
        Cell: ({ ...props }) => {
            const status = props.data[props.row.index].two_steps
            return <div className='w-100'>
                <span className={`px-2 badge ${status ? 'badge-light-success' : 'badge-light-danger'} fw-bolder`}>
                    {status ? 'OK' : 'ERROR'}
                </span>
            </div>
        },
    },
    {
        Header: (props) => <LogCustomHeader tableProps={props} title='Device' className='min-w-80px' />,
        id: 'test',
        Cell: ({ ...props }) => {
            const status = props.data[props.row.index].two_steps
            return <div className='w-100'>
                <span>Chrome - Windows</span>
            </div>
        },
    },
    {
        Header: (props) => <LogCustomHeader tableProps={props} title='IP Adress' className='min-w-125px' />,
        id: 'expiresDate',
        Cell: ({ ...props }) => {
            return <span>236.125.56.78</span>
        }
    },
    {
        Header: (props) => <LogCustomHeader tableProps={props} title='Time' className='min-w-125px' />,
        id: 'joined_day',
        Cell: ({ ...props }) => {
            return <span>{moment(props.data[props.row.index].joined_day).format('DD.MM.YYYY')}</span>
        }
    },
    // {
    //     Header: (props) => <DomainCustomHeader tableProps={props} title='URL Address' className='min-w-125px' />,
    //     id: 'name',
    //     Cell: ({ ...props }) => <DomainInfoCell user={props.data[props.row.index]} />,
    // },
]

export { logColumns }
