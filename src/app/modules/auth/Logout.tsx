import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../../store/jotai/UserAtom';

export function Logout() {
  const [_, setUser] = useAtom(userAtom);

  useEffect(() => {
    // Boş bir nesne yerine başlangıç değerini kullanın
    setUser({
      name: '',
      first_name: '',
      last_name: '',
      email: '',
      // Diğer gerekli alanlar burada
    });
    document.location.reload();
  }, [setUser]);

  return <Navigate to='/auth/login' />;
}
