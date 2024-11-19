// import React, { useState } from 'react';
// import { Autocomplete, TextField, InputAdornment } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchWithAutocomplete = () => {
//     const [value, setValue] = useState(null);
//     const [inputValue, setInputValue] = useState('');

//     const options = [
//         { label: '검색어1', id: 1 },
//         { label: '검색어2', id: 2 },
//         { label: '검색어3', id: 3 },
//     ];

//     return (
//         <Autocomplete
//             value={value}
//             onChange={(event, newValue) => {
//                 setValue(newValue);
//             }}
//             inputValue={inputValue}
//             onInputChange={(event, newInputValue) => {
//                 setInputValue(newInputValue);
//             }}
//             options={options}
//             renderInput={(params) => (
//                 <TextField
//                     {...params}
//                     placeholder="검색어를 입력하세요"
//                     InputProps={{
//                         ...params.InputProps,
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             )}
//         />
//     );
// };

// export default SearchWithAutocomplete;