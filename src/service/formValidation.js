export default class FormValidation{

    checkPhone = (phoneNumber) =>{
        let phone = phoneNumber.replace(/[^0-9-]+/gi, "");
        if(phone.length > 12){
            phone = phone.substring(0, 12);
        }
        return phone
    }
    
    checkEmail = (emailAddress) =>{
        return emailAddress.replace(/[^a-z0-9@.]+/gi, "");
    }
    
    checkFullName = (fullName) =>{
        let userName = [];
        let userFullname = fullName.replace(/[^\u0590-\u05fe a-zA-Z-]+/gi, "");
        userName = [userFullname, userFullname, ''];
        if (userFullname.indexOf(' ') > -1){
            let splitName = userFullname.split(" ");
            userName = [
                splitName[0]+" "+splitName[1], //full user name for form front
                splitName[0], //user first name for back
                splitName[1] //user family name for back
            ]
            if(splitName.length >= 3){
                userName = [
                    splitName[0]+" "+splitName[1]+" "+splitName[2], //full user name for form front
                    splitName[0], //user first name for back
                    splitName[1]+" "+splitName[2] //user family name for back
                ]
            }
        }
        
        return userName
    }

    bodyMsg = (msg) => {
        let parseMsg = msg.replace(/[^\u0590-\u05fe a-zA-Z-]+/gi, "");
        return parseMsg;
    }
}