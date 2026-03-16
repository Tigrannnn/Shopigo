// React and Router
// Email + code login flow with optional Google OAuth
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Login.module.scss';

// Hooks
// Global error state and mutations for email/code and Google login
import { useErrorState } from '@/store/useErrorState';
import { useLoginQuery, useSendCodeQuery, useGoogleLoginQuery } from '@/hooks/query/useUsersQuery';

// Utils
import { PRIVACY_POLICY_ROUTE, TERMS_OF_USE_ROUTE } from '@/utils/constants/routes';

// Components
import Loader from '@/components/ui/Loader/Loader';
import { useGoogleLogin } from '@react-oauth/google';


function Login() {
    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Login — Shopigo';
    const description = 'Sign in to Shopigo to manage your profile, favorites, basket, and orders.';

    // 'enter' — user types email, 'code' — user types verification code
    const [step, setStep] = useState('enter')

    // Input states
    const [inputEmailState, setInputEmailState] = useState('')
    const [inputCode, setInputCode] = useState('')

    // Error states
    const error = useErrorState(state => state.error)
    const clearError = useErrorState(state => state.clearError)
    const setError = useErrorState(state => state.setError)

    // Simple countdown (in seconds) for resending verification code
    const [resendTimer, setResendTimer] = useState(0);

    // React Query hooks
    const { mutate: sendCode, isPending: isSendCodePending } = useSendCodeQuery();
    const { mutate: login, isPending: isLoginPending } = useLoginQuery();
    const { mutate: googleAuth, isPending: isGooglePending } = useGoogleLoginQuery()

    // Any auth-related request is in progress
    const loading = isSendCodePending || isLoginPending || isGooglePending;

    // Decrease resend timer once per second while it is > 0
    useEffect(() => {
        let interval = null;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    function handleResendCode() {
        if (resendTimer > 0) return; 

        sendCode(inputEmailState, {
            onSuccess: () => {
                setResendTimer(60);
            }
        });
    }


    function handleLogin() {
        // First step: validate email and request verification code
        if (step === 'enter') {
            if (inputEmailState.includes('@') && inputEmailState.includes('.')) {
                clearError();
                sendCode(inputEmailState, {
                    onSuccess: () => {
                        setResendTimer(60);
                        setStep('code');
                    }
                });
            } else {
                setError('Incorrect email format');
            }
        } else if (step === 'code') {
            // Second step: send email + code to backend to finish login
            clearError()
            login({ 
                email: inputEmailState, 
                inputCode 
            });
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const token = tokenResponse.id_token || tokenResponse.access_token;
            googleAuth(token);
        },
        onError: (error) => {
            console.error('Google login error:', error);
        },
        scope: 'openid profile email',
    })
    
    return(
        <div className={cls.Login}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/login`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/login`} />
            </Helmet>
            <div className={cls.loginWrapper}>
                {loading && (
                    <Loader variant='modal'/>
                )}
                {
                    step === 'enter' && (
                        <>
                            <section className={cls.loginHeaderSection}>
                                <h1 className={cls.loginTitle}>Shopigo</h1>
                                <h2 className={cls.loginSubtitle}>
                                    Enter your email address
                                </h2>
                            </section>
                            
                            <section className={cls.loginInputSection}>
                                <div className={cls.inputWrapper}>
                                    <input 
                                        type="email" 
                                        placeholder="example@gmail.com" 
                                        className={cls.input}
                                        value={inputEmailState}
                                        onChange={(e) => setInputEmailState(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleLogin()
                                            }
                                        }}
                                    />
                                </div>
                                <button className={cls.loginButton} onClick={() => handleLogin()}>
                                    <span>Log In</span>
                                </button>
                                {
                                    error && <span className='errorText'>{error}</span>
                                }
                            </section>
                            
                            <div className={cls.loginDivider}>
                                <span>Or</span>
                            </div>
                            
                            <section className={cls.loginAltAccessSection}>
                                <button className={cls.socialButton} onClick={handleGoogleLogin}>
                                    <img src="/google.png" alt="Google" />
                                    <span>Continue with Google</span>
                                </button>
                                
                                <div className={cls.policyLinksWrapper}>
                                    <Link className={cls.policyLink} to={TERMS_OF_USE_ROUTE}>
                                        Terms of Use
                                    </Link>
                                    <Link className={cls.policyLink} to={PRIVACY_POLICY_ROUTE}>
                                        Privacy Policy
                                    </Link>
                                </div>
                            </section>
                        </>
                    )
                }
                {
                    step === 'code' && (
                        <> 
                             <section className={cls.loginHeaderSection}>
                                <h1 className={cls.loginTitle}>Shopigo</h1>
                                <h2>Enter the code sent to your email address</h2>
                                <p>Already sent to {inputEmailState}. <span className={cls.changeNumber} onClick={() => setStep('enter')}>Change</span></p>
                            </section>

                            <section className={cls.loginInputSection}>
                                <div className={cls.inputWrapper}>
                                    <input 
                                        type="tel" 
                                        className={`${cls.input} ${cls.codeInput}`}
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleLogin()
                                            } else if (!/[0-9]/.test(e.key) || inputCode.length >= 6) {
                                                e.preventDefault()
                                            }
                                        }}
                                    />
                                </div>
                                {
                                    error && <span className='errorText'>{error}</span>
                                }
                                {resendTimer > 0 ? (
                                    <span className={cls.timerText}>
                                        Resend code in {resendTimer}s
                                    </span>
                                ) : (
                                    <span 
                                        className={cls.resendCode} 
                                        onClick={handleResendCode}
                                    >
                                        Get new code
                                    </span>
                                )}
                            </section>

                            <section className={cls.buttonsSection}>
                                <button onClick={() => handleLogin()}>
                                    <span>Log In</span>
                                </button>
                            </section>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Login