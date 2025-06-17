// src/components/AdBlock.tsx
type AdBlockProps = {
  size: string; // e.g., "300x250"
  className?: string; // For additional styling like height, position
};

export default function AdBlock({ size, className = "" }: AdBlockProps) {
  return (
    <div className={`ad-placeholder ${className}`}>
      <div className="text-center">
        <i className="fas fa-ad text-3xl mb-2"></i>
        <p>Ad Space</p>
        <p className="text-xs">{size}</p>
      </div>
    </div>
  );
}