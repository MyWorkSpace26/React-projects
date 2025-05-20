export function UsersHeader({ onLogout }) {
  return (
    <header className="bg-purple-700 p-6 text-center text-white">
      <div className="relative mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Наша команда</h1>
        <p className="mx-auto max-w-3xl text-sm sm:text-base">
          Это опытные специалисты, хорошо разбирающиеся во всех задачах,
          которые лежатся на их плечи, и умеющие находить выход из любых, даже
          самых сложных ситуаций.
        </p>
        <button
          onClick={onLogout}
          className="absolute right-0 top-0 rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
        >
          Выход
        </button>
      </div>
    </header>
  );
}
