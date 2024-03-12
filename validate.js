import { tr } from "vuetify/locale";

export const validate = (value) => {
    if (!value) {
        return 'Trường không được để trống';
    }
    if (value.length < 3 || value.length > 10) {
        return 'Độ dài tên bot từ 3-10 kí tự';
    }
    return true;
}

export const validateServer = (value) => {
    if (!value) {
        return 'Trường không được để trống'
    }
    return true
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

export const validateLogUsername = (value) => {
    if (!value) {
        return 'Bắt buộc nhập Tên đăng nhập';
    }
    if (value.length < 3 || value.length > 10) {
        return 'Độ dài tên Tên đăng nhập từ 3-10 kí tự';
    }
    return true;
}

export const validateLogPassword = (value) => {
    if (!value) {
        return 'Bắt buộc nhập Mật khẩu.';
    }
    if (value.length < 3 || value.length > 10) {
        return 'Độ dài tên mật khẩu từ 3-10 kí tự';
    }
    return true;
}