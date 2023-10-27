import { useState, useEffect } from "react";
import getSkills from "../api/get-skills";

export default function useSkills() {
  const [skills, setSkills] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getSkills()
    .then((skills) => {
      const newSkillArray = []
      for (let skill in skills) {
        newSkillArray.push(skills[skill]["name"]);
      }
      setSkills(newSkillArray);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);
  return { skills, isLoading, error };
} 