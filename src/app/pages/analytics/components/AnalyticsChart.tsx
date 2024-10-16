/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { getCSS, getCSSVariableValue } from '../../../../_metronic/assets/ts/_utils'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import RevanueChart from '../charts/RevanueChart'
import CostChart from '../charts/CostChart'
import RateChart from '../charts/RateChart'
import ReachChart from '../charts/ReachChart'
import OrdersChart from '../charts/OrdersChart'
import VisitChart from '../charts/VisitChart'
import AvarageChart from '../charts/AvarageChart'
import DiscountChart from '../charts/DiscountChart'


function AnalyticsChart({ currentTab }: { currentTab: string }) {

    return (
        <>
            {currentTab === 'revenue' && <RevanueChart />}
            {currentTab === 'cost' && <CostChart />}
            {currentTab === 'rate' && <RateChart />}
            {currentTab === 'reach' && <ReachChart />}
            {currentTab === 'orders' && <OrdersChart />}
            {currentTab === 'visit' && <VisitChart />}
            {currentTab === 'avarage' && <AvarageChart />}
            {currentTab === 'discount' && <DiscountChart />}
        </>
    )
}

export default AnalyticsChart