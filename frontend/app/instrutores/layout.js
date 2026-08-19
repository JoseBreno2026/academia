export default function InstrutoresLayout({ children }) {
  return (
    <section className="p-6">
      <header className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-700">Painel do Instrutor</h2>
      </header>
      {children}
    </section>
  );
}