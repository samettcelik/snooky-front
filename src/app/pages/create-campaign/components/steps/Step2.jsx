import React, { useState } from "react";
import WidePopup from "../../../../modules/templates/WidePopup";
import { CiLaptop, CiMobile1 } from "react-icons/ci";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../../store/jotai/CreateCampaignAtom";

const Step2 = () => {
  const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
  const [tab, setTab] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  const templateList = [
    { types: "popup", title: "Main Template" },
  ];

  const nextSection = () => {
    setCreateCampaignStates({
      ...createCampaignStates,
      pageNum: 3,
      collapseNum: 1,
    })
  }

  return (
    <div className="w-100 w-xxl-900px mx-auto">
      <div className="pb-4 mt-4">
        <h2 className="fw-bolder text-dark">Template Details</h2>
      </div>
      <div className="row flex-wrap pt-5">
        {templateList?.map((e, index) => (
          <React.Fragment key={index}>
            <div className={`col-12 p-3 ${tab != "all" && tab != e.types ? "d-none" : ""}`}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{e.title}</h5>
                    <div className='d-flex gap-4 justify-content-center align-items-center'>
                      <div onClick={() => setIsMobile(false)} className={`${!isMobile ? 'border-primary' : 'border-white'} cursor-pointer border-2 border-bottom pb-2 px-2`}>
                        <CiLaptop className='w-25px h-25px' />
                      </div>
                      <div onClick={() => setIsMobile(true)} className={`${isMobile ? 'border-primary' : 'border-white'} cursor-pointer border-2 border-bottom pb-2 px-2`}>
                        <CiMobile1 className='w-25px h-25px' />
                      </div>
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
                  <div className="d-flex flex-end mt-4">
                    <a className="btn btn-primary" onClick={() => nextSection()}>
                      Select
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export { Step2 };
