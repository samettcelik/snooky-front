// @ts-nocheck
import { Column } from 'react-table'
import { PopupInfoCell } from './PopupInfoCell'
import { PopupLastLoginCell } from './PopupLastLoginCell'
import { PopupTwoStepsCell } from './PopupTwoStepsCell'
import { PopupActionsCell } from './PopupActionsCell'
import { PopupSelectionCell } from './PopupSelectionCell'
import { PopupCustomHeader } from './PopupCustomHeader'
import { PopupSelectionHeader } from './PopupSelectionHeader'
import { Popup } from '../../core/_models'
import moment from 'moment'
import { KTIcon } from '../../../../../../_metronic/helpers'
import RandomStatusRow from './RandomStatusRow'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import CustomTooltip from '../../../../../modules/customComponents/CustomTooltip'

let hover = false

const usersColumns: ReadonlyArray<Column<Popup>> = [
  {
    Header: (props) => <PopupSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <PopupSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Campaign Name' className='min-w-150px' />,
    id: 'name',
    Cell: ({ ...props }) => {
      let name = props.data[props.row.index].name
      return <CustomTooltip descriptionClassName='fw-semibold' description={name} CustomIcon={() => <span onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }} >{name?.length < 13 ? name : `${name?.slice(0, 12)}...`}</span>} />
    }
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Status' className='min-w-80px' />,
    id: 'two_steps',
    Cell: ({ ...props }) => {

      const statusList = ['Active', 'Scheduled', 'Draft', 'Stopped', 'Ended']
      const rand = Math.floor(Math.random() * 5)
      const status = statusList[rand]
      const { response } = useQueryResponse()
      return <RandomStatusRow currentIndex={props.row.index} lastIndex={response.data?.length} rand={rand} status={status} />
    }
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Start Date' className='min-w-115px' />,
    id: 'joined_day',
    Cell: ({ ...props }) => {
      return <span onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }}>{moment(props.data[props.row.index].joined_day).format('DD.MM.YYYY')}</span>
    }
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='End Date' className='min-w-115px' />,
    id: 'expiresDate',
    Cell: ({ ...props }) => {
      return <span onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }}>{moment(props.data[props.row.index].expiresDate).format('DD.MM.YYYY')}</span>
    }
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Revenue' className='min-w-100px' />,
    id: 'revenue',
    Cell: ({ ...props }) => {
      return <span onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }}>${Intl.NumberFormat().format(Math.floor(Math.random() * (5000 - 200) + 200))}</span>
    }
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Saved Margin' className='min-w-80px' />,
    id: 'saved_margin',
    Cell: ({ ...props }) => {
      const status = props.data[props.row.index].two_steps
      return <div onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }} className='w-100'>
        {Math.floor(Math.random() * 101)}%
      </div>
    },
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Display' className='min-w-80px' />,
    id: 'display',
    Cell: ({ ...props }) => {
      return <div onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }} className='w-100'>
        <span>{Intl.NumberFormat().format(Math.floor(Math.random() * (1000 - 2500) + 2500))}</span>
      </div>
    },
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='CTR' className='w-50px' />,
    id: 'ctr',
    Cell: ({ ...props }) => {
      return <div onMouseEnter={() => { hover = true }} onMouseLeave={() => { hover = false }} className=''>
        {Math.floor(Math.random() * 101)}%
      </div>
    },
  },
  {
    Header: (props) => <PopupCustomHeader tableProps={props} title='Actions' className='text-center' />,
    id: 'actions',
    Cell: ({ ...props }) => <PopupActionsCell id={props.data[props.row.index].id} campaignName={props.data[props.row.index].name} />,
  },
]

export { usersColumns }
