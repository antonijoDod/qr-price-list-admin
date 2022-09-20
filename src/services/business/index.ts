import {strapiServer} from 'api/strapi'
import axios from "axios";
import {useAuthContext} from 'hooks/useAuthContext'

const token = localStorage.getItem('user')

export const getBusiness = async () => {


    const response = await axios.get(`${strapiServer}/businesses`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token!!).jwt}`
        }
    })

    return response.data

} 

type TCreateBusiness = {
    name: "string",
    phone: "number"
}

export const createBusinessServices = async({name, phone}: TCreateBusiness) => await axios.post(`${strapiServer}/businesses`, 
    {
       "data": {
            name,
            phone
       }
    }, 
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token!!).jwt}`
        }
    })