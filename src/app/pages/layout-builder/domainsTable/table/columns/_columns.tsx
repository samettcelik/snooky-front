// @ts-nocheck
import { Column } from 'react-table'
import { DomainInfoCell } from './DomainInfoCell'
import { DomainLastLoginCell } from './DomainLastLoginCell'
import { DomainTwoStepsCell } from './DomainTwoStepsCell'
import { DomainActionsCell } from './DomainActionsCell'
import { DomainSelectionCell } from './DomainSelectionCell'
import { DomainCustomHeader } from './DomainCustomHeader'
import { DomainSelectionHeader } from './DomainSelectionHeader'
import { Domain } from '../../core/_models'
import moment from 'moment'

const usersColumns: ReadonlyArray<Column<Domain>> = [
  {
    Header: (props) => <DomainSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({ ...props }) => <DomainSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <DomainCustomHeader tableProps={props} title='URL Address' className='min-w-125px' />,
    id: 'url',
    Cell: ({ ...props }) => <DomainInfoCell url={props.data[props.row.index].url} />,
  },
  {
    Header: (props) => (
      <DomainCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'status',
    Cell: ({ ...props }) => <DomainTwoStepsCell status={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <DomainCustomHeader tableProps={props} title='Created Date' className='min-w-125px' />
    ),
    accessor: 'created_at',
    Cell: ({ ...props }) => <span>{moment(props.data[props.row.index].created_at).format('DD.MM.YYYY')}</span>,
  },
  {
    Header: (props) => (
      <DomainCustomHeader tableProps={props} title='Actions' className='text-center' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => <DomainActionsCell id={props.data[props.row.index].id} domain={props.data[props.row.index].name} />,
  },
]

export { usersColumns }
