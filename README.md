# How to Run No-code Pipeline Builder

Welcome! Follow these simple steps to get the application up and running on your computer.
This project is a sophisticated Pipeline Builder that allows users to create, visualize, and validate
workflows. It features a modern, drag-and-drop interface with dynamic node logic and
backend-integrated validation.
I added new nodes to the project: - fileNode - noteNode - logicNode - integrationNode -
promptNode

<img width="1911" height="1079" alt="image" src="https://github.com/user-attachments/assets/01c7f308-2f3b-48a8-ad15-6f396cc86759" />


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
### 3. Dynamic Text Node Logic
The TextNode.js was enhanced with advanced interactive features: - Auto-resizing: Text areas
dynamically adjust height as the user types, ensuring content is always visible. - Variable
Detection: Uses regex to identify {{variable_name}} patterns in real-time. - Dynamic Handle
Generation: Automatically adds target handles on the left side for every unique variable
detected in the text.

### 4. UI/UX & Styling Enhancements
The application underwent a significant visual overhaul to provide a premium feel: - Custom
CSS Engine: Implemented in ModifiedStyle.css using CSS variables for high-performance
styling. - Interactive Toolbar: A scrollable, category-based navbar and toolbar for easy node
access. - "Run" Workflow UX: for Instead of submit button i perfromed changes in button name
as Run Workflow {Run Button}. (Because Run is more relavant to user and That the user can
understand easily and if we trigger the workflow we get the output Like: DAG is valid or not, if not
then we get the error message) As per better UX. - ResultModal.js: Instead of basic alerts,
results are displayed in a clean, modern card featuring: - SVG Mini-map: A live visualization of
the submitted pipeline. - Detailed Stats: Node count, edge count, and DAG status. - Intuitive
Feedback: Color-coded results (success/error) and helpful descriptions.

### Step 5: Use the App
- Wait for the **Loading Screen** to disappear.
- Drag and drop nodes onto the canvas.
- Connect them using the handles on the sides.
- Click **Submit Pipeline** to see if your graph is valid (a "DAG") or if it has cycles.
-
<img width="1886" height="878" alt="image" src="https://github.com/user-attachments/assets/06cae78f-4385-4d22-bb0a-0a5a716bbaa7" />



Enjoy building! 🚀
