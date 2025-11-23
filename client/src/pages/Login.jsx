import cls from '../styles/Login.module.scss'
import { Link } from 'react-router-dom'
import { PRIVACY_POLICY_ROUTE, TERMS_OF_USE_ROUTE } from '../utils/consts'
import { ReactComponent as EnvelopeIcon } from '../assets/icons/envelope.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import { useState } from 'react';
import { useCountrySelectState } from '../store/useCountrySelectState';
import { useProfileState } from '../store/useProfileState';

function Login() {
    const countries = [
        {
            name: 'Armenia',
            code: '+374',
            flag: '🇦🇲',
            mask: '99 999 999'
        },
        {
            name: 'Russia',
            code: '+7',
            flag: '🇷🇺',
            mask: '999 999 99 99'
        },
        {
            name: 'Belarus',
            code: '+375',
            flag: '🇧🇾',
            mask: '99 999 99 99'
        },
        {
            name: 'China',
            code: '+86',
            flag: '🇨🇳',
            mask: '999 999 9999'
        },
    ]

    const isCountrySelectModalOpen = useCountrySelectState(state => state.isCountrySelectModalOpen)
    const closeCountrySelectModal = useCountrySelectState(state => state.closeCountrySelectModal)
    const openCountrySelectModal = useCountrySelectState(state => state.openCountrySelectModal)

    const [authMethod, setAuthMethod] = useState('email')
    const [step, setStep] = useState('enter')
    const [countrySelect, setCountrySelect] = useState(countries.find(country => country.name === 'Armenia'))
    const [inputPhoneState, setInputPhoneState] = useState('')
    const [inputEmailState, setInputEmailState] = useState('')
    const [error, setError] = useState(false)

    const setUser = useProfileState(state => state.setUser)
    const setPhoneNumber = useProfileState(state => state.setPhoneNumber)
    const setEmail = useProfileState(state => state.setEmail)

    const [code, setCode] = useState('')
    const [inputCode, setInputCode] = useState('')
    
    function handleCountrySelect(country) {
        setCountrySelect(country)
        closeCountrySelectModal()
    }

    function handleCountrySelectModal() {
        openCountrySelectModal()
    }

    function handleLogin() {
        if (step === 'enter') {
            if (authMethod === 'phone') {
                setPhoneNumber(inputPhoneState)
                if (inputPhoneState.replace(/\s/g, '').length !== countrySelect.mask.replace(/\s/g, '').length) {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 3000)
                } else {
                    setError(false)
                    setStep('code')
                    handleGetNewCode()
                }
            } else if (authMethod === 'email') {
                if (inputEmailState.includes('@') && inputEmailState.includes('.')) {
                    setEmail(inputEmailState)
                    setError(false)
                    setStep('code')
                    handleGetNewCode()
                } else {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 3000)
                }
            }
        } else if (step === 'code') {
            if (inputCode === code) {
                setUser('user')
            } else {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 3000)
            }
        }
    }
    
    function handleGetNewCode() {
        const randomCode = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
        setCode(randomCode)
        console.log(randomCode)
        alert(randomCode)
    }
    
    return(
        <div className={cls.Login}>
            <div className={cls.loginWrapper}>
                {
                    step === 'enter' && (
                        <>
                            <section className={cls.loginHeaderSection}>
                                <h1 className={cls.loginTitle}>Shopigo</h1>
                                <h2 className={cls.loginSubtitle}>
                                    {authMethod === 'phone' ? 'Enter your phone number' : 'Enter your email address'}
                                </h2>
                            </section>
                            
                            <section className={cls.loginInputSection}>
                                {
                                    isCountrySelectModalOpen && (
                                        <div className={cls.countryDropdown}>
                                            {
                                                countries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => (
                                                    <div 
                                                        className={cls.countryDropdownItem + (countrySelect.code === country.code ? ' ' + cls.active : '')} 
                                                        key={country.code} 
                                                        onClick={() => handleCountrySelect(country)}
                                                    >
                                                        <span className={cls.countryFlag}>{country.flag}</span>
                                                        <span className={cls.countryName}>{country.name}</span>
                                                        <span className={cls.countryCode}>{country.code}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                {
                                    authMethod === 'phone' ? (
                                        <div className={cls.inputWrapper}>
                                            <button 
                                                className={cls.countrySelectButton + (isCountrySelectModalOpen ? ' ' + cls.active : '')} 
                                                type="button" 
                                                aria-label="Select country" 
                                                onClick={handleCountrySelectModal}
                                            >
                                                <span className={cls.countryFlag}>{countrySelect.flag}</span>
                                                <span className={cls.countryCode}>{countrySelect.code}</span>
                                                <span className={cls.countryDropdownArrow}>
                                                    {
                                                        isCountrySelectModalOpen ? '↓' : '↑'
                                                    }
                                                </span>
                                            </button>
                                            <input
                                                type="tel"
                                                placeholder={countrySelect.mask}
                                                className={cls.input}
                                                value={inputPhoneState}
                                                onChange={(e) => setInputPhoneState(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key) || inputPhoneState.replace(/\s/g, '').length >= countrySelect.mask.replace(/\s/g, '').length) {
                                                        e.preventDefault()
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleLogin()
                                                    }
                                                }}
                                            />
                                        </div>
                                    ) : (
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
                                    )
                                }
                                <button className={cls.loginButton} onClick={() => handleLogin()}>
                                    <span>Log In</span>
                                </button>
                                {
                                    error && <span className={cls.errorText}>{authMethod === 'phone' ? 'Incorrect phone format' : 'Incorrect email format'}</span>
                                }
                            </section>
                            
                            <div className={cls.loginDivider}>
                                <span>Or</span>
                            </div>
                            
                            <section className={cls.loginAltAccessSection}>
                                <button className={cls.socialButton}>
                                    <div className={cls.socialIconWrapper}>
                                        <img src="/google.png" alt="Google" />
                                    </div>
                                    <span>Continue with Google</span>
                                </button>
                                
                                <button className={cls.socialButton}>
                                    <div className={cls.socialIconWrapper}>
                                        <img src="/apple.png" alt="Apple" />
                                    </div>
                                    <span>Continue with Apple</span>
                                </button>
                                
                                <button className={cls.socialButton}>
                                    <div className={cls.socialIconWrapper}>
                                        <img src="/microsoft.png" alt="Microsoft" />
                                    </div>
                                    <span>Continue with Microsoft</span>
                                </button>
                                {
                                    authMethod === 'phone' && (
                                        <button className={cls.socialButton} onClick={() => setAuthMethod('email')}>
                                            <div className={cls.socialIconWrapper}>
                                            <EnvelopeIcon className={cls.socialIcon} />
                                            </div>
                                            <span>Continue with Email Address</span>
                                        </button>
                                    )
                                }

                                {
                                    authMethod === 'email' && (
                                        <button className={cls.socialButton} onClick={() => setAuthMethod('phone')}>
                                            <div className={cls.socialIconWrapper}>
                                                <PhoneIcon className={cls.socialIcon} />
                                            </div>
                                            <span>Continue with Phone Number</span>
                                        </button>
                                    )
                                }
                                
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
                                {
                                    authMethod === 'phone' && (
                                        <>
                                             <h2>Enter the last 6 digits of the incoming number</h2>
                                            <p>For example 12 34 56</p>
                                            <p>No need to answer the call</p>
                                            <p>Already calling {countrySelect.code} {inputPhoneState}. <span className={cls.changeNumber} onClick={() => setStep('enter')}>Change</span></p>
                                        </>
                                    ) 
                                }
                                {
                                    authMethod === 'email' && (
                                        <>
                                            <h2>Enter the code sent to your email address</h2>
                                            <p>Already sent to {inputEmailState}. <span className={cls.changeNumber} onClick={() => setStep('enter')}>Change</span></p>
                                        </>
                                    )
                                }
                            </section>

                            <section className={cls.loginInputSection}>
                                <div className={cls.inputWrapper}>
                                    <input 
                                        type="tel" 
                                        className={`${cls.input} ${cls.codeInput}`}
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key) || inputCode.length >= 6) {
                                                e.preventDefault()
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleLogin()
                                            }
                                        }}
                                    />
                                </div>
                                {
                                    error && <span className={cls.errorText}>Incorrect code</span>
                                }
                                <span className={cls.getNewCode} onClick={handleGetNewCode}>Get new code</span>
                            </section>

                            <section className={cls.buttonsSection}>
                                <button onClick={() => handleLogin()}>
                                    <span>Register</span>
                                </button>
                                {
                                    authMethod === 'phone' && (
                                        <span 
                                            onClick={() => {
                                                setStep('enter')
                                                setAuthMethod('email')
                                            }}
                                            className={cls.spanButton}
                                        >
                                            Log in with email address
                                        </span>
                                    )
                                }
                                {
                                    authMethod === 'email' && (
                                        <span 
                                            onClick={() => {
                                                setStep('enter')
                                                setAuthMethod('phone')
                                            }}
                                            className={cls.spanButton}
                                        >
                                            Log in with phone number
                                        </span>
                                    )
                                }
                            </section>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Login