import { useState, useEffect } from "react";

import getSelf from "../api/get-self";

export default function useSelf() {
  const [self, setSelf] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getSelf()
    .then((self) => {
      setSelf(self);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);
  return { self, isLoading, error };
} 