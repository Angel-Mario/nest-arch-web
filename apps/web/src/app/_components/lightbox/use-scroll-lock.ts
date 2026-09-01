"use client";

import * as React from "react";

export const useScrollLock = () => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
};
