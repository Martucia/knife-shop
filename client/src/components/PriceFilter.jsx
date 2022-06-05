import { useEffect, useState } from "react";
import dropArrow from "../images/filter-drop-btn.svg"
import { styled, alpha } from '@mui/system';
import SliderUnstyled, { sliderUnstyledClasses } from '@mui/base/SliderUnstyled';
import { useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom"

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
      color: ${theme.palette.mode === 'light' ? '#f0ad06' : '#ffb700'};
      height: 4px;
      width: 100%;
      max-width: 100%;
      padding: 13px 0;
      display: inline-block;
      position: relative;
      cursor: pointer;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
      opacity: 0.75;
    
      &:hover {
        opacity: 1;
      }
    
      &.${sliderUnstyledClasses.disabled} { 
        pointer-events: none;
        cursor: default;
        color: #bdbdbd; 
      }
    
      & .${sliderUnstyledClasses.rail} {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: currentColor;
        opacity: 0.38;
      }
    
      & .${sliderUnstyledClasses.track} {
        display: block;
        position: absolute;
        height: 4px;
        border-radius: 2px;
        background-color: currentColor;
      }
    
      & .${sliderUnstyledClasses.thumb} {
        position: absolute;
        width: 14px;
        height: 14px;
        margin-left: -6px;
        margin-top: -5px;
        box-sizing: border-box;
        border-radius: 50%;
        outline: 0;
        border: 2px solid currentColor;
        background-color: #fff;
    
        :hover,
        &.${sliderUnstyledClasses.focusVisible} {
          box-shadow: 0 0 0 0.25rem ${alpha(
    theme.palette.mode === 'light' ? '#E8AA31' : '#E8AA31',
    0.15,
  )};
        }
    
        &.${sliderUnstyledClasses.active} {
          box-shadow: 0 0 0 0.25rem ${alpha(
    theme.palette.mode === 'light' ? '#E8AA31' : '#E8AA31',
    0.3,
  )};
        }
      }
    
      & .${sliderUnstyledClasses.mark} {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: currentColor;
        top: 50%;
        opacity: 0.7;
        transform: translateX(-50%);
      }
    
      & .${sliderUnstyledClasses.markActive} {
        background-color: #fff;
      }
    
      & .${sliderUnstyledClasses.valueLabel} {
        font-family: IBM Plex Sans;
        font-size: 14px;
        display: block;
        position: relative;
        top: -1.6em;
        text-align: center;
        transform: translateX(-50%);
      }
    `,
);

const PriceFilter = () => {
  const filters = useSelector(state => state.catalog.filters);

  const [isOpen, setOpen] = useState(true)
  const [value, setValue] = useState([0, 100]);
  const [searchParams, setSearchParams] = useSearchParams();
  let params = new URLSearchParams(searchParams);


  useEffect(() => {
    let priceLimit = params.get("price");
    if (priceLimit) {
      let out = priceLimit.split(",").map(n => Number(n));

      setValue(out)
    } else if (filters) setValue([filters.min, filters.max])
    // eslint-disable-next-line
  }, [filters, searchParams])


  const toggleDropDown = (e) => {
    e.preventDefault();
    setOpen(!isOpen)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputs = (e) => {

    let inpValue = Number(e.target.value);

    if (e.target.name === "min-price") {
      if (inpValue > value[1]) {
        if (inpValue > Number(filters.max)) {
          setValue(prev => [prev[1], Number(filters.max)])
        } else {
          setValue(prev => [prev[1], inpValue])
        }
      } else {
        setValue(prev => [inpValue, prev[1]])
      }
    }

    if (e.target.name === "max-price") {
      if (inpValue > filters.max) {
        setValue(prev => [prev[0], Number(filters.max)])
      } else {
        setValue(prev => [prev[0], inpValue])
      }
    }
  }

  const handleSubmit = () => {
    if (value[1] < value[0]) {
      setValue(prev => [prev[1], prev[0]])
    }

    params.set("price", [value])
    setSearchParams(params)
  }

  return (
    <div className="price-filter">
      <button className={isOpen ? "close drop-down__header" : 'drop-down__header'} onClick={toggleDropDown}>
        <p>Цена</p>
        <img src={dropArrow} alt="" />
      </button>
      <div className="drop-down__inner" style={isOpen ? { display: 'flex' } : { display: "none" }}>
        <div className="drop-down__inner__inputs">
          <input
            onChange={handleInputs}
            value={value[0] || 0}
            type="text"
            name="min-price"
            id="min-price" />
          <input
            onChange={handleInputs}
            value={value[1] || 100}
            type="text"
            name="max-price"
            id="max-price" />
        </div>

        <StyledSlider
          value={value}
          min={filters.min || 0}
          max={filters.max || 100}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Ok</button>

      </div>
    </div>
  );
}

export default PriceFilter;