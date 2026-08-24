import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Gestão de Academia',
  description: 'Sistema de gestão de alunos, instrutores, treinos, planos e pagamentos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        <header className="bg-slate-800 text-white p-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:text-gray-300">
              Academia System
            </Link>
            <nav className="flex space-x-4 text-sm font-medium">
              <Link href="/alunos" className="hover:underline">
                Alunos
              </Link>
              <Link href="/instrutores" className="hover:underline">
                Instrutores
              </Link>
              <Link href="/tipos-exercicios" className="hover:underline">
                Tipos de Exercícios
              </Link>
              <Link href="/exercicios" className="hover:underline">
                Exercícios
              </Link>
              <Link href="/treinos" className="hover:underline">
                Treinos
              </Link>
              <Link href="/planos" className="hover:underline">
                Planos
              </Link>
              <Link href="/pagamentos" className="hover:underline">
                Pagamentos
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}