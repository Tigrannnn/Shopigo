// React and Router
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import cls from './NotFound.module.scss';

// Components
import RecommendedBlock from '@/components/containers/RecommendedBlock/RecommendedBlock';

function NotFound() {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Page not found'
    }, [])

    return(
        <div className={cls.NotFound}>
            <div className={cls.notFoundContent}>
                <h1>Oops! Page not found</h1>
                <h2>We can’t seem to find the page you’re looking for. Don’t worry, it happens to the best of us</h2>
                <button onClick={() => navigate('/')}>Go to main page</button>
            </div>
            <RecommendedBlock />
        </div>
    )
}

export default NotFound