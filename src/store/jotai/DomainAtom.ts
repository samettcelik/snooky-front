import { atom } from 'jotai'

type domainAtomTypes = {
    currentDomain: {
        name: string
    },
    domains: {
        id: string | number,
        name: string
    }[]
}
const domainAtom = atom<domainAtomTypes>({
    currentDomain: { name: "https://currentdomain.com" },
    domains: [
        {
            id: 1,
            name: 'https://snooky.io'
        }
    ]
})

export { domainAtom }