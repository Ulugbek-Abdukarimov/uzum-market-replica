import styles from "./auth-input.module.css"

export default function AuthInput( {id, placeholder} ) {
    return (
      <div className={styles.inputGroup}>
        <input type="text" autoComplete="off" name={id} id={id} placeholder={placeholder}/>
      </div>
   
  );
}