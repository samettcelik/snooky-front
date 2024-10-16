import { KTCard } from "../../../../_metronic/helpers"
import LogListHeader from "./components/header/LogListHeader"
import { ListViewProvider } from "./core/ListViewProvider"
import { QueryRequestProvider } from "./core/QueryRequestProvider"
import { QueryResponseProvider } from "./core/QueryResponseProvider"
import LogTable from "./table/LogTable"

const LogList = () => {
    return (
        <>
            <KTCard>
                <LogListHeader />
                <LogTable />
            </KTCard>
        </>
    )
}

const LogListScreen = () => (
    <QueryRequestProvider>
        <QueryResponseProvider>
            <ListViewProvider>
                <LogList />
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export default LogList
export { LogListScreen }