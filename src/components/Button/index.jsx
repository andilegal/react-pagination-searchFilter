import {Component} from 'react'

class Button extends Component {

  render() {
    const {text, actionFn, disabled} = this.props
    return (
      <button 
        disabled={disabled}
        className="btn" 
        onClick={actionFn}>
        {text}
      </button>
    )
  }
}

export default Button
