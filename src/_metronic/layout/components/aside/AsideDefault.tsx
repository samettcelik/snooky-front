/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import { useLayout } from "../../core";
import { KTIcon } from "../../../helpers";
import { AsideMenu } from "./AsideMenu";
import { AsideToolbar } from "./AsideToolbar";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CustomTooltip from "../../../../app/modules/customComponents/CustomTooltip";
const AsideDefault: FC = () => {
  const { classes } = useLayout();
  const [trialPercent, setTrialPercent] = useState<number>(20);
  const [trialLeftDays, setTrialLeftDays] = useState<number>(13);

  return (
    <div
      id="kt_aside"
      className="aside"
      data-kt-drawer="true"
      data-kt-drawer-name="aside"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_aside_mobile_toggle"
    >
      {/* begin::Aside Toolbarl */}
      <div className="aside-toolbar flex-column-auto" id="kt_aside_toolbar">
        <AsideToolbar />
      </div>
      {/* end::Aside Toolbarl */}
      {/* begin::Aside menu */}
      <div className="aside-menu flex-column-fluid">
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div className="aside-footer flex-column-auto py-5" id="kt_aside_footer">
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <div>Trial - {trialLeftDays} day{trialLeftDays > 0 && (<>s</>)} left</div>
            {/* <div>1.000/5.000</div> */}
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex align-items-center gap-2">
              <CircularProgressbar
                value={20}
                className="w-20px"
                strokeWidth={17}
                styles={buildStyles({
                  pathColor: `#3C53F4`,
                  textColor: '#f88',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })} />
              <div className="d-flex align-items-center">
                <div>
                  <CustomTooltip
                    description="A pageview represents the total number of page view requests from the websites you have added."
                    CustomIcon={() => (
                      <span style={{ fontSize: 12 }}>Pageview</span>
                    )}
                  />
                </div>
              </div>
            </div>
            <span style={{ fontSize: 11, marginTop: 4 }}>999.999 / 999.999</span>
          </div>
          {/* <div className="d-flex align-items-center justify-content-between mt-1">
            <div className="d-flex align-items-center gap-2">
              <CircularProgressbar
                value={60}
                className="w-25px"
                strokeWidth={17}
                styles={buildStyles({
                  pathColor: `#3C53F4`,
                  textColor: '#f88',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })} />
              <span className="fs-6">Email</span>
            </div>
            <span className="mt-1">300 / 500</span>
          </div> */}
          {/* <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-website-status">
                <div>1.000 / 5.000</div>
              </Tooltip>
            }
          >
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: `${trialPercent}%` }}

              ></div>
            </div>
          </OverlayTrigger> */}
          <div className="d-block mt-4">
            <Link to={'/settings?tab=pricing'} className="btn btn-sm btn-light-primary">Upgrade</Link>
          </div>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  );
};

export { AsideDefault };
