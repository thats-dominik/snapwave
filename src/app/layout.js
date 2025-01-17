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
              <li><a href="/about">ABOUT</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Snapwave. Alle Rechte vorbehalten.</p>
            <div className="footer-links">
              <a href="https://pinterest.com/daedoeme/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M12.001 0C5.372 0 0 5.372 0 12.001c0 5.087 3.167 9.435 7.616 11.138-.105-.944-.201-2.393.042-3.425.223-.978 1.428-6.594 1.428-6.594s-.363-.728-.363-1.8c0-1.687.978-2.948 2.198-2.948 1.037 0 1.537.778 1.537 1.712 0 1.044-.662 2.603-1.004 4.05-.285 1.201.604 2.18 1.787 2.18 2.143 0 3.792-2.26 3.792-5.516 0-2.882-2.071-4.892-5.032-4.892-3.43 0-5.44 2.57-5.44 5.222 0 1.044.404 2.165.91 2.771.1.12.113.225.084.346-.091.379-.296 1.201-.335 1.365-.052.223-.173.271-.4.165-1.489-.68-2.42-2.8-2.42-4.514 0-3.676 2.669-7.055 7.705-7.055 4.043 0 7.187 2.876 7.187 6.73 0 4.016-2.54 7.236-6.065 7.236-1.183 0-2.297-.616-2.678-1.34l-.728 2.768c-.265.977-.986 2.201-1.469 2.947 1.102.342 2.267.528 3.487.528 6.629 0 12.001-5.372 12.001-12.001C24.001 5.372 18.629 0 12.001 0z"/>
              </svg>
                </a>
              <a href="https://vsco.co/dominik-kazar/gallery" target="_blank" rel="noopener noreferrer">
                <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" fill="white" stroke="white" stroke-width="0.2">
                  <title>VSCO</title>
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm11.52 12c0 .408-.023.792-.072 1.176l-2.04-.24c.024-.312.05-.624.05-.936 0-.288-.025-.6-.05-.888l2.04-.24c.072.384.072.744.072 1.128zM.479 12c0-.384.024-.769.049-1.152l2.04.24c-.024.312-.047.6-.047.912s.023.6.047.912l-2.04.24C.479 12.769.479 12.384.479 12zm20.472-3.096l1.921-.72c.264.72.433 1.464.552 2.232l-2.04.24c-.097-.6-.24-1.2-.433-1.752zM21 12c0 .6-.072 1.176-.167 1.752l-2.017-.455c.071-.409.119-.841.119-1.297s-.048-.912-.119-1.344l2.017-.457c.118.577.167 1.177.167 1.801zm-9 6.456C8.435 18.455 5.545 15.565 5.544 12 5.545 8.435 8.435 5.545 12 5.544c3.565.001 6.455 2.891 6.456 6.456.008 3.559-2.871 6.448-6.429 6.456H12zM12.216 21v-2.064c.885-.029 1.756-.224 2.568-.575l.888 1.872c-1.09.482-2.264.742-3.456.767zm-3.936-.791l.912-1.873c.792.359 1.656.575 2.568.6V21c-1.202-.023-2.386-.293-3.48-.791zM3 12c0-.624.072-1.224.192-1.824l2.016.456c-.098.45-.146.908-.144 1.368 0 .432.048.864.12 1.272l-2.016.455C3.051 13.159 2.994 12.58 3 12zm8.76-9v2.064c-.877.029-1.74.224-2.544.576l-.888-1.871C9.411 3.291 10.577 3.03 11.76 3zm3.935.792l-.911 1.872c-.809-.363-1.682-.559-2.568-.576V3.024c1.248 0 2.424.288 3.479.768zm5.088 4.656c-.231-.56-.513-1.098-.84-1.608l1.681-1.152c.407.648.768 1.32 1.056 2.04l-1.897.72zm-.07 1.296l-2.018.456c-.23-.85-.621-1.648-1.151-2.352l1.632-1.295c.72.959 1.248 2.015 1.537 3.191zm-3.457-2.256c-.572-.667-1.264-1.22-2.04-1.633l.912-1.871c1.056.549 1.993 1.299 2.76 2.208l-1.632 1.296zm-.6-3.744l.96-1.824c.672.384 1.295.816 1.896 1.32L18.145 4.8c-.461-.401-.959-.754-1.489-1.056zm-.408-.216c-.54-.266-1.102-.483-1.68-.648l.504-1.992c.744.216 1.464.48 2.159.84l-.983 1.8zm-2.16-.768c-.6-.144-1.2-.216-1.824-.239V.479c.793.024 1.584.12 2.328.289l-.504 1.992zm-2.28-.239c-.605.021-1.207.094-1.8.216L9.528.744c.72-.168 1.487-.265 2.28-.265v2.042zm-2.28.334c-.586.167-1.156.384-1.704.649l-.96-1.824c.691-.343 1.415-.616 2.16-.816l.504 1.991zm-2.112.865c-.529.294-1.027.64-1.488 1.032L4.56 3.216c.6-.504 1.224-.936 1.896-1.319l.96 1.823zm.48.264l.888 1.871c-.792.408-1.464.96-2.04 1.608L5.136 6.168c.775-.895 1.711-1.636 2.76-2.184zM4.848 6.552l1.608 1.295c-.53.705-.921 1.503-1.152 2.353l-2.016-.456c.312-1.2.84-2.28 1.56-3.192zM3.24 8.4l-1.92-.72c.287-.72.648-1.416 1.08-2.04l1.68 1.176c-.341.494-.623 1.025-.84 1.584zm-.168.455c-.192.577-.36 1.152-.432 1.776L.6 10.393c.12-.769.288-1.537.553-2.257l1.919.719zm-.456 4.513c.096.6.239 1.2.432 1.776l-1.92.72c-.271-.728-.456-1.485-.552-2.257l2.04-.239zm.624 2.208c.239.576.528 1.104.84 1.607L2.4 18.336c-.435-.629-.797-1.306-1.08-2.016l1.92-.744zm.024-1.392l2.017-.456c.216.864.624 1.681 1.128 2.376L4.8 17.4c-.725-.957-1.247-2.051-1.536-3.216zm3.432 2.28c.577.672 1.272 1.248 2.064 1.656l-.912 1.872c-1.063-.557-2.009-1.315-2.784-2.232l1.632-1.296zm.72 3.815l-.96 1.825c-.674-.376-1.31-.819-1.896-1.321l1.368-1.535c.456.407.936.744 1.488 1.031zm.408.217c.528.264 1.104.48 1.705.647l-.504 1.992c-.747-.196-1.471-.469-2.16-.815l.959-1.824zm2.16.768c.576.12 1.176.193 1.8.217v2.039c-.774-.026-1.544-.114-2.305-.264l.505-1.992zm2.28.216c.605-.021 1.207-.094 1.801-.217l.479 1.992c-.749.168-1.513.264-2.28.287V21.48zm2.257-.336c.586-.165 1.155-.382 1.703-.647l.96 1.824c-.688.35-1.412.623-2.159.815l-.504-1.992zm2.086-.865c.528-.287 1.032-.647 1.488-1.031l1.369 1.535c-.588.502-1.223.945-1.896 1.321l-.961-1.825zm-.479-.263l-.888-1.871c.788-.414 1.489-.977 2.064-1.656l1.606 1.296c-.778.91-1.722 1.668-2.782 2.231zm3.071-2.592l-1.607-1.296c.532-.708.916-1.517 1.128-2.376l2.017.456c-.311 1.157-.831 2.248-1.538 3.216zM20.76 15.6l1.92.721c-.288.72-.648 1.392-1.079 2.04l-1.682-1.177c.337-.504.624-1.032.841-1.584zm.168-.455c.192-.553.336-1.152.433-1.752l2.039.239c-.11.761-.294 1.508-.551 2.232l-1.921-.719zm.456-9.841l-1.681 1.152c-.358-.49-.76-.947-1.199-1.368l1.368-1.536c.552.552 1.056 1.128 1.512 1.752zM4.2 3.528l1.368 1.536c-.456.408-.84.864-1.2 1.368l-1.68-1.176c.431-.636.94-1.216 1.512-1.728zM2.664 18.744l1.68-1.152c.36.48.769.937 1.2 1.369l-1.368 1.535c-.548-.545-1.054-1.131-1.512-1.752zm17.16 1.729l-1.368-1.537c.432-.407.841-.863 1.199-1.344l1.682 1.176c-.457.6-.961 1.175-1.513 1.705z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/dominik-haemmerle-10956221b/" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6s-2.5-1.12-2.5-2.5S1.13 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4v12h-4v-12zM8.5 8.5h3.5v1.562h.049c.485-.894 1.67-1.562 3.451-1.562 3.692 0 4.5 2.43 4.5 5.586v6.414h-4v-5.682c0-1.355-.024-3.103-1.891-3.103-1.891 0-2.18 1.479-2.18 3.004v5.781h-4v-12z"/>
                </svg>
              </a>
              <a href="https://github.com/thats-dominik" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.07 3.29 9.37 7.86 10.89.58.11.79-.25.79-.56 0-.28-.01-1.03-.01-2.03-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.27-1.69-1.27-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.46.11-3.04 0 0 .95-.3 3.1 1.16.91-.25 1.88-.37 2.85-.37.97 0 1.94.13 2.85.37 2.15-1.46 3.1-1.16 3.1-1.16.61 1.58.23 2.75.11 3.04.72.8 1.16 1.82 1.16 3.07 0 4.41-2.68 5.39-5.24 5.67.41.35.76 1.03.76 2.08 0 1.5-.01 2.7-.01 3.07 0 .31.2.67.8.56 4.57-1.52 7.86-5.82 7.86-10.89C23.5 5.73 18.27.5 12 .5z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}