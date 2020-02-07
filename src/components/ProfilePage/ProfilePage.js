import './ProfilePage.css';
import React from 'react';

const ProfilePage = () => {
    return (
        <div className="column-right__profile">
            <h1 className="input-form__title input-form__title-profile_big">Profile</h1>
            <label className="input-form__field_profile">
                <span className="input-form__text-label-profile">E-mail</span>
                <input className="input-form__text-input"
                    type="text"
                    name="email"
                    autoComplete="on"
                    required
                    readOnly />
            </label>

            <label className="input-form__field_profile">
                <span className="input-form__text-label-profile">Name</span>
                <input className="input-form__text-input"
                    type="text"
                    name="name"
                    autoComplete="on"
                    required
                    readOnly />
            </label>

            <label className="input-form__field_profile">
                <span className="input-form__text-label-profile">Password</span>
                <input className="input-form__text-input"
                    type="password"
                    name="password"
                    autoComplete="on"
                    required
                    readOnly />
            </label>
            
        </div>
    )
}

export default ProfilePage;