import {FC} from 'react'

type Props = {
  two_steps?: boolean
}

const InvoiceTwoStepsCell: FC<Props> = ({two_steps}) => (
  <div className={`badge ${two_steps ? 'badge-light-success' : 'badge-light-danger'} fw-bolder`}>{two_steps ? 'Paid' : 'Unpaid'}</div>
)

export {InvoiceTwoStepsCell}
