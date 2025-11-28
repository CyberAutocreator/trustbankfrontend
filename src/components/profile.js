import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function Profile({ user }) {
  const [profile, setProfile] = useState({ name: "", email: "", accountNumber: "" });

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase
        .from("accounts")
        .select("user_name, user_email, account_number")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfile({
          name: data.user_name,
          email: data.user_email,
          accountNumber: data.account_number,
        });
      }
    }
    if (user) fetchProfile();
  }, [user]);

  async function handleUpdate(e) {
    e.preventDefault();
    await supabase
      .from("accounts")
      .update({
        user_name: profile.name,
        user_email: profile.email,
        account_number: profile.accountNumber,
      })
      .eq("user_id", user.id);

    alert("Profile updated successfully!");
  }

  return (
    <div>
      <h3>User Profile</h3>
      <form onSubmit={handleUpdate}>
        <label>Name:</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <label>Email:</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <label>Account Number:</label>
        <input
          type="text"
          value={profile.accountNumber}
          onChange={(e) => setProfile({ ...profile, accountNumber: e.target.value })}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
