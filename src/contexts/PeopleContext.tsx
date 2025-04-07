import { createContext, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

type PeopleContextType = {
  people: Person[] | null;
  errorMessage: string | null;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: null,
  errorMessage: null,
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return (
    <PeopleContext.Provider value={{ people, errorMessage }}>
      {children}
    </PeopleContext.Provider>
  );
};
