import { useEffect, useState } from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const DashboardWrapper = () => {
  const [isVisibleExpAlert, setIsVisibleExpAlert] = useState(false);

  useEffect(() => {
    const storedExp = localStorage.getItem('closeExpAlert');
    if (storedExp) {
      var nowDate = new Date();
      nowDate.setHours(nowDate.getHours() - 24);
      if (nowDate > new Date(storedExp)) {
        setIsVisibleExpAlert(true)
      }
    }
    else {
      setIsVisibleExpAlert(true)
    }
  }, []);

  const closeExpAlert = () => {
    localStorage.setItem('closeExpAlert', new Date().toString())
    setIsVisibleExpAlert(false)
  }
  return (
    <div style={{marginTop: -10}}>
      <PageTitle breadcrumbs={[]}>Dashboard</PageTitle>
      {isVisibleExpAlert && (<>
        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 px-6 py-4 position-relative">
          <div className="position-absolute end-0 top-0 cursor-pointer text-white bg-primary px-2 py-0 rounded" style={{ marginRight: '-5px', marginTop: '-5px' }} onClick={closeExpAlert}>
            x
          </div>
          <KTIcon iconName="information-5" className="fs-2tx text-primary me-4" />
          <div className="d-block d-sm-flex flex-stack flex-grow-1">
            <div className="fw-bold">
              <div className="fs-6 text-primary">
                Your free trial has ended. Upgrade your account to reactivate your campaigns below.
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
      <Dashboard />
    </div>
  );
};

export { DashboardWrapper };
