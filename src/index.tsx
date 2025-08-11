import { createRoot } from 'react-dom/client';
import React from 'react';
import './style.css';

const App: React.FC = () => {
    return (
        <>
            <h1 className="text-3xl font-bold underline">typing game</h1>
            <p>type the word that appears on the screen</p>
            <input type="text" />
            <button>start</button>
        </>
    );
};





const appElement = document.getElementById('react-root');
if (appElement) {
    /**
     * @see https://ja.react.dev/reference/react-dom/client/createRoot
     * React管理下のDOMを更新するためにcreateRootを使用する
     */
    const root = createRoot(appElement);
    root.render(<App />);
}