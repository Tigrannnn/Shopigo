import { useNavigate } from 'react-router-dom'
import cls from '../styles/pages/Policy.module.scss'
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { useEffect } from 'react'

function PrivacyPolicy() {
    useEffect(() => {
        document.title = 'Privacy Policy'
    }, [])
    const navigate = useNavigate()

    return(
        <div className={cls.PolicyPage}>
            <div className={cls.container}>
                <header className={cls.header}>
                    <button 
                        className={cls.backButton}
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <BackIcon className={cls.backIcon} />
                    </button>
                    <h1 className={cls.title}>Privacy Policy</h1>
                </header>
                
                <main className={cls.content}>
                    <div className={cls.section}>
                        <h2>Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, 
                            make a purchase, or contact us for support. This may include your name, email address, 
                            phone number, shipping address, and payment information.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, 
                            process transactions, send you technical notices and support messages, and communicate 
                            with you about products, services, and events.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Information Sharing</h2>
                        <p>
                            We do not sell, trade, or otherwise transfer your personal information to third parties 
                            without your consent, except as described in this policy. We may share your information 
                            with service providers who assist us in operating our website and conducting our business.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information against 
                            unauthorized access, alteration, disclosure, or destruction. However, no method of 
                            transmission over the internet is 100% secure.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Your Rights</h2>
                        <p>
                            You have the right to access, update, or delete your personal information. You may also 
                            opt out of certain communications from us. To exercise these rights, please contact us 
                            using the information provided below.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br />
                            Email: privacy@shopigo.com
                            <br />
                            Phone: +374 XX XXX XXX
                        </p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default PrivacyPolicy