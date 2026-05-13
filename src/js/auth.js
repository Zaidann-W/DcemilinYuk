/* ===== DcemilinYuk - Auth Management ===== */

function getUsersDB() {
  return getStorage(STORAGE.USERS_DB) || [];
}

function saveUsersDB(users) {
  setStorage(STORAGE.USERS_DB, users);
}

function loginUser(email, password) {
  const users = getUsersDB();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { success: false, message: 'Email atau password salah.' };
  const session = { id: user.id, name: user.name, email: user.email, phone: user.phone || '', address: user.address || '' };
  setStorage(STORAGE.USER, session);
  return { success: true, message: 'Login berhasil!', user: session };
}

function registerUser(name, email, password) {
  const users = getUsersDB();
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email sudah terdaftar.' };
  }
  const newUser = { id: generateId(), name, email, password, phone: '', address: '', createdAt: new Date().toISOString() };
  users.push(newUser);
  saveUsersDB(users);
  const session = { id: newUser.id, name: newUser.name, email: newUser.email, phone: '', address: '' };
  setStorage(STORAGE.USER, session);
  return { success: true, message: 'Registrasi berhasil!', user: session };
}

function logoutUser() {
  localStorage.removeItem(STORAGE.USER);
}

function updateProfile(data) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Belum login.' };
  const updated = { ...user, ...data };
  setStorage(STORAGE.USER, updated);
  // Update in DB too
  const users = getUsersDB();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...data };
    saveUsersDB(users);
  }
  return { success: true, message: 'Profil berhasil diperbarui!' };
}

function requireAuth() {
  if (!isLoggedIn()) {
    showToast('Silakan login terlebih dahulu.', 'warning');
    setTimeout(() => window.location.href = 'Login.html', 1500);
    return false;
  }
  return true;
}

// Form validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(fields) {
  const errors = {};
  fields.forEach(({ name, value, rules }) => {
    if (rules.required && !value.trim()) {
      errors[name] = 'Wajib diisi.';
    } else if (rules.email && !validateEmail(value)) {
      errors[name] = 'Format email tidak valid.';
    } else if (rules.minLength && value.length < rules.minLength) {
      errors[name] = `Minimal ${rules.minLength} karakter.`;
    } else if (rules.match && value !== rules.match.value) {
      errors[name] = `${rules.match.label} tidak cocok.`;
    }
  });
  return errors;
}

function showFormErrors(errors) {
  // Clear old errors
  $$('.form-error').forEach(el => el.remove());
  $$('.form-input.error').forEach(el => el.classList.remove('error'));
  // Show new errors
  Object.entries(errors).forEach(([name, msg]) => {
    const input = $(`[name="${name}"]`);
    if (input) {
      input.classList.add('error');
      input.style.borderColor = 'var(--danger)';
      const errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      errorEl.textContent = msg;
      input.parentElement.appendChild(errorEl);
    }
  });
}

// Handle login form
function handleLogin(e) {
  e.preventDefault();
  const email = $('[name="email"]').value;
  const password = $('[name="password"]').value;

  const errors = validateForm([
    { name: 'email', value: email, rules: { required: true, email: true } },
    { name: 'password', value: password, rules: { required: true } }
  ]);

  if (Object.keys(errors).length > 0) {
    showFormErrors(errors);
    return;
  }

  const result = loginUser(email, password);
  if (result.success) {
    showToast(result.message, 'success');
    setTimeout(() => window.location.href = 'index.html', 1000);
  } else {
    showToast(result.message, 'error');
  }
}

// Handle register form
function handleRegister(e) {
  e.preventDefault();
  const name = $('[name="name"]').value;
  const email = $('[name="email"]').value;
  const password = $('[name="password"]').value;
  const confirmPassword = $('[name="confirmPassword"]').value;

  const errors = validateForm([
    { name: 'name', value: name, rules: { required: true, minLength: 2 } },
    { name: 'email', value: email, rules: { required: true, email: true } },
    { name: 'password', value: password, rules: { required: true, minLength: 6 } },
    { name: 'confirmPassword', value: confirmPassword, rules: { required: true, match: { value: password, label: 'Password' } } }
  ]);

  if (Object.keys(errors).length > 0) {
    showFormErrors(errors);
    return;
  }

  const result = registerUser(name, email, password);
  if (result.success) {
    showToast(result.message, 'success');
    setTimeout(() => window.location.href = 'index.html', 1000);
  } else {
    showToast(result.message, 'error');
  }
}

// Handle profile update
function handleProfileUpdate(e) {
  e.preventDefault();
  const name = $('[name="name"]').value;
  const phone = $('[name="phone"]').value;
  const address = $('[name="address"]').value;

  const result = updateProfile({ name, phone, address });
  if (result.success) {
    showToast(result.message, 'success');
    setTimeout(() => location.reload(), 1000);
  } else {
    showToast(result.message, 'error');
  }
}
