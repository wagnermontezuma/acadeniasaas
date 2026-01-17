
import React from 'react';
import { Link } from 'react-router-dom';

interface PlatformCardProps {
  title: string;
  subtitle: string;
  icon?: string;
  iconBgColor?: string;
  meta?: {
    label: string;
    value: string | number;
  }[];
  status?: {
    label: string;
    variant: 'success' | 'warning' | 'neutral' | 'error';
  };
  href?: string;
  actionLabel?: string;
  children?: React.ReactNode;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  title,
  subtitle,
  icon = 'school',
  iconBgColor = 'bg-primary',
  meta,
  status,
  href,
  actionLabel = 'Acessar Detalhes',
  children
}) => {
  const statusColors = {
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    neutral: 'bg-muted text-muted-foreground',
    error: 'bg-destructive/10 text-destructive',
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    const classes = "bg-card rounded-[24px] border border-border p-8 flex flex-col h-full hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group";
    return href ? (
      <Link to={href} className={classes}>{children}</Link>
    ) : (
      <div className={classes}>{children}</div>
    );
  };

  return (
    <CardWrapper>
      <div className="flex justify-between items-start mb-6">
        <div className={`size-14 rounded-2xl ${iconBgColor} text-white flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300`}>
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        {status && (
          <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${statusColors[status.variant]}`}>
            {status.label}
          </span>
        )}
      </div>

      <div className="flex-1 mb-6">
        <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors leading-tight mb-1">{title}</h3>
        <p className="text-sm font-bold text-muted-foreground">{subtitle}</p>
      </div>

      {meta && meta.length > 0 && (
        <div className="flex items-center gap-6 py-6 border-t border-border">
          {meta.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{m.label}</p>
              <p className="text-sm font-black text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      {children}

      <div className="mt-auto pt-6 border-t border-border/50">
        <div className="w-full py-3.5 bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-2 transition-all">
          {actionLabel}
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </div>
    </CardWrapper>
  );
};

export default PlatformCard;
