import React from 'react'
import { BestCampaignsScreen } from './BestCampaignsList'
import CustomTooltip from '../../../modules/customComponents/CustomTooltip'

function BestPerforming() {
    return (
        <div>
            <div className="d-flex align-items-center gap-1 mb-6">
                <h2 className='text-dark fw-bold fs-3 mb-0'>Best Performing Campaigns</h2>
                <CustomTooltip description='Sorting by Revenue' />
            </div>
            <BestCampaignsScreen />
        </div>
    )
}

export default BestPerforming
