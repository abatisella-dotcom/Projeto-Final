import styles from './Sobre.module.css';

function Sobre() {
  return (
    <selection className={`page ${styles.sobrePage}`}>
      <p>
        Bem-vindo a nossa página, esperamos que você se sinta muito acolhido em estar conosco!
      </p>

      <div className={styles.img}></div>
    </selection>
  )
}

export default Sobre