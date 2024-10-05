import { content } from "@lib/theme/colors";
import { media } from "@lib/theme/media";
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import styled from "styled-components";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
  onChange: (values: number[]) => void;
}

const InputLabel = styled.div`
  position: relative;
  max-width: 100px;
  width: 100%;
`;

const StyledInput = styled.input`
  border: 1px solid #eee;
  width: 100%;
  border-radius: 10px;
  padding: 8px;
  padding-left: 24px;
  text-align: right;
  font-family: "Montserrat";
`;

const InputSpan = styled.span`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #888;
  font-family: "Montserrat";
`;

const StyledRange = styled.div`
  height: 36px;
  display: flex;
  width: 100%;
  ${media.medium`
    order: -1;
  `}
`;

const RangeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  gap: 32px;
  ${media.medium`
    gap: 8px;
    justify-content: space-between;
    flex-wrap: wrap;
  `}
`;

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  step,
  onChange,
}) => {
  const [values, setValues] = useState([min, max]);

  const handleInputChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    if (
      newValues[0] >= min &&
      newValues[0] <= newValues[1] &&
      newValues[1] <= max
    ) {
      setValues(newValues);
      onChange(newValues);
    }
  };

  return (
    <RangeWrapper>
      <InputLabel>
        <InputSpan>От</InputSpan>
        <StyledInput
          type="number"
          value={values[0]}
          min={min}
          max={values[1]}
          step={step}
          onChange={(e) => handleInputChange(0, Number(e.target.value))}
        />
      </InputLabel>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
          setValues(values);
          onChange(values);
        }}
        renderTrack={({ props, children }) => (
          <StyledRange
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", content.primary, "#ccc"],
                  min,
                  max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </StyledRange>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              borderRadius: "12px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
              outlineColor: content.primary,
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? content.primary : "#CCC",
              }}
            />
          </div>
        )}
      />
      <InputLabel>
        <InputSpan>До</InputSpan>
        <StyledInput
          type="number"
          value={values[1]}
          min={values[0]}
          max={max}
          step={step}
          onChange={(e) => handleInputChange(1, Number(e.target.value))}
        />
      </InputLabel>
    </RangeWrapper>
  );
};

export default PriceRangeSlider;
