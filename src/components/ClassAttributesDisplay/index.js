import { CLASS_LIST } from "../../consts";
import "./classAttributesDisplay.css";

export const ClassAttributesDisplay = ({
  className,
  setShowClassAttributes,
}) => {
  return (
    <div className={"container"}>
      <div className={"title"}>{className} Minimum Requirements</div>
      <div>
        {Object.entries(CLASS_LIST[className]).map(([attr, val]) => {
          return (
            <div className={"attributeList"} key={attr}>
              {attr}: {val}
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => {
            setShowClassAttributes(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
