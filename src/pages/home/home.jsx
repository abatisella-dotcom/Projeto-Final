import styles from './home.module.css';
import Cards from '../../components/Cards/Cards'






function Home() {
  return (
<section className={styles.homePage}>
      <div className={styles.bannerContainer}>
<img src="/img/image.png" alt="Banner" className={styles.bannerImg} />     
   <h2 className={styles.bannerTitle}>
          Aqui é um espaço de resistência ao consumo exagerado, <br />
          à produção descartável e às <br />
          tendências que ignoram o povo.
        </h2>
      </div>

      <div className={styles.divbranca1}>

        <p>

          Vestir-se é um ato político. <br />
          É escolher circular ao invés de descartar.
          É apoiar uma moda mais justa e acessível.
        </p>
      </div>

<p className={styles.frase}>      
        Neste site, você pode cadastrar e gerenciar produtos de forma simples, 
            promovendo a reutilização e o consumo consciente.
          </p>



    </section>
  )
}

export default Home