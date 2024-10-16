import { FC } from 'react'

type Props = {
  status: string
}

const DomainTwoStepsCell: FC<Props> = ({ status }) => {
  return (
    <div className={`badge ${status === 'active' ? 'badge-light-success' : 'badge-light'} fw-bolder`}>{`${status?.charAt(0).toUpperCase() + status?.slice(1)}`}</div>
  )
}
export { DomainTwoStepsCell }
