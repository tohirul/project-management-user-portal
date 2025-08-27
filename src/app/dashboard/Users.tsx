"use client";
import { useListUsersQuery } from "@/store/slice/api/endpoints/userApi";
import React from "react";

function Users() {
  const { data: users, isLoading } = useListUsersQuery();
  console.log("Users:", users, "Loading:", isLoading);

  return <div>Users</div>;
}

export default Users;
