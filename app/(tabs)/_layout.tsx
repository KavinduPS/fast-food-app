import { Redirect, Slot } from "expo-router";
import React from "react";

const _layout = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) return <Redirect href="/SignIn" />;

  return <Slot />;
};

export default _layout;
