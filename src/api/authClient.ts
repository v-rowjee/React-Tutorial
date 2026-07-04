export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

const USERS_KEY = "reactpath-users-db";
const SESSION_KEY = "reactpath-session-token";
const ACTIVE_USER_KEY = "reactpath-active-user";

function getUsers(): Record<string, string> {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveUser(email: string, password: string) {
  const users = getUsers();
  users[email.toLowerCase()] = password;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

class AuthModule {
  async me(): Promise<User | null> {
    const active = localStorage.getItem(ACTIVE_USER_KEY);
    if (!active) return null;
    try {
      return JSON.parse(active);
    } catch {
      return null;
    }
  }

  async loginViaEmailPassword(email: string, password: string): Promise<User> {
    const users = getUsers();
    const storedPassword = users[email.toLowerCase()];
    if (!storedPassword) {
      // If user doesn't exist locally, register on the fly for ease of local testing
      saveUser(email, password);
    } else if (storedPassword !== password) {
      throw new Error("Invalid password");
    }

    const user: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 11),
      email: email.toLowerCase(),
      name: email.split('@')[0],
    };
    
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, "mock_token_" + Date.now());
    return user;
  }

  async register(params: { email: string; password?: string }): Promise<void> {
    if (params.password) {
      saveUser(params.email, params.password);
    }
    sessionStorage.setItem("pending_otp_email", params.email);
    sessionStorage.setItem("pending_otp_password", params.password || "");
  }

  async verifyOtp(params: { email: string; otpCode: string }): Promise<{ access_token: string }> {
    const pendingEmail = sessionStorage.getItem("pending_otp_email");
    const pendingPassword = sessionStorage.getItem("pending_otp_password") || "password123";
    
    const email = params.email || pendingEmail || "user@example.com";
    saveUser(email, pendingPassword);

    const user: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 11),
      email: email.toLowerCase(),
      name: email.split('@')[0],
    };

    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    const token = "mock_token_" + Date.now();
    localStorage.setItem(SESSION_KEY, token);

    sessionStorage.removeItem("pending_otp_email");
    sessionStorage.removeItem("pending_otp_password");

    return { access_token: token };
  }

  async resendOtp(email: string): Promise<void> {
    // Mock successful resend
  }

  async resetPasswordRequest(email: string): Promise<void> {
    sessionStorage.setItem("reset_email", email);
  }

  async resetPassword(params: { resetToken?: string; newPassword?: string }): Promise<void> {
    const email = sessionStorage.getItem("reset_email") || "user@example.com";
    if (params.newPassword) {
      saveUser(email, params.newPassword);
    }
    sessionStorage.removeItem("reset_email");
  }

  setToken(token: string): void {
    localStorage.setItem(SESSION_KEY, token);
  }

  logout(redirectUrl?: string): void {
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem(SESSION_KEY);
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      window.location.reload();
    }
  }

  redirectToLogin(redirectUrl?: string): void {
    window.location.href = "/login";
  }

  loginWithProvider(provider: string, redirectUrl?: string): void {
    const user: User = {
      id: "usr_google",
      email: "google-user@example.com",
      name: "Google Learner",
    };
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, "mock_google_token");
    window.location.href = redirectUrl || "/";
  }
}

export const authClient = {
  auth: new AuthModule(),
};
