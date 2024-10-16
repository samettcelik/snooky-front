import axios from "axios"


const API_URL = "https://app.api.snooky.io/api"

class RequestClass {

    static config = { headers: { "Authorization": `39|xdw4LZk4Akn4G8KLmB9lCePT300KkgbdvNr7vOGr3f08a887` } }

    SetToken = async (token) => {
        RequestClass.config = { headers: { "Authorization": `Bearer 39|xdw4LZk4Akn4G8KLmB9lCePT300KkgbdvNr7vOGr3f08a887` } }
    }

    Login = async ({ email }: {
        email: string
    }) => {
        return await axios.post(`${API_URL}/auth/login`, {
            email,
        })
    }

    GetMe = async ({ token }: {
        token: string
    }) => {
        this.SetToken(token)
        const data = await axios.post(`${API_URL}/auth/me`, {}, RequestClass.config)
        return data.data
    }

    Register = async ({ email, first_name, last_name, phone }: {
        email: string,
        first_name: string,
        last_name: string,
        phone: string,
    }) => {
        const data = await axios.post(`${API_URL}/auth/register`, {
            email,
            first_name,
            last_name,
            phone,
        })
    }

    ComplateOnboarding = async ({ company_name, website }) => {
        const { data } = await axios.post(`${API_URL}/auth/onboarding-update`, { company_name, website }, RequestClass.config)
        return data
    }

    GetDomains = async (params?: any) => {
        RequestClass[params] = { ...params }
        const { data } = await axios.get(`${API_URL}/domain/list`, RequestClass.config)
        return data
    }

    AddDomain = async ({ url }: { url: string }) => {
        const { data } = await axios.post(`${API_URL}/domain/create`, { name: url, url }, RequestClass.config)
        return data
    }

    DeleteDomain = async ({ id }: { id: number }) => {
        const { data } = await axios.delete(`${API_URL}/domain/delete`, {
            ...RequestClass.config,
            data: {
                id
            }
        })
        return data
    }

    UpdateDomain = async ({ id, url, status }: { id: number, url: string, status?: string }) => {
        const { data } = await axios.put(`${API_URL}/domain/update`, { id, url, name: url, status: status ? status : 'active' }, RequestClass.config)
        return data
    }

    // Billing Screen Endpoints
    GetSubscription = async () => {
        const { data } = await axios.get(`${API_URL}/company/subscription`, RequestClass.config)
        return data
    }
    GetSubscriptionList = async () => {
        const { data } = await axios.get(`${API_URL}/company/subscription/list`, RequestClass.config)
        return data
    }
    GetInvoices = async () => {
        const { data } = await axios.get(`${API_URL}/company/invoices`, RequestClass.config)
        return data
    }
    GetDownloadInvoiceByID = async () => {
        const { data } = await axios.get(`${API_URL}/company/${'invoiceId'}/download-invoice`, RequestClass.config)
        return data
    }
    GetPlanCheckWithId = async () => {
        const { data } = await axios.get(`${API_URL}/company/${'planId'}/checkout`, RequestClass.config)
        return data
    }
    GetSettings = async () => {
        const { data } = await axios.get(`${API_URL}/company/settings`, RequestClass.config)
        return data
    }
    UpdateSettings = async () => {
        const { data } = await axios.put(`${API_URL}/company/settings`, RequestClass.config)
        return data
    }
    GetPaymentMethod = async () => {
        const { data } = await axios.get(`${API_URL}/company/payment-methods`, RequestClass.config)
        return data
    }
    AddPaymentMethod = async ({ card_number, card_exp_month, card_exp_year, card_cvc, type }) => {
        const { data } = await axios.post(`${API_URL}/company/add-payment-method`, { card_number, card_exp_month, card_exp_year, card_cvc, type }, RequestClass.config)
        return data
    }
    SetPrimaryPaymentMethod = async () => {
        const { data } = await axios.put(`${API_URL}/company/set-primary-payment-method`, RequestClass.config)
        return data
    }
    AddTestSubsData = async () => {
        const { data } = await axios.get(`${API_URL}/company/add-test-subscription`, RequestClass.config)
        return data
    }

    // Coupons Endpoints
    GetCoupons = async (params?: any) => {
        // RequestClass[params] = { ...params }
        const { data } = await axios.get(`${API_URL}/campaign/coupon/list`, RequestClass.config)
        return data
    }
    AddCoupons = async ({ campaign_id, name, domain_id, items }) => {
        // RequestClass[params] = { ...params }
        const { data } = await axios.post(`${API_URL}/campaign/coupon/create`, { campaign_id, name, domain_id, items }, RequestClass.config)
        return data
    }
}

const SnookyClient = new RequestClass()
export { SnookyClient }