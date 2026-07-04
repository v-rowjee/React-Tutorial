export default function ProgressBar({ value, className = '', height = 'h-2' }) {
  return (
    <div className={`w-full ${height} bg-secondary/40 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}