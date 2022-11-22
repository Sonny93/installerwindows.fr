import { useState } from 'react';

import styles from './menu.module.scss';

export default function Menu({
    isButton = true,
    openTextButton = 'Ouvrir le menu',
    closeTextButton = 'Fermer le menu',
    children,
}: {
    isButton?: boolean;
    openTextButton?: string;
    closeTextButton?: string;
    children: JSX.Element | JSX.Element[] | string;
}) {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    const className = !isButton && 'reset';
    return (
        <>
            {isMenuOpen ? (
                <button onClick={closeMenu} className={className}>
                    {closeTextButton}
                </button>
            ) : (
                <button onClick={openMenu} className={className}>
                    {openTextButton}
                </button>
            )}
            {isMenuOpen && (
                <div className={styles['menu']}>
                    <header>
                        <h2>Menu</h2>
                        <button onClick={closeMenu} className={`reset ${styles['btn-close']}`}>
                            X
                        </button>
                    </header>
                    {children}
                </div>
            )}
        </>
    );
}
