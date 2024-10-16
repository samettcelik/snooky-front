/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useRef, useState } from 'react'
import { ID, KTIcon } from '../../../../../../_metronic/helpers'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'
import CsvDownloader from 'react-csv-downloader';
import { useCSVReader } from 'react-papaparse';
import Select from "react-select";
import { CustomRightSideModal } from '../../../../../modules/customComponents/CustomRightSideModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { IoMdClose } from 'react-icons/io';
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5';

type Props = {
  id: ID,
  action: any
}

const CouponAction: FC<Props> = ({ id, action }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [showRenameCoupons, setShowRenameCoupons] = useState(false)
  const [activeAddCouponType, setAddCouponType] = useState('generic')
  const [showAddCoupons, setShowAddCoupons] = useState(false)
  const [couponsList, setCouponsList] = useState([]);
  const [couponNumber, setCouponNumber] = useState(10)
  const charsetTypeList = [
    { value: "alphanumeric", label: "Alphanumeric" },
    { value: "pin", label: "Pin" },
    { value: "letters", label: "Letters" },
  ];
  const [codeLength, setCodeLength] = useState(4);
  const generatedCouponsTextarea = useRef(null);
  const uploadedCouponsTextarea = useRef(null);
  const { CSVReader } = useCSVReader();
  const [cupponsType, setCupponsType] = useState("genericCuppons");
  const [codeSuffix, setCodeSuffix] = useState("SUF");
  const [codePrefix, setCodePrefix] = useState("PRE");
  const [genericCode, setGenericCode] = useState("DISCOUNT");
  const [selectedCharsetType, setSelectedCharsetType] = useState(
    charsetTypeList[0]
  );
  const [csvUploadList, setCsvUploadList] = useState([]);
  const [uploadFileList, setUploadFileList] = useState([]);



  // EDİTLENECEK aşağıdakiler reduxa eklenmeli
  const [couponsName, setCouponsName] = useState("My Coupons");
  const [enableFallback, setEnableFallback] = useState(false);
  const [fallback, setFallback] = useState("");
  const [enableExpration, setEnableExpration] = useState(false);
  const [exprationDate, setExprationDate] = useState(new Date());
  const [exprationTime, setExprationTime] = useState(null);
  const [genericCouponNumbers, setGenericCouponNumbers] = useState(null);

  const [showModal, setShowModal] = useState(false)

  const _randomArray = [true, false, false, false]

  const changeCharsetType = (event) => {
    setSelectedCharsetType(event);
  };

  const generateCoupons = () => {
    setCouponsList([])
    const result = [];
    for (let i = 0; i < couponNumber; i++) {

      var generatedPass = createRandomPass()
      if (!result.includes(generatedPass)) {
        result.push(generatedPass)
      }

    }

    return setCouponsList(result);
  };

  const createRandomPass = () => {
    if (codeLength <= 0) return "";

    var charset = "";

    if (selectedCharsetType.value === "pin") {
      charset = "0123456789";
    }

    else if (selectedCharsetType.value === "alphanumeric") {
      charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }

    else if (selectedCharsetType.value === "letters") {
      charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    let couponCode = "";
    let newCodeLength = codeLength + (6 - (codePrefix.length + codeSuffix.length))

    for (let i = 0; i < newCodeLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      couponCode += charset.charAt(randomIndex);
    }
    //return setCouponsList(couponCode);
    return `${codePrefix}${couponCode}${codeSuffix}`

  }

  const changeCodeSuffix = (event) => {
    if (event.target.value.length < 4) {
      setCodeSuffix(event.target.value);
    }

  };

  const changeCodePrefix = (event) => {
    if (event.target.value.length < 4) {
      setCodePrefix(event.target.value);
    }
  };

  const changeCouppons = (event) => {
    setCupponsType(event.target.value);
  };

  const handleCodeLengthChange = (event) => {
    const newLength = parseInt(event.target.value, 10);
    if (newLength > 0 && newLength < 5) {
      setCodeLength(newLength);
    }
  };

  const changeGenericCode = (event) => {
    setGenericCode(event.target.value);
  };

  const handleCouponNumberChange = (event) => {

    if (parseInt(event.target.value) >= 0 && parseInt(event.target.value) <= 10000) {
      setCouponNumber(event.target.value);
    }
    else {
      setCouponNumber(10)
    }
  };

  const datas = () => {
    var dataArray = []
    var columnName = ""
    couponsList.map((item, index) => {
      if (index == 0) {
        columnName = item
      }
      else {
        dataArray.push({
          [columnName]: item
        })
      }
    });
    return dataArray
  };


  const datasEmpty = () => {
    var list = [{ "ExampleCoupon1": "ExampleCoupon2" }, { "ExampleCoupon1": "ExampleCoupon3" }, { "ExampleCoupon1": "ExampleCoupon4" }]
    return list
  }

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

  const copyToClipboard = (el) => {
    el.current.select();
    document.execCommand('copy');
  };

  const deleteCouponList = (index) => {

    const filteredArray = csvUploadList.filter(item => !uploadFileList[index].list.includes(item));
    setCsvUploadList(filteredArray);

    const updatedData = uploadFileList.filter((item, i) => i !== index);
    setUploadFileList(updatedData);
  }

  const deleteAllCouponList = () => {
    setCsvUploadList([])
    setUploadFileList([])
  }

  let rand = Math.floor(Math.random() * 3)

  return (
    <div className='d-flex align-items-center gap-2'>
      {showAddCoupons && <CustomModal
        title='Add Coupons'
        Content={() => (
          <div className='d-flex flex-column'>
            <div className='d-flex gap-4'>
              <div className="form-check form-check-solid d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-18px h-18px"
                  type="checkbox"
                  id="allowmarketing"
                  checked={activeAddCouponType === 'generic'}
                  onChange={() => setAddCouponType('generic')}
                // defaultChecked={showGoogleForm}
                // onChange={(e) => setShowGoogleForm(e.target.checked)}
                />
                <label className={`form-check-label ${activeAddCouponType === 'generic' ? 'text-gray-900' : 'text-gray-600'}`} style={{ fontSize: '1.1rem' }}>Generic coupons</label>
              </div>
              <div className="form-check form-check-solid d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-18px h-18px"
                  type="checkbox"
                  id="allowmarketing"
                  checked={activeAddCouponType === 'unique'}
                  onChange={() => setAddCouponType('unique')}
                // defaultChecked={showGoogleForm}
                // onChange={(e) => setShowGoogleForm(e.target.checked)}
                />
                <label className={`form-check-label ${activeAddCouponType === 'unique' ? 'text-gray-900' : 'text-gray-600'}`} style={{ fontSize: '1.1rem' }}>Generate coupons</label>
              </div>
              <div className="form-check form-check-solid d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-18px h-18px"
                  type="checkbox"
                  id="allowmarketing"
                  checked={activeAddCouponType === 'upload'}
                  onChange={() => setAddCouponType('upload')}
                // defaultChecked={showGoogleForm}
                // onChange={(e) => setShowGoogleForm(e.target.checked)}
                />
                <label className={`form-check-label ${activeAddCouponType === 'upload' ? 'text-gray-900' : 'text-gray-600'}`} style={{ fontSize: '1.1rem' }}>Upload coupons</label>
              </div>
            </div>
            <div>
              <div class="alert alert-warning py-3 border-dashed border-warning mt-4 mb-0 text-warning" role="alert">
                Only your coupons in the category you choose will be valid.
              </div>
            </div>
            <div className='mt-4'>
              {activeAddCouponType === 'generic' && (
                <div className="row" >
                  <div className="col-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Coupon List Name
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="text"
                      placeholder="Enter Coupon List Name"
                      value={couponsName}
                      onChange={(e) => setCouponsName(e.target.value)}
                    />
                  </div>
                  <div className="mt-5 col-12 col-md-6">
                    <label
                      htmlFor="couponCode"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Coupon Code
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={genericCode}
                      onChange={changeGenericCode}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Number of coupons
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="number"
                      placeholder="Number of coupons"
                      min={1}
                      max={10000}
                      value={couponNumber}
                      onChange={handleCouponNumberChange}
                    />
                  </div>
                  <div className="row w-100">
                    <div className="d-inline-block mt-5 col-12 col-md-6">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-16px h-16px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={enableExpration}
                          onChange={(e) => setEnableExpration(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-700 fs-medium" style={{ fontSize: '1.1rem' }}>Enable Expration</label>
                      </div>
                      {enableExpration && (
                        <div className="d-flex flex-column mt-4">
                          <label
                            htmlFor="couponCode"
                            className="form-label fs-7 fw-bolder mb-1"
                          >
                            Expiry Date
                          </label>
                          <DatePicker
                            className="form-control form-control-lg form-control-solid w-100"
                            selected={exprationDate}
                            onChange={(date) => setExprationDate(date)}
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
                        </div>
                      )}
                    </div>
                    <div className="d-inline-block mt-5 col-12 col-md-6">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-16px h-16px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={enableFallback}
                          onChange={(e) => setEnableFallback(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-700 fs-medium" style={{ fontSize: '1.1rem' }}>Enable Fallback Code</label>
                      </div>
                      {enableFallback && (
                        <div className="d-flex flex-column mt-4">
                          <label
                            htmlFor="couponCode"
                            className="form-label fs-7 fw-bolder mb-1"
                          >
                            Fallback Code
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-user-websites">
                                  <div className='d-flex flex-column'>
                                    <span>Fallback coupon is the default coupon which would be used if the coupon list expires or all your coupons in the list is used.</span>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <span className="symbol-label rounded-circle text-inverse-primary fw-bolder ms-2">
                                <i className="bi bi-info-circle-fill"></i>
                              </span>
                            </OverlayTrigger>
                          </label>
                          <input
                            className="form-control form-control-solid"
                            type="text"
                            placeholder="Enter Fallback Code"
                            value={fallback}
                            onChange={e => setFallback(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeAddCouponType === 'unique' && (
                <div className="row">
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Coupon List Name
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="text"
                      placeholder="Enter Coupon List Name"
                      value={couponsName}
                      onChange={(e) => setCouponsName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Charset
                    </label>
                    <Select
                      value={selectedCharsetType}
                      options={charsetTypeList}
                      placeholder="Charset"
                      className="form-control form-control-solid p-0"
                      onChange={changeCharsetType}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Code length
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="number"
                      placeholder="Code length"
                      min={1}
                      value={codeLength}
                      onChange={handleCodeLengthChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Number of coupons
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="number"
                      placeholder="Number of coupons"
                      min={1}
                      max={10000}
                      value={couponNumber}
                      onChange={handleCouponNumberChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Code prefix
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="text"
                      placeholder="Code prefix"
                      value={codePrefix}
                      onChange={changeCodePrefix}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mt-5">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Code suffix
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="text"
                      placeholder="Code suffix"
                      value={codeSuffix}
                      onChange={changeCodeSuffix}
                    />
                  </div>
                  <div className="row w-100">
                    <div className="d-inline-block mt-5 col-12 col-md-6">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-16px h-16px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={enableExpration}
                          onChange={(e) => setEnableExpration(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-700 fs-medium" style={{ fontSize: '1.1rem' }}>Enable Expration</label>
                      </div>
                      {enableExpration && (
                        <div className="d-flex flex-column mt-4">
                          <label
                            htmlFor="couponCode"
                            className="form-label fs-7 fw-bolder mb-1"
                          >
                            Expiry Date
                          </label>
                          <DatePicker
                            className="form-control form-control-lg form-control-solid w-100"
                            selected={exprationDate}
                            onChange={(date) => setExprationDate(date)}
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
                        </div>
                      )}
                    </div>
                    <div className="d-inline-block mt-5 col-12 col-md-6">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-16px h-16px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={enableFallback}
                          onChange={(e) => setEnableFallback(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-700 fs-medium" style={{ fontSize: '1.1rem' }}>Enable Fallback Code</label>
                      </div>
                      {enableFallback && (
                        <div className="d-flex flex-column mt-4">
                          <label
                            htmlFor="couponCode"
                            className="form-label fs-7 fw-bolder mb-1"
                          >
                            Fallback Code
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-user-websites">
                                  <div className='d-flex flex-column'>
                                    <span>Fallback coupon is the default coupon which would be used if the coupon list expires or all your coupons in the list is used.</span>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <span className="symbol-label rounded-circle text-inverse-primary fw-bolder ms-2">
                                <i className="bi bi-info-circle-fill"></i>
                              </span>
                            </OverlayTrigger>
                          </label>
                          <input
                            className="form-control form-control-solid"
                            type="text"
                            placeholder="Enter Fallback Code"
                            value={fallback}
                            onChange={e => setFallback(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-inline-block">
                    <button type="button" className="btn btn-primary my-5" onClick={generateCoupons}>Generate Coupons</button>
                  </div>

                  {couponsList?.length > 0 && (
                    <>
                      <div className="col-12 mt-5">
                        <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6 pt-3">
                          <div className="form-group w-100">
                            <label className="form-label fs-7 fw-bolder mb-1" htmlFor="exampleFormControlTextarea1">Your all coupons ({couponsList.length})</label>
                            <div className="w-100 d-block position-relative">
                              <textarea className="form-control w-100" id="exampleFormControlTextarea1" ref={generatedCouponsTextarea} rows="8" readOnly value={couponsList.join(', ')}></textarea>
                              <button type="button" className="btn btn-secondary position-absolute top-0 end-0 m-3 p-2" onClick={() => copyToClipboard(generatedCouponsTextarea)}>
                                <KTIcon iconName="copy" className="fs-1 p-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-inline-block">
                        <CsvDownloader
                          filename="snookyCouponsList"
                          extension=".csv"
                          datas={datas}
                          text="Download Coupons (.csv)"
                          className="btn btn-primary my-5"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              {activeAddCouponType === 'upload' && (
                <div className="mt-5">
                  <div className="col-12">
                    <label
                      htmlFor="campaignname"
                      className="form-label fs-7 fw-bolder mb-1"
                    >
                      Coupon List Name
                    </label>
                    <input
                      className="form-control form-control-solid"
                      type="text"
                      placeholder="Enter Coupon List Name"
                      value={couponsName}
                      onChange={(e) => setCouponsName(e.target.value)}
                    />
                  </div>

                  <div className="row w-100">
                    <div className="d-inline-block mt-5 col-12 col-md-6">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-16px h-16px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={enableExpration}
                          onChange={(e) => setEnableExpration(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-700 fs-medium" style={{ fontSize: '1.1rem' }}>Enable Expration</label>
                      </div>
                      {enableExpration && (
                        <div className="d-flex flex-column mt-4">
                          <label
                            htmlFor="couponCode"
                            className="form-label fs-7 fw-bolder mb-1"
                          >
                            Expiry Date
                          </label>
                          <DatePicker
                            className="form-control form-control-lg form-control-solid w-100"
                            selected={exprationDate}
                            onChange={(date) => setExprationDate(date)}
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
                        </div>
                      )}
                    </div>
                    <div className="d-inline-block mt-5 col-12 col-md-6">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-16px h-16px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={enableFallback}
                          onChange={(e) => setEnableFallback(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-700 fs-medium" style={{ fontSize: '1.1rem' }}>Enable Fallback Code</label>
                      </div>
                      {enableFallback && (
                        <div className="d-flex flex-column mt-4">
                          <label
                            htmlFor="couponCode"
                            className="form-label fs-7 fw-bolder mb-1"
                          >
                            Fallback Code
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="tooltip-user-websites">
                                  <div className='d-flex flex-column'>
                                    <span>Fallback coupon is the default coupon which would be used if the coupon list expires or all your coupons in the list is used.</span>
                                  </div>
                                </Tooltip>
                              }
                            >
                              <span className="symbol-label rounded-circle text-inverse-primary fw-bolder ms-2">
                                <i className="bi bi-info-circle-fill"></i>
                              </span>
                            </OverlayTrigger>
                          </label>
                          <input
                            className="form-control form-control-solid"
                            type="text"
                            placeholder="Enter Fallback Code"
                            value={fallback}
                            onChange={e => setFallback(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {csvUploadList?.length > 0 && (<>
                    <div className="col-12 mt-5">
                      <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-6 pt-3">
                        <div className="form-group w-100">
                          <label className="form-label fs-7 fw-bolder mb-1" htmlFor="exampleFormControlTextarea1">Your all coupons ({csvUploadList.length})</label>
                          <div className="w-100 d-block position-relative">
                            <textarea className="form-control w-100" id="exampleFormControlTextarea1" ref={uploadedCouponsTextarea} rows="8" readOnly value={csvUploadList.join(', ')}></textarea>
                            <button type="button" className="btn btn-secondary position-absolute top-0 end-0 m-3 p-2" onClick={() => copyToClipboard(uploadedCouponsTextarea)}>
                              <KTIcon iconName="copy" className="fs-1 p-0" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {uploadFileList?.length > 0 && (<>
                        <div className="d-inline-block">
                          <ul className="list-group my-2">
                            {uploadFileList?.map((e, index) => (<>
                              <li className="list-group-item d-flex align-items-center">
                                <b>{e.name}</b>
                                ({e.list?.length} coupons)
                                <div style={{ width: 15, height: 15, marginLeft: 10 }} className="d-flex border-none align-items-center justify-content-center bg-danger rounded-circle text-white" type="button" onClick={() => deleteCouponList(index)}>
                                  <IoMdClose className="w-20 h-20px" />
                                </div>
                              </li>                            </>))}
                            <li className="list-group-item"><button type="button" className="btn btn-sm btn-danger w-100" onClick={deleteAllCouponList}>Delete All Files</button></li>
                          </ul>
                        </div>
                      </>)}
                    </div>
                  </>)}
                  <CSVReader
                    onUploadAccepted={(results, acceptedFile) => {
                      setUploadFileList(current => [...uploadFileList, { list: results.data, name: acceptedFile.name }])
                      setCsvUploadList(current => [...csvUploadList, ...results.data])
                    }}
                  >
                    {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                    }) => (
                      <>
                        <div className="d-inline-block">
                          <div className="d-flex flex-column">
                            <div className="d-block">
                              <button className="btn btn-primary my-5" type='button' {...getRootProps()}>
                                Upload Coupons (.csv)
                              </button>
                              <div className="d-inline-block">
                                <CsvDownloader
                                  filename="snookyCouponsTemplate"
                                  extension=".csv"
                                  datas={datasEmpty}
                                  text="Download Example Format (.csv)"
                                  className="btn btn-primary ms-3 my-5"
                                />
                              </div>
                              {/* <div >
                                {acceptedFile && acceptedFile.name}
                              </div> */}
                              <button {...getRemoveFileProps()} className="d-none">
                                Remove
                              </button>
                            </div>
                            <ProgressBar />
                          </div>
                        </div>
                      </>
                    )}
                  </CSVReader>
                  <div>
                    <span className="fw-bold text-gray-700 fs-lg">Upload Coupon</span>
                    <ul className="text-gray-700 mt-2">
                      <li>UTF-8 format is supported in the CSV file.</li>
                      <li>Your CSV file shouldn't have any headers, it should have coupon codes starting from the first cell of the file.</li>
                      <li>Any character entered after the comma "," on the same line will be ignored.</li>
                      <li>Coupon codes are separated by a new line.</li>
                      <li>Only unique coupon codes are accepted, duplicated coupon codes will be dropped.</li>
                      <li>Maximum file size for CSV is 10MB.</li>
                      <li>Your coupon list should include coupons with a minimum of 2 alphanumeric values (a-z, A-Z, 0-9, -, _). Please try to upload a coupon list with correct values.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        setShowModal={setShowAddCoupons}
        submitBtnTitle='Add Coupons'
        submitBtnClassName='btn-primary'
        cancelBtnTitle='Discard'
        onPressSubmitButton={() => {
          // Add coupons
        }}
        onPressCancelButton={() => {
          setShowAddCoupons(false)
        }}
      />}
      {showRenameCoupons && <CustomModal
        title='Rename Coupon'
        Content={() => {
          return (
            <div>
              <label className={`text-black fw-bold fs-6 mb-2`}>Name</label>
              <input
                placeholder='Your Code'
                value={'COUPON NAME'}
                // onChange={(e) => {}}
                type='text'
                name='rename'
                className={'form-control form-control-solid mb-3'}
                autoComplete='off'
              />
            </div>
          )
        }}
        setShowModal={setShowRenameCoupons}
        submitBtnTitle='Rename Coupon'
        submitBtnClassName='btn-primary'
        cancelBtnTitle='Discard'
        onPressSubmitButton={() => {
          // Rename coupon
        }}
        onPressCancelButton={() => {
          setShowRenameCoupons(false)
        }}
      />}
      {showDetails && <CustomRightSideModal
        title='My Coupon Detail'
        Content={() => {
          return (
            <div>
              <div className='d-flex gap-10'>
                <span>1/4 used</span>
                <div className='flex-fill d-flex flex-row align-items-center gap-1'>
                  <div className='flex-fill'>
                    <div class="progress" role="progressbar" aria-label="Coupon Usage" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                      <div class="progress-bar" style={{ width: `${25}%` }}></div>
                    </div>
                  </div>
                  <span>25%</span>
                </div>
              </div>
              <div className='mt-10'>
                <span className='text-black fw-bold'>Coupon List Information</span>
                <div className='d-flex flex-column mt-5 gap-3'>
                  <div className='d-flex justify-content-between'>
                    <span className='text-gray-700'>Created On</span>
                    <span className='text-gray-700'>23.12.2023 by burakcanexe@gmail.com</span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span className='text-gray-700'>Expires On</span>
                    <span className='text-gray-700'>-</span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span className='text-gray-700'>Last Modified</span>
                    <span className='text-gray-700'>23.12.2023</span>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <span className='text-gray-700'>Fallback Code</span>
                    <span className='text-gray-700'>-</span>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
        setShowModal={setShowDetails}
        // submitBtnTitle='Rename Coupon'
        submitBtnClassName='btn-primary'
        // cancelBtnTitle='Discard'
        onPressSubmitButton={() => {
          // Rename coupon
        }}
        onPressCancelButton={() => {
          setShowDetails(false)
        }}
      />}

      {showModal && (
        <CustomModal
          title={action ? 'Deactivate Copuon List?' : 'Activate Copuon List?'}
          Content={() => `You are about to ${action ? 'deactivate' : 'activate'} test-1. There might be some Campaigns using this coupon list. Are you sure`}
          setShowModal={setShowModal}
          cancelBtnTitle='Cancel'
          submitBtnTitle={action ? 'Deactivate' : 'Acitvate'}
          submitBtnClassName={action ? 'btn-danger' : 'btn-success'}
        />
      )}
      {action ? (

        <div onClick={() => setShowModal(true)} className='d-flex align-items-center gap-1 text-primary cursor-pointer'>
          {action ? <IoPauseOutline style={{ fontSize: '1.2rem', marginBottom: 0.5 }} /> : _randomArray[rand] && <IoPlayOutline style={{ fontSize: '1.2rem', marginBottom: 0.5 }} />}
          <span>{action ? 'Deactivate' : _randomArray[rand] && 'Activate'}</span>
        </div>
      ) : (
        <div style={{ width: 92 }} />
      )}
      <a
        href='#'
        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='dots-horizontal' className='fs-2 m-0' />
      </a>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-175px py-4'
        data-kt-menu='true'
      >
        <div onClick={() => setShowAddCoupons(true)} className='menu-item px-3'>
          <div
            className='menu-link px-3'
          >
            Add Coupons to List
          </div>
        </div>
        <div onClick={() => setShowRenameCoupons(true)} className='menu-item px-3'>
          <div
            className='menu-link px-3'>
            Rename Coupon List
          </div>
        </div>
        <div onClick={() => setShowDetails(true)} className='menu-item px-3'>
          <div
            className='menu-link px-3'
          >
            View Details
          </div>
        </div>
      </div>
    </div>
  )
}

export { CouponAction }
