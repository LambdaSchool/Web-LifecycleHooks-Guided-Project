import React from 'react';
import uuid from 'uuid';
import Friend from './Friend';
import FriendEditor from './FriendEditor';

const initialFormState = {
  nameValue: '',
  ageValue: '',
};

const fetchFriendsFrom = () => (
  Promise.resolve([
    { id: uuid(), name: 'Delba', age: '22', friendly: true },
    { id: uuid(), name: 'Maxime', age: '20', friendly: true },
    { id: uuid(), name: 'Giacomo', age: '2', friendly: true },
  ])
);

const initialState = {
  friends: [],
  currentFriendId: null,
  form: initialFormState,
};

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  addFriend = () => {
    this.setState(state => {
      if (state.form.nameValue.trim() && state.form.ageValue.trim()) {
        const newFriend = {
          id: uuid(),
          name: this.state.form.nameValue,
          age: this.state.form.ageValue,
          friendly: true,
        };
        return {
          friends: state.friends.concat(newFriend),
          form: initialFormState,
        };
      }
    });
  }

  updateFriend = () => {
    this.setState(state => ({
      friends: state.friends.map(friend => {
        if (friend.id === state.currentFriendId) {
          friend.name = state.form.nameValue;
          friend.age = state.form.ageValue;
        }
        return friend;
      }),
      form: initialFormState,
      currentFriendId: null,
    }));
  }

  deleteFriend = id => {
    this.setState(st => ({
      friends: st.friends.filter(fr => fr.id !== id),
      form: initialFormState,
      currentFriendId: null,
    }));
  }

  setFriendToBeEdited = id => {
    this.setState(state => {
      const friendToEdit = state.friends.find(friend => friend.id === id);

      return {
        currentFriendId: id,
        form: {
          nameValue: friendToEdit.name,
          ageValue: friendToEdit.age,
        },
      };
    });
  }

  inputChange = (value, field) => {
    this.setState(state => ({
      form: {
        ...state.form,
        [field]: value,
      },
    }));
  }

  markAsEnemy = id => {
    this.setState(currentState => ({
      friends: currentState.friends.map(friend => {
        if (friend.id === id) {
          friend.friendly = false;
        }
        return friend;
      }),
    }));
  }

  wipeOutEnemies = () => {
    this.setState(currentState => ({
      friends: currentState.friends.filter(friend => friend.friendly),
      currentFriendId: null,
      form: initialFormState,
    }));
  }

  render() {
    return (
      <div className='container'>
        <div className='sub-container'>
          <h3>Friends List:</h3>
          {
            !this.state.friends.length && <div>No friends. Sad!</div>
          }
          {
            this.state.friends.map(friend => (
              <Friend
                bold
                key={friend.id}
                friend={friend}
                deleteFriend={this.deleteFriend}
                markAsEnemy={this.markAsEnemy}
                setFriendToBeEdited={this.setFriendToBeEdited}
              />
            ))
          }
        </div>

        <FriendEditor
          form={this.state.form}
          inputChange={this.inputChange}
          addFriend={this.addFriend}
          updateFriend={this.updateFriend}
          isEditing={!!this.state.currentFriendId}
        />
        <button className='alert' onClick={this.wipeOutEnemies}>Wipe Out All Enemies</button>
      </div>
    );
  }
}
