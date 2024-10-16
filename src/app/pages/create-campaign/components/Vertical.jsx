import { useEffect, useRef, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { Step4 } from "./steps/Step4";
import { Step5 } from "./steps/Step5";
import { StepperComponent } from "../../../../_metronic/assets/ts/components";
import { Form, Formik } from "formik";
import {
  createAccountSchemas,
  inits,
} from "./CreateAccountWizardHelper";
import { useNavigate } from "react-router-dom";
import PublishCampaignModal from "../../../../_metronic/layout/components/modals/PublishCampaignModal";
import { CustomModal } from "../../../modules/customComponents/CustomModal";
import { useAtom } from "jotai";
import { createCampaignAtom } from "../../../../store/jotai/CreateCampaignAtom";

const Vertical = () => {
  const [createCampaignStates, setCreateCampaignStates] = useAtom(createCampaignAtom)
  const storePageNum = createCampaignStates.pageNum
  const navigate = useNavigate();
  const stepperRef = useRef(null);
  const stepper = useRef(null);
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0]);
  const [currentNum, setCurrentNum] = useState(0);
  const [initValues] = useState(inits);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [mobileOrDesktop, setMobileDesktop] = useState(["All devices"])

  useEffect(() => {

    goPage(createCampaignStates.pageNum)

  }, [createCampaignStates.pageNum])

  useEffect(() => {
    /// sayfa ilk açıldığında resetle

    //campaignSchedule
    const today = new Date();
    const tenYearsLater = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
    const defaultCampaignSchedule = {
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
    const defaultDiscountRange = {
      minPercentage: 0,
      maxPercentage: 0,
      selectedGoal: null,
    }

    //campaignLimit
    const defaultCampaignLimit = {
      singleValue: 5,
      minValue: 3,
      maxValue: 5,
      selectedOption: "None",
      selectedOptionDetail: "radioButtonOne"
    }

    setCreateCampaignStates({
      ...createCampaignStates,
      campaignSchedule: { ...defaultCampaignSchedule },
      discountRange: { ...defaultDiscountRange },
      campaignLimit: { ...defaultCampaignLimit },
      pageNum: 1,
      collapseNum: 1,
      campaignName: { title: "Untitled Campaign" }
    })

    const searchParams = new URLSearchParams(document.location.search);
    if (searchParams.get("type") == "quick") {
      //// hızlı seçim yapılırsa güncelle

      setCreateCampaignStates({
        ...createCampaignStates,
        pageNum: 4
      })
    }
  }, []);

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(
      stepperRef.current
    );
  };

  const prevStep = () => {
    if (!stepper.current) {
      return;
    }
    stepper.current.goPrev();
    setCurrentNum((current) => currentNum - 1);
    setCreateCampaignStates({
      ...createCampaignStates,
      pageNum: stepper.current.currentStepIndex,
      collapseNum: 1
    })
    setCurrentSchema(
      createAccountSchemas[stepper.current.currentStepIndex - 1]
    );
  };

  const nextStep = () => {
    if (!stepper.current) {
      return;
    }
    stepper.current.goNext();
    setCurrentNum((current) => currentNum + 1);
    setCreateCampaignStates({
      ...createCampaignStates,
      pageNum: stepper.current.currentStepIndex,
      collapseNum: 1
    })
    setCurrentSchema(
      createAccountSchemas[stepper.current.currentStepIndex + 1]
    );
  };


  const goPage = (num) => {
    if (!stepper.current) {
      return;
    }


    const difference = num - stepper.current.currentStepIndex;
    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        stepper.current.goNext();
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        stepper.current.goPrev();
      }
    }

    setCurrentNum(num);

    setCurrentSchema(
      createAccountSchemas[num]
    );

  };

  const submitStep = (values, actions) => {
    if (!stepper.current) {
      return;
    }

    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext();
      setCurrentNum((current) => currentNum + 1);
    } else {
      stepper.current.goto(1);
      actions.resetForm();
    }

    setCurrentSchema(
      createAccountSchemas[stepper.current.currentStepIndex - 1]
    );
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return;
    }

    loadStepper();
  }, [stepperRef]);

  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <div
        ref={stepperRef}
        className="stepper stepper-pills stepper-column d-flex flex-column flex-md-row flex-row-fluid"
        id="kt_create_account_stepper"
      >
        {showInstallModal && (
          <CustomModal
            title="Good job, let's set it up on your website!"
            Content={() => <span>Your campaign is ready. Install Snooky.io on your website to display this campaign to your visitors.</span>}
            submitBtnClassName="btn-primary"
            setShowModal={setShowInstallModal}
            cancelBtnTitle="Later"
            submitBtnTitle="Install Snooky.io"
            onPressSubmitButton={() => {
              setShowInstallModal(false)
              navigate('/settings?tab=Install')
            }}
          />
        )}

        <div
          className="stepper stepper-links d-flex d-md-none flex-column pt-15"
          id="kt_create_account_stepper"
        >
          <div className="d-flex mx-auto mw-600px w-100 pt-5">
            <div className="stepwizard-tablist mw-75 m-auto">
              <ul className="stepwizard-tablist-list">
                <li
                  className={`stepwizard-tablist-list-item ${currentNum == 0 && "current"
                    } ${currentNum > 0 && "completed"}`}
                ></li>
                <li
                  className={`stepwizard-tablist-list-item ${currentNum == 1 && "current"
                    } ${currentNum > 1 && "completed"}`}
                ></li>
                <li
                  className={`stepwizard-tablist-list-item ${currentNum == 2 && "current"
                    } ${currentNum > 2 && "completed"}`}
                ></li>
                <li
                  className={`stepwizard-tablist-list-item ${currentNum == 3 && "current"
                    } ${currentNum > 3 && "completed"}`}
                ></li>
                <li
                  className={`stepwizard-tablist-list-item ${currentNum == 4 && "current"
                    } ${currentNum > 4 && "completed"}`}
                ></li>
              </ul>
            </div>
          </div>
        </div>
        {/* begin::Aside*/}
        <div className="card d-none d-md-flex justify-content-center justify-content-xl-start flex-row w-100 w-md-200px w-xxl-300px me-2">
          {/* begin::Wrapper*/}
          <div
            className="card-body px-3 px-lg-6 px-xxl-10 py-10 d-flex align-items-center position-sticky top-0"
            style={{ height: "100vh" }}
          >
            {/* begin::Nav*/}
            <div className="stepper-nav">
              {/* begin::Step 1*/}
              <div
                className="stepper-item current"
                data-kt-stepper-element="nav"
              >
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h4 className="stepper-title">Goal</h4>

                    <div className="stepper-desc fw-semibold d-none">
                      Setup Your Account Details
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">2</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h4 className="stepper-title">Template</h4>
                    <div className="stepper-desc fw-semibold d-none">
                      Setup Your Account Settings
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 3*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h4 className="stepper-title">Settings</h4>
                    <div className="stepper-desc fw-semibold d-none">
                      Your Business Related Info
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}

              {/* begin::Step 4*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">4</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h4 className="stepper-title">Studio</h4>
                    <div className="stepper-desc fw-semibold d-none">
                      Set Your Payment Methods
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 4*/}

              {/* begin::Step 5*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">5</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h4 className="stepper-title">Review</h4>
                    <div className="stepper-desc fw-semibold d-none">
                      Woah, we are here
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}
              </div>
              {/* end::Step 5*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* end::Wrapper*/}
        </div>
        {/* begin::Aside*/}
        <div
          className="d-flex flex-row-fluid bg-body rounded"
          style={{ flexBasis: "100%" }}
        >
          <Formik
            validationSchema={currentSchema}
            initialValues={initValues}
            onSubmit={submitStep}
          >
            {() => (
              <Form
                className="w-100 px-5"
                noValidate
                id="kt_create_account_form"
              >
                <div className="current" data-kt-stepper-element="content">
                  <Step1 />
                </div>

                <div data-kt-stepper-element="content">
                  <Step2 />
                </div>

                <div data-kt-stepper-element="content">
                  <Step3 setMobileDesktop={setMobileDesktop} />
                </div>

                <div data-kt-stepper-element="content">
                  <Step4 mobileOrDesktop={mobileOrDesktop} />
                </div>

                <div data-kt-stepper-element="content">
                  <Step5 />
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* begin::modalCloseCreateCampaign */}

      <div className="position-absolute end-0 m-4 d-flex align-items-center">
        <div className="d-flex flex-stack">
          {storePageNum !== 1 && (
            <div className="mr-2">
              <button
                onClick={prevStep}
                type="button"
                className="btn btn-lg btn-light-primary btn-sm me-3"
                data-kt-stepper-action="previous"
              >
                <KTIcon iconName="arrow-left" className="fs-4 me-1" />
                Back
              </button>
            </div>
          )}

          <div>
            {!!stepper.current?.currentStepIndex &&
              stepper.current?.currentStepIndex ===
              stepper.current?.totalStepsNumber ? (
              <>
                {" "}
                <button
                  type='button'
                  data-bs-toggle="modal"
                  data-bs-target="#publishCampaignModal"
                  className="btn btn-sm btn-success me-3"
                >
                  <span className="indicator-label d-flex align-items-center">
                    Publish{" "}
                    <KTIcon
                      iconName="rocket"
                      className="fs-2 ms-2 me-0 text-dark"
                    />
                  </span>
                </button>
              </>
            ) : (
              <>
                {stepper.current?.currentStepIndex > 2 && (<>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-3"
                    onClick={nextStep}
                  >
                    <span className="indicator-label d-flex align-items-center">
                      Continue{" "}
                      <KTIcon
                        iconName="arrow-right"
                        className="fs-3 ms-2 me-0"
                      />
                    </span>
                  </button>
                </>)}
              </>
            )}
          </div>
        </div>
        <button
          className="btn btn-sm btn-danger rounded"
          data-bs-toggle="modal"
          data-bs-target="#closeCreateCampaign"
        >
          Save & Exit
        </button>
      </div>

      {!!stepper.current?.currentStepIndex &&
        stepper.current?.currentStepIndex ===
        stepper.current?.totalStepsNumber && (
          <>
            <button
              type="button"
              className="position-absolute d-flex btn btn-success rounded btn-sm m-4 "
              data-bs-toggle="modal"
              data-bs-target="#publishCampaignModal"
              style={{ right: "110px" }}
            >
              <span className="indicator-label d-flex align-items-center">
                Publish{" "}
                <KTIcon
                  iconName="rocket"
                  className="fs-2 ms-2 me-0 text-dark"
                />
              </span>
            </button>
          </>
        )}

      <div className="modal fade" id="closeCreateCampaign">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Save & Exit</h3>

              <div
                className="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>

            <div className="modal-body">
              <div className="d-flex">
                <KTIcon
                  iconName="information-5"
                  className="fs-2tx text-primary me-4"
                />

                <div className="d-block d-sm-flex flex-stack flex-grow-1">
                  <div className="fw-bold">
                    <div className="fs-6 text-gray-600">
                      Are you sure you want to exit?
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block mt-5 end-0 position-relative d-flex justify-content-center">
                <button
                  className="btn btn-sm btn-success fw-bold me-4"
                  data-bs-dismiss="modal"
                  onClick={() => goHome()}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-danger fw-bold me-4"
                  data-bs-dismiss="modal"
                >
                  Dismiss
                </button>
                <button
                  data-bs-dismiss="modal"
                  onClick={() => goHome()}
                  className="btn btn-sm btn-secondary fw-bold"
                >
                  Yes, Close Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end::modalCloseCreateCampaign */}
      <PublishCampaignModal />
    </>
  );
};

export { Vertical };
