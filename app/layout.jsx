import React from 'react';
import '@styles/global.css';
import NavBar from '@components/NavBar';
import Provider from '@components/Provider';

export const metatdata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Promps',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;