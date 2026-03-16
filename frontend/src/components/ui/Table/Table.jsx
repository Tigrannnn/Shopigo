import cls from './Table.module.scss';

function Table({ children, className = '', ...props }) {
    return (
        <div className={`${cls.tableWrapper} ${className}`} {...props}>
            <table>
                {children}
            </table>
        </div>
    );
}

Table.Head = function Head({ children }) {
    return <thead className={cls.head}>{children}</thead>;
};

Table.Body = function Body({ children }) {
    return <tbody className={cls.body}>{children}</tbody>;
};

Table.Row = function Row({ children, className = '', ...props }) {
    return (
        <tr className={`${cls.row} ${className}`} {...props}>
            {children}
        </tr>
    );
};

Table.Header = function Header({ children, className = '', ...props }) {
    return (
        <th className={`${cls.header} ${className}`} {...props}>
            {children}
        </th>
    );
};

Table.Cell = function Cell({ children, className = '', ...props }) {
    return (
        <td className={`${cls.cell} ${className}`} {...props}>
            {children}
        </td>
    );
};

Table.Image = function Image({ src, alt = '', onClick }) {
    return (
        <img
            className={cls.image}
            src={src}
            alt={alt || 'Image'}
            onClick={onClick}
        />
    );
};

Table.Link = function Link({ children, onClick, className = '' }) {
    return (
        <span
            className={`${cls.link} ${className}`}
            onClick={onClick}
        >
            {children}
        </span>
    );
};

Table.Actions = function Actions({ children, className = '' }) {
    return (
        <div className={`${cls.actions} ${className}`}>
            {children}
        </div>
    );
};

Table.Badge = function Badge({ children, variant = 'default', className = '' }) {
    const variantClasses = {
        default: cls.badgeDefault,
        success: cls.badgeSuccess,
        warning: cls.badgeWarning,
        danger: cls.badgeDanger,
        info: cls.badgeInfo,
    };

    return (
        <span className={`${cls.badge} ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Table;
