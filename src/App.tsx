import "./App.css";
import DemoList from "./TransitionDemo/DemoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>React useTransition demo</p>
      </header>
      <div className="App-content">
        <DemoList />
      </div>
    </div>
  );
}

export default App;
