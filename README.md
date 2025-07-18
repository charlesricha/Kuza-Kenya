# Kuza Kenya: Community Issue Reporter

<p align="center">
  <img src="/public/Kiboko.png" alt="Kiboko, the AI Hippo Assistant" width="200"/>
</p>

<p align="center">
  <strong>Report community issues and help build a better Kenya.</strong>
</p>

---

## 🚀 About Kuza Kenya

Kuza Kenya is a modern web application designed to empower citizens to easily report local infrastructure problems such as potholes, untagged garbage, and other community concerns. By providing a simple and intuitive platform for reporting, Kuza Kenya aims to bridge the gap between citizens and local authorities, fostering a more collaborative approach to community development.

The application features **Kiboko**, a friendly hippo assistant chatbot, to guide users and answer their questions, making the reporting process more engaging and accessible.

## ✨ Key Features

- **📝 Easy Issue Reporting:** A simple, user-friendly form to submit issue details, including a description and an image.
- **📍 Geolocation Tagging:** Automatically captures the user's current location to provide precise coordinates for every report.
- **📸 Image Uploads:** Users can upload a photo of the issue, providing clear visual evidence for authorities.
- **🤖 Kiboko Chatbot:** An interactive chatbot that answers user questions about the platform and how to report issues effectively.
- **📱 Fully Responsive:** A clean, modern interface that works seamlessly across desktops, tablets, and mobile devices.
- **✅ Instant Feedback:** Users receive immediate confirmation upon successful submission of their report.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend Service:** [Supabase](https://supabase.io/) (for database and file storage)

## ⚙️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or a compatible package manager
- A [Supabase](https://supabase.io/) account to get your project URL and anon key.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/kuza-kenya.git
    cd kuza-kenya
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    - Create a `.env` file in the root of your project by copying the example file:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and add your Supabase project credentials. You can find these in your Supabase project's "API" settings.
      ```
      NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002).

## 💬 How the Chatbot Works

The Kiboko chatbot currently operates using a predefined set of local responses to ensure speed and reliability. The logic in `src/app/actions.ts` matches keywords in user input (including common misspellings) to provide helpful, instant answers to frequently asked questions.
