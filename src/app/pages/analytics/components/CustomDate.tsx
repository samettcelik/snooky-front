import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDate({ activeTimeline, setActiveTimeline }) {
    const [showCustomDate, setShowCustomDate] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowCustomDate(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        if (startDate && endDate) {
            setActiveTimeline('custom')
            setShowCustomDate(false)
        }
    }, [startDate, endDate])

    return (
        <div
            ref={wrapperRef}
            onClick={(e) => {
                e.preventDefault()
                setShowCustomDate(!showCustomDate)
            }}
            className={`position-relative bg-white border px-4 py-2 d-flex align-items-center cursor-pointer fw-semibold ${activeTimeline === 'custom' && 'border-primary'}`}
            style={{
                width: 62,
                height: 32,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6
            }}
        >
            <MdDateRange style={{ width: 17, height: 17 }} />
            <IoIosArrowDown style={{
                position: 'absolute',
                right: 6,
                top: 6,
                width: 18,
                height: 18
            }} />
            {showCustomDate && (
                <div
                    className='bg-white rounded border shadow d-flex flex-md-row flex-column'
                    style={{
                        position: 'absolute',
                        width: 300,
                        right: 0,
                        top: 40,
                        zIndex: 200
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        style={{
                            width: 300,
                        }}
                        className='p-3 d-flex align-items-center gap-2'
                    >
                        <DatePicker
                            id='startDate'
                            className="form-control form-control-lg form-control-solid"
                            selected={startDate ? startDate : new Date()}
                            onChange={(date) => setStartDate(date)}
                            showYearDropdown
                            defaultValue={new Date()}
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            timeIntervals={15}
                        />
                        <span>-</span>
                        <DatePicker
                            id='endDate'
                            className="form-control form-control-lg form-control-solid"
                            selected={endDate ? endDate : new Date()}
                            onChange={(date) => setEndDate(date)}
                            max
                            showYearDropdown
                            dateFormat="dd/MM/yyyy"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            timeIntervals={15}
                        />
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default CustomDate
