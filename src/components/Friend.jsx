import React from 'react';
import pt from 'prop-types';


export default class Friend extends React.Component {
  constructor(props) {
    super(props);
    console.log('lifecycle: friend constructor!');
  }

  componentDidMount() {
    console.log('lifecycle: DOM surgery done!');
  }

  componentWillUnmount() {
    console.log('lifecycle: friend will unmount!');
  }

  componentDidUpdate(prevProps) {
    console.log('lifecycle:', prevProps, this.props);
    // console.log(`
    //   lifecycle: friend used to be called ${prevProps.friend.name}
    //   but now, he is called ${this.props.friend.name}
    // `);
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
    console.log('lifecycle: render function firing!');

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
