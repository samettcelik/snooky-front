import React, { useState, useEffect } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { SendInstructions } from "./SendInstructions";
import { useAtom } from "jotai";
import { domainAtom } from "../../../store/jotai/DomainAtom";



const InstallScreen = () => {
  const [currentDomain, setCurrentDomain] = useAtom(domainAtom)
  const [loading, setLoading] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null)
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)

  const customScriptCode = () => {
    return `<!-- Custom code -->
    <script>
      (function () {
        document.addEventListener("DOMContentLoaded", function () {
          !function () {
            let ic = 'asd',
              e = 'xyz',
              t = new URLSearchParams(window.location.search).get("fpRoute"),
              a = e + 'frame/view/' + ic;
          }()
        }, !1);
      })();
    </script>
    <iframe src="" style="width: 100%; min-height: 100vh; display: block; border: 0;" id="equotaCustomerIframe"></iframe>
    <!-- Custom code -->`;
  };

  const gtmScriptCode = () => {
    return `<!-- Custom HTML -->
<script>
  (function () {
    document.addEventListener("DOMContentLoaded", function () {
      !function () {
    }, !1);
  })();
</script>
<iframe src="" style="width: 100%; min-height: 100vh; display: block; border: 0;" id="equotaCustomerIframe"></iframe>
<!-- Custom HTML -->`

  };

  const shopifyScriptCode = () => {
    return `&lt;!-- Shopify code --&gt;
&lt;script&gt;
  (function () {
    document.addEventListener("DOMContentLoaded", function () {
      !function () {
        let ic = 'asd',
          e = 'xyz',
          a = e + 'frame/view/' + ic;
      }()
    }, !1);
  })();
&lt;/script&gt;
&lt;!-- Shopify code --&gt;`;
  };

  const convertCodeVisible = (codeBlock) => {
    return codeBlock.split("&lt;").join("<").split("&gt;").join(">");
  };

  const getCurrentDomain = currentDomain.currentDomain

  useEffect(() => {
    setSelectedCode(customScriptCode())
  }, [])

  const copyCode = () => {
    navigator.clipboard.writeText(selectedCode);
    toast.success('Code copied', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {

  }, [getCurrentDomain])


  return (
    <>
      {showInstructionsModal && <SendInstructions setShowModal={setShowInstructionsModal} email="burakyildirimdev@gmail.com" />}
      <ToastContainer />
      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
        <li
          onClick={() => setSelectedCode(customScriptCode())}
          className="nav-item"
        >
          <a
            className="nav-link active text-gray-800"
            data-bs-toggle="tab"
            href="#kt_tab_pane_4"
          >
            Custom
          </a>
        </li>
        <li
          onClick={() => setSelectedCode(gtmScriptCode())}
          className="nav-item"
        >
          <a className="nav-link text-gray-800" data-bs-toggle="tab" href="#kt_tab_pane_5">
            GTM
          </a>
        </li>
        <li
          className="nav-item"
          onClick={() => setSelectedCode(null)}
        >
          <a className="nav-link text-gray-800" data-bs-toggle="tab" href="#kt_tab_pane_6">
            Shopify
          </a>
        </li>
      </ul>

      <div className="card">
        {selectedCode && (
          <div className="card-header border-0">
            <div className="card-title m-0 d-flex justify-content-between w-100">
              <h3 className="fw-bolder m-0">
                Install Snooky.io on {getCurrentDomain?.label}
              </h3>
              <button
                id="check_verify_submit_btn"
                type="submit"
                className="btn btn-success fw-bold"
              >
                Check Verify
              </button>
            </div>
          </div>
        )}
        <div className="card-body border-top p-9 pt-6 pb-6">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="kt_tab_pane_4"
              role="tabpanel"
            >
              <span className="mb-4 d-block">
                Embed code that works on all website platforms.
              </span>
              <div className="d-block bg-light rounded p-3 position-relative">
                <div onClick={copyCode} className="cursor-pointer position-absolute top-0 end-0 d-flex py-1 px-2 align-items-center gap-2 bg-gray-300 rounded text-gray-900 mt-2 me-2">
                  <span className="fs-sm fw-medium">Copy</span>
                  <FaRegCopy />
                </div>
                <pre>
                  <p>{convertCodeVisible(customScriptCode())}</p>
                </pre>
              </div>
              <span className="mt-2 d-block">
                Copy and paste the{" "}
                <strong>
                  embed code above just before the closing &lt;/body&gt; tag
                </strong>{" "}
                of your website template file.
              </span>
            </div>
            <div className="tab-pane fade" id="kt_tab_pane_5" role="tabpanel">
              <div className="d-flex flex-column mb-2">
                <span className="fw-bold">1. Copy your embeded code</span>
                <p className="mt-2">Choose "Custom HTML" under Tag Configuration and paste the Snooky embed code after copying it from below.</p>
              </div>
              <div className="d-block bg-light rounded p-3 position-relative">
                <div onClick={copyCode} className="cursor-pointer position-absolute top-0 end-0 d-flex py-1 px-2 align-items-center gap-2 bg-gray-300 rounded text-gray-900 mt-2 me-2">
                  <span className="fs-sm fw-medium">Copy</span>
                  <FaRegCopy />
                </div>
                <pre>
                  <p>{convertCodeVisible(gtmScriptCode())}</p>
                </pre>
              </div>
              <div className="d-flex flex-column mt-4" style={{ marginBottom: -10 }}>
                <span className="fw-bold">2. Go to your Google Tag Manager</span>
                <p className="mt-2">Navigate to "All Pages". After Configuring the triggers, click "Save". Once you're done, click the "Submit" button. Remembar to publish any changes you've made.</p>
              </div>
            </div>
            <div className="tab-pane fade" id="kt_tab_pane_6" role="tabpanel">
              <div className="d-flex flex-column justify-content-center align-items-center p-7">
                <div className="d-flex">
                  <div style={{ background: 'white' }} className="border border-secondary w-70px h-70px d-flex justify-content-center align-items-center rounded-circle">
                    <img
                      className='h-55px'
                      src={toAbsoluteUrl('/media/logos/Snooky-Logo-square.png')}
                      alt='Snooky'
                    />
                  </div>
                  <div style={{ marginLeft: -5, background: 'white' }} className="border border-secondary w-70px h-70px d-flex justify-content-center align-items-center rounded-circle">
                    <img
                      className='h-40px'
                      src={toAbsoluteUrl('/media/logos/shopify.png')}
                      alt='Shopify'
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <h5 className="text-center" style={{ fontSize: '1.7rem' }}>Connect your Shopify <br /> Account to Snooky.io</h5>
                  <div style={{ background: '#066766', border: 0 }} className="cursor-pointer mt-8 h-40px position-relative text-white px-20 rounded fs-lg fw-bold d-flex justify-content-center align-items-center">
                    <div className="bg-white rounded position-absolute start-0 ms-2">
                      <img
                        className='w-30px p-1'
                        src={toAbsoluteUrl('/media/logos/shopify.png')}
                        alt='Shopify'
                      />
                    </div>
                    Go To Shopify App
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedCode && (
        <div className="card mt-5">
          <div className="card-header border-0">
            <div className="card-title m-0">
              <h3 className="fw-bolder m-0">
                Send instruction to your developer
              </h3>
            </div>
          </div>
          <div id="kt_account_deactivate" className="collapse show">
            <form id="kt_account_deactivate_form" className="form">
              <div className="card-body border-top p-9">
                <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6">
                  <KTIcon
                    iconName="information-5"
                    className="fs-2tx text-warning me-4"
                  />
                  <div className="d-flex flex-stack flex-grow-1">
                    <div className="fw-bold w-100">
                      <div className="fs-6 text-gray-600 mt-2">
                        Instruction consists of setting up the code snippet to your website.
                      </div>
                      <div className="d-flex gap-4 my-3">
                        <div className="d-flex w-50">
                          <input
                            type="text"
                            className="form-control form-control-lg form-control-solid h-45px"
                            placeholder="E-mail Address"
                          />
                        </div>
                        <div
                          id="send_instructions_submit_btn"
                          onClick={() => setShowInstructionsModal(true)}
                          className="btn btn-danger fw-bold  h-45px"
                        >
                          {!loading && "Send Instructions"}
                          {loading && (
                            <span
                              className="indicator-progress"
                              style={{ display: "block" }}
                            >
                              Please wait...{" "}
                              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallScreen;
