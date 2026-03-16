import cls from './Button.module.scss';

function Button({ 
    children, 
    variant = 'primary', 
    isLoading = false,
    disabled = false,
    className = '',
    ...props 
}) {
    const variantClasses = {
        primary: cls.primary,
        secondary: cls.secondary,
        danger: cls.danger,
        white: cls.white,
        action: cls.action
    };

    const buttonClass = `
        ${cls.button} 
        ${variantClasses[variant]} 
        ${(isLoading || disabled) ? cls.disabled : ''}
        ${className}
    `;

    return (
        <button 
            className={buttonClass} 
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className={cls.spinner} viewBox="0 0 24 24">
                        <circle 
                            className={cls.spinnerTrack} 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3"
                        />
                        <path 
                            className={cls.spinnerArrow} 
                            fill="currentColor" 
                            d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z"
                        />
                    </svg>
                    {children ?? 'Loading...'}
                </>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
