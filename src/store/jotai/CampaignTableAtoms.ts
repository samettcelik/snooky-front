import { atom } from 'jotai'

const showStatusDropAtom = atom<{ show: boolean }>({
    show: false
})

const campaignsArchiveAtom = atom<{ show: boolean }>({
    show: false
})

export { showStatusDropAtom, campaignsArchiveAtom }