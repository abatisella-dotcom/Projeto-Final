
// ========================================
app.get('/', (req, res) => {
  res.json({ mensagem: 'API rodando!' });
});

// ========================================
// SERVIDOR (SEU PADRÃO ORIGINAL)
// ========================================
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco de Dados: PostgreSQL`);
  console.log('='.repeat(50));
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET    http://localhost:${PORT}/produtos`);
});