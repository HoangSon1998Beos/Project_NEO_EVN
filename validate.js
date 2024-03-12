import {tr} from "vuetify/locale";
import moment from "moment";

//format tiền tệ
export const formatCurrency = (amount) => {
    return parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace("₫", "VND").replaceAll(".",",");
}
//format date time
export const convertDateTime = (item) => {
    return moment(item).format('DD/MM/YYYY HH:MM:ss')
}
//format date
export const convertDate = (item) => {
    return moment(item).format('DD/MM/YYYY')
}
//format time
export const convertTime = (item) => {
    return moment(item).format('HH:MM:ss')
}

//check trống
export const validate = (value) => {
    if (!value) {
        return 'Trường không được để trống';
    }
    return true;
}

export const validateEmail = (value) => {
    const regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!value) {
        return 'Email không được để trống';
    }
    if (!regex.test(value)) {
        return 'Email không hợp lệ';
    }
    return true
}

//validate mật khẩu
export const validatePassword = (password) => {
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?[\];',.\\/]).{8,}$/
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s])[A-Za-z\d@#$%^&*()-_+=[\]{}|;:'",.<>?\/`~\\]{8,15}$/;
    if (!password) {
        return 'Mật khẩu không được để trống';
    }
    if (!regex.test(password)) {
        return 'Mật khẩu không hợp lệ';
    }
    return true
}

//validate số điện thoại
export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(0|84)(?!0)\d{8,9}$/;
    if (!phoneNumber) {
        return 'Số điện thoại không được để trống';
    }
    if (!regex.test(phoneNumber)) {
        return 'Số điện thoại không hợp lệ';
    }
    return true;
};

//không nhập tiếng việt
export const validateInputNotVNS = (event) => {
    const inputText = event.target.value;
    const containsVietnameseChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/;
    if (containsVietnameseChars.test(inputText)) {
        event.target.value = inputText.replace(containsVietnameseChars, '');
    }
}

//chặn kí tự đặc biệt
export const blockSpecialCharacters = (event) => {
    const regex = /[A-Za-z0-9]/;
    const charCode = event.key.charCodeAt(0);
    if (!regex.test(event.key) && charCode !== 32) {
        event.preventDefault();
    }
}

// chặn khi vượt quá max length
export const validateInputMaxLength = (event, maxLength) => {
    if (event.target.value.length > maxLength) {
        event.target.value = event.target.value.substring(0, maxLength);
    }
}

//không cho nhập
export const validateTransactionStatus = (event) => {
    const regex = /[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]/;
    if (regex.test(event.target.value)) {
        event.target.value = event.target.value.replace(regex, '');
    }
}

//Không cho phép thực hiện 1 hành dộng
export const handleEventDefault = (event) => {
    event.preventDefault()
}