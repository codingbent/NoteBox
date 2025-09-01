const About = () => {
    return (
        <div>
            <section className="container py-4" aria-labelledby="about-title">
                <h1 id="about-title" className="mb-3">
                    📒 About NoteBox
                </h1>
                <p>
                    NoteBox is a simple and secure notes app built as part of
                    my learning journey in
                    <strong> React.js ⚛️</strong>,{" "}
                    <strong>authentication 🔐</strong>, and
                    <strong> backend development 💻</strong>. It allows you to
                    create, edit, and organize your notes securely after signing
                    in.
                </p>

                <h2 className="h5 mt-4">✨ What it does</h2>
                <ul className="mb-3">
                    <li>✍️ Add, edit, and delete notes quickly.</li>
                    <li>☁️ Keep notes synced to your account after login.</li>
                    <li>
                        🎯 Clean, distraction-free UI focused on productivity.
                    </li>
                </ul>

                <h2 className="h5 mt-4">🔒 Security</h2>
                <p className="mb-0">
                    Access is gated by authentication. Only logged-in users can
                    create or manage notes. This project was built to practice
                    real-world login and backend integration concepts.
                </p>
            </section>
        </div>
    );
};

export default About;
