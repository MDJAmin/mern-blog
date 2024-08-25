
export default function Posts() {
  return (
    <section className="entries">
        <div className="image">
          <img
            src="https://techcrunch.com/wp-content/uploads/2024/08/beats-studio-in-brief.jpg?resize=900,502"
            alt="product"
          />
        </div>
        <div>
          <h2>
            Apple is bringing audio sharing to Beats Studio Pro via firmware
            update
          </h2>
          <p className="info">
          <a className="author">Apple</a>
          <time>2024-01-01 00:00</time>
          </p>
          <p className="summary">
            Beats Studio Pro are getting one of AirPods’ best features. A
            firmware update, noted by 9to5Mac, is delivering multi-user audio
            sharing, allowing music to be streamed to multiple headphones at
            once. Apple regularly releases features to its AirPods line before
            they make their way to the Beats brand.
          </p>
        </div>
      </section>
  )
}
