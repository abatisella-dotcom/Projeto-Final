import styles from './home.module.css';
import Cards from '../../components/Cards/Cards'






function Home() {
  return (
<section className={styles.homePage}>
      <div className={styles.bannerContainer}>
       <img src="/img/fundo.png" alt="Banner" className={styles.bannerImg} />     

         <h2 className={styles.bannerTitle}>
          Aqui valorizamos o design que dura,<br /> 
          a beleza dos detalhes e as<br />
           escolhas que acompanham a sua história 
           <br />por muito mais tempo. 
          
        </h2>
      </div>

      <div className={styles.divbranca1}>

        <p>

          Vestir-se é expressar a sua essência.<br />
           É dar preferência a peças duráveis, apoiar o comércio local e valorizar a moda.
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