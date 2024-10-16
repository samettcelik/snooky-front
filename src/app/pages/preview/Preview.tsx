import React, { useState } from 'react'
import WidePopup from '../../modules/templates/WidePopup'
import { CiLaptop, CiMobile1 } from 'react-icons/ci'
import { PageTitle } from '../../../_metronic/layout/core'

function Preview() {

    const [isMobile, setIsMobile] = useState<boolean>(false)
    return (
        <div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                background: '#fff',
                zIndex: 999999
            }}
            className='bg-white px-20 py-10'
        >
            <PageTitle breadcrumbs={[]}>Preview</PageTitle>
            <div className='d-flex gap-4 justify-content-center align-items-center'>
                <div onClick={() => setIsMobile(false)} className={`${!isMobile ? 'border-primary' : 'border-white'} cursor-pointer border-2 border-bottom pb-2 px-2`}>
                    <CiLaptop className='w-25px h-25px' />
                </div>
                <div onClick={() => setIsMobile(true)} className={`${isMobile ? 'border-primary' : 'border-white'} cursor-pointer border-2 border-bottom pb-2 px-2`}>
                    <CiMobile1 className='w-25px h-25px' />
                </div>
            </div>
            <div
                className="w-100 rounded-3 position-relative mt-5"
                style={{
                    top: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 100%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0px 0px, 10px 10px",
                }}
            >
                <WidePopup
                    showMobileDesktopButtons={false}
                    isPropsMobile={isMobile}
                    title={"Jump Into This Deal"}
                    disclaimer={""}
                    buttonText={"Show Coupon Code"}
                    subTitle={"Lorem ipsum, dolor sit amet consectetur adipisicing elit."}
                    leftSubTitle={"GET"}
                    rightSubTitle={"OFF THE BAG TAG"}
                    image={""}
                    logo={""}
                    showLogo={true}
                    isCouponVisible={false}
                    durationHeadline={""}
                    durationMechanism={"countdown"}
                    durationText={"durationText"}
                    durationCountdownDays={"1"}
                    durationCountdownHours={"06"}
                    durationCountdownMinutes={"20"}
                    showCouponButtonText={"Show Coupon Code"}
                />
            </div>
        </div>
    )
}

export default Preview
