import { AttributeDisplay } from "../AttributeDisplay";
import { ClassDisplay } from "../ClassDisplay";
import { ClassAttributesDisplay } from "../ClassAttributesDisplay";
import { useEffect, useState } from "react";
import {
  ATTRIBUTE_LIST,
  STARTING_ATTRIBUTE_VALUE,
  STARTING_MODIFIER_VALUE,
} from "../../consts";
import "./characterSheet.css";
import { SkillsDisplay } from "../SkillsDisplay";

// Creates an object with the attributes as keys and the value being another object containing the attribute value and
// its modifier value. Initializes their starting values.
const generateAttrValues = () => {
  let attrValues = {};
  ATTRIBUTE_LIST.map((attr) => {
    attrValues[attr] = {
      value: STARTING_ATTRIBUTE_VALUE,
      modifier: STARTING_MODIFIER_VALUE,
    };
  });
  return attrValues;
};

export const CharacterSheet = () => {
  const [attrValues, setAttrValues] = useState({});
  const [className, setClassName] = useState(undefined);
  const [showClassAttributes, setShowClassAttributes] = useState(false);

  useEffect(() => {
    setAttrValues(generateAttrValues());
  }, []);

  return (
    <div className={"charInfo"}>
      <AttributeDisplay attrValues={attrValues} setAttrValues={setAttrValues} />
      <ClassDisplay
        setClassName={setClassName}
        setShowClassAttributes={setShowClassAttributes}
        attrValues={attrValues}
      />
      {showClassAttributes && (
        <ClassAttributesDisplay
          className={className}
          setShowClassAttributes={setShowClassAttributes}
        />
      )}
      <SkillsDisplay attrValues={attrValues} />
    </div>
  );
};
