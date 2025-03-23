export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-0.5 bg-transparent shadow-lg rounded-xl ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`mt-4 ${className}`}>{children}</div>;
  }
  