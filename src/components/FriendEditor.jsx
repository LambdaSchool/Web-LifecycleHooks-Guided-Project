import React from 'react';


export default class FriendEditor extends React.Component {
  onNameChange = event => {
    this.props.inputChange(event.target.value, 'nameValue');
  }

  onAgeChange = event => {
    this.props.inputChange(event.target.value, 'ageValue');
  }

  render() {
    return (
      <div className='sub-container'>
        {
          this.props.isEditing
            ? <h3>Edit Friend</h3>
            : <h3>Add a new friend!</h3>
        }

        name:
        <input
          type="text"
          value={this.props.form.nameValue}
          onChange={this.onNameChange}
        />

        age:
        <input
          type="text"
          value={this.props.form.ageValue}
          onChange={this.onAgeChange}
        />

        {
          this.props.isEditing
            ? <button onClick={this.props.updateFriend}>Update Friend!</button>
            : <button onClick={this.props.addFriend}>Add Friend!</button>
        }
      </div>
    );
  }
}
