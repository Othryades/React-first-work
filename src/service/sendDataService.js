import Axios from 'axios'

export default class SendDataService{
    obj = {
        affiliateUser: undefined,
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        type: 'MESSAGE',
        fromURL: window.location.href,
        affiliateUsers: undefined
    }

    mailObj = {
        affiliate: undefined,
        name: '',
        useremail: '',
        message: '',
        rate: 0
    }
    
    setDefaultPostHeader = () =>{
        Axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    populateSingleRequest = (data) => {
        let affiliateUser = undefined
        let affiliateUsers = undefined

        if(Array.isArray(data.doctor)){
            affiliateUsers = data.doctor
        } else {
            affiliateUser = data.doctor
        }

        this.obj = {
            affiliateUser,
            affiliateUsers,
            firstName: data.userData.firstName,
            lastName: data.userData.lastName,
            email: data.userData.email,
            telephone: data.userData.telephone,
            fromURL: window.location.href,
            type: 'MESSAGE'
        }

        return this.postRequest()
    }

    postRequest = () =>{
        this.setDefaultPostHeader()
        const data = JSON.stringify(this.obj)
        return Axios.post('https://affiliates.leadhim.co.il/api/mark', data).then( resp => {
            return true
        }).catch( err => {
            console.log(err)
            return err
        })
    }

    populateMailObj = (userData, rating) =>{
        const rate = rating[0]
        const affId = rating[1]
        this.mailObj = {
            affiliate: affId,
            name: userData.fullName,
            useremail: userData.email,
            message: userData.bodymsg,
            rate: rate
        }

        return this.postNewRating()
    }

    postNewRating = () => {
        this.setDefaultPostHeader()
        const data = JSON.stringify(this.mailObj)
        return Axios.post('https://affiliates.leadhim.co.il/api/review', data).then( resp => {
            return true
        }).catch( err => {
            console.log(err)
            return err
        })
    }
}

