export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-4 bg-white shadow-lg rounded-xl ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`mt-4 ${className}`}>{children}</div>;
  }
  