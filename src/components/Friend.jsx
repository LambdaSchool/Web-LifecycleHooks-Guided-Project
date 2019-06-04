import React from 'react';
import pt from 'prop-types';

const callback = () => console.log('lc1: clicking the doc');

export default class Friend extends React.Component {
  constructor(props) {
    super(props);
    console.log(`lc1: Friend ${props.friend.name} is being instantiated!`);
  }

  componentDidMount() {
    console.log(`lc1: DOM surgery is done for Friend ${this.props.friend.name}`);

    // add a click listener to the body of the page
    document.querySelector('body')
      .addEventListener('click', callback);

    // launch camera!! on the device
  }

  componentWillUnmount() {
    console.log(`lc1: oops, this Friend ${this.props.friend.name} component no longer returns from the parent Containers render function, so react is about to do DOM surgery to remove it`);

    // REMOVE that event listener from the body of the page
    document.querySelector('body')
      .removeEventListener('click', callback);

    // stop the camera!! on the device
  }

  onEdit = () => {
    this.props.setFriendToBeEdited(this.props.friend.id);
  };

  onDelete = () => {
    this.props.deleteFriend(this.props.friend.id);
  };

  onMarkEnemy = () => {
    this.props.markAsEnemy(this.props.friend.id);
  };

  render() {
    console.log(`lc1: Friend ${this.props.friend.name} renders!!!!`);

    const friendStyle = {
      color: this.props.friend.friendly ? 'green' : 'red',
      fontWeight: this.props.bold ? 'bold' : 'initial',
    };

    return (
      <div>
        <span style={friendStyle}>{this.props.friend.name} is {this.props.friend.age}</span>

        <button onClick={this.onEdit} className='small'>Edit</button>
        <button onClick={this.onDelete} className='small danger'>Delete</button>
        <button onClick={this.onMarkEnemy} className='small alert'>Mark as Enemy</button>
      </div>
    );
  }
}

const customAgeValidator = (props, propName, componentName) => {
  if (!props[propName]) {
    return new Error(`friend.${propName} in ${componentName} is a required property on friends!`);
  }
  if (Number(props[propName]) % 2 !== 0) {
    return new Error(`${propName} in ${componentName} needs to be even!`);
  }
};


Friend.propTypes = {

  friend: pt.shape({
    id: pt.string.isRequired,
    name: pt.string.isRequired,
    age: customAgeValidator,
    friendly: pt.bool.isRequired,
  }).isRequired,

  deleteFriend: pt.func.isRequired,
  markAsEnemy: pt.func.isRequired,
  setFriendToBeEdited: pt.func.isRequired,
  bold: pt.bool,
};

Friend.defaultProps = {
  bold: false,
};
