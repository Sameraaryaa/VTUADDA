<div align="center">
  <a href="https://vtuadda.com">
    <img src="/public/icon-512x512.png" alt="vtuadda Logo" width="120">
  </a>
  <h1 align="center">vtuadda</h1>
  <p align="center">
    <strong>Your one-stop destination for VTU notes, question papers, and more.</strong>
    <br />
    <a href="https://vtuadda.com"><strong>vtuadda.com</strong></a>
  </p>
</div>

---

Welcome to **vtuadda**, a comprehensive web application meticulously designed to be the ultimate resource hub for students of Visvesvaraya Technological University (VTU). Our mission is to simplify the academic journey for every VTU student by providing a centralized, easy-to-use platform for all academic needs.

## ✨ Key Features

-   **📚 Resource Browsing**: Intuitive browsing for notes, syllabi, and other study materials organized by branch and semester.
-   **🔍 Advanced Search**: A powerful, real-time search to quickly find resources by subject code, title, or keywords.
-   **📄 Previous Year Questions**: A dedicated section to search and filter through a vast library of PYQs.
-   **🧮 SGPA/CGPA Calculator**: An accurate and easy-to-use tool to calculate semester and cumulative grade point averages.
-   **📤 Community Contributions**: Allows students to contribute their own notes, lab manuals, and question papers to enrich the resource pool for everyone.
-   **📱 PWA Ready**: Install vtuadda on your mobile device for a fast, app-like experience with offline access.
-   **🔐 Secure & Private**: No login required to access materials, ensuring your privacy.

## 🚀 Tech Stack

This project is built with a modern, robust, and scalable tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **UI Library**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 345  or newer recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/vtuadda.git
    cd vtuadda
    ```

2.  **Install NPM packages**:
    ```sh
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.local.env` file in the root of your project and add your Firebase project configuration keys. You can get these from your Firebase project settings.
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=

    # Optional for Genkit AI features
    GEMINI_API_KEY=
    ```

4.  **Seed the Database**:
    To populate your Firestore database with initial data (subjects, branches, etc.), run the seeding script. This is a non-destructive operation that will only add new items or update core fields without deleting your existing notes.
    ```sh
    npm run db:seed
    ```

### Running the Application

-   **Run the development server**:
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📜 Available Scripts

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Lints the code for errors and style issues.
-   `npm run db:seed`: Safely upserts the Firestore database with initial data.

---

Developed with ❤️ by the **vtuadda Team**.
