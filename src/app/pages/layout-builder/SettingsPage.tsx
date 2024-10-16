/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { KTIcon } from '../../../_metronic/helpers'
import { getLayout, ILayout, LayoutSetup, useLayout } from '../../../_metronic/layout/core'
import { UsersListWrapper } from './usersTable/UsersList'
import { DomainsListWrapper } from './domainsTable/DomainsList'
import { Navigate, Outlet, Route, Routes, useParams, useSearchParams } from 'react-router-dom'
import { LogsList } from './LogsList'
import { InvoiceScreen } from './invoice/InvoiceScreen'
import { BillingScreen } from './billing/BillingScreen'
import AdvancedSettingsScreen from './AdvancedSettingsScreen'
import InstallScreen from './InstallScreen'
import { ProfileScreen } from './ProfileScreen'
import { useNavigate } from "react-router-dom";
import CouponList, { CouponListScreen } from './coupons/CouponList'
import { PricingScreen } from '../pricing/PricingScreen'
import { LogListScreen } from './log/LogList'

const SettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLayout } = useLayout()
  const [currentTab, setCurrentTab] = useState('Profile')
  const [config, setConfig] = useState<ILayout>(getLayout())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)

  const updateData = (fieldsToUpdate: Partial<ILayout>) => {
    const updatedData = { ...config, ...fieldsToUpdate }
    setConfig(updatedData)
  }

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
    } catch (error) {
      setConfig(getLayout())
    }
    setTimeout(() => {
      setLayout(config)
      setConfigLoading(false)
    }, 1000)
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayout())
      setResetLoading(false)
    }, 1000)
  }

  useEffect(() => {
    let _tab = searchParams.get("tab")
    setCurrentTab(_tab || 'Profile')
  }, [searchParams])

  const changeTab = (key: string) => {
    setSearchParams({ tab: key })
  }

  return (
    <>
      <div className=' card-custom'>
        <div className='card-header card-header-stretch overflow-auto'>
          <ul
            className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap overflow-y-hidden'
            role='tablist'
          >
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap `, { 'text-dark': currentTab !== 'Profile' }, { 'active text-primary': currentTab === 'Profile' })}
                onClick={() => changeTab('Profile')}
                role='tab'
              >
                Settings
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap`, { 'text-dark': currentTab !== 'Users' }, { 'active text-primary': currentTab === 'Users' })}
                onClick={() => setSearchParams({ tab: 'Users' })}
                role='tab'
              >
                Users
              </a>
            </li>

            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap `, { 'text-dark': currentTab !== 'Websites' }, { 'active text-primary': currentTab === 'Websites' })}
                onClick={() => changeTab('Websites')}
                role='tab'
              >
                Websites
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap `, { 'text-dark': currentTab !== 'Install' }, { 'active text-primary': currentTab === 'Install' })}
                onClick={() => changeTab('Install')}
                role='tab'
              >
                Install
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap `, { 'text-dark': currentTab !== 'Advanced-Settings' }, { 'active text-primary': currentTab === 'Advanced-Settings' })}
                onClick={() => changeTab('Advanced-Settings')}
                role='tab'
              >
                Advanced Settings
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap`, { 'text-dark': currentTab !== 'Billing' }, { 'active text-primary': currentTab === 'Billing' })}
                onClick={() => changeTab('Billing')}
                role='tab'
              >
                Billing
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap`, { 'text-dark': currentTab !== 'pricing' }, { 'active text-primary': currentTab === 'pricing' })}
                onClick={() => changeTab('pricing')}
                role='tab'
              >
                Pricing
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap `, { 'text-dark': currentTab !== 'Coupons' }, { 'active text-primary': currentTab === 'Coupons' })}
                onClick={() => changeTab('Coupons')}
                role='tab'
              >
                Coupons
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap`, { 'text-dark': currentTab !== 'Invoice' }, { 'active text-primary': currentTab === 'Invoice' })}
                onClick={() => changeTab('Invoice')}
                role='tab'
              >
                Invoice
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer text-nowrap`, { 'text-dark': currentTab !== 'Logs' }, { 'active text-primary': currentTab === 'Logs' })}
                onClick={() => changeTab('Logs')}
                role='tab'
              >
                Logs
              </a>
            </li>
          </ul>
        </div>
        {/* end::Users */}

        {/* begin::Form */}
        <form className='form'>
          {/* begin::Body */}
          <div className='card-body'>
            <div className='tab-content pt-3'>
              <div className={clsx('tab-pane', { active: currentTab === 'Profile' })}>
                <ProfileScreen />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'Users' })}>
                <UsersListWrapper />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'Websites' })}>
                <DomainsListWrapper />
              </div>

              <div className={clsx('tab-pane', { active: currentTab === 'Install' })}>
                <InstallScreen />
              </div>

              <div className={clsx('tab-pane', { active: currentTab === 'Advanced-Settings' })}>
                <AdvancedSettingsScreen />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'Coupons' })}>
                <CouponListScreen />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'Billing' })}>
                <BillingScreen />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'pricing' })}>
                <PricingScreen isInUser={true} />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'Invoice' })}>
                <InvoiceScreen />
              </div>
              <div className={clsx('tab-pane', { active: currentTab === 'Logs' })}>
                <LogListScreen />
              </div>
            </div>
          </div>
          {/* end::Body */}
        </form>
        {/* end::Form */}
      </div>
    </>
  )
}

export { SettingsPage }
