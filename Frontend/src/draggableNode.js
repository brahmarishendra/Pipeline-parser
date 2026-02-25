export const DraggableNode = ({type, label, icon: Icon}) => {
    const onDragStart = (event, nodeType) => {
        {
            /* appData is used to store the nodeType */
        }
        const appData = {nodeType};
        event.target.style.cursor = "grabbing";
        event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div
            className="dndnode"
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = "grab")}
            draggable
        >
            {Icon && <Icon className="dndnode-icon" strokeWidth={1.5} />}
            <span className="dndnode-label">{label}</span>
        </div>
    );
};
