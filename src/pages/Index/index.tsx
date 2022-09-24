import React from "react";
import { useSelector } from "react-redux";

export default function Index() {
  const auth = useSelector((state: any) => state.auth);
  console.log(auth);

  return <div>Index</div>;
}
