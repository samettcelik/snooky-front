// @ts-nocheck
import { Column } from 'react-table'
import { Domain } from '../../core/_models'
import { BestCampaignsCustomHeader } from './BestCampaignsCustomHeader'
import moment from 'moment'
import CustomTooltip from '../../../../../modules/customComponents/CustomTooltip'

const BestCampaignsColumns: ReadonlyArray<Column<Domain>> = [
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='Campaign Name' className='min-w-150px' />,
        id: 'name',
        Cell: ({ ...props }) => {
            let name = props.data[props.row.index].name
            return <CustomTooltip descriptionClassName='fw-semibold' description={name} CustomIcon={() => <span onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }} >{name?.length < 13 ? name : `${name?.slice(0, 12)}...`}</span>} />
        }
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='Status' className='min-w-80px' />,
        id: 'two_steps',
        Cell: ({ ...props }) => {
            const status = props.data[props.row.index].two_steps
            return <div className='w-100'>
                <span className={`px-2 badge badge-light-success fw-bolder`}>
                    Active
                </span>
            </div>
        },
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='Start Date' className='min-w-115px' />,
        id: 'joined_day',
        Cell: ({ ...props }) => {
            return <span>{moment(props.data[props.row.index].joined_day).format('DD.MM.YYYY')}</span>
        }
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='End Date' className='min-w-115px' />,
        id: 'expiresDate',
        Cell: ({ ...props }) => {
            return <span>{moment(props.data[props.row.index].expiresDate).format('DD.MM.YYYY')}</span>
        }
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='Revenue' className='min-w-100px' />,
        id: 'revenue',
        Cell: ({ ...props }) => {
            return <span>${Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200))}</span>
        }
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='Saved Margin' className='min-w-80px' />,
        id: 'saved_margin',
        Cell: ({ ...props }) => {
            const status = props.data[props.row.index].two_steps
            return <div className='w-100'>
                {Math.floor(Math.random() * 101)}%
            </div>
        },
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='Display' className='min-w-80px' />,
        id: 'display',
        Cell: ({ ...props }) => {
            return <div className='w-100'>
                <span>{Intl.NumberFormat().format(Math.floor(Math.random() * (1000 - 2500) + 2500))}</span>
            </div>
        },
    },
    {
        Header: (props) => <BestCampaignsCustomHeader tableProps={props} title='CTR' className='w-50px' />,
        id: 'ctr',
        Cell: ({ ...props }) => {
            return <div className=''>
                {Math.floor(Math.random() * 101)}%
            </div>
        },
    },
]

export { BestCampaignsColumns }
