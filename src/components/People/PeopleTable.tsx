import { useContext } from 'react';
import { PeopleContext } from '../../contexts/PeopleContext';
import { PersonLink } from './PersoneLink';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);

  return (
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

      <tbody>{people?.map(person => <PersonLink key={person.slug} person={person} />)}</tbody>
    </table>
  );
};
