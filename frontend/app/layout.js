import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Gestão de Academia',
  description: 'Sistema de gestão de alunos e instrutores',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        <header className="bg-slate-800 text-white p-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Academia System</h1>
            <nav className="space-x-4">
              <Link href="/alunos" className="hover:underline">
                Alunos
              </Link>
              <Link href="/instrutores" className="hover:underline">
                Instrutores
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}