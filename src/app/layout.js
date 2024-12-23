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
              {/* Alle Buchstaben als SVG */}
            <div className="svg-logo">
                {/* SVG für jedes einzelne Zeichen in der Reihenfolge einfügen */}
                <svg alt="s" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 21.5 41"><path fill="#000" d="M17.93,10.9c-.18-.27-.5-.62-.96-1.06-.47-.44-1.03-.88-1.7-1.34-.67-.46-1.39-.84-2.17-1.14-.78-.3-1.57-.46-2.38-.46-1.41,0-2.47.39-3.19,1.16-.72.78-1.08,1.9-1.08,3.38,0,1.1.23,1.97.68,2.61.45.64,1.13,1.19,2.04,1.65.91.46,2.04.95,3.4,1.48,1.76.64,3.29,1.43,4.58,2.36,1.3.93,2.29,2.14,2.98,3.64.69,1.5,1.04,3.49,1.04,5.99,0,2.12-.26,3.94-.79,5.45-.53,1.51-1.25,2.75-2.17,3.72-.92.96-1.98,1.67-3.17,2.1-1.2.43-2.46.65-3.79.65s-2.67-.21-4-.63c-1.33-.42-2.61-1.02-3.83-1.8-1.22-.78-2.36-1.72-3.42-2.83l2.3-6.79c.23.34.63.79,1.21,1.34.58.55,1.28,1.1,2.11,1.66.83.55,1.74,1.02,2.72,1.4.98.38,1.97.57,2.98.57,1.43,0,2.5-.35,3.21-1.04.7-.7,1.06-1.72,1.06-3.08,0-1.21-.28-2.17-.85-2.87-.57-.7-1.37-1.31-2.4-1.82-1.03-.51-2.25-1.05-3.66-1.62-1.71-.72-3.13-1.53-4.25-2.44-1.12-.91-1.96-2.04-2.53-3.38-.57-1.34-.85-3.04-.85-5.09,0-2.77.44-5.09,1.32-6.96.88-1.88,2.06-3.3,3.55-4.26C7.41.48,9.06,0,10.87,0,12.13,0,13.32.21,14.44.63c1.12.42,2.17.97,3.15,1.65.98.69,1.86,1.43,2.64,2.23l-2.3,6.39Z"/></svg>
                <svg alt="n" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 40.7"><path fill="#000" d="M5.2,14.44v26.03H0V-.06h4.19l13.81,26.71V0h5.17v40.47h-4.3L5.2,14.44Z"/></svg>
                <svg alt="a" xmlns="http://www.w3.org/2000/svg"viewBox="0 -0.1 25.1 40.8"><path fill="#000" d="M9.89,0h5.28l9.85,40.52h-5.36l-2.23-10.1H7.6l-2.24,10.1H0L9.89,0ZM16.22,24.89l-3.69-16.72-3.71,16.72h7.39Z"/></svg>
                <svg alt="p" xmlns="http://www.w3.org/2000/svg"viewBox="0 -0.07 20 41"><path fill="#000" d="M0,40.54V.02h11.36c1.23,0,2.37.38,3.42,1.14,1.04.76,1.94,1.79,2.7,3.08.75,1.29,1.34,2.74,1.75,4.34.42,1.6.62,3.23.62,4.91,0,2.25-.34,4.4-1.02,6.48-.68,2.07-1.64,3.76-2.89,5.05-1.25,1.29-2.7,1.94-4.36,1.94h-6.38v13.58H0ZM5.21,20.05h6.04c.65,0,1.23-.27,1.74-.8.5-.53.9-1.3,1.19-2.31.29-1.01.43-2.16.43-3.45,0-1.41-.17-2.6-.51-3.57-.34-.97-.78-1.71-1.32-2.23-.54-.51-1.13-.77-1.75-.77h-5.81v13.13Z"/></svg>
                <svg alt="w" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 40 41"><path fill="#000" d="M11.96.01h4.83l3.06,13.36L22.94.01h4.79l-4.57,18.38,3.36,12.96L34.11-.1h5.66l-10.72,40.52h-4.49l-4.72-17.01-4.68,17.01h-4.49L0-.1h5.58l7.59,31.45,3.36-12.96L11.96.01Z"/></svg>
                <svg alt="a" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 25 41"><path fill="#000" d="M9.89,0h5.28l9.85,40.52h-5.36l-2.23-10.1H7.6l-2.24,10.1H0L9.89,0ZM16.21,24.88l-3.69-16.72-3.7,16.72h7.39Z"/></svg>
                <svg alt="v" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 26 41"><path fill="#000" d="M5.47,0l7.25,31.22L19.85,0h5.47l-10.11,40.52h-5.02L0,0h5.47Z"/></svg>
                <svg alt="e" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 16 41"><path fill="#000" d="M18.6,33.61v6.91H0V0h18.26v6.91H5.21v9.76h11.25v6.39H5.21v10.56h13.4Z"/></svg>
                <svg alt="•" xmlns="http://www.w3.org/2000/svg"viewBox="0 -14 12 41"><path fill="#000" d="M11.34,5.64c0,1.05-.25,2.01-.74,2.87-.49.87-1.16,1.56-2.02,2.06-.85.51-1.81.76-2.86.76s-2.01-.25-2.86-.76c-.85-.51-1.54-1.19-2.07-2.06-.53-.87-.79-1.83-.79-2.87s.25-2,.76-2.85c.51-.85,1.2-1.53,2.07-2.03C3.71.25,4.67,0,5.72,0s2.01.25,2.86.76c.85.51,1.53,1.18,2.02,2.03.49.85.74,1.8.74,2.85Z"/></svg>
                <svg alt="c" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 41"><path fill="#000" d="M0,20.21c0-2.51.29-4.96.89-7.33.59-2.38,1.46-4.54,2.6-6.48S6.03,2.91,7.66,1.74C9.3.58,11.14,0,13.21,0,15.67,0,17.81.82,19.6,2.46c1.8,1.64,3.13,3.77,3.98,6.39l-3.96,4.17c-.45-1.52-1.04-2.72-1.77-3.6-.73-.87-1.52-1.5-2.36-1.88-.84-.38-1.65-.57-2.43-.57-1.31,0-2.45.4-3.42,1.2-.97.8-1.77,1.85-2.42,3.14-.64,1.29-1.13,2.74-1.45,4.34s-.49,3.22-.49,4.85c0,1.75.19,3.45.57,5.11.38,1.66.91,3.12,1.6,4.39.69,1.28,1.52,2.28,2.49,3.02.97.74,2.03,1.11,3.19,1.11.8,0,1.63-.21,2.49-.63.86-.42,1.65-1.08,2.38-2,.73-.91,1.32-2.11,1.77-3.6l4.23,3.77c-.55,2.02-1.43,3.73-2.62,5.14-1.2,1.41-2.53,2.47-4,3.2s-2.94,1.08-4.4,1.08c-1.91,0-3.65-.6-5.23-1.8-1.57-1.2-2.94-2.8-4.09-4.79s-2.06-4.24-2.7-6.73-.96-5.01-.96-7.56Z"/></svg>
                <svg alt="h" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 23 41"><path fill="#000" d="M22.53.01v40.52h-5.17v-17.29H5.21v17.29H0V.01h5.21v16.38h12.15V.01h5.17Z"/></svg>
            </div>
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