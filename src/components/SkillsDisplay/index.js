import { DEFAULT_MODIFIER_ATTRIBUTE_VALUE, SKILL_LIST } from "../../consts";
import React, { useCallback, useEffect, useState } from "react";
import "./skillsDisplay.css";

const generateSkillValues = () => {
  let skillValues = {};
  SKILL_LIST.map((skillSet) => {
    skillValues[skillSet.name] = 0;
  });
  return skillValues;
};

export const SkillsDisplay = ({ attrValues }) => {
  const [skillPoints, setSkillPoints] = useState(10);
  const [usedSkillPoints, setUsedSkillPoints] = useState(0);

  useEffect(() => {
    attrValues[DEFAULT_MODIFIER_ATTRIBUTE_VALUE]?.modifier !== undefined &&
      setSkillPoints(
        10 +
          4 * attrValues[DEFAULT_MODIFIER_ATTRIBUTE_VALUE].modifier -
          usedSkillPoints,
      );
  }, [attrValues, usedSkillPoints]);

  const [skillValues, setSkillValues] = useState(generateSkillValues());

  const onClickAdd = useCallback(
    (skillName) => {
      if (skillPoints > 0) {
        setSkillValues((prevState) => ({
          ...prevState,
          [skillName]: prevState[skillName] + 1,
        }));
        setUsedSkillPoints((prevState) => prevState + 1);
      } else {
        alert("You do not have sufficent skill points left");
      }
    },
    [skillPoints],
  );

  const onClickSubtract = useCallback(
    (skillName) => {
      if (skillValues[skillName] > 0) {
        setSkillValues((prevState) => ({
          ...prevState,
          [skillName]: prevState[skillName] - 1,
        }));
        setUsedSkillPoints((prevState) => prevState - 1);
      } else {
        alert("You are already at 0 points for this skill");
      }
    },
    [skillValues],
  );

  return (
    <div className={"container"}>
      <div className={"title"}>Skills</div>
      <div className={"pointsAvailable"}>
        Total skill points available: {skillPoints}
      </div>
      <div className={"skillsList"}>
        {SKILL_LIST.map((skillSet) => {
          return (
            <div key={skillSet.name}>
              <div className={"skillRow"}>
                <div className={"skillLabel"}>
                  {skillSet.name}: {skillValues[skillSet.name]} (Modifier:{" "}
                  {skillSet.attributeModifier}):{" "}
                  {attrValues[skillSet.attributeModifier]?.modifier}
                </div>
                <div className={"skillButtons"}>
                  <button
                    onClick={() => {
                      onClickAdd(skillSet.name);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      onClickSubtract(skillSet.name);
                    }}
                  >
                    -
                  </button>
                  <div className={"totalSkills"}>
                    total:{" "}
                    {skillValues[skillSet.name] +
                      attrValues[skillSet.attributeModifier]?.modifier}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
