import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="bg-dark text-white text-center p-3">
            <p className="mb-0">© 2025 DigiPymes360 | <Link to="/" className="text-white text-decoration-underline">Contacto</Link> | <Link
                to="/" className="text-white text-decoration-underline">Términos</Link></p>
        </footer>
    )
}
