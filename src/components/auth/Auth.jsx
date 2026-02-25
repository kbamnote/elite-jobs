/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, signup } from '../../utils/Api';
import Cookies from 'js-cookie';
import logo from '../../assets/ejLogo.png';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const getDefaultRole = () => {
        const params = new URLSearchParams(location.search);
        const role = params.get('role');
        return ['jobSeeker', 'jobHoster', 'recruiter'].includes(role) ? role : 'jobSeeker';
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: getDefaultRole()
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const response = await login(formData);
                const { token, user } = response.data.data;
                const { role } = user;

                Cookies.set('token', token);
                Cookies.set('role', role);

                if (role === 'jobSeeker') {
                    navigate('/');
                } else if (role === 'jobHoster') {
                    navigate('/hosting/dashboard');
                } else if (role === 'recruiter') {
                    navigate('/recruiter/dashboard');
                }
            } else {
                const response = await signup(formData);
                const { token, user } = response.data.data;

                Cookies.set('token', token);
                Cookies.set('role', user.role);

                if (user.role === 'jobSeeker') navigate('/onboarding');
                else if (user.role === 'jobHoster') navigate('/hosting/onboarding');
                else navigate('/recruiter/onboarding');
            }
        } catch (err) {
            setError(err.response?.data?.message || `${isLogin ? 'Login' : 'Signup'} failed`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'https://api.eliteindiajobs.com'}/auth/google`;
    };

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const params = new URLSearchParams(location.search);
            const urlToken = params.get('token');

            if (urlToken) {
                try {
                    Cookies.set('token', urlToken);
                    const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://elite-jobs-backend.onrender.com'}/auth/profile`, {
                        headers: {
                            'Authorization': `Bearer ${urlToken}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        const { role } = userData.data;
                        Cookies.set('role', role);

                        if (role === 'jobSeeker') {
                            navigate('/');
                        } else if (role === 'jobHoster') {
                            navigate('/hosting/dashboard');
                        } else if (role === 'recruiter') {
                            navigate('/recruiter/dashboard');
                        }
                    } else {
                        throw new Error('Failed to fetch user profile');
                    }
                } catch (err) {
                    setError('Google authentication failed. Please try again.');
                    Cookies.remove('token');
                    Cookies.remove('role');
                }
                return;
            }

            const error = params.get('error');
            if (error) {
                setError('Google authentication failed. Please try again.');
                return;
            }

            const googleId = params.get('googleId');
            const email = params.get('email');
            const name = params.get('name');

            if (googleId && email && name) {
                navigate(`/google-role-selection?googleId=${googleId}&email=${email}&name=${name}`);
            }
        };

        handleGoogleCallback();
    }, [location, navigate]);

    // Inject styles
    useEffect(() => {
        const styleId = 'auth-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

                .auth-body {
                    background: #fef2f2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    font-family: 'Poppins', sans-serif;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                }

                .auth-body h1 {
                    font-weight: 700;
                    margin: 0;
                    font-size: 32px;
                    color: #192252;
                }

                .auth-body h2 {
                    text-align: center;
                }

                .auth-body p {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    letter-spacing: 0.5px;
                    margin: 20px 0 30px;
                }

                .auth-body span {
                    font-size: 12px;
                    color: #666;
                    margin: 10px 0;
                }

                .auth-body a {
                    color: #667eea;
                    font-size: 14px;
                    text-decoration: none;
                    margin: 15px 0;
                    transition: color 0.3s ease;
                }

                .auth-body a:hover {
                    color: #764ba2;
                }

                .auth-body button {
                    border-radius: 25px;
                    border: 1px solid #193cb8;
                    // background: #e94560;
                    color: #193cb8;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 12px 45px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    box-shadow: 0 4px 15px #193cb84d;
                }

                .auth-body button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(233, 69, 96, 0.6);
                }

                .auth-body button:active {
                    transform: scale(0.95);
                }

                .auth-body button:focus {
                    outline: none;
                }

                .auth-body button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .auth-body button.ghost {
                    background-color: transparent;
                    border-color: #FFFFFF;
                    box-shadow: none;
                }

                .auth-body button.ghost:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                .auth-body form {
                    background-color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 50px;
                    height: 100%;
                    text-align: center;
                }

                .auth-body input, .auth-body select {
                    background-color: #f6f5f7;
                    border: none;
                    border-bottom: 2px solid transparent;
                    padding: 12px 15px;
                    margin: 8px 0;
                    width: 100%;
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }

                .auth-body input:focus, .auth-body select:focus {
                    outline: none;
                    border-bottom-color: #667eea;
                    background-color: #fff;
                    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);
                }

                .role-select {
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23667eea' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 15px center;
                    padding-right: 40px;
                }

                .password-container {
                    position: relative;
                    width: 100%;
                }

                .password-toggle {
                    position: absolute;
                    right: 0;
                    top: 15%;
                    border: none!important;
                    background: none!important;
                    padding: 12px!important;
                    cursor: pointer;
                    font-size: 18px;
                    box-shadow: none!important;
                    min-width: auto;
                }

                .error-message {
                    background-color: #fee;
                    border: 1px solid #fcc;
                    color: #c33;
                    padding: 10px;
                    border-radius: 8px;
                    margin: 10px 0;
                    font-size: 13px;
                    animation: shake 0.5s;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }

                .auth-container {
                    background-color: #fff;
                    border-radius: 20px;
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
                                0 10px 10px rgba(0,0,0,0.22);
                    position: relative;
                    overflow: hidden;
                    width: 850px;
                    max-width: 100%;
                    min-height: 550px;
                }

                .form-container {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    transition: all 0.6s ease-in-out;
                }

                .sign-in-container {
                    left: 0;
                    width: 50%;
                    z-index: 2;
                }

                .auth-container.right-panel-active .sign-in-container {
                    transform: translateX(100%);
                }

                .sign-up-container {
                    left: 0;
                    width: 50%;
                    opacity: 0;
                    z-index: 1;
                }

                .auth-container.right-panel-active .sign-up-container {
                    transform: translateX(100%);
                    opacity: 1;
                    z-index: 5;
                    animation: show 0.6s;
                }

                @keyframes show {
                    0%, 49.99% {
                        opacity: 0;
                        z-index: 1;
                    }
                    
                    50%, 100% {
                        opacity: 1;
                        z-index: 5;
                    }
                }

                .overlay-container {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 50%;
                    height: 100%;
                    overflow: hidden;
                    transition: transform 0.6s ease-in-out;
                    z-index: 100;
                }

                .auth-container.right-panel-active .overlay-container {
                    transform: translateX(-100%);
                }

                .overlay {
                    background: #193cb8;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: 0 0;
                    color: #FFFFFF;
                    position: relative;
                    left: -100%;
                    height: 100%;
                    width: 200%;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                }

                .auth-container.right-panel-active .overlay {
                    transform: translateX(50%);
                }

                .overlay-panel {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 40px;
                    text-align: center;
                    top: 0;
                    height: 100%;
                    width: 50%;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                }

                .overlay-left {
                    transform: translateX(-20%);
                }

                .auth-container.right-panel-active .overlay-left {
                    transform: translateX(0);
                }

                .overlay-right {
                    right: 0;
                    transform: translateX(0);
                }

                .auth-container.right-panel-active .overlay-right {
                    transform: translateX(20%);
                }

                .overlay-logo {
                    width: 120px;
                    height: auto;
                    margin-bottom: 20px;
                    background: white;
                    padding: 15px;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .social-container {
                    margin: 20px 0;
                }

                .social-btn {
                    border: 1px solid #DDDDDD;
                    border-radius: 50%;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 5px;
                    height: 45px;
                    width: 45px;
                    background: white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    padding: 0;
                    min-width: auto;
                }

                .social-btn:hover {
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }

                .google-icon {
                    display: block;
                }

                @media (max-width: 768px) {
                    .auth-container {
                        min-height: 600px;
                    }
                    
                    .form-container {
                        width: 100% !important;
                    }
                    
                    .overlay-container {
                        display: none;
                    }
                    
                    .sign-in-container,
                    .sign-up-container {
                        position: relative;
                        width: 100%;
                        left: 0;
                        transform: none !important;
                    }
                    
                    .sign-up-container {
                        display: none;
                    }
                    
                    .auth-container.right-panel-active .sign-up-container {
                        display: flex;
                    }
                    
                    .auth-container.right-panel-active .sign-in-container {
                        display: none;
                    }
                    
                    .auth-body form {
                        padding: 0 30px;
                    }
                    
                    .auth-body h1 {
                        font-size: 24px;
                    }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .auth-body button:disabled::before {
                    content: '';
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    margin-right: 8px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .auth-body form > * {
                    animation: fadeIn 0.5s ease-out;
                }

                .auth-body form > *:nth-child(1) { animation-delay: 0.1s; }
                .auth-body form > *:nth-child(2) { animation-delay: 0.2s; }
                .auth-body form > *:nth-child(3) { animation-delay: 0.3s; }
                .auth-body form > *:nth-child(4) { animation-delay: 0.4s; }
                .auth-body form > *:nth-child(5) { animation-delay: 0.5s; }
                .auth-body form > *:nth-child(6) { animation-delay: 0.6s; }
                .auth-body form > *:nth-child(7) { animation-delay: 0.7s; }
                .auth-body form > *:nth-child(8) { animation-delay: 0.8s; }
            `;
            document.head.appendChild(style);
        }

        return () => {
            const style = document.getElementById(styleId);
            if (style) {
                style.remove();
            }
        };
    }, []);

    return (
        <div className="auth-body">
            <div className={`auth-container content-center ${!isLogin ? 'right-panel-active' : ''}`}>
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <button
                                type="button"
                                onClick={handleGoogleAuth}
                                className=""
                                disabled={loading}
                            >
                                <svg className="drop-shadow-[0_0_4px_#fff]" viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center my-1 w-full">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <span className="px-4 py-2 text-sm text-gray-500 font-medium bg-white mx-[-10px] z-10">
                                or use your email for registration
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>

                        {error && !isLogin && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="role-select"
                        >
                            <option value="jobSeeker">💼 Job Seeker</option>
                            <option value="jobHoster">🏢 Job Hoster</option>
                            <option value="recruiter">👔 Recruiter</option>
                        </select>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <button
                                type="button"
                                onClick={handleGoogleAuth}
                                className=""
                                disabled={loading}
                            >
                                <svg className="" viewBox="0 0 24 24" width="20" height="20">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>

                            </button>
                        </div>
                        <div className="flex items-center my-1 w-full">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <span className="px-4 py-2 text-sm text-gray-500 font-medium bg-white mx-[-10px] z-10">
                                or use your account
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>


                        {error && isLogin && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="role-select"
                        >
                            <option value="jobSeeker">💼 Job Seeker</option>
                            <option value="jobHoster">🏢 Job Hoster</option>
                            <option value="recruiter">👔 Recruiter</option>
                        </select>
                        <a href="/forgot-password">Forgot your password?</a>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <img src={logo} alt="Elite Jobs" className="overlay-logo" />
                            <h1 style={{color: 'white'}}>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" style={{color: 'white'}} onClick={() => setIsLogin(true)}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <img src={logo} alt="Elite Jobs" className="overlay-logo" />
                            <h1 style={{color: 'white'}}>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost" style={{color: 'white'}} onClick={() => setIsLogin(false)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;