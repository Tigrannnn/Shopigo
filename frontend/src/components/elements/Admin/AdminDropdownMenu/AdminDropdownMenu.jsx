// Styles
import useClickOutside from "@/hooks/useClickOutside";
import cls from "./AdminDropdownMenu.module.scss"
import Button from "@/components/ui/Button/Button";

function AdminDropdownMenu({ items, setIsMenuOpen }) {
    // Close menu when clicking outside
    const menuRef = useClickOutside(() => setIsMenuOpen(false), { ignoreSelector: '[data-modal-trigger]' });

    return (
        <div className={cls.dropdownMenu} ref={menuRef}>
            {items.map((item) => (
                <Button 
                    variant="action"
                    className={`${cls.dropdownItem} ${item.isDelete ? cls.deleteItem : ''}`} 
                    key={item.label} 
                    onClick={item.onClick}
                    disabled={item.isLoading}
                    isLoading={item.isLoading}
                >
                    {!item.isLoading && item.icon && <span>{item.icon}</span> }
                    <span>{item.label}</span>
                </Button>
            ))}
        </div>
    )
}

export default AdminDropdownMenu