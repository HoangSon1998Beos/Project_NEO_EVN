import {tr} from "vuetify/locale";

export const validate = (value) => {
    if (!value) {
        return 'Trường không được để trống';
    }
    if (value.length < 3 || value.length >10) {
        return 'Độ dài tên bot từ 3-10 kí tự';
    }
    return true;
}

export const validateServer = (value) => {
    if(!value) {
        return 'Trường không được để trống'
    }
    return true
}

export const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    if (!value) {
        return 'Email không được để trống';
    }
    if (!regex.test(value)) {
        return 'Email không hợp lệ';
    }
    return true
}

export const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9]{10}$/;
    if (!phoneNumber) {
        return 'Số điện thoại không được để trống';
    }
    if (!re.test(phoneNumber)) {
        return 'Số điện thoại không hợp lệ';
    }
    return true;
};