export default {
    handleSuccess(vue, msg) {
        return vue.$message.success(msg);
    },

    async handleError(vue, data) {
        if (data.data.status === 402) {
            return vue.$message.error(
                "Mật khẩu cũ không đúng"
            );
        }
        if (data.data.status === 403) {
            return vue.$message.error(
                "Mật khẩu mới không được giống mật khẩu cũ"
            );
        }
        if (data.status === 400) {
            return vue.$message.error(
                "Tài khoản hoặc mật khẩu đăng nhập không chính xác"
            );
        }
        if (data.status === 401) {
            window.localStorage.removeItem("x-Project-token");
            window.localStorage.removeItem("authLogin");
            await vue.$router.push({ path: "/" });

            return vue.$message.error("Token tài khoản không chính xác");
        }
        if (data.status === 422) {
            return vue.$message.error("Thông tin truyền vào không đầy đủ");
        }
    },
};
