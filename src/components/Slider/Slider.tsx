import React, { useCallback } from "react";
import { useState } from "react";
import Slider from "react-slider";
import debounce from "lodash.debounce";

import "./slider.css";

export type SliderProps = {
  minimum: number;
  maximum: number;
  title?: string;
  onChangeValues: (values: number) => void;
};

const SliderFilter: React.FC<SliderProps> = ({
  minimum,
  maximum,
  title,
  onChangeValues,
}) => {
  const [value, setValues] = useState(1);

  const onUpdateValues = useCallback(
    debounce((newValues) => {
      onChangeValues(newValues);
    }, 0),
    []
  );

  const handleSliderChange = (value: number) => {
    setValues(value);
    onUpdateValues(value);
  };

  return (
    <div className="filter">
      <div className="filter__title">{title}</div>
      <div className="filter__range">
        {value}% - {99}%
      </div>
      <Slider
        className="filter__slider"
        onChange={handleSliderChange}
        value={value}
        min={minimum}
        max={maximum}
      />
    </div>
  );
};

export default SliderFilter;