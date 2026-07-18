export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-gold" />
      <span className="overline">Diaspora Alive</span>
    </div>
  )
}
