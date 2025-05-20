export function LoadingSpinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-700 border-t-transparent"></div>
    </div>
  );
}
