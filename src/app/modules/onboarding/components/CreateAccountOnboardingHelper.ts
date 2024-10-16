import * as Yup from 'yup'

export interface ICreateAccount {
  companyName: string
  websiteUrl: string
}

const createAccountSchemas = [
  Yup.object({
    companyName: Yup.string().required().label('Company Name'),
  }),
  Yup.object({
    websiteUrl: Yup.string().required().label('Website URL'),
  }),
]

const inits: ICreateAccount = {
  companyName: '',
  websiteUrl: '',
}

export {createAccountSchemas, inits}
