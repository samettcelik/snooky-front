import { useEffect, useState } from "react";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { Link } from "react-router-dom";


const PopupsListFilter = () => {


  return (
    <>
      {/* begin::Filter Button */}

      <button
        type="button"
        className="btn btn-primary me-3 btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon iconName="plus" className="fs-4" />
        Create Campaign
      </button>

      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div
        className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
        data-kt-menu="true"
      >
        {/* begin::Separator */}
        <div className="separator border-gray-200"></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className="border border-secondary">
          <Link to='/create-campaign?type=custom' className="btn btn-flex btn-light text-dark px-8 py-5 w-100 cursor-pointer rounded-0" >
            <KTIcon iconName="wrench" className="fs-2 text-dark" />
            <span className="d-flex flex-column align-items-start ms-2">
              <span className="fs-5 fw-bolder">Custom Campaign</span>
              <span className="fs-7">Start from scratch and do it your way</span>
            </span>
          </Link>
          <div className="border border-secondary border-0"></div>

          <Link to='create-campaign?type=quick' className="btn btn-flex btn-light text-dark px-8 py-5 w-100 cursor-pointer rounded-0" >
            <KTIcon iconName="document" className="fs-2 text-dark" />
            <span className="d-flex flex-column align-items-start ms-2">
              <span className="fs-5 fw-bolder">One Click Setup</span>
              <span className="fs-7">Easy & fast way to create a campaign</span>
            </span>
          </Link>
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}

    </>
  );
};

export { PopupsListFilter };
