export default {
    handleSuccess(vue, msg) {
        return vue.$message.success(msg);
    },

    async handleError(vue, data) {
        if (data.status === 401) {
            return vue.$message.error(
                "Tài khoản hoặc mật khẩu đăng nhập không chính xác"
            );
        }
    },
};
