/* FILMKHONA — Email-only Registration & Authentication */

/**
 * Validates email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * Minimum 8 characters, at least one uppercase, one lowercase, one number
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (password.length < minLength) {
    return { isValid: false, message: t("passwordTooShort") || "Пароль должен быть минимум 8 символов" };
  }
  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return { isValid: false, message: t("passwordWeak") || "Пароль должен содержать букву, цифру и заглавную букву" };
  }
  return { isValid: true, message: "OK" };
}

/**
 * Hashes password using SHA-256 (client-side hashing for storage)
 * Note: In production, use bcrypt or similar server-side
 * @param {string} password - Password to hash
 * @returns {Promise<string>} - Hashed password
 */
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Checks if email already exists in storage
 * @param {string} email - Email to check
 * @returns {boolean} - True if email exists
 */
function emailExists(email) {
  const users = JSON.parse(localStorage.getItem("filmkhona-users") || "[]");
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Registers a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - { success: boolean, message: string, error?: string }
 */
async function registerUser(email, password) {
  // Validate inputs
  if (!email || !password) {
    return { success: false, error: t("allFieldsRequired") || "Все поля обязательны" };
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return { success: false, error: t("invalidEmail") || "Пожалуйста, введите корректный email" };
  }

  // Validate password strength
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.message };
  }

  // Check if email already exists
  if (emailExists(email)) {
    return { success: false, error: t("emailExists") || "Пользователь с таким email уже зарегистрирован" };
  }

  try {
    // Hash password
    const hashedPassword = await hashPassword(password);

    // Get existing users
    const users = JSON.parse(localStorage.getItem("filmkhona-users") || "[]");

    // Create new user object
    const newUser = {
      id: Date.now(),
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      active: true
    };

    // Save user
    users.push(newUser);
    localStorage.setItem("filmkhona-users", JSON.stringify(users));

    return {
      success: true,
      message: t("registrationSuccess") || "Регистрация успешна!",
      userId: newUser.id
    };
  } catch (error) {
    return {
      success: false,
      error: t("registrationError") || "Ошибка при регистрации"
    };
  }
}

/**
 * Authenticates user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - { success: boolean, message?: string, error?: string, user?: object }
 */
async function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, error: t("allFieldsRequired") || "Все поля обязательны" };
  }

  try {
    const hashedPassword = await hashPassword(password);
    const users = JSON.parse(localStorage.getItem("filmkhona-users") || "[]");

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: t("userNotFound") || "Пользователь не найден" };
    }

    if (user.passwordHash !== hashedPassword) {
      return { success: false, error: t("wrongPassword") || "Неверный пароль" };
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem("filmkhona-users", JSON.stringify(users));

    // Store current session
    localStorage.setItem("filmkhona-currentUser", JSON.stringify({
      id: user.id,
      email: user.email,
      loginTime: new Date().toISOString()
    }));

    return {
      success: true,
      message: t("loginSuccess") || "Вход успешен!",
      user: { id: user.id, email: user.email }
    };
  } catch (error) {
    return {
      success: false,
      error: t("loginError") || "Ошибка при входе"
    };
  }
}

/**
 * Logs out current user
 */
function logoutUser() {
  localStorage.removeItem("filmkhona-currentUser");
  return { success: true, message: t("logoutSuccess") || "Вы вышли из аккаунта" };
}

/**
 * Gets current logged-in user
 * @returns {object|null} - Current user object or null
 */
function getCurrentUser() {
  const userStr = localStorage.getItem("filmkhona-currentUser");
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Checks if user is authenticated
 * @returns {boolean} - True if user is logged in
 */
function isUserAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Deletes user account
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<object>} - { success: boolean, message?: string, error?: string }
 */
async function deleteUserAccount(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const users = JSON.parse(localStorage.getItem("filmkhona-users") || "[]");

    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      return { success: false, error: t("userNotFound") || "Пользователь не найден" };
    }

    if (users[userIndex].passwordHash !== hashedPassword) {
      return { success: false, error: t("wrongPassword") || "Неверный пароль" };
    }

    // Remove user
    users.splice(userIndex, 1);
    localStorage.setItem("filmkhona-users", JSON.stringify(users));

    // Clear session if it's the current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      localStorage.removeItem("filmkhona-currentUser");
    }

    return { success: true, message: t("accountDeleted") || "Аккаунт удален" };
  } catch (error) {
    return { success: false, error: t("deletionError") || "Ошибка при удалении аккаунта" };
  }
}

/**
 * Gets user profile information
 * @param {number} userId - User ID
 * @returns {object|null} - User profile or null
 */
function getUserProfile(userId) {
  const users = JSON.parse(localStorage.getItem("filmkhona-users") || "[]");
  const user = users.find(u => u.id === userId);

  if (!user) return null;

  // Return safe data (don't expose password hash)
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  };
}

/**
 * Updates user profile information (non-password fields)
 * @param {number} userId - User ID
 * @param {object} updates - Object with fields to update
 * @returns {object} - { success: boolean, message?: string, error?: string }
 */
function updateUserProfile(userId, updates) {
  try {
    const users = JSON.parse(localStorage.getItem("filmkhona-users") || "[]");
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, error: t("userNotFound") || "Пользователь не найден" };
    }

    // Only allow safe updates, never password
    const allowedFields = [];
    Object.keys(updates).forEach(key => {
      if (key !== "passwordHash" && key !== "id" && key !== "email") {
        allowedFields.push(key);
      }
    });

    allowedFields.forEach(field => {
      users[userIndex][field] = updates[field];
    });

    localStorage.setItem("filmkhona-users", JSON.stringify(users));
    return { success: true, message: t("profileUpdated") || "Профиль обновлен" };
  } catch (error) {
    return { success: false, error: t("updateError") || "Ошибка при обновлении профиля" };
  }
}

// Add i18n keys for auth if not exists
if (i18n && i18n.ru) {
  Object.assign(i18n.ru, {
    passwordTooShort: "Пароль должен быть минимум 8 символов",
    passwordWeak: "Пароль должен содержать заглавную букву, букву и цифру",
    allFieldsRequired: "Все поля обязательны",
    invalidEmail: "Пожалуйста, введите корректный email",
    emailExists: "Пользователь с таким email уже зарегистрирован",
    registrationSuccess: "Регистрация успешна!",
    registrationError: "Ошибка при регистрации",
    userNotFound: "Пользователь не найден",
    wrongPassword: "Неверный пароль",
    loginSuccess: "Вход успешен!",
    loginError: "Ошибка при входе",
    logoutSuccess: "Вы вышли из аккаунта",
    accountDeleted: "Аккаунт удален",
    deletionError: "Ошибка при удалении аккаунта",
    profileUpdated: "Профиль обновлен",
    updateError: "Ошибка при обновлении профиля"
  });

  Object.assign(i18n.tj, {
    passwordTooShort: "Гузарвожи камитар 8 тасдир бояд бошад",
    passwordWeak: "Гузарвожи камитар бояд ҳарф, рақам ва ҳарфи калон дошта бошад",
    allFieldsRequired: "Ҳамаи саҳоҳо зарурӣ аст",
    invalidEmail: "Лутфан, электронии почта дурустро ворид кунед",
    emailExists: "Корбар бо ин электронии почта аллакай қайдшуда аст",
    registrationSuccess: "Қайдшавӣ муваффақ!",
    registrationError: "Хатогӣ дар вақти қайдшавӣ",
    userNotFound: "Корбар ёфт нашуд",
    wrongPassword: "Гузарвожи нодуруст",
    loginSuccess: "Вуруд муваффақ!",
    loginError: "Хатогӣ дар вақти вуруд",
    logoutSuccess: "Шумо аз ҳисоби худ баромадед",
    accountDeleted: "Ҳисоб ҳазф шуд",
    deletionError: "Хатогӣ дар вақти ҳазфи ҳисоб",
    profileUpdated: "Профил навсозӣ ёафт",
    updateError: "Хатогӣ дар вақти навсозии профил"
  });
}
