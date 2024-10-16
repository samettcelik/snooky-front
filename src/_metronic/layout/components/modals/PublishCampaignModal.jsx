import { React, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ModalComponent from './ModalComponent'
import { CustomModal } from '../../../../app/modules/customComponents/CustomModal';
import { useNavigate } from 'react-router-dom';
function PublishCampaignModal() {
  const [showInstallModal, setShowInstallModal] = useState(false);

  const publishCampaign = () => {
    setShowInstallModal(true)
  }

  const navigate = useNavigate()


  return (
    <>
      <ToastContainer />
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

      <ModalComponent ids={'publishCampaignModal'} onSubmit={publishCampaign} title={'Publish Campaign'} submitText={'Publish'} submitBg={'btn btn-primary'} discardText={'Cancel'} discardBg={'btn btn-light'}>
        <div className="menu-item">
          Untitled campaign will be live on your website.
        </div>
      </ModalComponent>
    </>
  )
}

export default PublishCampaignModal