import { useState } from "react"
import { KTCard } from "../../../../_metronic/helpers"
import BestCampaignsListHeader from "./components/header/BestCampaignsListHeader"
import { ListViewProvider } from "./core/ListViewProvider"
import { QueryRequestProvider } from "./core/QueryRequestProvider"
import { QueryResponseProvider } from "./core/QueryResponseProvider"
import BestCampaignsTable from "./table/BestCampaignsTable"

const BestCampaignsList = ({ setRowsCount, rowsCount }) => {
    return (
        <>
            <KTCard>
                {/* <BestCampaignsListHeader setRowsCount={setRowsCount} rowsCount={rowsCount} /> */}
                <BestCampaignsTable rowsCount={rowsCount} />
            </KTCard>
        </>
    )
}

const BestCampaignsScreen = () => {

    const [rowsCount, setRowsCount] = useState(3)
    
    return <QueryRequestProvider>
        <QueryResponseProvider>
            <ListViewProvider>
                <BestCampaignsList setRowsCount={setRowsCount} rowsCount={rowsCount} />
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
}

export default BestCampaignsList
export { BestCampaignsScreen }