interface EmptyStateProps {
  message: string;
  emoji?: string;
}

export default function EmptyState({ message, emoji }: EmptyStateProps) {
  return (
    <div className="text-center py-8 text-gray-400">
      <p>
        {message} {emoji}
      </p>
    </div>
  );
}
