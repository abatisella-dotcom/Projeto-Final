import styles from './Sobre.module.css';
import Cards from '../../components/Cards/Cards';


import anabe from '../../../public/img/anabe.png';
import eu from '../../../public/img/eu.png';
import manso from '../../../public/img/manso.jpg';
import alice from '../../../public/img/alice.png';
import mariaLuisa from '../../../public/img/mariaLuisa.png';



const cards = [
    {
      id: 1, titulo: 'AnaBê',
      conteudo: '', codigo: "", capa: anabe
    },
    {
      id: 2, titulo: 'Ana Koso',
      conteudo: '', codigo: "", capa: eu
    },
    {
      id: 3, titulo: 'Maria Manso',
      conteudo: '', codigo: "", capa: manso
    },
    {
      id: 4, titulo: 'Maria Alice',
      conteudo: '', codigo: "", capa: alice
    },
    {
      id: 5, titulo: 'Maria Dias',
      conteudo: '', codigo: "", capa: mariaLuisa
    },
   
  ];

function Sobre() {
  return (
    <selection className={`page ${styles.sobrePage}`}>

      <h2 className={styles.title}></h2>

      <h2 className= {styles.sobrenostexto}>
        Somos uma equipe movida por propósito, criatividade e responsabilidade. Sembre buscando a melhor forma de te ajudar.

      </h2>

      <div className={styles.divbranca1}>
      </div>
      <div id="Cards"></div>
      <section className={styles.Cardsgrid}>
        {cards.map(item => (
          <Cards key={item.id} {...item} />
        ))}
      </section>
    </selection>
  )
}

export default Sobre