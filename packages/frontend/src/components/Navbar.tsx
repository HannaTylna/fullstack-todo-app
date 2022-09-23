import React from 'react';

export default function Navbar(){
    return (
        <nav>
            <div className="nav-wrapper deep-purple px1">
                <a href="/" className="brand-logo">
                    React+Node+TypeScript
                </a>
            <ul className="right hide-on-med-and-down">
                <li>
                    <a href="/">Todos</a>
                </li>
            </ul>
            </div>
        </nav>
    )
}