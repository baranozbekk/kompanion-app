import css from './Error.module.css';

export default function Error() {
  return (
    <div className="error">
      <div className={css.errorMessage}>An error occurred. Please try again.</div>
      <button onClick={() => location.reload()}>Refresh</button>
    </div>
  );
}
