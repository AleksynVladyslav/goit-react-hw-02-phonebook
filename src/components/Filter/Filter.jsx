import propTypes from 'prop-types';
import css from './Filter.module.css';
const Filter = ({ onFilterChange }) => {
  return (
    <label className={css.label}>
      <span>Find contacts by name:</span>
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={onFilterChange}
      />
    </label>
  );
};

Filter.propTypes = {
  onFilterChange: propTypes.func.isRequired,
};
export default Filter;
