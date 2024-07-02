import React, { useCallback, useEffect, useState } from "react";
import { CLASS_LIST } from "../../consts";
import "./classDisplay.css";

const isCharPartOfClass = (className, charAttributes) => {
  for (let attr in charAttributes) {
    if (charAttributes[attr].value < CLASS_LIST[className][attr]) {
      return false;
    }
  }
  return true;
};

export const ClassDisplay = ({
  setClassName,
  setShowClassAttributes,
  attrValues,
}) => {
  const [fontColor, setFontColor] = useState(() => {
    let fontMap = {};
    Object.keys(CLASS_LIST).map((className) => {
      fontMap[className] = undefined;
    });
    return fontMap;
  });

  useEffect(() => {
    Object.keys(CLASS_LIST).map((className) => {
      if (isCharPartOfClass(className, attrValues)) {
        setFontColor((prevState) => ({ ...prevState, [className]: "red" }));
      } else {
        setFontColor((prevState) => ({ ...prevState, [className]: undefined }));
      }
    });
  }, [attrValues]);

  const onClickClassTitle = useCallback(
    (className) => {
      setClassName(className);
      setShowClassAttributes(true);
    },
    [setClassName, setShowClassAttributes],
  );

  return (
    <div className={"container"}>
      <div className={"title"}>Classes</div>
      <div className={"classList"}>
        {Object.keys(CLASS_LIST).map((className) => {
          return (
            <div
              className={"classTitle"}
              style={{ color: fontColor[className] }}
              onClick={() => {
                onClickClassTitle(className);
              }}
              key={className}
            >
              {className}
            </div>
          );
        })}
      </div>
    </div>
  );
};
