import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { KTIcon } from "../../../../../../_metronic/helpers";
import allLanguage from "../../../../../../_metronic/helpers/AllLanguage";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Geosuggest from '@ubilabs/react-geosuggest';
import './../../../../../../_metronic/assets/sass/components/geosuggest.css';
import { ToastContainer, toast } from 'react-toastify';

import { IoClose } from "react-icons/io5";
import CustomTooltip from "../../../../../modules/customComponents/CustomTooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../../../store/jotai/CreateCampaignAtom";



const trafficSourceOptions = [
    { value: "url0", label: "Is equal to" },
    { value: "url1", label: "Is not equal to" },
    { value: "url2", label: "Contains" },
    { value: "url3", label: "Does not contain" },
    { value: "url4", label: "Starts with" },
    { value: "url5", label: "Does not start with" },
    { value: "url6", label: "Does not end with" },
    { value: "url7", label: "Matches the RegEx" },
    { value: "url8", label: "Does not match the RegEx" }
];

const utmSourceOptions = [
    { value: "source", label: "Source" },
    { value: "medium", label: "Medium" },
    { value: "campaign", label: "Campaign" },
    { value: "term", label: "Term" },
    { value: "content", label: "Content" },
];


const showPopupOptions = [
    { value: true, label: "Show" },
    { value: false, label: "Hide" },
];
const properyOptions = [{
    label: 'Customer',
    options: [
        { value: "customer.email", label: "customer.email" },
        { value: "customer.loggedIn", label: "customer.loggedIn" },
        { value: "customer.type", label: "customer.type" },
        { value: "customer.phone", label: "customer.phone" },
        { value: "customer.currency", label: "customer.currency" },
        { value: "customer.totalSpent", label: "customer.totalSpent" },
        { value: "customer.orders_count", label: "customer.orders_count" },
        { value: "customer.last_order.created_at", label: "customer.last_order.created_at" },
        { value: "customer.accepts_marketing", label: "customer.accepts_marketing" },
        { value: "customer.tags", label: "customer.tags" },
        { value: "customer.search", label: "customer.search" },
        { value: "customer.addresses.city", label: "customer.addresses.city" },
        { value: "customer.addresses.country", label: "customer.addresses.country" },
        { value: "customer.addresses.company", label: "customer.addresses.company" },
    ],
},
{
    label: 'Product',
    options: [
        { value: "product.name", label: "product.name" },
        { value: "product.available", label: "product.available" },
        { value: "product.total_inventory_quantity", label: "product.total_inventory_quantity" },
        { value: "product.tags", label: "product.tags" },
    ],
},
{
    label: 'Collection',
    options: [
        { value: "collection.title", label: "collection.title" },
    ],
},
{
    label: 'Cart',
    options: [
        { value: "cart.total", label: "cart.total" },
        { value: "cart.productCount", label: "cart.productCount" },
        { value: "cart.products.name", label: "cart.products.name" },
        { value: "cart.products.sku", label: "cart.products.sku" },
    ],
},
];
const shareVisitorOptions = [
    { value: "allVisitors", label: "All visitors" },
    { value: "newVisitors", label: "New visitors" },
    { value: "returningVisitors", label: "Returning visitors" },
];
const channelsOptions = [
    { value: "allChannel", label: "All channel" },
    { value: "trafficChannel", label: "Traffic channel" },
    { value: "trafficSource", label: "Traffic source" },
    { value: "UTM", label: "UTM" },
];
const returningVisitorsOption = [
    { value: "atlast", label: "At least" },
    { value: "lessthan", label: "Less than" },
    { value: "between", label: "Between" },
]
const returningVisitorsTimeOption = [
    { value: "min", label: "Min." },
    { value: "hours", label: "Hours" },
    { value: "days", label: "Days" },
    { value: "months", label: "Months" },
]
const browserOptions = [
    { value: "allBrowsers", label: "All Browsers" },
    { value: "selectBrowser", label: "Select Browsers" },
];
const CampaignAudience = ({ setMobileDesktop }) => {
    const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
    const [selectCountryList, setSelectCountryList] = useState([{ "value": "all", "label": "All locations" }, { "value": "spesific", "label": "Spesific regions" }]);
    const [selectCountryType, setSelectCountryType] = useState([{ "value": "inc", "label": "Include" }, { "value": "exc", "label": "Exclude" }]);
    const [showDeviceDetail, setShowDeviceDetail] = useState(false) // State
    const [visibleReturningDetail, setVisibleReturningDetail] = useState(false) // State
    const storeCollapseNum = createCampaignStates.collapseNum


    const [shopifyTargeting, setShopifyTargeting] = useState(false) // State
    const [selectedShowPopup, setSelectedShowPopup] = useState({ value: true, label: 'Show' }) // State
    const [selectedProperty, setSelectedProperty] = useState({ value: "customer.email", label: "customer.email" }) // State
    const [changedOptions, setChangedOptions] = useState([]) // State
    const [selectedChangedOption, setSelectedChangedOption] = useState(null) // State
    const [shopifyValue, setShopifyValue] = useState(null) // State
    const [shopifyDate, setShopifyDate] = useState(new Date()) // State
    const [countryList, setCountryList] = useState([]); // State



    const devicesData = createCampaignStates.campaignAudience.devices
    const selectedCountry = createCampaignStates.campaignAudience.country
    const selectedLanguage = createCampaignStates.campaignAudience.language
    const selectedChannels = createCampaignStates.campaignAudience.channels
    const selectedShareVisitor = createCampaignStates.campaignAudience.shareVisitor
    const selectedBrowser = createCampaignStates.campaignAudience.browser
    const activeButtons = createCampaignStates.campaignAudience.activeDevices
    const isAnd = createCampaignStates.campaignAudience.isAnd
    const trafficSourceIsAnd = createCampaignStates.campaignAudience.trafficSourceIsAnd
    const popupSawCount = createCampaignStates.campaignAudience.popupSawCount
    const minValue = createCampaignStates.campaignAudience.minValue
    const maxValue = createCampaignStates.campaignAudience.maxValue
    const inTheLast = createCampaignStates.campaignAudience.inTheLast
    const shopifyTargets = createCampaignStates.campaignAudience.shopifyTargets
    const trafficSourceUrlList = createCampaignStates.campaignAudience.trafficSourceUrlList
    const utmSourceUrlList = createCampaignStates.campaignAudience.utmSourceUrlList
    const selectedReturningVisitors = createCampaignStates.campaignAudience.returningVisitors
    const selectedTimeVisitors = createCampaignStates.campaignAudience.timeVisitors
    const selectedCountryTypeOption = createCampaignStates.campaignAudience.countryTypeOption

    useEffect(() => {
        console.log('createCampaignStates.campaignAudience.shareVisitor');
        console.log(createCampaignStates.campaignAudience.shareVisitor);
    }, [createCampaignStates.campaignAudience.shareVisitor])

    const deviceCheckboxChange = (buttonName, optionName) => {

        const updatedDevicesData = { ...createCampaignStates.campaignAudience.devices };

        if (buttonName === 'All devices') {
            for (const name in updatedDevicesData) {
                for (const key in updatedDevicesData[name].options) {
                    updatedDevicesData[name].options[key] = true;
                }
            }
        } else {
            updatedDevicesData[buttonName].options[optionName] = !updatedDevicesData[buttonName].options[optionName];
        }
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                devices: updatedDevicesData
            }
        })
    };
    useEffect(() => {
        if (selectedProperty?.value === 'customer.last_order.created_at') {
            setChangedOptions([{
                label: 'Date',
                options: [
                    { value: "isBefore", label: "Is Before" },
                    { value: "isAfter", label: "Is After" },
                ],
            }])
            setSelectedChangedOption({ value: "isBefore", label: "Is Before" })
        } else if (selectedProperty?.value === 'customer.tags' || selectedProperty?.value === 'product.tags' || selectedProperty?.value === 'cart.products.name') {
            setChangedOptions([{
                label: 'String',
                options: [
                    { value: "contain", label: "Contain" },
                    { value: "doesNotContain", label: "Does Not Contain" },
                ],
            }])
            setSelectedChangedOption({ value: "contain", label: "Contain" })
        } else if (selectedProperty?.value === 'customer.loggedIn' || selectedProperty?.value === 'customer.type' || selectedProperty?.value === 'customer.accepts_marketing' || selectedProperty?.value === 'product.available') {
            setChangedOptions([
                { value: 'is', label: 'Is' }
            ])
            setSelectedChangedOption({ value: 'is', label: 'Is' })
        } else {
            setChangedOptions([{
                label: 'Common',
                options: [
                    { value: "isEqualTo", label: "Is Equal To" },
                    { value: "isNotEqualTo", label: "Is Not Equal To" },
                    { value: "exists", label: "Exists" },
                    { value: "doesNotExists", label: "Does Not Exists" },
                ],
            }, {
                label: 'Contain',
                options: [
                    { value: "contain", label: 'Contain' },
                    { value: "doesNotContain", label: 'Does Not Contain' }
                ]
            }])
            setSelectedChangedOption({ value: "isEqualTo", label: "Is Equal To" })
        }
    }, [selectedProperty])

    const addShopifyTarget = (e) => {
        const targets = [...shopifyTargets]
        targets.push({ show: selectedShowPopup, property: selectedProperty, option: selectedChangedOption, value: shopifyValue, date: shopifyDate })
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                shopifyTargets: targets
            }
        })
        setSelectedShowPopup({ value: true, label: 'Show' })
        setSelectedProperty({ value: "customer.email", label: "customer.email" })
        setShopifyValue(null)
        setShopifyDate(new Date())
    }
    const deleteShopifyTarget = (index) => {
        const targets = [...shopifyTargets]
        targets.splice(index, 1)
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                shopifyTargets: targets
            }
        })
    }



    const shareVisitorChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                shareVisitor: event
            }
        })
    };

    const channelsChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                channels: event
            }
        })
    };
    const changeReturningVisitors = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                returningVisitors: event
            }
        })
    }
    const changeReturningTimeVisitors = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                timeVisitors: event
            }
        })
    }
    const countryChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                country: event
            }
        })
    };
    const languageChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                language: event
            }
        })
    }
    const browserChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                browser: event
            }
        })
    };
    const changeStatusDeviceDetail = () => {
        setShowDeviceDetail(!showDeviceDetail)
    }

    const devicesButtonClick = (buttonName) => {
        if (buttonName === 'All devices') {
            setCreateCampaignStates({
                ...createCampaignStates,
                campaignAudience: {
                    ...createCampaignStates.campaignAudience,
                    activeDevices: ['All devices']
                }
            })
            setMobileDesktop(['All devices'])
            setShowDeviceDetail(false)
        } else {
            let newActiveDevices
            const updatedButtons = createCampaignStates.campaignAudience.activeDevices.filter((name) => name !== 'All devices');
            if (updatedButtons.includes(buttonName)) {
                setMobileDesktop(() => {
                    return updatedButtons.filter((name) => name !== buttonName)
                })
                newActiveDevices = updatedButtons.filter((name) => name !== buttonName);
            } else {
                setMobileDesktop(() => {
                    return [...updatedButtons, buttonName]
                })
                newActiveDevices = [...updatedButtons, buttonName];
            }
            setCreateCampaignStates({
                ...createCampaignStates,
                campaignAudience: {
                    ...createCampaignStates.campaignAudience,
                    activeDevices: newActiveDevices
                }
            })
        }
    };
    const changeVisibleVisitorDetail = () => {
        setVisibleReturningDetail(!visibleReturningDetail)
    }
    const tooltipChannel = (event) => (
        <Tooltip id="tooltip" style={{ fontSize: '12px' }}>{event}</Tooltip>
    );


    const addTrafficSourceURL = () => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                trafficSourceUrlList: [...trafficSourceUrlList, { URLType: null, url: "" }]
            }
        })
    };

    const addUtmSourceURL = () => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                utmSourceUrlList: [...utmSourceUrlList, { URLType: null, url: "", source: null }]
            }
        })
    };

    const andToOrFunction = () => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                isAnd: !isAnd
            }
        })
    };

    const trafficSourceAndToOr = () => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                trafficSourceIsAnd: !createCampaignStates.campaignAudience.trafficSourceIsAnd
            }
        })
    }
    const removeTrafficSourceURL = (index) => {
        const updatedList = [...trafficSourceUrlList];
        updatedList.splice(index, 1);

        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                trafficSourceUrlList: updatedList
            }
        })
    };

    const removeUtmSourceURL = (index) => {
        const updatedList = [...utmSourceUrlList];
        updatedList.splice(index, 1);
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                utmSourceUrlList: updatedList
            }
        })
    };

    const updateTrafficSourceURL = (index, field, value) => {
        const updatedList = [...trafficSourceUrlList];
        updatedList[index][field] = value;

        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                trafficSourceUrlList: updatedList
            }
        })
    };

    const updateUtmSourceURL = (index, field, value) => {
        const updatedList = [...utmSourceUrlList];
        updatedList[index][field] = value;
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                utmSourceUrlList: updatedList
            }
        })
    };

    useEffect(
        () => {
            if (activeButtons.length === 0) {
                setCreateCampaignStates({
                    ...createCampaignStates,
                    campaignAudience: {
                        ...createCampaignStates.campaignAudience,
                        activeDevices: ['All devices']
                    }
                })
                setMobileDesktop(['All devices']);
            }
        },
        [activeButtons]
    )
    const geosuggestEl = useRef(null);
    const selectCountry = (e) => {
        if (!!e) {
            geosuggestEl.current.clear()
            geosuggestEl.current.focus()
            geosuggestEl.current.update('')
            setCountryList(current => [...countryList, { type: selectedCountryTypeOption.value, name: e?.label, id: countryList.length }])
        }
    }

    const deleteCountry = (e) => {
        setCountryList((data) =>
            data.filter((x) => x.id !== e)
        );
    }


    const clearCountry = () => {
        geosuggestEl.current.clear()
        geosuggestEl.current.focus()
        geosuggestEl.current.update('')
    }



    const countryTypeChange = (e) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                countryTypeOption: e
            }
        })
    };

    const popupSawCountChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                popupSawCount: parseInt(event.target.value) >= 0 ? parseInt(event.target.value) : 0
            }
        })
    }


    const minValChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                minValue: parseInt(event.target.value) >= 0 ? parseInt(event.target.value) : 0
            }
        })
    }

    const maxValChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                maxValue: parseInt(event.target.value) > 0 ? parseInt(event.target.value) : 1
            }
        })
    }

    const checkMaxValue = (event) => {

        if (selectedReturningVisitors?.value === 'between' && parseInt(minValue) >= parseInt(maxValue)) {

            // if (parseInt(event.target.value) <= parseInt(minValue)) {
            toast.warning('The maximum value cannot be equal to or less than the minimum value', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            //   return false
            // }

            setCreateCampaignStates({
                ...createCampaignStates,
                campaignAudience: {
                    ...createCampaignStates.campaignAudience,
                    maxValue: parseInt(minValue) + 1
                }
            })
        }
    }
    const checkMinValue = (event) => {
        if (selectedReturningVisitors?.value === 'between' && parseInt(minValue) >= parseInt(maxValue)) {

            toast.warning('The minimum value cannot be equal to or greater than the maximum value', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setCreateCampaignStates({
                ...createCampaignStates,
                campaignAudience: {
                    ...createCampaignStates.campaignAudience,
                    minValue: parseInt(maxValue) - 1
                }
            })
        }
    }

    useEffect(() => {
        checkMaxValue()
    }, [selectedReturningVisitors])

    const inTheLastValChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignAudience: {
                ...createCampaignStates.campaignAudience,
                inTheLast: parseInt(event.target.value) >= 0 ? parseInt(event.target.value) : 0
            }
        })
    }

    return (<>
        <ToastContainer />
        <div className="accordion-item mb-8 shadow border-top">
            <h2 className="accordion-header" id="headingFive">
                <button
                    className="accordion-button collapsed fs-4 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                    onClick={() => setCreateCampaignStates({
                        ...createCampaignStates,
                        collapseNum: 5
                    })}
                >
                    Campaign Audience
                </button>
            </h2>
            <div
                id="collapseFive"
                className={`accordion-collapse collapse ${storeCollapseNum == "5" ? 'show' : ''}`}
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Devices
                            </label>
                            <div className="row">
                                <div className="col-12 d-flex flex-wrap gap-8">
                                    <div>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${activeButtons.includes('All devices') ? 'btn-primary' : 'btn-secondary'}`}
                                            onClick={() => devicesButtonClick('All devices')}
                                        >
                                            All devices
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${activeButtons.includes('Display on desktops') ? 'btn-primary' : 'btn-secondary'}`}
                                            onClick={() => devicesButtonClick('Display on desktops')}
                                        >
                                            Display on desktops
                                        </button>
                                        {activeButtons.includes('Display on desktops') && showDeviceDetail === true && (
                                            <div className="mt-5">
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on desktops'].options.Windows}
                                                            onChange={() => deviceCheckboxChange('Display on desktops', 'Windows')}
                                                        />
                                                        Windows
                                                    </label>
                                                </div>
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on desktops'].options.Mac}
                                                            onChange={() => deviceCheckboxChange('Display on desktops', 'Mac')}
                                                        />
                                                        Mac
                                                    </label>
                                                </div>
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on desktops'].options.Linux}
                                                            onChange={() => deviceCheckboxChange('Display on desktops', 'Linux')}
                                                        />
                                                        Linux
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${activeButtons.includes('Display on tablets') ? 'btn-primary' : 'btn-secondary'}`}
                                            onClick={() => devicesButtonClick('Display on tablets')}
                                        >
                                            Display on tablets
                                        </button>
                                        {activeButtons.includes('Display on tablets') && showDeviceDetail === true && (
                                            <div className="mt-5">
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on tablets'].options.iPad}
                                                            onChange={() => deviceCheckboxChange('Display on tablets', 'iPad')}
                                                        />
                                                        iPad
                                                    </label>
                                                </div>
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on tablets'].options.Android}
                                                            onChange={() => deviceCheckboxChange('Display on tablets', 'Android')}
                                                        />
                                                        Android
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${activeButtons.includes('Display on mobiles') ? 'btn-primary' : 'btn-secondary'}`}
                                            onClick={() => devicesButtonClick('Display on mobiles')}
                                        >
                                            Display on mobiles
                                        </button>
                                        {activeButtons.includes('Display on mobiles') && showDeviceDetail === true && (
                                            <div className="mt-5">
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on mobiles'].options.iPhone}
                                                            onChange={() => deviceCheckboxChange('Display on mobiles', 'iPhone')}
                                                        />
                                                        iPhone
                                                    </label>
                                                </div>
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on mobiles'].options.Android}
                                                            onChange={() => deviceCheckboxChange('Display on mobiles', 'Android')}
                                                        />
                                                        Android
                                                    </label>
                                                </div>
                                                <div className="col-12 my-2">
                                                    <label className="form-check form-check-inline ">
                                                        <input
                                                            className='form-check-input me-2'
                                                            type='checkbox'
                                                            value='1'
                                                            checked={devicesData['Display on mobiles'].options['Windows Phone']}
                                                            onChange={() => deviceCheckboxChange('Display on mobiles', 'Windows Phone')}
                                                        />
                                                        Windows Phone
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {!activeButtons.includes('All devices') && (
                                            <button type="button" className="btn btn-link btn-sm" onClick={changeStatusDeviceDetail}>
                                                {
                                                    !showDeviceDetail ? (<>Refine by OS</>) : (<>Close</>)
                                                }
                                            </button>
                                        )}
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="col-12 col-lg-7 col-md-9 mb-4">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Share of Visitors
                            </label>
                            <Select
                                options={shareVisitorOptions}
                                placeholder="Share of Visitors"
                                className="form-control form-control-solid p-0"
                                onChange={shareVisitorChange}
                                value={selectedShareVisitor}
                            />
                        </div>

                        {selectedShareVisitor?.value === 'returningVisitors' && (
                            <div className="col-12  mb-4">
                                <div className="mt-5 bg-light border rounded p-5">
                                    <label
                                        htmlFor="campaignname"
                                        className="form-label fs-7 fw-bolder mb-1"
                                    >
                                        Select which returning visitors should see your campaign.
                                    </label>
                                    <div className="row mt-5">
                                        <div className="d-flex flex-wrap gap-5 align-items-center">
                                            <div>Users who have visited</div>
                                            <Select
                                                options={returningVisitorsOption}
                                                onChange={changeReturningVisitors}
                                                value={selectedReturningVisitors}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        width: '150px',
                                                    }),
                                                }}
                                            />
                                            <input
                                                className="form-control  form-control-solid border bg-white"
                                                type="number"
                                                style={{ width: '100px' }}
                                                value={minValue}
                                                onChange={minValChange}
                                                onBlur={checkMinValue}
                                                min="0"
                                            />
                                            {
                                                selectedReturningVisitors?.value === 'between' && (
                                                    <>And
                                                        <input
                                                            className="form-control  form-control-solid border bg-white"
                                                            type="number"
                                                            style={{ width: '100px' }}
                                                            value={maxValue}
                                                            onChange={maxValChange}
                                                            onBlur={checkMaxValue}
                                                            min={minValue + 1}
                                                        /></>
                                                )
                                            }
                                            <div>times</div>
                                            {!visibleReturningDetail && (
                                                <button type="button" className="btn btn-sm btn-link" onClick={changeVisibleVisitorDetail}>Refine</button>
                                            )
                                            }
                                        </div>
                                    </div>

                                    {
                                        visibleReturningDetail && (
                                            <div className="row mt-2">
                                                <div className="d-flex flex-wrap gap-5 align-items-center">
                                                    <div>In the last</div>
                                                    <input
                                                        className="form-control  form-control-solid border bg-white"
                                                        type="number"
                                                        style={{ width: '100px' }}
                                                        min="0"
                                                        value={inTheLast}
                                                        onChange={inTheLastValChange}
                                                    />
                                                    <Select
                                                        options={returningVisitorsTimeOption}
                                                        onChange={changeReturningTimeVisitors}
                                                        value={selectedTimeVisitors}
                                                        styles={{
                                                            control: (provided) => ({
                                                                ...provided,
                                                                width: '150px',
                                                            }),
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-light btn-sm"
                                                        onClick={changeVisibleVisitorDetail}
                                                    >
                                                        <KTIcon iconName="trash" className="fs-3 text-danger" />
                                                    </button>

                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )}

                        <div className="col-12 col-lg-7 col-md-9">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Channels
                            </label>
                            <Select
                                options={channelsOptions}
                                placeholder="All Channels"
                                className="form-control form-control-solid p-0"
                                onChange={channelsChange}
                                value={selectedChannels}
                            />
                        </div>
                        <div className="col-12 mb-4">
                            {selectedChannels?.value === 'trafficChannel' && (
                                <div className="mt-5 bg-light border rounded p-5">
                                    <div className="col-12 mb-4">

                                        <label
                                            htmlFor="campaignname"
                                            className="form-label fs-7 fw-bolder mb-1"
                                        >
                                            Target your visitors by traffic channel.
                                        </label>

                                    </div>
                                    <span className="d-flex gap-8 flex-wrap">
                                        <div>

                                            <label className="form-check form-check-inline ">
                                                <input
                                                    className='form-check-input me-2'
                                                    type='checkbox'
                                                    value='1'
                                                />
                                                <span className="me-3">Organic search</span>

                                            </label>
                                            <OverlayTrigger placement="top" overlay={tooltipChannel('Visitors coming from search engine organic results (Google, Bing, etc.)')}>
                                                <span className="d-inline-block cursor-pointer" tabindex="0" data-toggle="tooltip">
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                        <div >
                                            <label className="form-check form-check-inline ">
                                                <input
                                                    className='form-check-input me-2'
                                                    type='checkbox'
                                                    value='1'
                                                />

                                                <span className="me-3">Social</span>
                                            </label>
                                            <OverlayTrigger placement="top" overlay={tooltipChannel('Visitors coming from social media (Facebook, Twitter, etc.)')}>
                                                <span className="d-inline-block cursor-pointer" tabindex="0" data-toggle="tooltip" >
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                        <div >
                                            <label className="form-check form-check-inline ">
                                                <input
                                                    className='form-check-input me-2'
                                                    type='checkbox'
                                                    value='1'
                                                />

                                                <span className="me-3">Paid search</span>
                                            </label>
                                            <OverlayTrigger placement="top" overlay={tooltipChannel('Visitors resulting from Adwords or Bing ads.')}>
                                                <span className="d-inline-block cursor-pointer" tabindex="0" data-toggle="tooltip">
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </span>
                                            </OverlayTrigger>
                                        </div>
                                        <div >
                                            <label className="form-check form-check-inline ">
                                                <input
                                                    className='form-check-input me-2'
                                                    type='checkbox'
                                                    value='1'
                                                />

                                                <span className="me-3">Direct</span>
                                            </label>
                                            <OverlayTrigger placement="top" overlay={tooltipChannel('Visitors coming after typing the URL in their browser')}>
                                                <span className="d-inline-block cursor-pointer" tabindex="0" data-toggle="tooltip" >
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </span>
                                            </OverlayTrigger>

                                        </div>
                                        <div >
                                            <label className="form-check form-check-inline ">
                                                <input
                                                    className='form-check-input me-2'
                                                    type='checkbox'
                                                    value='1'
                                                />

                                                <span className="me-3">Others</span>
                                            </label>
                                            <OverlayTrigger placement="top" overlay={tooltipChannel('Visitors coming from all other sources')}>
                                                <span className="d-inline-block cursor-pointer" tabindex="0" data-toggle="tooltip">
                                                    <i className="bi bi-info-circle-fill"></i>
                                                </span>
                                            </OverlayTrigger>


                                        </div>
                                    </span>

                                </div>
                            )}
                            {selectedChannels?.value === 'trafficSource' && (
                                <div className="mt-5 bg-light border rounded p-5">
                                    <div className="col-12 mb-4 mt-4">
                                        <label
                                            htmlFor="campaignname"
                                            className="form-label fs-7 fw-bolder mb-1"
                                        >
                                            Target the visitors coming from specific websites.
                                        </label>
                                    </div>

                                    <div>
                                        {trafficSourceUrlList.map((item, index) => (
                                            <div key={index} className="mb-2">

                                                <div className="row d-flex align-items-center mb-2">
                                                    {index === 0 ? (
                                                        <div className="col-2">
                                                            <span className="me-3">Source URL</span>
                                                            <OverlayTrigger placement="bottom" overlay={tooltipChannel('The initial referrer of the visit. Sub-domains of your domain are not considered as external sources. On Chrome, the source URL does not include the path.')}>
                                                                <span className="d-inline-block cursor-pointer" tabindex="0" data-toggle="tooltip">
                                                                    <i className="bi bi-info-circle-fill"></i>
                                                                </span>
                                                            </OverlayTrigger>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-white d-flex gap-5 border rounded p-3 justify-content-center" onClick={trafficSourceAndToOr} style={{ width: '80px' }}>
                                                            <div className="text">{trafficSourceIsAnd ? 'AND' : 'OR'}</div>
                                                            <div className="icon">
                                                                {trafficSourceIsAnd ? (
                                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="#292D32" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#292D32" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="col-4">
                                                        <Select
                                                            options={trafficSourceOptions}
                                                            placeholder="URL"
                                                            className="form-control form-control-solid p-0"
                                                            onChange={(selectedOption) =>
                                                                updateTrafficSourceURL(index, "URLType", selectedOption)
                                                            }
                                                            value={item.URLType}
                                                        />
                                                    </div>
                                                    <div className="col-4">
                                                        <input
                                                            id="url"
                                                            type="text"
                                                            className="bg-white form-control form-control-md form-control-solid border"
                                                            value={item.url}
                                                            onChange={(e) =>
                                                                updateTrafficSourceURL(index, "url", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-1">
                                                        {trafficSourceUrlList.length > 1 && index !== 0 && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-light btn-sm"
                                                                onClick={() => removeTrafficSourceURL(index)}
                                                            >
                                                                <KTIcon iconName="trash" className="fs-3 text-danger" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-5 btn-sm"
                                            onClick={addTrafficSourceURL}
                                        ><KTIcon iconName="plus" className="fs-3" />Add rule
                                        </button>
                                    </div>

                                </div>
                            )}
                            {selectedChannels?.value === 'UTM' && (
                                <div className="mt-5 bg-light border rounded p-5">
                                    <div className="col-12 mb-4 mt-4">
                                        <label
                                            htmlFor="campaignname"
                                            className="form-label fs-7 fw-bolder mb-1"
                                        >
                                            Target your visitors by traffic UTM.
                                        </label>
                                    </div>

                                    <div>
                                        {utmSourceUrlList.map((item, index) => (
                                            <div key={index} className="mb-2">
                                                <div className="row d-flex align-items-center mb-2">
                                                    {index !== 0 && (

                                                        <div className="bg-white d-flex gap-5 border rounded p-3 justify-content-center" onClick={andToOrFunction} style={{ width: '80px' }}>

                                                            <div className="text">{isAnd ? 'AND' : 'OR'}</div>
                                                            <div className="icon">
                                                                {isAnd ? (
                                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="#292D32" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#292D32" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="col-3">
                                                        <Select
                                                            options={utmSourceOptions}
                                                            placeholder="Source"
                                                            className="form-control form-control-solid p-0"
                                                            onChange={(selectedOption) =>
                                                                updateUtmSourceURL(index, "source", selectedOption)
                                                            }
                                                            value={item.source}
                                                        />
                                                    </div>
                                                    <div className="col-3">
                                                        <Select
                                                            options={trafficSourceOptions}
                                                            placeholder="URL"
                                                            className="form-control form-control-solid p-0"
                                                            onChange={(selectedOption) =>
                                                                updateUtmSourceURL(index, "URLType", selectedOption)
                                                            }
                                                            value={item.URLType}
                                                        />
                                                    </div>
                                                    <div className="col-3">
                                                        <input
                                                            id="url"
                                                            type="text"
                                                            className="bg-white form-control form-control-md form-control-solid border"
                                                            value={item.url}
                                                            onChange={(e) =>
                                                                updateUtmSourceURL(index, "url", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-1">
                                                        {utmSourceUrlList.length > 1 && index !== 0 && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-light btn-sm"
                                                                onClick={() => removeUtmSourceURL(index)}
                                                            >
                                                                <KTIcon iconName="trash" className="fs-3 text-danger" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-5 btn-sm"
                                            onClick={addUtmSourceURL}
                                        ><KTIcon iconName="plus" className="fs-3" />Add rule
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>

                        <div className="col-12 col-lg-7 col-md-9 mb-4">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Countries
                            </label>
                            <Select
                                options={selectCountryList}
                                placeholder="Countries"
                                className="form-control form-control-solid p-0"
                                onChange={countryChange}
                                value={selectedCountry}
                            />
                        </div>
                        {selectedCountry?.value === "spesific" && (<>
                            <div className="col-12 mb-4">
                                <div className="bg-light border rounded p-5">
                                    <div className="d-flex align-items-start mt-4">
                                        <Select
                                            options={selectCountryType}
                                            className="form-control form-control-solid me-2 w-25 p-0"
                                            onChange={countryTypeChange}
                                            value={selectedCountryTypeOption}
                                        />
                                        <Geosuggest onSuggestSelect={selectCountry} ref={geosuggestEl} placeholder="Search state" className="flex-grow-1 w-75" />
                                        <button type="button" onClick={clearCountry} className="btn">X</button>
                                    </div>
                                    <div className="d-flex flex-wrap">
                                        {countryList?.map((e, index) => (<>
                                            <div className="d-flex  align-items-center bg-light-warning border border-warning py-2 d-flex justify-content-between align-items-center px-3 m-1 rounded mw-25 text-truncate" key={index}>
                                                <span className=" mw-75 text-truncate fw-semibold">
                                                    {e.type === 'exc' && (
                                                        <>
                                                            ({e.type})
                                                        </>
                                                    )}
                                                    {e.name}</span>
                                                <div onClick={() => deleteCountry(e.id)} className="cursor-pointer ms-3 bg-danger text-white shadow w-15px h-15px fs-8 d-flex align-items-center justify-content-center rounded-circle">
                                                    <IoClose className="w-15px h-15px" />
                                                </div>
                                            </div>
                                        </>))}
                                    </div>
                                </div>
                            </div>
                        </>)}

                        <div className="col-12 col-lg-7 col-md-9 mb-4">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Language
                            </label>
                            <Select
                                options={allLanguage}
                                placeholder="Language"
                                className="form-control form-control-solid p-0"
                                onChange={languageChange}
                                value={selectedLanguage}
                                isMulti={true}
                            />
                        </div>
                        <div className="col-12 col-lg-7 col-md-9 ">
                            <label
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Browser
                            </label>
                            <Select
                                options={browserOptions}
                                placeholder="Browsers"
                                className="form-control form-control-solid p-0"
                                onChange={browserChange}
                                value={selectedBrowser}
                            />
                        </div>
                        <div className="col-12 mb-4">
                            {selectedBrowser?.value === 'selectBrowser' && (
                                <div className="mt-5 d-flex gap-10 flex-wrap bg-light border rounded p-5">
                                    <div><label className="form-check form-check-inline "><input className='form-check-input me-2' type='checkbox' value='1' /> Chrome</label></div>
                                    <div><label className="form-check form-check-inline "><input className='form-check-input me-2' type='checkbox' value='1' /> Safari</label></div>
                                    <div><label className="form-check form-check-inline "><input className='form-check-input me-2' type='checkbox' value='1' /> Internet Explorer</label></div>
                                    <div><label className="form-check form-check-inline "><input className='form-check-input me-2' type='checkbox' value='1' /> Firefox</label></div>
                                    <div><label className="form-check form-check-inline "><input className='form-check-input me-2' type='checkbox' value='1' /> Opera</label></div>
                                    <div><label className="form-check form-check-inline "><input className='form-check-input me-2' type='checkbox' value='1' /> Edge</label></div>
                                </div>
                            )}
                        </div>
                        <div className="col-12 mb-4">
                            <label
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Behavior
                            </label>
                            <div className="col-12 my-2 d-flex align-items-center gap-5">
                                <label className="form-check form-check-inline ">
                                    <input
                                        className='form-check-input me-2'
                                        type='checkbox'
                                        value='1'
                                        checked={devicesData['Display on desktops'].options.Windows}
                                        onChange={() => deviceCheckboxChange('Display on desktops', 'Windows')}
                                    />
                                    <span>Exclude visitors who already saw</span>
                                </label>
                                <input
                                    className="form-control border form-control-solid"
                                    type="number"
                                    style={{ width: '100px' }}
                                    min="0"
                                    value={popupSawCount}
                                    onChange={popupSawCountChange}
                                /> popups during the session
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <label
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Shopify Audience Targeting
                                <CustomTooltip
                                    description=""
                                    descriptionBodyClassName="w-300px"
                                    CustomDescription={() => (
                                        <div>
                                            To use Shopify Audience Targeting, your website should be built with Shopify. Shopify Audience Targeting allows you to target your Shopify online shop visitors based on dynamic properties like:
                                            <br />
                                            Customer name,
                                            <br />
                                            Customer email,
                                            <br />
                                            Customer name,
                                            <br />
                                            Customer country,
                                            <br />
                                            Customer total spent
                                            <br />
                                            etc.
                                            <br />
                                            or you can target on cart properties like:
                                            <br />
                                            Cart Total
                                            <br />
                                            Cart Product Count
                                            <br />
                                            Cart Product Price
                                            <br />
                                            etc.
                                        </div>
                                    )}
                                />
                            </label>
                            <div className="col-12 my-2 d-flex flex-column gap-5">
                                <div className="form-check form-check-solid d-flex align-items-center gap-2">
                                    <input
                                        className="form-check-input w-18px h-18px"
                                        type="checkbox"
                                        id="allowmarketing"
                                        defaultChecked={shopifyTargeting}
                                        onChange={(e) => setShopifyTargeting(e.target.checked)}
                                    />
                                    <label className="form-check-label text-gray-600" style={{ fontSize: '1.1rem' }}>Enable Shopify Audience Targeting</label>
                                </div>
                                {shopifyTargeting && (
                                    <div className="column">
                                        {shopifyTargets.length > 0 && (
                                            <>
                                                {shopifyTargets.map((target, index) => (
                                                    <div className="mb-3 pb-3">
                                                        {target?.show?.value ? (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <FaEye />
                                                                <span className="fw-bold">Show Campaign</span>
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex align-items-center gap-2">
                                                                <FaEyeSlash />
                                                                <span className="fw-bold">Hide Campaign</span>
                                                            </div>
                                                        )}
                                                        <div className="row align-items-center">
                                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                                <Select
                                                                    options={properyOptions}
                                                                    className="form-control form-control-solid p-0"
                                                                    value={target?.property}
                                                                    isDisabled={true}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                                <Select
                                                                    options={changedOptions}
                                                                    placeholder="Show Popup"
                                                                    className="form-control form-control-solid p-0"
                                                                    isDisabled={true}
                                                                    value={target.option}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                                {target?.property?.value === 'customer.last_order.created_at' ? (
                                                                    <DatePicker
                                                                        className="form-control form-control form-control-solid w-100"
                                                                        selected={target.date}
                                                                        disabled
                                                                        minDate={new Date()}
                                                                        showYearDropdown
                                                                        dateFormat="dd/MM/yyyy"
                                                                        yearDropdownItemNumber={15}
                                                                        scrollableYearDropdown
                                                                        timeIntervals={15}
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        id="shopifyValue"
                                                                        type="text"
                                                                        className="form-control form-control-lg form-control-solid"
                                                                        style={{
                                                                            background: '#F2F2F2'
                                                                        }}
                                                                        placeholder="Value"
                                                                        disabled
                                                                        value={target?.value}
                                                                        onChange={(e) => setShopifyValue(e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                                <div onClick={() => deleteShopifyTarget(index)} className="corsor-pointer w-15px h-15px border border-black d-md-flex align-items-center justify-content-center rounded-circle d-none">
                                                                    <IoClose className="w-10px h-10px" />
                                                                </div>
                                                                <div onClick={() => deleteShopifyTarget(index)} className="corsor-pointer w-100 d-md-none d-flex align-items-center justify-content-center bg-danger rounded py-2 text-white fw-semibold fs-6">
                                                                    <span>Delete</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        <div className="row mt-2 border-top">
                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                <label className="form-label fs-7 fw-bolder mb-1">Show Popup</label>
                                                <Select
                                                    options={showPopupOptions}
                                                    placeholder="Show Popup"
                                                    className="form-control form-control-solid p-0"
                                                    onChange={(e) => setSelectedShowPopup(e)}
                                                    value={selectedShowPopup}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                <label className="form-label fs-7 fw-bolder mb-1">Select Property</label>
                                                <Select
                                                    options={properyOptions}
                                                    placeholder="Select Property"
                                                    className="form-control form-control-solid p-0"
                                                    onChange={(e) => setSelectedProperty(e)}
                                                    value={selectedProperty}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-3 mt-2">
                                                <label className="form-label fs-7 fw-bolder mb-1">Options</label>
                                                <Select
                                                    options={changedOptions}
                                                    placeholder="Show Popup"
                                                    className="form-control form-control-solid p-0"
                                                    onChange={(e) => setSelectedChangedOption(e)}
                                                    isDisabled={selectedChangedOption.value === 'is'}
                                                    value={selectedChangedOption}
                                                />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-3 d-flex flex-column mt-2">
                                                <label className="form-label fs-7 fw-bolder mb-1">Value</label>
                                                {selectedChangedOption?.value === 'is' ? (selectedProperty?.value === 'customer.type') ? (
                                                    <Select
                                                        options={[
                                                            { value: "new", label: 'New' },
                                                            { value: "returning", label: 'Returning' }
                                                        ]}
                                                        placeholder="Select Value"
                                                        className="form-control form-control-solid p-0"
                                                        onChange={(e) => setShopifyValue(e.value)}
                                                        value={shopifyValue ? shopifyValue === 'new' ?
                                                            { value: "new", label: 'New' } : { value: 'returning', label: 'Returning' } : null}
                                                    />
                                                ) : (
                                                    <Select
                                                        options={[
                                                            { value: true, label: 'True' },
                                                            { value: false, label: 'False' }
                                                        ]}
                                                        placeholder="Select Value"
                                                        className="form-control form-control-solid p-0"
                                                        onChange={(e) => setShopifyValue(e.value)}
                                                        value={(typeof shopifyValue !== 'string') ? shopifyValue ? { value: true, label: 'True' } : { value: false, label: 'False' } : null}
                                                    />
                                                ) : selectedProperty?.value === 'customer.last_order.created_at' ? (
                                                    <DatePicker
                                                        className="form-control form-control-lg form-control-solid w-100"
                                                        selected={shopifyDate}
                                                        onChange={(date) => { setShopifyDate(date) }}
                                                        minDate={new Date()}
                                                        showYearDropdown
                                                        dateFormat="dd/MM/yyyy"
                                                        yearDropdownItemNumber={15}
                                                        scrollableYearDropdown
                                                        timeIntervals={15}
                                                    />
                                                ) : (
                                                    <input
                                                        id="shopifyValue"
                                                        type="text"
                                                        className="form-control form-control-lg form-control-solid"
                                                        placeholder="Value"
                                                        value={((typeof shopifyValue !== "boolean" && shopifyValue !== 'new' && shopifyValue !== 'returning') ? shopifyValue : "") || ""}
                                                        onChange={(e) => setShopifyValue(e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-100 d-flex flex-row-reverse mt-4">
                                            <button onClick={(e) => {
                                                e.preventDefault()
                                                if ((selectedProperty === '' && shopifyDate) || (typeof shopifyValue === 'boolean' || (typeof shopifyValue === 'string' && shopifyValue))) {
                                                    addShopifyTarget()
                                                } else {
                                                    // EDİTLENECEK toast
                                                }
                                            }} className="btn btn-sm btn-primary px-8">Add</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-primary m-5" onClick={() => setCreateCampaignStates({
                        ...createCampaignStates,
                        collapseNum: 6
                    })} id="headingTwo">Continue <KTIcon
                            iconName="arrow-right"
                            className="fs-3 ms-2 me-0"
                        /></button>
                </div>
            </div>
        </div>
    </>
    );
};

export { CampaignAudience };
