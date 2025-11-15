import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';

const Select = (props: SelectProps) => {

    return <AntSelect {...props} />
}

export default Select


// import React, { useEffect, useState } from 'react';
// import { DownOutlined } from '@ant-design/icons';
// import './Select.css'

// interface SelectOption {
//   label: string;
//   value: string;
// }

// interface CustomSelectProps {
//   options: SelectOption[];
//   defaultValue?: string;
//   value?: string;
//   placeholder?: string;
//   onChange?: (value: string) => void;
//   onSearch?: (searchTerm: string) => void;
// }

// const CustomSelect: React.FC<CustomSelectProps> = ({
//   options,
//   defaultValue,
//   value,
//   placeholder,
//   onChange,
//   onSearch
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(value ? value : defaultValue ?? "");
//   const [filteredOptions, setFilteredOptions] = useState(options);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(()=>{
//     console.log("FILTERED OPTIONs ", filteredOptions);
//     if(selectedValue !== "") {
//         const selectedLabel = filteredOptions.find((option) =>{
//             console.log("option.value",option.value);
//             return option.value === selectedValue;
//         });
//         console.log("selectedLabel", selectedLabel)
//         setSearchTerm(selectedLabel?.label ?? "")
//     }
//   }, [filteredOptions])

//   useEffect(()=>{
//     console.log('LA VALUE ', value)
//     if(value) {
//         setSelectedValue(value)
//     }

//   }, [value])

//   useEffect(()=>{
//     console.log("selectedValue ", selectedValue)
//     if(options) {
//         setFilteredOptions(options)
//     }
    
//     if(selectedValue !== "") {
//         const selectedLabel = filteredOptions.find((option) =>{
//             console.log("option.value",option.value);
//             return option.value === selectedValue;
//         });
//         console.log("selectedLabel", selectedLabel)
//         setSearchTerm(selectedLabel?.label ?? "")
//     }
    
//   }, [selectedValue, options])

//   const handleSelect = (value: string) => {
//     setSelectedValue(value);
//     setIsOpen(false);
//     onChange?.(value);
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     const filtered = options.filter((option) =>
//       option.label.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredOptions(filtered);
//     onSearch?.(value);
//   };

//   return (
//     <div className="custom-select">
//       <div
//         className="select-trigger"
//         onClick={() => setIsOpen(!isOpen)}
//         role="button"
//         tabIndex={0}
//       >
//         <input
//             type="text"
//             placeholder={placeholder ?? ""}
//             className="search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         <DownOutlined className={`arrow ${isOpen ? 'up' : 'down'}`} />
//       </div>
//       {isOpen && (
//         <div className="options">
//           {filteredOptions.map((option) => (
//             <div
//               key={option.value}
//               className="option"
//               onClick={() => handleSelect(option.value)}
//               role="option"
//               tabIndex={0}
//             >
//               {option.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomSelect;
