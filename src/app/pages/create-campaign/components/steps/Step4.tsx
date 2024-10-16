import React, { useEffect, useState } from "react";
import { Field } from "formik";
import WidePopup from "../../../../modules/templates/WidePopup";
import { HexColorPicker } from "react-colorful";
import { Button } from "react-bootstrap";
import { KTIcon } from "../../../../../_metronic/helpers";
import UnsplashImagesModal from "../../../../../_metronic/layout/components/modals/UnsplashImagesModal";
import { CiLaptop, CiMobile1 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import './step4.css'
import { GoDotFill } from "react-icons/go";
import TextEditor from "./components/TextEditor";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../../store/jotai/CreateCampaignAtom";

const Step4 = ({ mobileOrDesktop }: { mobileOrDesktop: any }) => {
  const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
  const [showDesktop, setShowDesktop] = useState<boolean>(false); // State
  const [isMobile, setIsMobile] = useState<boolean>(false); // State
  const [showButtonColors, setShowButtonColors] = useState<boolean>(false); // State
  const [showMobile, setShowMobile] = useState<boolean>(false); // State
  const [showButtonTextColors, setShowButtonTextColors] = useState<boolean>(false); // State
  const [reminderTabIsVisible, setReminderTabIsVisible] = useState(false); // State


  const buttonColor = createCampaignStates.campaignStudio.buttonColor
  const buttonTextColor = createCampaignStates.campaignStudio.buttonTextColor
  const coverImage = createCampaignStates.campaignStudio.coverImage
  const logo = createCampaignStates.campaignStudio.logo
  const showLogo = createCampaignStates.campaignStudio.showLogo
  const buttonText = createCampaignStates.campaignStudio.buttonText
  const showCouponButtonText = createCampaignStates.campaignStudio.showCouponButtonText
  const confirmationButtonText = createCampaignStates.campaignStudio.confirmationButtonText
  const durationHeadline = createCampaignStates.campaignStudio.durationHeadline
  const durationCountdownDays = createCampaignStates.campaignStudio.durationCountdownDays
  const durationCountdownHours = createCampaignStates.campaignStudio.durationCountdownHours
  const durationCountdownMinutes = createCampaignStates.campaignStudio.durationCountdownMinutes
  const durationText = createCampaignStates.campaignStudio.durationText
  const durationMechanism = createCampaignStates.campaignStudio.durationMechanism
  const title = createCampaignStates.campaignStudio.title
  const disclaimer = createCampaignStates.campaignStudio.disclaimer
  const percentPosition = createCampaignStates.campaignStudio.percentPosition
  const percentBold = createCampaignStates.campaignStudio.percentBold
  const leftSubTitle = createCampaignStates.campaignStudio.leftSubTitle
  const rightSubTitle = createCampaignStates.campaignStudio.rightSubTitle
  const reminderIsActive = createCampaignStates.campaignStudio.reminderIsActive
  const isCouponCodeVisible = createCampaignStates.campaignStudio.isCouponCodeVisible


  useEffect(() => {
    if (mobileOrDesktop.indexOf('Display on desktops') > -1 || mobileOrDesktop.indexOf('All devices') > -1 || mobileOrDesktop.indexOf('Display on tablets') > -1) {
      setShowDesktop(true)
    } else {
      setIsMobile(true)
      setShowDesktop(false)
    }
    if (mobileOrDesktop.indexOf('Display on mobiles') > -1 || mobileOrDesktop.indexOf('All devices') > -1) {
      setShowMobile(true)
    } else {
      setIsMobile(false)
      setShowMobile(false)
    }
  }, [mobileOrDesktop])

  const buttonTextChange = (text) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignStudio: {
        ...createCampaignStates.campaignStudio,
        buttonText: text
      }
    })
  };

  const coverImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64String = event.target.result as string;
          setCreateCampaignStates({
            ...createCampaignStates,
            campaignStudio: {
              ...createCampaignStates.campaignStudio,
              coverImage: base64String.toString()
            }
          })
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          coverImage: ""
        }
      })
    }
  };

  const logoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64String = event.target.result as string;
          setCreateCampaignStates({
            ...createCampaignStates,
            campaignStudio: {
              ...createCampaignStates.campaignStudio,
              logo: base64String.toString()
            }
          })
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          logo: ""
        }
      })
    }
  };

  const disclaimerChange = (text) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignStudio: {
        ...createCampaignStates.campaignStudio,
        disclaimer: text
      }
    })
  };

  const selectDurationMechanism = (type) => {
    setCreateCampaignStates({
      ...createCampaignStates,
      campaignStudio: {
        ...createCampaignStates.campaignStudio,
        durationMechanism: type
      }
    })
  };

  const changeDurationDays = (e) => {
    if (e.target.value < 0) return null
    let value = parseInt(e.target.value);
    if (value >= 0 || value < 60) {

      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          durationCountdownDays: String(value)
        }
      })
    }
  };

  const changeDurationDaysBlur = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 0 || value < 60) {
      if (value < 10) {

        setCreateCampaignStates({
          ...createCampaignStates,
          campaignStudio: {
            ...createCampaignStates.campaignStudio,
            durationCountdownDays: ("0" + String(value))
          }
        })
      }
    } else {

      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          durationCountdownDays: "01"
        }
      })
    }
  };

  const changeDurationHours = (e) => {
    if (e.target.value < 0) return null
    let value = parseInt(e.target.value);
    if (value >= 0 || value < 60) {

      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          durationCountdownHours: String(value)
        }
      })
    }
  };

  const changeDurationHoursBlur = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 0 || value < 60) {
      if (value < 10) {

        setCreateCampaignStates({
          ...createCampaignStates,
          campaignStudio: {
            ...createCampaignStates.campaignStudio,
            durationCountdownHours: ("0" + String(value))
          }
        })
      }
    } else {

      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          durationCountdownHours: "01"
        }
      })
    }
  };

  const changeDurationMinutes = (e) => {
    if (e.target.value < 0) return null
    let value = parseInt(e.target.value);
    if (value >= 0 || value < 60) {
      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          durationCountdownMinutes: String(value)
        }
      })
    }
  };

  const changeDurationMinutesBlur = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 0 || value < 60) {
      if (value < 10) {
        setCreateCampaignStates({
          ...createCampaignStates,
          campaignStudio: {
            ...createCampaignStates.campaignStudio,
            durationCountdownMinutes: ("0" + String(value))
          }
        })
      }
    } else {
      setCreateCampaignStates({
        ...createCampaignStates,
        campaignStudio: {
          ...createCampaignStates.campaignStudio,
          durationCountdownMinutes: "01"
        }
      })
    }
  };

  /////----------REMINDER ------- /////

  const [color, setColor] = useState("#3C53F4");
  const [pos, setPos] = useState("left-bottom");
  const [pos1, setPos1] = useState({ left: "0" });
  const [pos2, setPos2] = useState({ bottom: 0 });
  const [pos3, setPos3] = useState(0);
  const [pos4, setPos4] = useState(0);
  const [reminderText, setReminderText] = useState(
    "Get Your Code"
  );

  const selectPosition = (pos, pos1, pos2, pos3, pos4) => {
    setPos(pos);
    setPos1(pos1);
    setPos2(pos2);
    setPos3(pos3);
    setPos4(pos4);
  };

  const reminderTextChange = (e) => {
    if (e.target.value.length < 26) {
      setReminderText(e.target.value);
    }
  };

  return (
    <div className="w-100 h-100">
      <div className="row align-items-top">
        <div id="container" className="col-lg-4 col-12 overflow-auto">
          <div id="header" className="pt-4">
            {/* <h2 className="fw-bolder text-dark d-md-none">Studio</h2> */}
            <h2 className="fw-bolder text-dark">Studio</h2>
            <div className="text-gray-400 fw-bold fs-6 d-none">
              If you need more info, please check out
            </div>
          </div>
          <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
            <li className="nav-item">
              <a
                onClick={() => setReminderTabIsVisible(false)}
                className="nav-link active fw-bold"
                data-bs-toggle="tab"
                href="#promotion_tab"
              >
                Promotion
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => setReminderTabIsVisible(true)}
                className="nav-link  fw-bold"
                data-bs-toggle="tab"
                href="#reminder_tab"
              >
                <span
                  className={reminderIsActive ? "text-success" : "text-danger"}
                >
                  Reminder
                </span>
              </a>
            </li>
          </ul>
          <div className="tab-content" id="setFourTab">
            <div
              className="tab-pane fade show active"
              id="promotion_tab"
              role="tabpanel"
            >
              <div className=" mt-5">
                <p>
                  See some text in the incentive you'd like to change? You can
                  edit below.
                </p>
                <div className="fv-row mb-7 pb-7 border-bottom mt-5">
                  <label className="form-label required">Cover Image</label>

                  <div className="d-flex gap-4 ">
                    <div
                      className="upload-content position-relative w-100 d-flex align-items-center justify-content-center bg-light rounded p-4"
                      style={{ minHeight: "50px" }}
                    >
                      <input
                        className="file-uploader position-absolute w-100 h-100 opacity-0 cursor-pointer top-0 start-0"
                        type="file"
                        accept="image/*"
                        onChange={coverImageChange}
                      />
                      <div className=" d-flex flex-column align-items-center">
                        <div className=" d-flex  text-center  align-items-center text-dark">
                          <KTIcon
                            iconName="plus"
                            className="fw-bolder fs-3 me-2"
                          />
                          Cover image
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-100 d-flex text-center align-items-center justify-content-center bg-light rounded p-4 cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#UnsplashImagesModal"
                    >
                      {" "}
                      <KTIcon
                        iconName="plus"
                        className="fw-bolder fs-3 me-2 "
                      />
                      Unsplash images
                    </div>
                  </div>
                </div>

                <UnsplashImagesModal />

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label required">Logo</label>
                  <label className="form-check form-switch form-check-custom form-check-solid align-items-center mb-2">
                    <input
                      className="form-check-input me-5"
                      type="checkbox"
                      defaultChecked={showLogo}
                      style={{ height: 22 }}
                      onChange={(e) =>
                        setCreateCampaignStates({
                          ...createCampaignStates,
                          campaignStudio: {
                            ...createCampaignStates.campaignStudio,
                            showLogo: e.target.checked
                          }
                        })}
                    />
                    <div className="d-flex flex-column ">
                      <span className="form-label mb-0">
                        Show Logo
                      </span>
                    </div>
                  </label>
                  <div
                    className="upload-content position-relative w-100 d-flex align-items-center justify-content-center bg-light rounded p-4"
                    style={{ minHeight: "50px" }}
                  >
                    <input
                      className="file-uploader position-absolute w-100 h-100 opacity-0 cursor-pointer top-0 start-0"
                      type="file"
                      accept="image/*"
                      onChange={logoChange}
                    />
                    <div className=" d-flex flex-column align-items-center">
                      <div className=" d-flex  align-items-center text-dark  ">
                        <KTIcon
                          iconName="plus"
                          className="fw-bolder fs-3 me-2 "
                        />{" "}
                        Select your logo
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label required">Header</label>
                  <TextEditor value={title} onChange={(text) => setCreateCampaignStates({
                    ...createCampaignStates,
                    campaignStudio: {
                      ...createCampaignStates.campaignStudio,
                      title: text
                    }
                  })} />
                  {/* <Field
                    name="businessName"
                    className="form-control form-control-lg form-control-solid"
                    value={title}
                    onChange={titleChange}
                  /> */}
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom d-flex flex-column">
                  <label className="form-label required">Subheader</label>
                  <div className="d-flex gap-2 flex-column mb-5 mt-1">
                    <label className="form-check form-switch form-check-custom form-check-solid align-items-center gap-2">
                      <input
                        className="form-check-input me-2"
                        style={{
                          height: 22
                        }}
                        type="checkbox"
                        defaultChecked={percentPosition}
                        onChange={(e) => setCreateCampaignStates({
                          ...createCampaignStates,
                          campaignStudio: {
                            ...createCampaignStates.campaignStudio,
                            percentPosition: e.target.checked
                          }
                        })}
                      />
                      <div className="d-flex flex-column">
                        <span className="form-label mb-0">
                          Percent position {percentPosition ? '(%X)' : '(X%)'}
                        </span>
                      </div>
                    </label>
                    <label className="form-check form-switch form-check-custom form-check-solid align-items-center gap-2">
                      <input
                        className="form-check-input me-2"
                        style={{
                          height: 22
                        }}
                        type="checkbox"
                        defaultChecked={percentBold}
                        onChange={(e) => setCreateCampaignStates({
                          ...createCampaignStates,
                          campaignStudio: {
                            ...createCampaignStates.campaignStudio,
                            percentBold: e.target.checked
                          }
                        })}
                      />
                      <div className="d-flex flex-column ">
                        <span className="form-label mb-0">
                          Percent Font Weight {percentBold ? `(Bold)` : `(Normal)`}
                        </span>
                      </div>
                    </label>
                  </div>
                  <div id='subheader' style={{ background: '#F9F9F9' }} className="row d-flex align-items-center fs-3 py-2 rounded">
                    <div className="mb-0" style={{ width: '47%' }}>
                      <TextEditor value={leftSubTitle} onChange={(text) =>
                        setCreateCampaignStates({
                          ...createCampaignStates,
                          campaignStudio: {
                            ...createCampaignStates.campaignStudio,
                            leftSubTitle: text
                          }
                        })} />
                      {/* <Field
                        name="subTitle"
                        className="form-control form-control-lg form-control-solid"
                        value={leftSubTitle}
                        onChange={(e) => setLeftSubTitle(e.target.value)}
                      /> */}
                    </div>
                    <div style={{ width: '6%' }} className="col-2 text-center fw-bold mb-0 d-flex justify-content-center">
                      %
                    </div>
                    <div className="mb-0 position-relative" style={{ width: '47%' }}>
                      <TextEditor value={rightSubTitle} onChange={(text) => setCreateCampaignStates({
                        ...createCampaignStates,
                        campaignStudio: {
                          ...createCampaignStates.campaignStudio,
                          rightSubTitle: text
                        }
                      })} />
                      {/* <Field
                        name="subTitle"
                        className="form-control form-control-lg form-control-solid"
                        value={rightSubTitle}
                        onChange={(e) => setRightSubTitle(e.target.value)}
                      /> */}
                    </div>
                  </div>
                  {/* <Field
                    name="subTitle"
                    className="form-control form-control-lg form-control-solid"
                    value={subTitle}
                    onChange={subTitleChange}
                  /> */}
                </div>

                <div className="d-flex gap-20 mb-7 pb-7 border-bottom">
                  <label className="form-check form-switch form-check-custom form-check-solid align-items-center">
                    <input
                      className="form-check-input me-5"
                      type="checkbox"
                      style={{ height: 22 }}
                      defaultChecked={isCouponCodeVisible}
                      onChange={() => setCreateCampaignStates({
                        ...createCampaignStates,
                        campaignStudio: {
                          ...createCampaignStates.campaignStudio,
                          isCouponCodeVisible: !createCampaignStates.campaignStudio.isCouponCodeVisible
                        }
                      })}
                    />
                    <div className="d-flex flex-column ">
                      <span className="form-label mb-0">
                        Show the code in the incentive
                      </span>
                    </div>
                  </label>
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label">
                    Button Colors
                  </label>
                  <div className="row mt-2">
                    <div className="col-6 d-flex flex-column">
                      <span className="form-label">Background Color</span>
                      <div
                        onClick={() => setShowButtonColors(!showButtonColors)}
                        className="h-40px rounded cursor-pointer"
                        style={{ background: buttonColor }}
                      />
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <span className="form-label">Text Color</span>
                      <div
                        onClick={() => setShowButtonTextColors(!showButtonTextColors)}
                        className="h-40px rounded cursor-pointer border"
                        style={{ background: buttonTextColor }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 mt-2 px-5">
                      {showButtonColors && (
                        <>
                          <HexColorPicker
                            color={buttonColor}
                            onChange={(color) => setCreateCampaignStates({
                              ...createCampaignStates,
                              campaignStudio: {
                                ...createCampaignStates.campaignStudio,
                                buttonColor: color
                              }
                            })}
                            className="w-100"
                          />
                          <Field
                            name="buttonColor"
                            className="form-control form-control-lg form-control-solid mt-2"
                            value={buttonColor}
                            onChange={(e) =>
                              setCreateCampaignStates({
                                ...createCampaignStates,
                                campaignStudio: {
                                  ...createCampaignStates.campaignStudio,
                                  buttonColor: e.target.value
                                }
                              })
                            }
                          />
                        </>
                      )}
                    </div>
                    <div className="col-6 mt-2 px-5">
                      {showButtonTextColors && (
                        <>
                          <HexColorPicker
                            color={buttonTextColor}
                            onChange={(color) => setCreateCampaignStates({
                              ...createCampaignStates,
                              campaignStudio: {
                                ...createCampaignStates.campaignStudio,
                                buttonColor: color
                              }
                            })}
                            className="w-100"
                          />
                          <Field
                            name="buttonTextColor"
                            className="form-control form-control-lg form-control-solid mt-2"
                            value={buttonTextColor}
                            onChange={(e) =>
                              setCreateCampaignStates({
                                ...createCampaignStates,
                                campaignStudio: {
                                  ...createCampaignStates.campaignStudio,
                                  buttonColor: e.target.value
                                }
                              })
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {!isCouponCodeVisible && (
                  <>
                    <div className="fv-row mb-7 pb-7 border-bottom">
                      <label className="form-label required">
                        Show Code Button Text
                      </label>
                      {/* <TextEditor value={showCouponButtonText} onChange={(text) => setShowCouponButtonText(text)} /> */}
                      <Field
                        name="buttonText"
                        className="form-control form-control-lg form-control-solid"
                        value={showCouponButtonText}
                        onChange={(e) =>
                          setCreateCampaignStates({
                            ...createCampaignStates,
                            campaignStudio: {
                              ...createCampaignStates.campaignStudio,
                              showCouponButtonText: e.target.value
                            }
                          })
                        }
                      />
                    </div>
                  </>
                )}

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label required">
                    Copy Button Text
                  </label>
                  {/* <TextEditor value={buttonText} onChange={(text) => buttonTextChange(text)} /> */}
                  <Field
                    name="buttonText"
                    className="form-control form-control-lg form-control-solid"
                    value={buttonText}
                    onChange={(e) => buttonTextChange(e.target.value)}
                  />
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label">
                    <span className="required">Button Confirmation Text</span>
                  </label>
                  {/* <TextEditor value={confirmationButtonText} onChange={(text) => setConfirmationButtonText(text)} /> */}
                  <Field
                    name="businessDescriptor"
                    className="form-control form-control-lg form-control-solid"
                    value={confirmationButtonText}
                    onChange={(e) =>
                      setCreateCampaignStates({
                        ...createCampaignStates,
                        campaignStudio: {
                          ...createCampaignStates.campaignStudio,
                          confirmationButtonText: e.target.value
                        }
                      })}
                  />
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label">
                    <span className="required">Disclaimer</span>
                  </label>

                  <TextEditor value={disclaimer} onChange={(text) => disclaimerChange(text)} />
                  {/* <Field
                    name="businessDescriptor"
                    className="form-control form-control-lg form-control-solid"
                    value={disclaimer}
                    onChange={disclaimerChange}
                  /> */}
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label">
                    <span className="required">Duration Headline</span>
                  </label>
                  <TextEditor value={durationHeadline} onChange={(text) =>
                    setCreateCampaignStates({
                      ...createCampaignStates,
                      campaignStudio: {
                        ...createCampaignStates.campaignStudio,
                        durationHeadline: text
                      }
                    })} />
                  {/* <Field
                    name="businessDescriptor"
                    className="form-control form-control-lg form-control-solid"
                    value={durationHeadline}
                    onChange={(e) => setDurationHeadline(e.target.value)}
                  /> */}
                </div>

                <div className="fv-row mb-7 pb-7 border-bottom">
                  <label className="form-label">
                    <span className="">Duration Mechanism</span>
                  </label>

                  <div className="gap-2 d-flex">
                    <button
                      type="button"
                      onClick={() => selectDurationMechanism("countdown")}
                      className={`${durationMechanism == "countdown"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        } btn btn-sm border flex-grow-1`}
                    >
                      Countdown
                    </button>
                    <button
                      type="button"
                      onClick={() => selectDurationMechanism("text")}
                      className={`${durationMechanism == "text"
                        ? "btn-primary"
                        : "btn-outline-primary "
                        } btn btn-sm border flex-grow-1`}
                    >
                      Text
                    </button>
                  </div>
                </div>
                <div className="fv-row mb-10">
                  {durationMechanism == "countdown" ? (
                    <>
                      <div
                        className="fv-row mb-10"
                      >
                        <label className="form-label">
                          <span className="required">Countdown</span>
                        </label>

                        {" "}
                        <div className="rounded fw-bold d-flex align-items-center">
                          <div className="bg-light rounded d-flex align-items-center">
                            <Field
                              type="number"
                              name="businessDescriptor"
                              className="form-control form-control-lg form-control-solid"
                              value={durationCountdownDays}
                              onChange={changeDurationDays}
                              onBlur={changeDurationDaysBlur}
                            />
                            <div className="text-nowrap mx-2">d</div>
                          </div>
                          <div className="text-nowrap mx-2">:</div>
                          <div className="bg-light rounded d-flex align-items-center">
                            <Field
                              type="number"
                              name="businessDescriptor"
                              className="form-control form-control-lg form-control-solid"
                              value={durationCountdownHours}
                              onChange={changeDurationHours}
                              onBlur={changeDurationHoursBlur}
                            />
                            <div className="text-nowrap mx-2">h</div>
                          </div>
                          <div className="text-nowrap mx-2">:</div>
                          <div className="bg-light rounded d-flex align-items-center">
                            <Field
                              type="number"
                              name="businessDescriptor"
                              className="form-control form-control-lg form-control-solid"
                              value={durationCountdownMinutes}
                              onChange={changeDurationMinutes}
                              onBlur={changeDurationMinutesBlur}
                            />
                            <div className="mx-2">m</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fv-row mb-10">
                        <label className="form-label">
                          <span className="required">Text</span>
                        </label>
                        <TextEditor value={durationText} onChange={(text) => setCreateCampaignStates({
                          ...createCampaignStates,
                          campaignStudio: {
                            ...createCampaignStates.campaignStudio,
                            durationText: text
                          }
                        })} />
                        {/* <Field
                          name="businessDescriptor"
                          className="form-control form-control-lg form-control-solid"
                          value={durationText}
                          onChange={(e) => setDurationText(e.target.value)}
                        /> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="reminder_tab" role="tabpanel">
              <div className=" mt-5">
                <div className="d-flex gap-20">
                  <label className="form-check form-switch form-check-custom form-check-solid align-items-center mb-5">
                    <input
                      className="form-check-input me-5"
                      type="checkbox"
                      defaultChecked={reminderIsActive}
                      onChange={() => setCreateCampaignStates({
                        ...createCampaignStates,
                        campaignStudio: {
                          ...createCampaignStates.campaignStudio,
                          reminderIsActive: !createCampaignStates.campaignStudio.reminderIsActive
                        }
                      })}
                    />
                    <div className="d-flex flex-column ">
                      <span className="form-label mb-0">
                        Show Promotion Reminder
                      </span>
                    </div>
                  </label>
                </div>

                {reminderIsActive && (
                  <>
                    <div className="accordion" id="reminderCollapse">
                      <div className="accordion-item mb-8 shadow border-top">
                        <h2
                          className="accordion-header"
                          id="reminderHeadingOne"
                        >
                          <button
                            className="accordion-button  fs-4 fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#reminderCollapseOne"
                            aria-expanded="false"
                            aria-controls="reminderCollapseOne"
                          >
                            Content
                          </button>
                        </h2>
                        <div
                          id="reminderCollapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="reminderHeadingOne"
                          data-bs-parent="#reminderCollapse"
                        >
                          <div className="accordion-body">
                            <div className="fv-row mb-5">
                              <label className="form-label required">
                                Header
                              </label>
                              <Field
                                name="subTitle"
                                className="form-control form-control-lg form-control-solid mb-1"
                                value={reminderText}
                                onChange={reminderTextChange}
                              />
                              <span className="text-gray-700">Maximum 26 characters</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item mb-8 shadow border-top">
                        <h2
                          className="accordion-header"
                          id="reminderHeadingTwo"
                        >
                          <button
                            className="accordion-button collapsed fs-4 fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#reminderCollapseTwo"
                            aria-expanded="false"
                            aria-controls="reminderCollapseTwo"
                          >
                            Design
                          </button>
                        </h2>
                        <div
                          id="reminderCollapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="reminderHeadingTwo"
                          data-bs-parent="#reminderCollapse"
                        >
                          <div className="accordion-body">
                            <p>Background color:</p>
                            <span
                              className="d-flex text-center align-items-center justify-content-center rounded w-100 text-white mb-3"
                              style={{ backgroundColor: color, height: "48px" }}
                            >
                              Example Text
                            </span>
                            <HexColorPicker
                              color={color}
                              onChange={setColor}
                              className="w-100"
                            />
                            <div className="d-block mt-2">
                              <Field
                                name="businessDescriptor"
                                className="form-control form-control-lg form-control-solid"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item mb-8 shadow border-top">
                        <h2
                          className="accordion-header"
                          id="reminderHeadingThree"
                        >
                          <button
                            className="accordion-button collapsed fs-4 fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#reminderCollapseThree"
                            aria-expanded="false"
                            aria-controls="reminderCollapseThree"
                          >
                            Position
                          </button>
                        </h2>
                        <div
                          id="reminderCollapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="reminderHeadingThree"
                          data-bs-parent="#reminderCollapse"
                        >
                          <div className="accordion-body">
                            <p>
                              Choose the page position on which the Promotion
                              Reminder will pop up
                            </p>
                            <div className="row w-100 gap-2 mt-2 m-0">
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "left-top",
                                    { left: "0" },
                                    { top: 0 },
                                    "0",
                                    "0"
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "left-top"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "center-top",
                                    { left: "50%" },
                                    { top: 0 },
                                    "-50%",
                                    "0"
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "center-top"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "right-top",
                                    { right: 0 },
                                    { top: 0 },
                                    "0",
                                    "0"
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "right-top"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "left-center",
                                    { left: 0 },
                                    { top: "50%" },
                                    "0",
                                    "-50%"
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "left-center"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                className="col-3 bg-secondary h-45px rounded"
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "right-center",
                                    { right: 0 },
                                    { top: "50%" },
                                    "0",
                                    "-50%"
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "right-center"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "left-bottom",
                                    { left: 0 },
                                    { bottom: 0 },
                                    "0",
                                    "0"
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "left-bottom"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "center-bottom",
                                    { left: "50%" },
                                    { bottom: 0 },
                                    "-50%",
                                    0
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "center-bottom"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                              <div
                                onClick={() =>
                                  selectPosition(
                                    "right-bottom",
                                    { right: 0 },
                                    { bottom: 0 },
                                    0,
                                    0
                                  )
                                }
                                className={`cursor-pointer h-45px col-3 border rounded ${pos == "right-bottom"
                                  ? "bg-primary text-light"
                                  : "border-secondary"
                                  }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-12 d-flex flex-column align-items-center justify-content-center px-4">
          <div className='w-100 d-flex gap-4 align-items-center pb-4'>
            <div
              onClick={() => {
                if (!reminderTabIsVisible) {
                  setIsMobile(false)
                }
              }}
              className={`${reminderTabIsVisible ? 'border-white' : !isMobile ? 'border-primary' : 'border-white'} ${!reminderTabIsVisible && 'cursor-pointer'} border-2 border-bottom pb-2 px-2 d-flex flex-column align-items-center`}
            >
              {!reminderTabIsVisible ? <CiLaptop className='w-25px h-25px' /> : <div className="w-25px h-25px" />}
              {!reminderTabIsVisible ? <GoDotFill className={`w-10px h-10px ${showDesktop ? 'text-success' : 'text-danger'}`} /> : <div className="w-10px h-10px" />}
            </div>
            <div
              onClick={() => {
                if (!reminderTabIsVisible) {
                  setIsMobile(true)
                }
              }}
              className={`${reminderTabIsVisible ? 'border-white' : isMobile ? 'border-primary' : 'border-white'} ${!reminderTabIsVisible && 'cursor-pointer'} border-2 border-bottom pb-2 px-2 d-flex flex-column align-items-center`}
            >
              {!reminderTabIsVisible ? <CiMobile1 className='w-25px h-25px' /> : <div className="w-25px h-25px" />}
              {!reminderTabIsVisible ? <GoDotFill className={`w-10px h-10px ${showMobile ? 'text-success' : 'text-danger'}`} /> : <div className="w-10px h-10px" />}
            </div>
          </div>
          <div
            className="w-100 rounded-3 position-relative"
            style={{
              top: 0,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 100%), linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1) 100%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0px 0px, 10px 10px",
              padding: 10
            }}
          >
            {(!reminderIsActive || !reminderTabIsVisible) &&
              <WidePopup
                isPropsMobile={isMobile}
                title={title}
                disclaimer={disclaimer}
                buttonText={buttonText}
                buttonColor={buttonColor}
                buttonTextColor={buttonTextColor}
                leftSubTitle={leftSubTitle}
                rightSubTitle={rightSubTitle}
                percentPosition={percentPosition}
                percentBold={percentBold}
                image={coverImage}
                logo={logo}
                showLogo={showLogo}
                isCouponVisible={isCouponCodeVisible}
                durationHeadline={durationHeadline}
                durationMechanism={durationMechanism}
                durationText={durationText}
                durationCountdownDays={durationCountdownDays}
                durationCountdownHours={durationCountdownHours}
                durationCountdownMinutes={durationCountdownMinutes}
                showCouponButtonText={showCouponButtonText}
              />
            }
            {(reminderIsActive && reminderTabIsVisible) && (
              <div
                style={{ minHeight: 500 }}
                className={`w-100 h-100 ${!reminderTabIsVisible && "opacity-0"}`}
              >
                <>
                  <div
                    className={`rounded-circle position-absolute m-5 p-3 fw-bold text-white d-flex align-items-center justify-content-center text-center`}
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: color,
                      ...pos1,
                      ...pos2,
                      transform: `translate(${pos3},${pos4})`,
                    }}
                  >
                    <span
                      style={{ wordWrap: 'break-word', width: 80 }}
                    // className="d-flex align-items-center justify-content-center"
                    >{reminderText}</span>
                    <div
                      className="cursor-pointer position-absolute top-0 end-0 fs-4 text-white bg-dark rounded-circle d-flex align-items-center justify-content-center w-20px h-20px mt-1 me-1"
                    >
                      <IoClose className='w-15px h-15px' />
                    </div>
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export { Step4 };
