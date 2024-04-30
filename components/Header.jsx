import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-white text-black flex justify-between items-center p-4 shadow-md">
            <h1 className="text-lg font-bold">AI4XRD</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" passHref>
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
