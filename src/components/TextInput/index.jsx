import { Component } from "react";

class TextInput extends Component {
  render() {
    const {searchValue, handleChange} = this.props
    return (
      <input
        className="text-input"
        type="search" 
        onChange={(event) => handleChange(event)}
        value={searchValue}
      />
    ) 
  }
}

export default TextInput
