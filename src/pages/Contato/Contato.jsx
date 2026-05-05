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
    <>
      <section className={`${styles.page} ${styles.contatoPage}`}>
        <h1 className={styles.title}>Entre em Contato</h1>

        <div className={styles.contato}>
          <p><b>Email :</b> brecho@gmail.com</p>
          <p><b>Telefone :</b> (19)12345-6789</p>
        </div>

        <div className={styles.container}>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Nome
              <input
                type="text"
                placeholder="Digite seu nome"
                className={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>

            <label className={styles.label}>
              Email
              <input
                type="email"
                placeholder="Digite seu email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className={styles.label}>
              Senha
              <input
                type="password"
                placeholder="Digite sua senha"
                className={styles.input}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className={styles.botao}
              disabled={!formularioValido}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contato;
