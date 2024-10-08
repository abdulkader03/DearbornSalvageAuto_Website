import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Adjust the import path as necessary
import { updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for controlling the alert
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);
      setName(currentUser.name);
      fetchUserData(currentUser.uid);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setPhoneNumber(userData.phoneNumber);
        setName(userData.name);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordUpdate = () => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            console.log('Password updated successfully');
            setShowSuccessAlert(true); // Show the alert
            setTimeout(() => {
              setShowSuccessAlert(false); // Hide the alert after 5 seconds
            }, 5000);
          })
          .catch((error) => {
            console.error('Error updating password:', error);
          });
      })
      .catch((error) => {
        console.error('Error reauthenticating:', error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/inventory');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      <button className="button" onClick={handleLogout}>Logout</button>

      <div>
        <h3>User Information</h3>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Name: {name}</p>
      </div>

      <div>
        <h3>Change Password</h3>
        <input 
          type="password" 
          placeholder="Current Password" 
          value={currentPassword} 
          onChange={handleCurrentPasswordChange} 
          className="input"
        />
        <br />
        <input 
          type="password" 
          placeholder="New Password" 
          value={newPassword} 
          onChange={handleNewPasswordChange} 
          className="input"
        />
        <br />
        <button className="button" onClick={handlePasswordUpdate}>Update Password</button>
      </div>
      {showSuccessAlert && (
        <div className="alert">
          <span className="closebtn" onClick={() => setShowSuccessAlert(false)}>&times;</span> 
          Password updated successfully!
        </div>
      )}
      
      <h2>
      <Link to="/admin/managelistings" className="nav-link"> View Inventory</Link>
      </h2>
      </div>
  );
};

export default AdminProfile;
