import "./App.css";

function App() {
  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.title}>🚀 ASAP Project - Blogify</h1>
      <p style={styles.tagline}>
        A modern blog platform to write, read, and share stories in real-time.
      </p>

      <section style={styles.section}>
        <h2>💡 Why Blogify?</h2>
        <p>
          Blogify is your go-to platform for sharing thoughts, tutorials, or ideas.
          It supports markdown, comments, user profiles, and a smooth writing experience.
        </p>
      </section>

      <section style={styles.section}>
        <h2>🛠 Features</h2>
        <ul>
          <li>Create, read, update, and delete blog posts</li>
          <li>Comment system</li>
          <li>MongoDB + Express backend</li>
          <li>Simple and clean UI</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        Built with ❤️ by Nishant
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  tagline: {
    fontSize: "1.2rem",
    color: "#666",
  },
  section: {
    marginTop: "2rem",
    textAlign: "left",
    maxWidth: "600px",
    margin: "2rem auto",
  },
  footer: {
    marginTop: "4rem",
    fontSize: "0.9rem",
    color: "#888",
  },
};

export default App;
