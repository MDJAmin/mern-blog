export default function Posts({ title, summary, cover, createdAt }) {
  return (
    <section className="entries">
      <div className="image">
        <img
          src={cover}
          alt={title}
        />
      </div>
      <div>
        <h2>{title}</h2>
        <p className="info">
          <span className="author">Time :</span>
          <time>{new Date(createdAt).toLocaleString()}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </section>
  );
}
