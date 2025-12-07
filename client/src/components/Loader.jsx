import cls from '../styles/components/Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../assets/icons/loader.svg';

function Loader({load}) {
    return (
        <div className={cls.LoaderWrapper} style={{alignItems: (load === "app" ? "center" : "flex-start")}}>
            <LoaderIcon />
        </div>
    )
}

export default Loader;