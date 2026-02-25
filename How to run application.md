# How to Run No-code Pipeline Builder

Welcome! Follow these simple steps to get the application up and running on your computer.

### Prerequisites
Make sure you have **Node.js** and **Python** installed.

---

### Step 1: Start the Backend (API)
The backend handles the main core logic of the app (like checking if your pipeline is valid).

1. Open your terminal.
2. Go into the backend folder:
   ```bash
   cd backend
   ```
3. Start the server:
   ```bash
   python -m uvicorn main:app --reload
   ```
   *The backend is now running at http://127.0.0.1:8000*

---

### Step 2: Start the Frontend (User Interface)
The frontend is the visual part where you build your pipelines.

1. Open a **new** terminal window (keep the backend one running!).
2. Go into the frontend folder:
   ```bash
   cd frontend
   ```
3. Install the tools (only need to do this once):
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm start
   ```
   *The app should automatically open in your browser at http://localhost:3000*

---

### Step 3: Use the App
- Wait for the **Loading Screen** to disappear.
- Drag and drop nodes onto the canvas.
- Connect them using the handles on the sides.
- Click **Submit Pipeline** to see if your graph is valid (a "DAG") or if it has cycles.

Enjoy building! 🚀
