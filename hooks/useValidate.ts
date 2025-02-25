/**
 * Kiểm tra mật khẩu theo các tiêu chí:
 * - Độ dài tối thiểu 8 ký tự
 * - Có ít nhất một chữ cái viết hoa
 * - Có ít nhất một chữ cái viết thường
 * - Có ít nhất một số
 * - Có ít nhất một ký tự đặc biệt
 * @param password Mật khẩu cần kiểm tra
 * @returns true nếu mật khẩu hợp lệ, ngược lại false
 */

export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

/**
 * Kiểm tra xem hai mật khẩu có khớp nhau hay không
 * @param password Mật khẩu đầu tiên
 * @param confirmPassword Mật khẩu xác nhận
 * @returns true nếu hai mật khẩu khớp nhau, ngược lại false
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};

/**
 * Kiểm tra định dạng email
 * @param email Email cần kiểm tra
 * @returns true nếu email hợp lệ, ngược lại false
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
