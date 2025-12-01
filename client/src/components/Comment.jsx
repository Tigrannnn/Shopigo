import cls from '../styles/Comment.module.scss';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';

function Comment({product}) {
    console.log(product);
    
    return (
        <div className={cls.comment}>
            <div className={cls.header}>
                <div>
                    <div className={cls.userImgWrapper}>
                        <div className={cls.userIconWrapper}>
                            <UserIcon className={cls.userIcon} />
                        </div>
                    </div>
                    <span>John Doe</span>
                </div>
                <div>
                    <div className={cls.rating}>
                        <StarIcon className={cls.starIcon} fill="currentColor" color=""/>
                        <StarIcon className={cls.starIcon} fill="currentColor" color=""/>
                        <StarIcon className={cls.starIcon} fill="currentColor" color=""/>
                        <StarIcon className={cls.starIcon} fill="currentColor" color=""/>
                        <StarIcon className={cls.starIcon} fill="currentColor" color=""/>
                    </div>
                </div>
            </div>
            <div className={cls.textBlock}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
            </div>
            <div className={cls.imagesBlock}>
                <img src={process.env.REACT_APP_API_URL + product.image} alt="" />
            </div>
            <div className={cls.sellerAnswerBlock}>
                <div className={cls.sellerAnswer}>
                    <h5>Seller Answer</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ipsa ipsum iusto eligendi laboriosam repellendus quis eum itaque! Dolores expedita totam neque aliquam odio doloribus tempore est optio minima quod asperiores natus assumenda perspiciatis accusamus, harum sed nihil maxime fuga officiis, eum cupiditate rem et itaque. Rem nemo aliquam et quibusdam officia asperiores rerum labore quam aliquid. Dolorem, voluptatem delectus. Aliquid, cumque nihil! Quam aliquid beatae et accusamus temporibus ab maxime nemo quidem molestiae hic. Minima ad officia qui dolorum.</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;