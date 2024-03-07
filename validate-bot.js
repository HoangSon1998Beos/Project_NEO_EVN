export const validateBot = (value) => {
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
}