/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
import Select from "react-select";
import { SnookyClient } from "../../../../app/modules/Request";
import './style.css'
import { useAtom } from "jotai";
import { domainAtom } from "../../../../store/jotai/DomainAtom";

export function AsideMenuMain() {
  const [domainsStore, setDomainsStore] = useAtom(domainAtom)
  const intl = useIntl();
  const [domainList, setDomainList] = useState([])
  const [selectedDomain, setSelectedDomain] = useState(null);
  const changeSelectedDomain = (event) => {
    setSelectedDomain(event);
    setDomainsStore({
      ...domainsStore,
      currentDomain: event
    })
  };

  useEffect(() => {
    getDomains()
  }, [])

  const getDomains = async () => {
    const { data } = await SnookyClient.GetDomains()
    if (data.length > 0) {
      setDomainsStore(data)
    }
  }

  useEffect(() => {
    if (domainsStore.domains.length > 0) {
      let _domains = []
      domainsStore.domains.map(dm => {
        let label = dm.name.includes('https://') ? dm.name.slice(8, dm.name.length) : dm.name.slice(7, dm.name.length)
        _domains.push({ label, value: dm.id })
      })
      setDomainList(_domains)
      setSelectedDomain({ value: _domains[0].value, label: _domains[0].label })
    }
  }, [domainsStore.domains])

  return (
    <>
      <div className="menu-item">
        <Select
          options={domainList}
          value={selectedDomain}
          onChange={changeSelectedDomain}
          placeholder="Domains"
          id="domainSelect"
          className="mt-4 form-control form-control-solid p-0"
        />
      </div>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1"></span>
        </div>
      </div>

      <AsideMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
      />

      <AsideMenuItem
        to="/campaigns"
        icon="abstract-36"
        title={intl.formatMessage({ id: "MENU.CAMPAINGS" })}
      />

      <AsideMenuItem to="/analytics" icon="chart-simple" title="Analytics" />
      <div className="d-none">
        <AsideMenuItem
          to="/onboarding/welcome"
          icon="switch"
          title="Onboarding"
        />

        <div className="menu-item">
          <div className="menu-content pt-8 pb-2">
            <span className="menu-section text-muted text-uppercase fs-8 ls-1">
              Crafted
            </span>
          </div>
        </div>
        <AsideMenuItemWithSub to="/crafted/pages" title="Pages" icon="gift">
          <AsideMenuItemWithSub
            to="/crafted/pages/profile"
            title="Profile"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/crafted/pages/profile/overview"
              title="Overview"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/crafted/pages/profile/projects"
              title="Projects"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/crafted/pages/profile/campaigns"
              title="Campaigns"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/crafted/pages/profile/documents"
              title="Documents"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/crafted/pages/profile/connections"
              title="Connections"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>

          <AsideMenuItemWithSub
            to="/crafted/pages/wizards"
            title="Wizards"
            hasBullet={true}
          >
            <AsideMenuItem
              to="/crafted/pages/wizards/horizontal"
              title="Horizontal"
              hasBullet={true}
            />
            <AsideMenuItem
              to="/crafted/pages/wizards/vertical"
              title="Vertical"
              hasBullet={true}
            />
          </AsideMenuItemWithSub>
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to="/crafted/accounts"
          title="Accounts"
          icon="profile-circle"
        >
          <AsideMenuItem
            to="/crafted/account/overview"
            title="Overview"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/crafted/account/settings"
            title="Settings"
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub to="/error" title="Errors" icon="cross-circle">
          <AsideMenuItem to="/error/404" title="Error 404" hasBullet={true} />
          <AsideMenuItem to="/error/500" title="Error 500" hasBullet={true} />
        </AsideMenuItemWithSub>
        <AsideMenuItemWithSub
          to="/crafted/widgets"
          title="Widgets"
          icon="element-plus"
        >
          <AsideMenuItem
            to="/crafted/widgets/lists"
            title="Lists"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/crafted/widgets/statistics"
            title="Statistics"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/crafted/widgets/charts"
            title="Charts"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/crafted/widgets/mixed"
            title="Mixed"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/crafted/widgets/tables"
            title="Tables"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/crafted/widgets/feeds"
            title="Feeds"
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
        <div className="menu-item">
          <div className="menu-content pt-8 pb-2">
            <span className="menu-section text-muted text-uppercase fs-8 ls-1">
              Apps
            </span>
          </div>
        </div>
        <AsideMenuItemWithSub
          to="/apps/chat"
          title="Chat"
          icon="message-text-2"
        >
          <AsideMenuItem
            to="/apps/chat/private-chat"
            title="Private Chat"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/apps/chat/group-chat"
            title="Group Chart"
            hasBullet={true}
          />
          <AsideMenuItem
            to="/apps/chat/drawer-chat"
            title="Drawer Chart"
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
        <AsideMenuItem
          to="/apps/user-management/users"
          icon="shield-tick"
          title="User management"
        />
      </div>
    </>
  );
}
