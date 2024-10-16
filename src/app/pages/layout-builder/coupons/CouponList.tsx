import { KTCard } from "../../../../_metronic/helpers"
import CouponListHeader from "./components/header/CouponListHeader"
import { ListViewProvider } from "./core/ListViewProvider"
import { QueryRequestProvider } from "./core/QueryRequestProvider"
import { QueryResponseProvider } from "./core/QueryResponseProvider"
import CouponTable from "./table/CouponTable"

const CouponList = () => {
    return (
        <>
            <KTCard>
                <CouponListHeader />
                <CouponTable />
            </KTCard>
        </>
    )
}

const CouponListScreen = () => (
    <QueryRequestProvider>
        <QueryResponseProvider>
            <ListViewProvider>
                <CouponList />
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export default CouponList
export { CouponListScreen }