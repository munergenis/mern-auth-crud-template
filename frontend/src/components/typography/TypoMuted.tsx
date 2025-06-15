interface TypoMutedProps {
  children: string;
}

export const TypoMuted = ({ children }: TypoMutedProps) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};
