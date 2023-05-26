"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPrompt();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s Profile`}
      data={posts}
    />
  );
};

export default MyProfile;
