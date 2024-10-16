/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { Link } from "react-router-dom";
import { UserModel, useAuth } from "../../../../app/modules/auth";
import { Languages } from "./Languages";
import { toAbsoluteUrl } from "../../../helpers";
import { ThemeModeSwitcher } from "../theme-mode/ThemeModeSwitcher";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store/jotai/UserAtom";

const HeaderUserMenu: FC = () => {
  // NEW AUTH
  // const { currentUser, logout } = useAuth();
  const [currentUser, setCurrentUser] = useAtom(userAtom)
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
      data-popper-placement="bottom-start"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            {currentUser.pic ? (
              <img alt={currentUser.first_name} src={currentUser.pic} />
            ) : (
              <img alt="Logo" src={toAbsoluteUrl("/media/avatars/blank.png")} />
            )}
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {currentUser?.first_name} {currentUser?.last_name}
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5 my-1 d-flex">

        <ThemeModeSwitcher toggleBtnClass="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary" />

      </div>

      <Languages />

      <div className="menu-item px-5 my-1">
        <Link to="/settings" className="menu-link px-5">
          Account Settings
        </Link>
      </div>

      <div className="menu-item px-5">
        <a onClick={() => {
          setCurrentUser({})
        }} className="menu-link px-5">
          Sign Out
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
