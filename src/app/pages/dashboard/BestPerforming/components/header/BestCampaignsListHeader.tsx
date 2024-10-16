import BestCampaignsListRowsCount from "./BestCampaignsListRowsCount"
import BestCampaignsListSearch from "./BestCampaignsListSearch"

function BestCampaignListHeader({ setRowsCount, rowsCount }) {

    return (
        <div className='card-header justify-content-start border-0 pt-6'>
            <BestCampaignsListSearch />
            {/* <BestCampaignsListRowsCount setRowsCount={setRowsCount} rowsCount={rowsCount} /> */}
            {/* <div className='card-toolbar'>
            </div> */}
        </div>
    )
}

export default BestCampaignListHeader
