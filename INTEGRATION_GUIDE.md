
# FILMKHONA Firebase Auth Integration Guide

This guide shows how to integrate Firebase authentication into your existing FILMKHONA pages.

## Quick Integration Steps

### 1. Update index.html

Add auth buttons to navbar:

```html
<div class="nav-right">
  <!-- Auth buttons for guest users -->
  <div class="auth-buttons" data-guest-only>
    <a href="signup.html" class="btn btn-glass" style="margin-right: 0.5rem;">
      <span data-i18n="signup">Регистрация</span>
    </a>
    <a href="login.html" class="btn btn-primary">
      <span data-i18n="login">Вход</span>
    </a>
  </div>

  <!-- User menu for authenticated users -->
  <div class="auth-buttons" data-auth-required style="display: none;">
    <div class="lang-switcher">
      <button class="lang-btn active" data-lang="ru" type="button">RU</button>
      <button class="lang-btn" data-lang="tj" type="button">TJ</button>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <span class="user-email" data-user-email style="font-size: 0.9rem; color: var(--text-muted);"></span>
      <button id="logoutBtn" class="btn btn-glass">
        <span data-i18n="logout">Выход</span>
      </button>
    </div>
  </div>

  <!-- Original lang switcher for guest users -->
  <div class="lang-switcher" data-guest-only>
    <button class="lang-btn active" data-lang="ru" type="button">RU</button>
    <button class="lang-btn" data-lang="tj" type="button">TJ</button>
  </div>
</div>
```

Add to bottom of index.html before closing `</body>`:

```html
<script type="module">
  import { setupAuthUIToggle, setupLogoutButton } from './protectedRoutes.js';

  document.addEventListener('DOMContentLoaded', () => {
    setupAuthUIToggle();
    setupLogoutButton('#logoutBtn');
  });
</script>
```

### 2. Update library.html

Make library page protected (only authenticated users can access):

Add `data-page="library-protected"` to `<body>`:

```html
<body data-page="library-protected">
```

Add to bottom of library.html before closing `</body>`:

```html
<script type="module">
  import { protectPage } from './protectedRoutes.js';
  import { setupAuthUIToggle, setupLogoutButton } from './protectedRoutes.js';

  document.addEventListener('DOMContentLoaded', () => {
    // Protect this page - redirect to login if not authenticated
    protectPage((user) => {
      console.log('Library accessed by:', user.email);
      setupAuthUIToggle();
      setupLogoutButton('#logoutBtn');
    });
  });
</script>
```

### 3. Update watch.html

Make watch page protected:

```html
<body data-page="watch-protected">
```

Add before closing `</body>`:

```html
<script type="module">
  import { protectPage } from './protectedRoutes.js';
  import { setupAuthUIToggle, setupLogoutButton } from './protectedRoutes.js';

  document.addEventListener('DOMContentLoaded', () => {
    protectPage((user) => {
      console.log('Watch page accessed by:', user.email);
      setupAuthUIToggle();
      setupLogoutButton('#logoutBtn');
      
      // Initialize existing watch functionality
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id") || "1";
      // ... rest of existing code
    });
  });
</script>
```

### 4. Add i18n translations

Add to `i18n` object in `script.js`:

```javascript
const i18n = {
  ru: {
    // ... existing translations ...
    signup: "Регистрация",
    login: "Вход",
    logout: "Выход",
    profile: "Профиль",
    emailVerification: "Подтверждение почты",
    pleaseVerifyEmail: "Пожалуйста, подтвердите вашу почту",
  },
  tj: {
    // ... existing translations ...
    signup: "Бақайдкунӣ",
    login: "Вуруд",
    logout: "Хуруҷ",
    profile: "Профил",
    emailVerification: "Тасдиқи почта",
    pleaseVerifyEmail: "Лутфан, почтаи худро тасдиқ кунед",
  }
};
```

## UI Elements Reference

### Guest-Only Elements

Show only when user is NOT logged in:

```html
<div data-guest-only>
  <!-- This appears only for guests -->
  <a href="signup.html">Register</a>
</div>
```

### Auth-Required Elements

Show only when user IS logged in:

```html
<div data-auth-required style="display: none;">
  <!-- This appears only for authenticated users -->
  <span data-user-email></span>
</div>
```

### Logout Button

```html
<button id="logoutBtn" class="btn btn-glass">Logout</button>
```

Setup in JavaScript:

```javascript
import { setupLogoutButton } from './protectedRoutes.js';

setupLogoutButton('#logoutBtn');
```

## Complete Example: Updated index.html Navigation

```html
<header class="navbar" id="navbar">
  <a href="index.html" class="logo">FILMKHONA</a>
  <button class="nav-toggle" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links">
    <li><a href="index.html" class="active" data-i18n="navHome">Главная</a></li>
    <li><a href="library.html" data-i18n="navLibrary">Библиотека</a></li>
  </ul>
  <div class="nav-right">
    <!-- Guest UI -->
    <div class="auth-buttons" data-guest-only>
      <a href="signup.html" class="btn btn-glass">
        <span data-i18n="signup">Регистрация</span>
      </a>
      <a href="login.html" class="btn btn-primary">
        <span data-i18n="login">Вход</span>
      </a>
    </div>

    <!-- Authenticated User UI -->
    <div class="auth-buttons" data-auth-required style="display: none;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span class="user-email" data-user-email></span>
        <button id="logoutBtn" class="btn btn-glass">
          <span data-i18n="logout">Выход</span>
        </button>
      </div>
    </div>

    <!-- Language Switcher -->
    <div class="lang-switcher">
      <button class="lang-btn active" data-lang="ru" type="button">RU</button>
      <button class="lang-btn" data-lang="tj" type="button">TJ</button>
    </div>
  </div>
</header>

<!-- ... page content ... -->

<script type="module">
  import { setupAuthUIToggle, setupLogoutButton } from './protectedRoutes.js';

  document.addEventListener('DOMContentLoaded', () => {
    setupAuthUIToggle();
    setupLogoutButton('#logoutBtn');
  });
</script>
```

## Protected Page Example: library.html

```html
<body data-page="library-protected">
  <!-- ... existing loader, bg, navbar ... -->

  <div class="page-header">
    <h1 data-i18n="navLibrary">Библиотека</h1>
    <!-- ... existing search and filters ... -->
  </div>

  <div class="library-grid" id="library-grid"></div>

  <footer class="footer">
    <p>© 2026 <span>FILMKHONA</span> — Premium Cinema Experience</p>
  </footer>

  <script type="module">
    import { protectPage } from './protectedRoutes.js';
    import { setupAuthUIToggle, setupLogoutButton } from './protectedRoutes.js';

    document.addEventListener('DOMContentLoaded', () => {
      // Protect this page
      protectPage((user) => {
        console.log('Library accessed by:', user.email);
        
        // Setup auth UI
        setupAuthUIToggle();
        setupLogoutButton('#logoutBtn');

        // Your existing library code here
        // initLibrary();
      });
    });
  </script>
</body>
</html>
```

## Stream Current User Info

```javascript
import { onAuthChange } from './firebaseAuth.js';

onAuthChange((user) => {
  if (user) {
    console.log('User:', user.email);
    console.log('User ID:', user.uid);
    console.log('Email verified:', user.emailVerified);
    
    // Update UI with user info
    document.querySelector('[data-user-email]').textContent = user.email;
  } else {
    console.log('User logged out');
  }
});
```

## Handle Auth Errors

```javascript
import { loginUser } from './firebaseAuth.js';

async function handleLogin(email, password) {
  const result = await loginUser(email, password);

  if (!result.success) {
    // Handle specific errors
    if (result.error.includes('подтвердите')) {
      // Email not verified
      showResendOption();
    } else if (result.error.includes('не найден')) {
      // User doesn't exist
      showSignupPrompt();
    } else {
      // Other error
      showErrorMessage(result.error);
    }
  } else {
    // Login successful
    window.location.href = 'library.html';
  }
}
```

## CSS Styling for Auth Buttons

Add to `style.css`:

```css
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-email {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

@media (max-width: 768px) {
  .auth-buttons {
    width: 100%;
    margin-top: 1rem;
  }

  .auth-buttons .btn {
    flex: 1;
  }
}
```

## Testing Checklist

- [ ] Test guest user sees signup/login buttons
- [ ] Test authenticated user sees logout button
- [ ] Test logout redirects to home
- [ ] Test protected pages redirect to login
- [ ] Test email verification works
- [ ] Test resend verification email
- [ ] Test session persists on page reload
- [ ] Test mobile responsive layout
- [ ] Test error messages display correctly
- [ ] Test language switching works with auth UI

## Common Issues

**Issue**: Auth buttons not showing
- Solution: Make sure `setupAuthUIToggle()` is called

**Issue**: Logout button not working
- Solution: Make sure button ID matches: `id="logoutBtn"`

**Issue**: Protected page redirects immediately
- Solution: Firebase config may be missing, check browser console

**Issue**: User email not displaying
- Solution: Make sure element has `data-user-email` attribute

---

Now your FILMKHONA website has a fully functional Firebase authentication system! 🎬✨
