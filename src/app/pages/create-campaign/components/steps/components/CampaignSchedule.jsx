import React, { useState, useEffect } from "react";
import { KTIcon } from "../../../../../../_metronic/helpers";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ct from 'countries-and-timezones'

import "react-datepicker/dist/react-datepicker.css";
import './custom.css'
import { Timezones } from "../../../../../Variable";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../../../store/jotai/CreateCampaignAtom";

const CampaignSchedule = () => {
    const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
    const storeCollapseNum = createCampaignStates.collapseNum
    const storeCampaignSchedule = createCampaignStates.campaignSchedule
    const storeSelectedTimeZone = createCampaignStates.selectedTimeZone

    const [timeZoneOptions, setTimeZoneOptions] = useState([]);
    const [timeZoneMargin, setTimeZoneMargin] = useState(0);

    const timeZoneChange = (event) => {
        setCreateCampaignStates({
            ...createCampaignStates,
            selectedTimeZone: event
        })
    };

    const daysOptions = [
        { value: "Everyday", label: "Everyday" },
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];



    useEffect(() => {
        setCreateCampaignStates({
            ...createCampaignStates,
            selectedTimeZone: Timezones[0]
        })
    }, [])



    const hourOptions = [];
    const minutesOptions = [];

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            const timeValue = `${formattedHour}:${formattedMinute}`;
            hourOptions.push({ value: timeValue, label: timeValue });
        }
    }
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 30; minute < 60; minute += 30) {
            const formattedHour = hour.toString().padStart(2, "0");
            const formattedMinute = minute.toString().padStart(2, "0");
            const timeValue = `${formattedHour}:${formattedMinute}`;
            minutesOptions.push({ value: timeValue, label: timeValue });
        }
    }

    minutesOptions.push({ value: "23:59", label: "23:59" });


    const addTime = () => {
        setCreateCampaignStates({
            ...createCampaignStates,
            campaignSchedule: {
                ...storeCampaignSchedule,
                timeList: [
                    ...storeCampaignSchedule.timeList,
                    {
                        day: { value: "Everyday", label: "Everyday" },
                        startHour: { value: "00:00", label: "00:00" },
                        endHour: { value: "23:59", label: "23:59" },
                    },
                ]
            }
        })
    };

    const updateTimeList = (index, field, value) => {
        const updatedList = storeCampaignSchedule.timeList.map(item => {
            if (item === storeCampaignSchedule.timeList[index]) {
                return { ...item, [field]: value };
            }
            return item;
        });

        setCreateCampaignStates({
            ...createCampaignStates,
            campaignSchedule: { ...storeCampaignSchedule, timeList: updatedList }
        })
    };
    const removeTime = (indexToRemove) => {
        var prevTimeList = storeCampaignSchedule.timeList
        var filteredList = prevTimeList.filter((_, index) => index !== indexToRemove)


        setCreateCampaignStates({
            ...createCampaignStates,
            campaignSchedule: { ...storeCampaignSchedule, timeList: filteredList }
        })
    };

    useEffect(() => {
        if (storeCampaignSchedule.endDate < storeCampaignSchedule.startDate) {
            setCreateCampaignStates({
                ...createCampaignStates,
                campaignSchedule: { ...storeCampaignSchedule, endDate: storeCampaignSchedule.startDate }
            })
        }
    }, [storeCampaignSchedule.startDate, storeCampaignSchedule.endDate]);

    const changeRadioButton = (e) => {
        const value = e.target.value;
        if (value === "startImmediately") {
            setCreateCampaignStates({
                ...createCampaignStates,
                campaignSchedule: { ...storeCampaignSchedule, isStartDateDisabled: true, startDate: new Date() }
            })
        } else {
            setCreateCampaignStates({
                ...createCampaignStates,
                campaignSchedule: { ...storeCampaignSchedule, isStartDateDisabled: false }
            })
        }
    };


    const getMinTime = () => {
        const minTime = new Date();
        minTime.setHours(0);
        minTime.setMinutes(0);
        return minTime;
    };

    const getMaxTime = () => {
        const maxTime = new Date();
        maxTime.setHours(23);
        maxTime.setMinutes(45);
        return maxTime;
    };

    const filterTime = (time) => {
        const now = new Date();
        if (storeCampaignSchedule.endDate.getDate() > now.getDate()) {
            return true;
        }
        return time.getHours() >= now.getHours();
    };

    return (
        <div className="accordion-item mb-8 shadow border-top">
            <h2 className="accordion-header" id="headingTwo">
                <button
                    className="accordion-button collapsed fs-4 fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                    onClick={() => setCreateCampaignStates({ ...createCampaignStates, collapseNum: 2 })}
                >
                    Campaign Schedule

                </button>
            </h2>
            <div
                id="collapseTwo"
                className={`accordion-collapse collapse ${storeCollapseNum == "2" ? 'show' : ''}`}
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    <div className="row">
                        <div className="d-inline-block col-12 col-md-4">
                            <label
                                htmlFor="campaignname"
                                className="form-label fs-7 fw-bolder mb-1"
                            >
                                Time Zone
                            </label>
                            <Select
                                options={Timezones}
                                placeholder="Time Zone"
                                className="p-0"
                                value={storeSelectedTimeZone}
                                onChange={timeZoneChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-4">
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <label className="form-label fs-7 fw-bolder me-5">
                                        Start immediately
                                    </label>
                                    <input
                                        className="form-check-input"
                                        name="communication[]"
                                        type="radio"
                                        value="startImmediately"
                                        onChange={changeRadioButton}
                                        defaultChecked={storeCampaignSchedule.isStartDateDisabled}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label fs-7 fw-bolder me-5">
                                        Choose start date
                                    </label>
                                    <input
                                        className="form-check-input"
                                        name="communication[]"
                                        type="radio"
                                        value="chooseStartDate"
                                        onChange={changeRadioButton}
                                        defaultChecked={!storeCampaignSchedule.isStartDateDisabled}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8">

                            <div className="row">
                                <div className="col-12 col-md-6 mb-4 d-flex flex-column">
                                    {storeCampaignSchedule.isStartDateDisabled ? null : (
                                        <>
                                            <label
                                                htmlFor="campaignname"
                                                className="form-label fs-7 fw-bolder mb-1"
                                            >
                                                Select start date
                                            </label>
                                            <DatePicker
                                                className="form-control form-control-lg form-control-solid w-100"
                                                selected={storeCampaignSchedule.startDate}
                                                onChange={(date) => setCreateCampaignStates({ ...createCampaignStates, campaignSchedule: { ...storeCampaignSchedule, startDate: date } })}
                                                minDate={new Date()}
                                                showTimeSelect
                                                showYearDropdown
                                                minTime={getMinTime()}
                                                maxTime={getMaxTime()}
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                yearDropdownItemNumber={15}
                                                scrollableYearDropdown
                                                timeIntervals={15}
                                            />
                                        </>
                                    )}
                                </div>
                                <div className="col-12 col-md-6 mb-4 d-flex flex-column">
                                    <label
                                        htmlFor="campaignname"
                                        className="form-label fs-7 fw-bolder mb-1"
                                    >
                                        Select end date
                                    </label>
                                    <DatePicker
                                        className="form-control form-control-lg form-control-solid "
                                        selected={storeCampaignSchedule.endDate}
                                        onChange={(date) => setCreateCampaignStates({ ...createCampaignStates, campaignSchedule: { ...storeCampaignSchedule, endDate: date } })}
                                        minDate={storeCampaignSchedule.startDate}
                                        showTimeSelect
                                        showYearDropdown
                                        minTime={getMinTime()}
                                        maxTime={getMaxTime()}
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        yearDropdownItemNumber={15}
                                        scrollableYearDropdown
                                        timeIntervals={15}
                                        filterTime={filterTime}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 border-top"></div>
                    <div className="row mt-5">
                        <label htmlFor="min" className="form-label fs-7 fw-bolder">
                            Detailed schedule
                        </label>
                        {storeCampaignSchedule.timeList.map((item, index) => (
                            <div className="col-12 d-flex gap-5 mt-4" key={index}>
                                {storeCampaignSchedule.timeList.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-light btn-sm"
                                        onClick={() => removeTime(index)}
                                    >
                                        <KTIcon iconName="trash" className="fs-3 text-danger" />
                                    </button>
                                )}
                                <Select
                                    options={daysOptions}
                                    placeholder="Everyday"
                                    className="form-control form-control-solid p-0"
                                    value={item.day}
                                    onChange={(selectedOption) =>
                                        updateTimeList(index, "day", selectedOption)
                                    }
                                />
                                <Select
                                    options={hourOptions}
                                    placeholder="Time"
                                    className="form-control form-control-solid p-0"
                                    value={item.startHour}
                                    onChange={(selectedOption) =>
                                        updateTimeList(index, "startHour", selectedOption)
                                    }
                                />
                                <Select
                                    options={minutesOptions}
                                    placeholder="Time 2"
                                    className="form-control form-control-solid p-0"
                                    value={item.endHour}
                                    onChange={(selectedOption) =>
                                        updateTimeList(index, "endHour", selectedOption)
                                    }
                                />
                            </div>
                        ))}

                        <div className="col-2">
                            <button
                                className="btn btn-sm btn-primary mt-5"
                                type="button"
                                onClick={addTime}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-primary m-5" onClick={() => setCreateCampaignStates({ ...createCampaignStates, collapseNum: 3 })} id="headingTwo">Continue <KTIcon
                        iconName="arrow-right"
                        className="fs-3 ms-2 me-0"
                    /></button>
                </div>
            </div>
        </div>
    );
};

export { CampaignSchedule };
