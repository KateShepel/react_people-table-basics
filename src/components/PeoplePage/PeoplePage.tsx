import { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleContext } from '../../contexts/PeopleContext';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { people, errorMessage } = useContext(PeopleContext);
  const { slug } = useParams();

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

          {people && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => {
                  const mother = people.find(
                    human => human.name === person.motherName,
                  );
                  const father = people.find(
                    human => human.name === person.fatherName,
                  );

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={cn({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <a
                          href={`#/people/${person.slug}`}
                          className={cn({
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {person.name}
                        </a>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      {mother ? (
                        <td>
                          <a
                            className="has-text-danger"
                            href={`#/people/${mother.slug}`}
                          >
                            {mother.name}
                          </a>
                        </td>
                      ) : (
                        <td>{person.motherName || '-'}</td>
                      )}

                      {father ? (
                        <td>
                          <a href={`#/people/${father.slug}`}>{father.name}</a>
                        </td>
                      ) : (
                        <td>{person.fatherName || '-'}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
