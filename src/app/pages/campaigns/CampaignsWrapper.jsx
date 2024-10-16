import { useIntl } from "react-intl";
import React, { useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTIcon } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { PopupsListWrapper } from "./popupsTable/PopupsList";
import './style.css'
import { useListView } from "./popupsTable/core/ListViewProvider";


const DashboardPage = () => {
  const [activeTab, setTab] = useState('active')
  const { selected } = useListView()
  return (
    <>
      <div className="d-flex flex-column" style={{ marginTop: -10 }}>
        <div style={{ height: 38 }} className="d-flex align-items-center">
          <h2 className="text-dark fw-bold fs-3 mb-0">All Campaigns (36)</h2>
        </div>
        <div className="d-flex flex-wrap justify-content-between mt-2">
          <div onClick={() => setTab('active')} className={`campaigncard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded position-relative ${activeTab === 'active' && 'bg-light-secondary'}`}>
            <div className="d-flex flex-column mt-2">
              <span className="fs-4 fw-bold">1</span>
              <span className="fs-8 fw-semibold">Active</span>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 15,
                bottom: 20,
                zIndex: 2,
              }}
            >
              <img src="/media/icons/flaticons/rocket.png" alt="" className="w-40px h-40px" />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: -10,
                left: 0,
                zIndex: 0,
                marginBottom: -16,
                width: '100%',
              }}
            >
              <img src="/media/icons/flaticons/wave.svg" alt="" />
            </div>
          </div>
          <div onClick={() => setTab('scheduled')} className={`campaigncard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded position-relative ${activeTab === 'scheduled' && 'bg-light-secondary'}`}>
            <div className="d-flex flex-column mt-2">
              <span className="fs-4 fw-bold">1</span>
              <span className="fs-8 fw-semibold">Scheduled</span>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 15,
                bottom: 20,
                zIndex: 2,
              }}
            >
              <img src="/media/icons/flaticons/schedule.png" alt="" className="w-40px h-40px" />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: -10,
                left: 0,
                zIndex: 0,
                marginBottom: -16,
                width: '100%',
              }}
            >
              <img src="/media/icons/flaticons/wave-warning.svg" alt="" />
            </div>
          </div>
          <div onClick={() => setTab('draft')} className={`campaigncard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded position-relative ${activeTab === 'draft' && 'bg-light-secondary'}`}>
            <div className="d-flex flex-column mt-2">
              <span className="fs-4 fw-bold">1</span>
              <span className="fs-8 fw-semibold">Draft</span>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 15,
                bottom: 20,
                zIndex: 2,
              }}
            >
              <img src="/media/icons/flaticons/draft.png" alt="" className="w-40px h-40px" />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: -10,
                left: 0,
                zIndex: 0,
                marginBottom: -16,
                width: '100%',
              }}
            >
              <img src="/media/icons/flaticons/wave-primary.svg" alt="" />
            </div>
          </div>
          <div onClick={() => setTab('stopped')} className={`campaigncard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded position-relative ${activeTab === 'stopped' && 'bg-light-secondary'}`}>
            <div className="d-flex flex-column mt-2">
              <span className="fs-4 fw-bold">1</span>
              <span className="fs-8 fw-semibold">Stopped</span>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 15,
                bottom: 20,
                zIndex: 2,
              }}
            >
              <img src="/media/icons/flaticons/stop.png" alt="" className="w-40px h-40px" />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: -10,
                left: 0,
                zIndex: 0,
                marginBottom: -16,
                width: '100%',
              }}
            >
              <img src="/media/icons/flaticons/wave-danger.svg" alt="" />
            </div>
          </div>
          <div onClick={() => setTab('ended')} className={`campaigncard cursor-pointer d-flex flex-column ps-6 pe-4 py-4 card rounded position-relative ${activeTab === 'ended' && 'bg-light-secondary'}`}>
            <div className="d-flex flex-column mt-2">
              <span className="fs-4 fw-bold">1</span>
              <span className="fs-8 fw-semibold">Ended</span>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 15,
                bottom: 20,
                zIndex: 2,
              }}
            >
              <img src="/media/icons/flaticons/end.png" alt="" className="w-40px h-40px" />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: -10,
                left: 0,
                zIndex: 0,
                marginBottom: -16,
                width: '100%',
              }}
            >
              <img src="/media/icons/flaticons/wave-cyan.svg" alt="" />
            </div>
          </div>
        </div>
      </div >

      <div className="mt-4">
        <PopupsListWrapper />
      </div>
    </>
  )
};

const CampaignsWrapper = () => {
  const intl = useIntl();
  const [isVisibleExpAlert, setIsVisibleExpAlert] = useState(false);

  useEffect(() => {
    const storedExp = localStorage.getItem('closeExpAlert');
    if (storedExp) {

      var yirmiDortSaatSonra = new Date();
      yirmiDortSaatSonra.setHours(yirmiDortSaatSonra.getHours() - 24);

      if (yirmiDortSaatSonra > new Date(storedExp)) {
        setIsVisibleExpAlert(true)
      }

    }
    else {
      setIsVisibleExpAlert(true)
    }
  }, []);

  const closeExpAlert = () => {
    localStorage.setItem('closeExpAlert', new Date())
    setIsVisibleExpAlert(false)
  }


  return (
    <>
      <PageTitle breadcrumbs={[]}>Campaigns</PageTitle>
      {/* Eğer alert eklenecekse false yerine isVisibleExpAlert yaz ve alert içerisindeki expAlert ismini değiştir yoksa bütün alertler kapanır  */}
      {false && (<>
        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 px-6 py-4 position-relative">
          <div className="position-absolute end-0 top-0 cursor-pointer text-white bg-primary px-2 py-0 rounded" style={{ marginRight: '-5px', marginTop: '-5px' }} onClick={closeExpAlert}>
            x
          </div>
          <KTIcon iconName="information-5" className="fs-2tx text-primary me-4" />

          <div className="d-block d-sm-flex flex-stack flex-grow-1">
            <div className="fw-bold">
              <div className="fs-6 text-primary">
                Your trial is expiring in 1 day.
              </div>
            </div>
            <Link
              to={'/settings?tab=pricing'}
              id="send_instructions_submit_btn"
              type="submit"
              className="btn btn-sm btn-primary fw-bold"
            >Upgrade</Link>

          </div>
        </div>
      </>)}

      <DashboardPage />
    </>
  );
};

export { CampaignsWrapper };
