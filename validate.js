import moment from 'moment'

//format tiền tệ(format)
export const formatCurrency = (amount) => {
  return parseFloat(amount)
    .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    .replace('₫', 'VND')
    .replaceAll('.', ',')
}
//format date time(format)
export const convertDateTime = (item) => {
  return moment(item).format('DD/MM/YYYY HH:MM:ss')
}
//format date(format)
export const convertDate = (item) => {
  return moment(item).format('DD/MM/YYYY')
}
//format time(format)
export const convertTime = (item) => {
  return moment(item).format('HH:MM:ss')
}

//check trống(regex)
export const validate = (value) => {
  if (!value) {
    return 'Trường không được để trống'
  }
  return true
}

//validate email(regex)
export const validateEmail = (value) => {
  const regex =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (!value) {
    return 'Email không được để trống'
  }
  if (!regex.test(value)) {
    return 'Email không hợp lệ'
  }
  return true
}

//validate mật khẩu(regex)
export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s])[A-Za-z\d@#$%^&*()-_+=[\]{}|;:'",.<>?\/`~\\]{8,15}$/
  if (!password) {
    return 'Mật khẩu không được để trống'
  }
  if (!regex.test(password)) {
    return 'Mật khẩu không hợp lệ'
  }
  return true
}

//validate số điện thoại(regex)
export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^(0|84)(?!0)\d{8,9}$/
  if (!phoneNumber) {
    return 'Số điện thoại không được để trống'
  }
  if (!regex.test(phoneNumber)) {
    return 'Số điện thoại không hợp lệ'
  }
  return true
}

//không nhập tiếng việt(input)
export const validateInputNotVNS = (event) => {
  const inputText = event.target.value
  const containsVietnameseChars =
    /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/
  if (containsVietnameseChars.test(inputText)) {
    event.target.value = inputText.replace(containsVietnameseChars, '')
  }
}

//chặn kí tự đặc biệt(keypress)
export const blockSpecialCharacters = (event) => {
  const regex = /[A-Za-z0-9]/
  const charCode = event.key.charCodeAt(0)
  if (!regex.test(event.key) && charCode !== 32) {
    event.preventDefault()
  }
}

//chỉ cho phép nhập số(keypress)
export const inputOnlyNumber = (event) => {
  const regex = /[0-9]/
  if (!regex.test(event.key)) {
    event.preventDefault()
  }
}

// chặn khi vượt quá max length(input)
export const validateInputMaxLength = (event, maxLength) => {
  if (event.target.value.length > maxLength) {
    event.target.value = event.target.value.substring(0, maxLength)
  }
}

//Không cho phép thực hiện 1 hành dộng(keypress)
export const handleEventDefault = (event) => {
  event.preventDefault()
}

// Loại bỏ các số 0 đầu tiên(blur)
export const validateNumber0 = (inputStr) => {
  if (inputStr === '0') {
    return '0'
  }
  return inputStr.replace(/^0+/, '')
}

// giá trị nhập vào lớn hơn max, nhỏ hơn min(regex)
export const validateCompare = (num, max, min) => {
  if (num > max) {
    return `Giá trị phải nhỏ hơn ${max}`
  }
  if (num < min) {
    return `Giá trị phải lớn hơn ${min} `
  }
  return true
}

// Không cho nhập dấu cách(keypress)
export const preventSpace = (event) => {
  if (event.keyCode === 32) {
    event.preventDefault()
  }
}

export const validateLogUsername = (value) => {
  if (!value) {
    return 'Bắt buộc nhập Tên đăng nhập'
  }
  if (value.length < 3 || value.length > 10) {
    return 'Độ dài tên Tên đăng nhập từ 3-10 kí tự'
  }
  return true
}

export const validateLogPassword = (value) => {
  if (!value) {
    return 'Bắt buộc nhập Mật khẩu.'
  }
  if (value.length < 3 || value.length > 10) {
    return 'Độ dài tên mật khẩu từ 3-10 kí tự'
  }
  return true
}
