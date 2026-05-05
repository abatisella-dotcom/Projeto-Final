import styles from './Home.module.css';
import Cards from '../../components/Cards/Cards'






function Home() {
  return (
    <section className={styles.homePage}>

      <h2 className={styles.title}></h2>

      <h2>
        aqui é um espaço de resistência ao consumo exagerado, <br />à produção descartável e às <br /> tendências que ignoram o povo.

      </h2>

      <div className={styles.divbranca1}>

        <p>

          Vestir-se é um ato político. <br />
          É escolher circular ao invés de descartar.
          É apoiar uma moda mais justa, acessível e consciente
        </p>
      </div>





    </section>
  )
}

export default Home