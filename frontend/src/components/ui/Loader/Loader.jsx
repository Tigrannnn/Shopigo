// Styles
import cls from './Loader.module.scss';

// Icons & Images
import { ReactComponent as LoaderIcon } from '@/assets/icons/loader.svg';


function Loader({variant = 'overlay'}) {
    return (
        <div className={`${cls.LoaderWrapper} ${cls[variant]}`}>
            <LoaderIcon />
        </div>
    )
}

export default Loader;