// Router
import { useNavigate } from 'react-router-dom';

// SEO
import { Helmet } from 'react-helmet-async';

// Styles
import cls from './Policy.module.scss';

// Icons & Images
import { ReactComponent as BackIcon } from '@/assets/icons/back.svg';


function TermsOfUse() {
    // Router
    const navigate = useNavigate()

    // SEO
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const title = 'Terms of Use — Shopigo';
    const description = 'Read Shopigo’s Terms of Use to understand the rules for using our services.';

    return(
        <div className={cls.PolicyPage}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${baseUrl}/terms-of-use`} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${baseUrl}/terms-of-use`} />
            </Helmet>
            <div className={cls.container}>
                <header className={cls.header}>
                    <button 
                        className={cls.backButton}
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        <BackIcon className={cls.backIcon} />
                    </button>
                    <h1 className={cls.title}>Terms of Use</h1>
                </header>
                
                <main className={cls.content}>
                    <div className={cls.section}>
                        <h2>Acceptance of Terms</h2>
                        <p>
                            By accessing and using Shopigo, you accept and agree to be bound by the terms and 
                            provision of this agreement. If you do not agree to abide by the above, please do 
                            not use this service.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials on Shopigo's 
                            website for personal, non-commercial transitory viewing only. This is the grant of a 
                            license, not a transfer of title.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>User Account</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account and password. 
                            You agree to accept responsibility for all activities that occur under your account 
                            or password.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Product Information</h2>
                        <p>
                            We strive to display accurate product information, including prices and availability. 
                            However, we do not warrant that product descriptions or other content is accurate, 
                            complete, reliable, current, or error-free.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Payment and Shipping</h2>
                        <p>
                            All payments must be made in full at the time of purchase. Shipping times are estimates 
                            and may vary. We are not responsible for delays beyond our control.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Returns and Refunds</h2>
                        <p>
                            Returns must be initiated within 30 days of delivery. Items must be unused and in 
                            original packaging. Refunds will be processed within 5-7 business days after we 
                            receive your return.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Limitation of Liability</h2>
                        <p>
                            In no event shall Shopigo or its suppliers be liable for any damages arising out of 
                            the use or inability to use the materials on our website, even if we have been 
                            notified orally or in writing of the possibility of such damage.
                        </p>
                    </div>

                    <div className={cls.section}>
                        <h2>Contact Information</h2>
                        <p>
                            If you have any questions about these Terms of Use, please contact us at:
                            <br />
                            Email: legal@shopigo.com
                            <br />
                            Phone: +374 XX XXX XXX
                        </p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default TermsOfUse