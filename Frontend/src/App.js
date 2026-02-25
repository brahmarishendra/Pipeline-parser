import {PipelineNavbar} from "./navbar";
import {PipelineToolbar} from "./toolbar";
import {PipelineUI} from "./ui";
import {SubmitButton} from "./submit";
import {X} from "lucide-react";
import {useStore} from "./store";
import {useState, useEffect} from "react";
import {LoadingScreen} from "./LoadingScreen";

function App() {
    const [loading, setLoading] = useState(true);
    const resetCanvas = useStore((state) => state.resetCanvas);

    useEffect(() => {
        const timer = setTimeout(() => {
            import("react").then(({startTransition}) => {
                startTransition(() => {
                    setLoading(false);
                });
            });
        }, 1000); // Simulate initial loading for 1s
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="app-container">
            <PipelineNavbar />
            <PipelineToolbar />
            <div className="pipeline-container">
                <button className="canvas-close-btn" title="Clear Canvas" onClick={resetCanvas}>
                    <X size={24} />
                </button>
                <PipelineUI />
            </div>
            <SubmitButton />
        </div>
    );
}

export default App;
