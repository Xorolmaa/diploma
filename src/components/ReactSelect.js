import Select, { StylesConfig } from 'react-select';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

function ReactSelect() {


const [selectedId, setSelectedId] = React.useState(null);

const handleChange = (event) => {
        console.log(event)
        setSelectedId(event.value);
      };

console.log(selectedId)
const tmp = useSelector((state) => state.allContents.contents)

const options = tmp.map(item => ({ value: item.id, label: item.title , text: 'grey'}))
  return (
   <>
      {options && <><Select  
                //placeholder={selectedId ? selectedId : "Хайлтаа оруулна уу"}
                value={selectedId ? selectedId : ""}
                options={options} 
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: 'grey',
                    width: '300px'
                  }),
                  option: provided => ({
                    ...provided,
                    color: 'black'
                  }),
                }}
                onChange={handleChange}
                 />
              
              </>}

</>
                    
  ) 
}
export default ReactSelect;

