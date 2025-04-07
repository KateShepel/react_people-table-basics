import { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleContext } from '../../contexts/PeopleContext';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { people, errorMessage } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!people && !errorMessage && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!errorMessage && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && people.length > 0 && <PeopleTable />}
        </div>
      </div>
    </>
  );
};
