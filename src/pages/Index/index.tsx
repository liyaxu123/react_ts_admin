import React from "react";
import { useSelector } from "react-redux";
import { selectorAuth } from "@/store/modules/auth";

export default function Index() {
  const auth = useSelector(selectorAuth);
  console.log(auth);

  return <div>Index</div>;
}
