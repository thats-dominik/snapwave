// src/app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'Snapwave',
  description: 'Eine innovative Fotogalerie mit Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <header className="navbar">
          <div className="navbar-left">
            <h1 className="navbar-logo">SNAPWAVE•CH</h1>
          </div>
          <nav className="navbar-right">
            <ul>
              <li><a href="/">PROFILE</a></li>
              <li><a href="/gallery">GALLERY</a></li>
              <li><a href="/settings">SETTINGS</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}