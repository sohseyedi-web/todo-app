# Todo App

This is a clean and interactive **Todo App** built using **React, TypeScript, Zustand, and Tailwind CSS**. The application allows users to manage their tasks efficiently with features like adding, editing, deleting, marking as completed, and filtering tasks.

## 🚀 Features

- **Add Task**: Create new tasks with a title and optional description.
- **Edit Task**: Modify existing tasks.
- **Delete Task**: Remove tasks from the list.
- **Mark as Completed**: Toggle tasks between completed and active.
- **Filter Tasks**: View all, active, or completed tasks.
- **Sort Tasks**: Sort tasks by creation date (ascending or descending).
- **Responsive Design**: Fully optimized for different screen sizes.
- **Animations**: Smooth transitions powered by Framer Motion.
- **Toast Notifications**: User-friendly notifications using React Hot Toast.
- **Testing**: Comprehensive unit and interaction tests for core features.

## 🛠️ Technologies Used

- **React**: Frontend framework for building UI components.
- **TypeScript**: Strongly typed language for improved code quality.
- **Zustand**: Lightweight state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: Animation library for smooth UI transitions.
- **React Hot Toast**: Notifications system.
- **React Icons**: Icon library.
- **clsx**: Utility for conditionally joining class names.
- **Vitest**: Testing framework for running unit tests.
- **React Testing Library**: For testing React components with a focus on user interactions.

## 📂 Project Structure

```
📦 react-todo
├── 📁 src
│   ├── 📁 components       # Reusable UI components
│   │   ├── 📁 common       # Common UI elements
│   │   ├── 📁 tasks        # Task-related components
│   │   ├── 📄 FilterRow.tsx # Task filtering component
│   │   ├── 📄 TodosContainer.tsx # Main container for todos
│   ├── 📁 store            # Zustand state management
│   │   ├── 📄 useStore.ts  # Todo store with actions and state
│   ├── 📁 tests            # Test files
│   │   ├── 📄 taskStore.test.ts  # Store tests
│   │   ├── 📄 taskForm.test.tsx  # Task form tests
│   ├── 📁 types            # TypeScript type definitions
│   ├── 📁 utils            # Utility functions
│   ├── 📄 App.tsx          # Main app component
│   ├── 📄 main.tsx         # Entry point
├── 📄 package.json         # Dependencies & scripts
├── 📄 tailwind.config.js   # Tailwind configuration
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 vite.config.ts       # Vite configuration
└── 📄 README.md            # Project documentation
```

## 🔧 Installation & Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/sohseyedi-web/todo-app
   cd react-todo
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Run tests**

   ```sh
   npm run test
   # or
   yarn test
   ```

5. **Build the project**
   ```sh
   npm run build
   ```

## ✨ Future Enhancements

- **Persistent Storage**: Save tasks using local storage or a backend.
- **Dark Mode**: Add a dark mode toggle.
- **Drag & Drop**: Reorder tasks easily.
- **Task Categories**: Organize tasks with labels or categories.
- **Due Dates**: Add deadline functionality to tasks.

## 🤝 Contributing

Feel free to fork this project and submit pull requests.

## 📜 License

This project is licensed under the MIT License.
