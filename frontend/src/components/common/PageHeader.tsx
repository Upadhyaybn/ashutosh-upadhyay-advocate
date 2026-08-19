interface PageHeaderProps {
  title: string;
  description?: string;
}

function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;