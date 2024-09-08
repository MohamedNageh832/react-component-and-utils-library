import "./style.css";

const SkeletonLoader = ({ width, rows = 1 }) => {
  const skeletonProps = {
    className: "skeleton",
    style: { width },
  };

  return (
    <section {...skeletonProps}>
      {[...Array(rows)].map((_, i) => (
        <div key={`skeleton${i}`} className="skeleton__body">
          <div className="skeleton__shimmer"></div>
        </div>
      ))}
    </section>
  );
};

export default SkeletonLoader;
