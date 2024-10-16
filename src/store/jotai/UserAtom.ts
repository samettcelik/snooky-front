import { atom } from 'jotai'

// const testInıtUser = {
//     name: 'Dev Test User',
//     first_name: 'Burak',
//     pic: null,
//     last_name: 'Can',
//     email: 'burakcanexe@gmail.com',
//     company: {
//         name: 'Test company'
//     },
//     phone: '5439053181'
// }

const userAtom = atom<any>({})

export { userAtom }