export default function AlunosLayout({ children }) {
  return (
    <section className="p-6">
      <header className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-700">Painel do Aluno</h2>
      </header>
      {children}
    </section>
  );
}