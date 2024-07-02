import React, { useCallback } from "react";
import "./attributeDisplay.css";
import {
  MAX_ATTRIBUTE_VALUE,
  MIN_ATTRIBUTE_VALUE,
  STARTING_ATTRIBUTE_VALUE,
} from "../../consts";

export const AttributeDisplay = ({ attrValues, setAttrValues }) => {
  const onClickAdd = useCallback(
    (attr) => {
      if (attrValues[attr].value < MAX_ATTRIBUTE_VALUE) {
        setAttrValues((prevState) => ({
          ...prevState,
          [attr]: {
            value: prevState[attr].value + 1,
            modifier: Math.floor(
              (prevState[attr].value + 1 - STARTING_ATTRIBUTE_VALUE) / 2,
            ),
          },
        }));
      } else {
        alert(
          `You cannot increase attribute value more than ${MAX_ATTRIBUTE_VALUE}`,
        );
      }
    },
    [attrValues, setAttrValues],
  );

  const onClickSubtract = useCallback(
    (attr) => {
      if (attrValues[attr].value > MIN_ATTRIBUTE_VALUE) {
        setAttrValues((prevState) => ({
          ...prevState,
          [attr]: {
            value: prevState[attr].value - 1,
            modifier: Math.floor(
              (prevState[attr].value - 1 - STARTING_ATTRIBUTE_VALUE) / 2,
            ),
          },
        }));
      } else {
        alert(
          `You cannot decrease attribute value less than ${MIN_ATTRIBUTE_VALUE}`,
        );
      }
    },
    [attrValues, setAttrValues],
  );

  return (
    <div className={"container"}>
      <div className={"title"}>Attributes</div>
      <div className={"attributeList"}>
        {Object.entries(attrValues).map(([attr, values]) => {
          return (
            <div className={"attrRow"} key={attr}>
              <div>
                {attr}: {values.value} (Modifier: {values.modifier})
              </div>
              <div className={"attrButtons"}>
                <button
                  onClick={() => {
                    onClickAdd(attr);
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    onClickSubtract(attr);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
