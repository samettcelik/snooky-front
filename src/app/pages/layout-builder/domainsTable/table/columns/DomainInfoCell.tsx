/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { Domain } from '../../core/_models'

type Props = {
  url: string
}

const DomainInfoCell: FC<Props> = ({ url }) => (
  <div className='d-flex align-items-center'>

    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {url}
      </a>
    </div>
  </div>
)

export { DomainInfoCell }
