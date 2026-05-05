import { useState } from 'react';
import styles from '../Contato/Contato.module.css';

function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Dados capturados com sucesso", { nome, email, senha });
    alert(`✅ Cadastro Realizado\n\nNome: ${nome}\nEmail: ${email}`);

    setNome('');
    setEmail('');
    setSenha('');
  }

  const formularioValido = nome && email && senha;

  return (
    <section className={styles.page}>

      
      <div className={styles.mainContainer}>

   
        <div className={styles.textSide}>
          <h1 className={styles.title}>ENTRE EM CONTATO</h1>

          <p className={styles.subtitle}>
            Fiquem à vontade para entrar em contato conosco,
            estamos a disposição para melhor atendê-los!
            
                      </p>

          <div className={styles.contactItem}>
            <div className={styles.icon}>✉</div>
            <div>
              Email<br />MakalStore@gmail.com
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.icon}>☏</div>
            <div>
              Telefone<br />+55 (19) 77788-2222
            </div>
          </div>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Insira seu nome"
            className={styles.input}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Insira um email válido"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Escreva sua mensagem "
            className={styles.input}
          />

          <button
            type="submit"
            className={styles.botao}
            disabled={!formularioValido}
          >
            ENVIAR
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contato;
