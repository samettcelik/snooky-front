import { atom } from 'jotai'

//campaignSchedule
const today = new Date();
const tenYearsLater = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
export const defaultCampaignSchedule = {
  startDate: today,
  endDate: tenYearsLater,
  isStartDateDisabled: false,
  timeList: [
    {
      day: { value: "Everyday", label: "Everyday" },
      startHour: { value: "00:00", label: "00:00" },
      endHour: { value: "23:59", label: "23:59" },
    },
  ]
}

//discountRange
export const defaultDiscountRange = {
  minPercentage: 0,
  maxPercentage: 0,
  selectedGoal: null,
}

//campaignLimit
export const defaultCampaignLimit = {
  singleValue: 5,
  minValue: 3,
  maxValue: 5,
  selectedOption: "None",
  selectedOptionDetail: "radioButtonOne"
}

const createCampaignAtom = atom({
  pageNum: 1,
  collapseNum: 1,
  campaignName: {
    title: "Untitled campaign"
  },
  campaignSchedule: defaultCampaignSchedule,
  selectedTimeZone: null,
  discountRange: defaultDiscountRange,
  campaignLimit: defaultCampaignLimit,
  campaignAudience: {
    devices: {
      'Display on desktops': {
        selected: false,
        options: {
          Windows: true,
          Mac: true,
          Linux: true,
        },
      },
      'Display on tablets': {
        selected: false,
        options: {
          iPad: true,
          Android: true,
        },
      },
      'Display on mobiles': {
        selected: false,
        options: {
          iPhone: true,
          Android: true,
          'Windows Phone': true,
        },
      },
    },
    country: null,
    language: null,
    channels: null,
    shareVisitor: null,
    browser: null,
    activeDevices: ['All devices'],
    isAnd: false,
    trafficSourceIsAnd: false,
    popupSawCount: 5,
    minValue: 0,
    maxValue: 1,
    inTheLast: 5,
    shopifyTargets: [],
    trafficSourceUrlList: [{ URLType: null, url: "" }],
    utmSourceUrlList: [{ URLType: null, url: "", source: null }],
    returningVisitors: { value: "atlast", label: "At least" },
    timeVisitors: { value: "min", label: "Min." },
    countryTypeOption: { "value": "inc", "label": "Include" }
  },
  campaignDisplayPage: {
    frequencyIsActive: false,
    frequentlyTimeList: { value: "pages", label: "Pages" },
    pageOptions: "selectedPages",
    frequentlyShowOptionDetail: "everyPageLoad",
    frequentlyTimeInput: 3,
    stopShowingTimeInput: 3,
    pagesList: { UrlList: [{ URLType: { value: "url0", label: "Simple match" }, url: "", refineList: [], andOr: "OR" }], andOr: "OR" },
    stopShowing: {
      afterVisitorClosed: false,
      afterVisitorSignedUp: false,
      afterVisitorSeen: false
    }
  },
  campaignStudio: {
    buttonColor: '#000000',
    buttonTextColor: "#ffffff",
    coverImage: "",
    logo: "",
    showLogo: true,
    buttonText: "Copy Code",
    showCouponButtonText: "Show Coupon Code",
    confirmationButtonText: "Copied!",
    durationHeadline: "",
    durationCountdownDays: "1",
    durationCountdownHours: "06",
    durationCountdownMinutes: "20",
    durationText: "",
    durationMechanism: "countdown",
    title: "Jump Into This Deal",
    disclaimer: "",
    percentPosition: true,
    percentBold: false,
    leftSubTitle: "GET",
    rightSubTitle: "OFF THE BAG TAG",
    reminderIsActive: false,
    isCouponCodeVisible: false,
  }
})

export { createCampaignAtom }