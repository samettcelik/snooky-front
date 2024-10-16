import { useEffect, useState } from 'react';
import ModalComponent from './ModalComponent';
import { useAuth } from '../../../../app/modules/auth';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../store/jotai/UserAtom';
function EditDeactivateAccount() {
    const [email, setEmail] = useState('')
    const [currentUser, setCurrentUser] = useAtom(userAtom)
    // NEW AUTH
    // const { currentUser } = useAuth()

    return (
        <>
            <ModalComponent sumbitBtnDisabled={email !== currentUser.email} ids={'EditDeactivateAccount'} title={'Are you sure?'} submitText={'Yes, Deactivate My Account'} submitBg={'btn btn-primary'} discardText={'Discard'} discardBg={'btn btn-light'}>
                <div className="menu-item">
                    <span>Deactivating your account will remove all of your information from our database. This cannot be undone.</span>
                    <input
                        type='email'
                        className='form-control form-control-lg form-control-solid mt-6'
                        id='emailaddress'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </ModalComponent>
        </>
    )
}

export default EditDeactivateAccount