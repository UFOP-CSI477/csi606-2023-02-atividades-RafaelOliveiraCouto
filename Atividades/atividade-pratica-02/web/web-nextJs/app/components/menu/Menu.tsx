import Link from "next/link";

export default function Menu() {
    return (
        <nav className="bg-gray-800">
            <div className="flex justify-center items-center h-16">
                <Link href="/"                  className="text-white hover:text-gray-300 px-4">Home</Link>
                <Link href="/estados"           className="text-white hover:text-gray-300 px-4">Estados</Link>
                <Link href="/cidades"           className="text-white hover:text-gray-300 px-4">Cidades</Link>
                <Link href="/pessoas"           className="text-white hover:text-gray-300 px-4">Pessoas</Link>
                <Link href="/doacoes"           className="text-white hover:text-gray-300 px-4">Doações</Link>
                <Link href="/coletas"           className="text-white hover:text-gray-300 px-4">Locais de Coletas</Link>
                <Link href="/tiposSanguineos"  className="text-white hover:text-gray-300 px-4">Tipos Sanguineos</Link>
            </div>
        </nav>
    );
}