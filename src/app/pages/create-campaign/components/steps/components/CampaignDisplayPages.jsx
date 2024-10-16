import React, { useState, useEffect } from "react";
import Select from "react-select";
import { KTIcon } from "../../../../../../_metronic/helpers";

import CustomTooltip from "../../../../../modules/customComponents/CustomTooltip";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../../../store/jotai/CreateCampaignAtom";



const URLOptions = [
  { value: "url0", label: "Simple match" },
  { value: "url1", label: "Does not simply match" },
  { value: "url2", label: "Returning visitors" },
  { value: "url3", label: "Is equal to" },
  { value: "url4", label: "Is not equal to" },
  { value: "url5", label: "Contains" },
  { value: "url6", label: "Does not contain" },
  { value: "url7", label: "Starts with" },
  { value: "url8", label: "Ends with" },
  { value: "url9", label: "Does not end with" },
  { value: "url10", label: "Matches the RegEx" },
  { value: "url11", label: "Does not matche the RegEx" },
];
const frequentlyTimeList = [
  { value: "pages", label: "Pages" },
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" }
]

const CampaignDisplayPages = () => {
  const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
  const storeCollapseNum = createCampaignStates.collapseNum

  const selectedFrequentlyTimeList = createCampaignStates.campaignDisplayPage.frequentlyTimeList
  const selectedPagesOption = createCampaignStates.campaignDisplayPage.pageOptions
  const frequencyIsActive = createCampaignStates.campaignDisplayPage.frequencyIsActive
  const selectedFrequentlyShowOptionDetail = createCampaignStates.campaignDisplayPage.frequentlyShowOptionDetail
  const frequentlyTimeInput = createCampaignStates.campaignDisplayPage.frequentlyTimeInput
  const stopShowingTimeInput = createCampaignStates.campaignDisplayPage.stopShowingTimeInput
  const pagesList = createCampaignStates.campaignDisplayPage.pagesList
  const stopShowingCheckbox = createCampaignStates.campaignDisplayPage.stopShowing

  const andToOrFunction = () => {
    const listData = { ...pagesList };

    if (listData.andOr == "OR") {
      listData.andOr = "AND";
    }
    else {
      listData.andOr = "OR";
    }

    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pagesList: listData
      }
    })

  };

  const refineAndToOrFunction = (index) => {
    const listData = { ...pagesList };

    if (listData.UrlList[index].andOr == "OR") {
      listData.UrlList[index].andOr = "AND";
    }
    else {
      listData.UrlList[index].andOr = "OR";
    }

    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pagesList: listData
      }
    })

  };

  const changePagesOption = (event) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pageOptions: event.target.value
      }
    })
  };

  const addUrl = () => {

    const newUrl = { ...pagesList };
    newUrl.UrlList.push({ URLType: URLOptions[0], url: "", refineList: [], andOr: "OR" });

    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pagesList: newUrl
      }
    })

  };

  const removeUrl = (index, refineIndex) => {
    const dataList = { ...pagesList };






    if (refineIndex == null) {

      if (dataList.UrlList[index].refineList.length > 0) {

        var firstRefineData = dataList.UrlList[index].refineList[0]

        dataList.UrlList[index] = { ...dataList.UrlList[index], ...firstRefineData }
        // dataList.UrlList.splice(index, 1);
        dataList.UrlList[index].refineList.splice(0, 1);

      }
      else {
        dataList.UrlList.splice(index, 1)
      }


    }
    else {

      dataList.UrlList[index].refineList.splice(refineIndex, 1);
    }

    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pagesList: dataList
      }
    })
  };

  const updateUrl = (index, field, value, refineIndex) => {
    const updatedList = { ...pagesList };
    if (refineIndex == null) {
      updatedList.UrlList[index][field] = value;
    } else {
      updatedList.UrlList[index].refineList[refineIndex][field] = value;
    }

    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pagesList: updatedList
      }
    })
  };


  const refineUrl = (index) => {

    const newState = { ...pagesList };

    const newRefineItem = { URLType: URLOptions[0], url: '' };
    newState.UrlList[index].refineList.push(newRefineItem);


    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        pagesList: newState
      }
    })
  }


  const frequentlyShowOptionChangeDetail = (event) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        frequentlyShowOptionDetail: event.target.value
      }
    })
  };

  const updateFrequentlyTimeInput = (event) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        frequentlyTimeInput: parseInt(event.target.value) > 0 ? parseInt(event.target.value) : 3
      }
    })
  }



  const updateStopShowingCheckbox = (event) => {
    const { name, checked } = event.target;
    const newData = {
      ...stopShowingCheckbox,
      [name]: checked
    };
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        stopShowing: newData
      }
    })
  }

  const updateStopShowingTimeInput = (event) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignDisplayPage: {
        ...createCampaignStates.campaignDisplayPage,
        stopShowingTimeInput: parseInt(event.target.value) > 0 ? parseInt(event.target.value) : 3
      }
    })
  }

  return (
    <div className="accordion-item mb-8 shadow border-top">
      <h2 className="accordion-header" id="headingSix">
        <button
          className="accordion-button collapsed fs-4 fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseSix"
          aria-expanded="false"
          aria-controls="collapseSix"
          onClick={() => setCreateCampaignStates({
            ...createCampaignStates,
            collapseNum: 6
          })}
        >
          Display Pages
        </button>
      </h2>
      <div
        id="collapseSix"
        className={`accordion-collapse collapse ${storeCollapseNum == "6" ? 'show' : ''}`}
        aria-labelledby="headingSix"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">



          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <input
                className="form-check-input  me-5"
                type="radio"
                checked={selectedPagesOption === "selectedPages"}
                onChange={changePagesOption}
                value="selectedPages"
              />
              <label className="form-label fs-7 fw-bolder">
                Display on all pages
              </label>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-2">
              <input
                className="form-check-input  me-5"
                type="radio"
                checked={selectedPagesOption === "selectedURL"}
                onChange={changePagesOption}
                value="selectedURL"
              />
              <label className="form-label fs-7 fw-bolder">
                Select URLs
              </label>
            </div>
          </div>
          {selectedPagesOption === "selectedURL" ? (
            <div className="mt-5">


              {pagesList.UrlList.map((pageListItem, pageListIndex) => (
                <div key={pageListIndex}>
                  <div key={pageListIndex} className="mb-2">
                    {pageListIndex !== 0 && (
                      <div className="d-flex gap-5 border rounded-pill p-1 justify-content-center text-sm" onClick={andToOrFunction} style={{ width: '80px' }}>
                        <div className="text"><small>{pagesList.andOr}</small></div>
                        <div className="icon">{pagesList.andOr == 'OR' ? (
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                              fill="#292D32"
                            />
                          </svg>
                        ) : (
                          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#292D32" />
                          </svg>
                        )}</div>
                      </div>
                    )}
                    <div className="row d-flex align-items-center mb-2">
                      <div className="col-1">
                        {" "}
                        <span>URL</span>
                      </div>
                      <div className="col-5">
                        <Select
                          options={URLOptions}
                          placeholder="URL"
                          className="form-control form-control-solid p-0 form-control-sm"
                          onChange={(selectedOption) =>
                            updateUrl(pageListIndex, "URLType", selectedOption, null)
                          }
                          value={pageListItem.URLType}
                        />
                      </div>
                      <div className="col-4">
                        <input
                          id="url"
                          type="text"
                          className="form-control form-control-sm form-control-solid"
                          placeholder="https://www.example.com"
                          value={pageListItem.url}
                          onChange={(e) =>
                            updateUrl(pageListIndex, "url", e.target.value, null)
                          }
                        />
                      </div>
                      <div className="col-2 d-flex">
                        <button className="btn btn-sm" type="button" onClick={() => refineUrl(pageListIndex)}>Refine</button>
                        {(pagesList?.UrlList.length > 1 || pagesList?.UrlList[pageListIndex].refineList.length > 0) && (
                          <button
                            type="button"
                            className="btn  btn-sm p-0"
                            onClick={() => removeUrl(pageListIndex, null)}
                          >
                            <KTIcon iconName="trash" className="fs-3 text-danger" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {pageListItem.refineList.map((refineItem, refineIndex) => (
                    <div key={refineIndex}>

                      <div key={refineIndex} className="mb-2">

                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-1 position-relative">
                            <div className="position-absolute w-50" style={{
                              borderBottom: '2px solid #cfcfcf', borderLeft: '2px solid #cfcfcf', height: '20px', top: '-20px',
                              left: '20%'
                            }}></div>
                          </div>
                          <div className="col-1">
                            <div className="d-flex gap-5 border rounded-pill p-1 justify-content-center text-sm" onClick={() => refineAndToOrFunction(pageListIndex)} style={{ width: '80px' }}>
                              <div className="text"><small>{pageListItem.andOr}</small></div>
                              <div className="icon">{pageListItem.andOr == 'OR' ? (
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                                    fill="#292D32"
                                  />
                                </svg>
                              ) : (
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#292D32" />
                                </svg>
                              )}</div>
                            </div>
                          </div>
                          <div className="col-4">
                            <Select
                              options={URLOptions}
                              placeholder="URL"
                              className="form-control form-control-solid p-0 form-control-sm"
                              onChange={(selectedOption) =>
                                updateUrl(pageListIndex, "URLType", selectedOption, refineIndex)
                              }
                              value={refineItem.URLType}
                            />
                          </div>
                          <div className="col-4">
                            <input
                              id="url"
                              type="text"
                              className="form-control form-control-sm form-control-solid"
                              placeholder="https://www.example.com"
                              value={refineItem.url}
                              onChange={(e) =>
                                updateUrl(pageListIndex, "url", e.target.value, refineIndex)
                              }
                            />
                          </div>
                          <div className="col-2 d-flex">
                            <button className="btn btn-sm" type="button" onClick={() => refineUrl(pageListIndex)}>Refine</button>
                            {(pagesList?.UrlList.length > 1 || pagesList?.UrlList[pageListIndex].refineList.length > 0) && (
                              <button
                                type="button"
                                className="btn  btn-sm p-0"
                                onClick={() => removeUrl(pageListIndex, refineIndex)}
                              >
                                <KTIcon iconName="trash" className="fs-3 text-danger" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>


                    </div>
                  ))}
                </div>
              ))}

              <button
                type="button"
                className="btn btn-primary mt-5 btn-sm"
                onClick={addUrl}
              >
                <KTIcon iconName="plus" className="fs-3" />Add rule
              </button>
            </div>
          ) : (
            <div></div>
          )}

          <hr />

          <div className="d-flex gap-20">
            <label className="form-check form-switch form-check-custom form-check-solid  align-items-center mt-5">
              <input className="form-check-input me-5" type="checkbox" />
              <div>
                <span className="form-label fw-bolder mb-0">Bot Protection</span>
                <CustomTooltip description="Our bot protection eliminates excessive abuse and misuse of application resources that power fraudulent activity." />
              </div>
            </label>
          </div>

          <div className="d-flex gap-20">
            <label className="form-check form-switch form-check-custom form-check-solid  align-items-center mt-8">
              <input className="form-check-input me-5" type="checkbox" />
              <div>
                <span className="form-label fw-bolder mb-0">AI/ML Customer Churn Detection</span>
                <CustomTooltip description="AI, ML, and deep Learning play a pivotal role in redefining customer churn prediction from a conventional rule-based method to a data-driven and predictive strategy. AI and ML algorithms analyze large volumes of historical customer data, including demographic information, transaction history, behavior patterns, and interactions with the company." />
              </div>
            </label>
          </div>

          <div className="d-flex gap-20">
            <label className="form-check form-switch form-check-custom form-check-solid  align-items-center mt-8">
              <input className="form-check-input me-5" type="checkbox" />
              <div>
                <span className="form-label fw-bolder mb-0">IP Restriction</span>
                <CustomTooltip description="This helps prevent the majority of fraudulent attributions associated with device farms and emulators before they enter your data set, and reduces the impact of data center manipulation tactics significantly." />
              </div>
            </label>
          </div>

          <div className="d-flex gap-20">
            <label className="form-check form-switch form-check-custom form-check-solid align-items-center mt-5">
              <input className="form-check-input me-5" type="checkbox" defaultChecked={frequencyIsActive}
                onChange={() =>
                  setCreateCampaignStates({
                    ...createCampaignStates,
                    campaignDisplayPage: {
                      ...createCampaignStates.campaignDisplayPage,
                      frequencyIsActive: !frequencyIsActive
                    }
                  })} />
              <div className="d-flex flex-column ">
                <span className="form-label fw-bolder mb-0">Frequency - Display Limit</span>
                <span className="form-label">
                  Don't display the promotion above times per session
                </span>
              </div>
            </label>

          </div>

          {frequencyIsActive && (<>
            <div className="bg-light border rounded p-5 d-block">
              <div className="d-block mb-3">Choose how often your visitors will see this campaign.</div>
              <label htmlFor="campaignname" className="form-label fs-7 fw-bolder mb-1">Show again</label>
              <div className="mb-3">Set how frequently your campaign will display.</div>

              <div className="d-block mb-4">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  value="everyPageLoad"
                  checked={selectedFrequentlyShowOptionDetail === "everyPageLoad"}
                  onChange={frequentlyShowOptionChangeDetail}
                  id="everyPageLoad"
                />
                <label className="form-label fs-7 fw-bolder" htmlFor="everyPageLoad">
                  Every page load
                </label>
              </div>
              <div className="d-block mb-1">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  value="everySession"
                  checked={selectedFrequentlyShowOptionDetail === "everySession"}
                  onChange={frequentlyShowOptionChangeDetail}
                  id="everySession"
                />
                <label className="form-label fs-7 fw-bolder" htmlFor="everySession">
                  Every session
                </label>
              </div>
              <div className="d-flex mb-5 align-items-center">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  value="everySelectedTime"
                  checked={selectedFrequentlyShowOptionDetail === "everySelectedTime"}
                  onChange={frequentlyShowOptionChangeDetail}
                  id="everySelectedTime"
                />
                <label className="form-label fs-7 fw-bolder mb-0" htmlFor="everySelectedTime">
                  Every
                </label>
                <div className="d-inline-block ms-2">
                  <input
                    id="url"
                    type="number"
                    className="form-control form-control-sm"
                    value={frequentlyTimeInput}
                    style={{ height: '40px' }}
                    disabled={selectedFrequentlyShowOptionDetail !== "everySelectedTime"}
                    onChange={(e) =>
                      updateFrequentlyTimeInput(e)
                    }
                  />
                </div>
                <div className="d-inline-block ms-2">
                  <Select
                    options={frequentlyTimeList}
                    placeholder="URL"
                    className="form-control form-control-solid p-0 form-control-sm"
                    onChange={(e) => {
                      setCreateCampaignStates({
                        ...createCampaignStates,
                        campaignDisplayPage: {
                          ...createCampaignStates.campaignDisplayPage,
                          frequentlyTimeList: e
                        }
                      })
                    }}
                    isDisabled={selectedFrequentlyShowOptionDetail !== "everySelectedTime"}
                    value={selectedFrequentlyTimeList}
                  />
                </div>
              </div>
              <label htmlFor="campaignname" className="form-label fs-7 fw-bolder mb-1">Stop showing</label>
              <div className="mb-4">Set when a visitor should stop seeign your campaign.</div>



              <div className='form-check form-check-custom form-check-solid mb-5'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='kt_checkbox_9'
                  name="afterVisitorClosed"
                  checked={stopShowingCheckbox.afterVisitorClosed}
                  onChange={updateStopShowingCheckbox}
                />
                <label className='form-check-label fw-bold text-gray-600' htmlFor='kt_checkbox_9'>
                  After a visitor has closed the campaign
                </label>
              </div>

              <div className='form-check form-check-custom form-check-solid mb-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='kt_checkbox_9'
                  name="afterVisitorSignedUp"
                  checked={stopShowingCheckbox.afterVisitorSignedUp}
                  onChange={updateStopShowingCheckbox}
                />
                <label className='form-check-label fw-bold text-gray-600' htmlFor='kt_checkbox_9'>
                  After a visitor has signed up or clicked
                </label>
              </div>

              <div className='form-check form-check-custom form-check-solid mb-3'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='kt_checkbox_9'
                  name="afterVisitorSeen"
                  checked={stopShowingCheckbox.afterVisitorSeen}
                  onChange={updateStopShowingCheckbox}
                />
                <label className='form-check-label fw-bold text-gray-600' htmlFor='kt_checkbox_9'>
                  After a visitor has seen the campaign <div className="d-inline-block ms-2">
                    <input
                      id="url"
                      type="number"
                      className="form-control form-control-sm"
                      value={stopShowingTimeInput}
                      style={{ height: '40px' }}
                      disabled={!stopShowingCheckbox.afterVisitorSeen}
                      onChange={(e) =>
                        updateStopShowingTimeInput(e)
                      }
                    />
                  </div> times
                </label>
              </div>


            </div>
          </>)}

        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-sm btn-primary m-5" onClick={() => setCreateCampaignStates({
            ...createCampaignStates,
            collapseNum: 7
          })} id="headingTwo">Continue <KTIcon
              iconName="arrow-right"
              className="fs-3 ms-2 me-0"
            /></button>
        </div>
      </div>
    </div>
  );
};

export { CampaignDisplayPages };
