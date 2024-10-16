import { useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const DeviceList = ({ deviceList, setDeviceList }) => {
    const [hoverIndex, setHoverIndex] = useState(null)
    const [show, setShow] = useState(false)
    const [mobileChacked, setMobileChacked] = useState(false)
    const [desktopChacked, setDesktopChacked] = useState(false)
    const [tabletChacked, setTabletChacked] = useState(false)

    const selectDevice = (dv) => {
        let devices = deviceList
        let newArr = []
        devices.map(s => {
            if (s.name === dv.name) {
                newArr.push({ name: s.name, value: !s.value })
            } else {
                newArr.push({ name: s.name, value: s.value })
            }
        })

        setDeviceList([...newArr])
    }

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div
            ref={wrapperRef}
            onClick={(e) => {
                e.preventDefault()
                setShow(!show)
            }}
            className='position-relative bg-white border ps-6 pe-10 py-2 d-flex align-items-center cursor-pointer'
            style={{
                height: 38,
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7
            }}
        >
            <span className='fs-6'>Device</span>
            <IoIosArrowDown style={{
                position: 'absolute',
                right: 10,
                top: 10,
                width: 18,
                height: 18
            }} />
            {show && (
                <div
                    className='bg-white rounded border shadow d-flex flex-md-row flex-column'
                    style={{
                        position: 'absolute',
                        width: 200,
                        left: 0,
                        top: 40,
                        zIndex: 200
                    }}
                >
                    <div className='d-flex flex-column' style={{ width: 200 }}>
                        {deviceList.map((device, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => { setHoverIndex(index) }}
                                onMouseLeave={() => { setHoverIndex(null) }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectDevice(device)
                                }}
                                className='px-6 py-3 d-flex align-items-center gap-2'
                                style={{ width: 200, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                            >
                                <div className="container">
                                    <input
                                        className="custom"
                                        type='checkbox'
                                        id="button"
                                        checked={device.value}
                                    />
                                    <span class="checkmark"></span>
                                </div>
                                <span className='fs-6 fw-semibold'>{device.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeviceList
