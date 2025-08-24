function SearchInput({placeholder, value, onChange, onclick}) {
  return ( 
    <input type="text" placeholder={placeholder} value={value} onChange={onChange} onClick={onclick} className="w-full bg-secondary ps-12 pe-3 rounded-full h-[36px] focus:outline-none"/>
   );
}

export default SearchInput;