import React from 'react'
import { useAuth } from '../../../auth';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../../store/jotai/UserAtom';

function OnboardingFooter() {
  const [currentUser, setCurrentUser] = useAtom(userAtom)
  // NEW AUTH
  // const { currentUser, logout } = useAuth();

  if (!currentUser?.name) return null
  return (
    <>
      <div className='position-absolute pb-5' style={{ bottom: '1em' }}>
        You are logged in as <strong>{currentUser.email}</strong>.{' '}
        <a href='' onClick={()=>setCurrentUser({})} className='link-primary fw-bolder'>
          Log out
        </a>
      </div>
    </>
  )
}

export default OnboardingFooter
