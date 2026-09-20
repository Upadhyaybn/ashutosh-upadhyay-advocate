interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {

  return (
    <span
      className={
        className
          ? `skeleton ${className}`
          : "skeleton"
      }
      aria-hidden="true"
    />
  );
}

export default Skeleton;
