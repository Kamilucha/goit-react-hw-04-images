import { useState } from "react";
import { Header, SearchBarForm, Input, ButtonForm, ButtonLabel } from "./Searchbar.styled";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


export const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      toast.warning('Please write what you are looking for.');
      return;
    }

    onSubmit(imageName)
  }

  return (
        <Header>
  <SearchBarForm onSubmit={handleSubmit}>
    <ButtonForm type="submit" >
      <ButtonLabel>Search</ButtonLabel>
    </ButtonForm>

    <Input
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={imageName}
      onChange={handleNameChange}
      />
  </SearchBarForm>
</Header>
        )
  
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired, 
  }