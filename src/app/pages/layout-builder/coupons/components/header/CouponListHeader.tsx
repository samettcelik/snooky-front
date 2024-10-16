import { SnookyClient } from "../../../../../modules/Request"
import CouponListCategory from "./CouponListCategory"
import CouponListSearch from "./CouponListSearch"

function CouponListHeader() {

    return (
        <div className='card-header justify-content-start border-0 pt-6'>
            <div className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex algin-items-center gap-2">
                    <CouponListSearch />
                    <CouponListCategory />
                </div>
                <button onClick={async (e) => {
                    e.preventDefault()
                    const data = await SnookyClient.AddCoupons({ campaign_id: 1, name: 'Test Coupons 2', domain_id: 1, items: ["test coupon 1", "test coupon 2", "test coupon 3"] })
                    console.log('crate copuon data');
                    console.log('crate copuon data');
                    console.log(data);
                    console.log(data);
                    
                }} className="btn btn-primary">Add Coupon</button>
            </div>
            {/* <div className='card-toolbar'>
            </div> */}
        </div >
    )
}

export default CouponListHeader
