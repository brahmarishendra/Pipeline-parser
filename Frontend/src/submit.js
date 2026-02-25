import { useState } from "react";
import { useStore } from "./store";
import { ResultModal } from "./ResultModal";
import { Play } from "lucide-react";

export const SubmitButton = () => {
    /* code the loading state is used to show the loading state of the button
        result and Modelopen are used to store the result and modal open state
    */
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async () => {
        const { nodes, edges } = useStore.getState();
        setLoading(true);

        try {
            /* code to fetch the result from the backend */
            const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to parse pipeline");
            }
            /* code to get the result from the backend */
            const result = await response.json();

            setResult(result);
            setIsModalOpen(true);
        } catch (error) {
            alert(`Error submitting pipeline: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-container">
            <ResultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                results={result}
            />

            {/* for Instead of submit button
            i perfromed changes in button name as
            Run Workflow {Run Button}. 
            (Because Run is more relavant to user and That the user can understand easily and 
            if we trigger the workflow we get the output Like: DAG is valid or not, 
            if not then we get the error message)
            As per better UX. */}

            <button
                type="button"
                className={`submit-button ${loading ? "loading" : ""}`}
                onClick={handleSubmit}
                disabled={loading}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
                {loading ? (
                    <div className="spinner spinner-sm" style={{ borderTopColor: "#15803d" }}></div>
                ) : (
                    <Play size={18} fill="#15803d" strokeWidth={0} />
                )}
                {loading ? "Running..." : "Run"}
            </button>
        </div>
    );
};
