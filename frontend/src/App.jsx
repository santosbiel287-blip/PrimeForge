import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Layout, Sparkles, ShoppingBag, CheckCircle, 
  Plus, Trash2, Image as ImageIcon, Grid, Layers, 
  FilePlus2, Sun, Moon, FolderPlus, X, ShoppingCart,
  ArrowLeft, Edit3, Text, Info, CheckSquare
} from 'lucide-react';

export default function App() {
  // Configurações Gerais da Marca da Loja
  const [logoName, setLogoName] = useState('Minha Loja');
  const [logoImg, setLogoImg] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#EF4444');
  const [storeTheme, setStoreTheme] = useState('light'); // 'light' ou 'dark'
  
  // Controle de Abas (Páginas) da Loja do Cliente
  const [paginas, setPaginas] = useState(['Início', 'Lançamentos']);
  const [paginaAtiva, setPaginaAtiva] = useState('Início');
  
  // Controle do Painel Administrativo (PrimeForge)
  const [activeTab, setActiveTab] = useState('layout'); 

  // NAVEGAÇÃO INTERNA DE PRODUTO: Guarda qual produto está aberto no momento (null = vitrine normal)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Blocos Dinâmicos Universais (Categorias de Layout com campos estendidos de descrição)
  const [secoes, setSecoes] = useState([
    { 
      id: 'sec-banner', 
      tipo: 'banner', 
      titulo: 'Banner Principal', 
      subtitulo: 'Aproveite nossos descontos exclusivos!',
      img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80' 
    },
    { 
      id: 'sec-destaques', 
      tipo: 'grid', 
      titulo: 'Destaques da Semana', 
      produtos: [
        { 
          id: 101, 
          nome: 'Produto Premium Alpha', 
          preco: 'R$ 149,90', 
          valor: 149.90, 
          img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
          descricao: 'Este é o Produto Premium Alpha. Desenvolvido com materiais de altíssima qualidade para garantir durabilidade e o máximo de conforto no seu dia a dia. Perfeito para qualquer ocasião de destaque.',
          detalhes: '• Material: Premium Ecológico\n• Garantia: 90 dias contra defeitos\n• Origem: Importado',
          emEstoque: true
        },
        { 
          id: 102, 
          nome: 'Cyber Drop V2', 
          preco: 'R$ 299,00', 
          valor: 299.00, 
          img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
          descricao: 'Edição limitada Cyber Drop V2. Design futurista e aerodinâmico que dita tendências urbanas. Sinta o amortecimento responsivo e a aderência impecável a cada passo.',
          detalhes: '• Tecnologia: Air Flow Max\n• Material: Mesh Respirável\n• Peso: 320g',
          emEstoque: true
        },
      ]
    }
  ]);

  // Estados do Carrinho Interativo
  const [cartItems, setCartItems] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false); 

  // Estados para Criação de Novos Blocos/Categorias
  const [novoNomeBloco, setNovoNomeBloco] = useState('');
  const [novoTipoBloco, setNovoTipoBloco] = useState('grid');
  const [urlBannerBloco, setUrlBannerBloco] = useState('');

  // Estados para Cadastro Inicial de Produtos
  const [novoNomeProd, setNovoNomeProd] = useState('');
  const [novoPrecoProd, setNovoPrecoProd] = useState('');
  const [novaImgProd, setNovaImgProd] = useState('');
  const [blocoDestinoProd, setBlocoDestinoProd] = useState(secoes[1]?.id || '');

// Adicione junto aos outros estados de formulário que você já tem
const [novaDescricaoProd, setNovaDescricaoProd] = useState('');
const [novasImagensProd, setNovasImagensProd] = useState([]); // Array para fotos

  // Referências para Inputs de Upload
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const editProdInputRef = useRef(null);

  // Handlers para Upload de Imagens
  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProductImgUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNovaImgProd(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBannerImgUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUrlBannerBloco(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditProductImgUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      atualizarDetalheProduto('img', url);
    }
  };

const adicionarProduto = (e) => {
  e.preventDefault();
  const novoItem = {
    id: Date.now(),
    nome: novoNomeProd,
    preco: novoPrecoProd,
    // ADICIONE ISSO:
    descricao: novaDescricaoProd,
    imagens: novasImagensProd.length > 0 ? novasImagensProd : ['url-de-fallback.jpg'],
    emEstoque: true
  };
  
  // ... resto da sua lógica de setSecoes ...
  
  // Limpar formulário
  setNovaDescricaoProd('');
  setNovasImagensProd([]);
  
};

  // Funções de Gerenciamento do Layout e Blocos
  const adicionarNovaSecao = (e) => {
    e.preventDefault();
    if (!novoNomeBloco.trim()) return alert('Digite o nome da categoria/bloco!');

    const nova = {
      id: 'sec-' + Date.now(),
      tipo: novoTipoBloco,
      titulo: novoNomeBloco,
      ...(novoTipoBloco === 'banner' ? {
        subtitulo: 'Subtítulo do seu novo banner personalizado.',
        img: urlBannerBloco || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'
      } : {
        produtos: []
      })
    };

    setSecoes([...secoes, nova]);
    if (novoTipoBloco !== 'banner') setBlocoDestinoProd(nova.id);
    setNovoNomeBloco('');
    setUrlBannerBloco('');
  };

  const removerSecao = (id) => {
    setSecoes(secoes.filter(s => s.id !== id));
  };

  // Funções do Menu / Abas
  const adicionarPagina = () => {
    const nome = prompt('Digite o nome da nova aba/página do menu:');
    if (nome && nome.trim() !== '') {
      if (paginas.includes(nome.trim())) return alert('Essa aba já existe!');
      setPaginas([...paginas, nome.trim()]);
      setPaginaAtiva(nome.trim());
      setProdutoSelecionado(null); // Reseta a tela de produto se mudar de aba
    }
  };

  const removerPagina = (nomeParaRemover) => {
    if (paginas.length <= 1) return alert('Sua loja precisa de pelo menos 1 aba ativa!');
    if (confirm(`Tem certeza que deseja excluir a aba "${nomeParaRemover}"?`)) {
      const novasPaginas = paginas.filter(p => p !== nomeParaRemover);
      setPaginas(novasPaginas);
      setPaginaAtiva(novasPaginas[0]);
      setProdutoSelecionado(null);
    }
  };

  // Função para Criar Produto Inicial
  const adicionarProdutoNaCategoria = (e) => {
    e.preventDefault();
    if (!novoNomeProd || !novoPrecoProd || !blocoDestinoProd) {
      return alert('Preencha o nome, preço e escolha a categoria de destino!');
    }

    const valorNumerico = parseFloat(novoPrecoProd.replace(',', '.'));

    const novoItem = {
      id: Date.now(),
      nome: novoNomeProd,
      preco: novoPrecoProd.startsWith('R$') ? novoPrecoProd : `R$ ${novoPrecoProd}`,
      valor: isNaN(valorNumerico) ? 0 : valorNumerico,
      img: novaImgProd || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      descricao: 'Adicione uma descrição detalhada para este produto clicando nele na vitrine ao lado.',
      detalhes: '• Especificação 1\n• Especificação 2',
      emEstoque: true
    };

    setSecoes(secoes.map(sec => {
      if (sec.id === blocoDestinoProd && sec.tipo !== 'banner') {
        return { ...sec, produtos: [...(sec.produtos || []), novoItem] };
      }
      return sec;
    }));

    setNovoNomeProd('');
    setNovoPrecoProd('');
    setNovaImgProd('');
  };

  // EDITAR DETALHES EM TEMPO REAL: Atualiza as informações do produto modificado pelo painel administrativo
  const atualizarDetalheProduto = (campo, valor) => {
    if (!produtoSelecionado) return;

    // Atualiza no estado principal das seções/produtos
    const novasSecoes = secoes.map(sec => {
      if (sec.tipo !== 'banner') {
        const novosProdutos = sec.produtos.map(p => {
          if (p.id === produtoSelecionado.id) {
            const atualizado = { ...p, [campo]: valor };
            // Caso edite o preço em texto, tenta recalcular o valor numérico para o carrinho
            if (campo === 'preco') {
              const limpo = valor.replace('R$', '').trim().replace(',', '.');
              atualizado.valor = parseFloat(limpo) || 0;
            }
            return atualizado;
          }
          return p;
        });
        return { ...sec, produtos: novosProdutos };
      }
      return sec;
    });

    setSecoes(novasSecoes);
    // Atualiza o produto ativo na visualização da tela limpa
    setProdutoSelecionado(prev => ({ ...prev, [campo]: valor }));
  };

  // Funções do Carrinho
  const adicionarAoCarrinho = (produto) => {
    if (!produto.emEstoque) return alert('Este produto está esgotado no momento!');
    setCartItems([...cartItems, { ...produto, cartId: Date.now() }]);
    setIsCartOpen(true); 
  };

  const removerDoCarrinho = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const calcularTotalCarrinho = () => {
    const total = cartItems.reduce((acc, item) => acc + (item.valor || 0), 0);
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f0f13] text-gray-200 overflow-hidden font-sans">
      
      {/* ================= PAINEL DE CONTROLE (ESQUERDA) ================= */}
      <div className="w-[430px] bg-[#16161f] border-r border-gray-800 flex flex-col z-10 shadow-2xl overflow-hidden">
        
        <div className="p-5 border-b border-gray-800 bg-[#12121a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-md tracking-wide text-white">PrimeForge Engine</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estúdio Pro No-Code</p>
            </div>
          </div>
        </div>

        {/* Abas Superiores do Painel Admin */}
        <div className="flex border-b border-gray-800 text-xs font-semibold bg-[#13131c]">
          <button onClick={() => setActiveTab('layout')} className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-all ${activeTab === 'layout' ? 'border-violet-500 text-white bg-[#161622]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
            <Layout className="h-3.5 w-3.5" /> Blocos & Menu
          </button>
          <button onClick={() => setActiveTab('produtos')} className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-all ${activeTab === 'produtos' ? 'border-violet-500 text-white bg-[#161622]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
            <ShoppingBag className="h-3.5 w-3.5" /> {produtoSelecionado ? 'Editar Detalhes' : 'Add Produtos'}
          </button>
          <button onClick={() => setActiveTab('design')} className={`flex-1 py-3 flex items-center justify-center gap-2 border-b-2 transition-all ${activeTab === 'design' ? 'border-violet-500 text-white bg-[#161622]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
            <Palette className="h-3.5 w-3.5" /> Tema & Cores
          </button>
        </div>

        <div className="flex-1 p-5 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* PAINEL DINÂMICO INTERATIVO DE EDIÇÃO DE PRODUTO SELECIONADO */}
          {produtoSelecionado ? (
            <div className="bg-[#1a1a26] p-4 rounded-xl border border-violet-500/40 space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                  <Edit3 className="h-3.5 w-3.5" /> Editando Produto Ativo
                </h3>
                <button onClick={() => setProdutoSelecionado(null)} className="text-[10px] text-gray-400 hover:text-white bg-gray-800 px-2 py-0.5 rounded">
                  Fechar Editor
                </button>
              </div>

              <div>
                <label className="text-[11px] text-gray-500 block mb-1">Nome do Produto</label>
                <input type="text" value={produtoSelecionado.nome} onChange={(e) => atualizarDetalheProduto('nome', e.target.value)} className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-violet-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">Preço Visível</label>
                  <input type="text" value={produtoSelecionado.preco} onChange={(e) => atualizarDetalheProduto('preco', e.target.value)} className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-violet-500 outline-none" />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block mb-1">Disponibilidade</label>
                  <select value={produtoSelecionado.emEstoque ? "sim" : "nao"} onChange={(e) => atualizarDetalheProduto('emEstoque', e.target.value === "sim")} className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-violet-500 outline-none">
                    <option value="sim">Em Estoque</option>
                    <option value="nao">Esgotado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-gray-500 block mb-1">Foto Principal do Produto</label>
                <button type="button" onClick={() => editProdInputRef.current.click()} className="w-full bg-[#222232] border border-dashed border-gray-700 rounded-lg p-2 text-xs text-gray-300 flex items-center justify-center gap-1.5 hover:bg-[#262638]">
                  <ImageIcon className="h-3.5 w-3.5 text-violet-400" /> Alterar Foto do Produto
                </button>
                <input ref={editProdInputRef} type="file" accept="image/*" onChange={handleEditProductImgUpload} className="hidden" />
              </div>

              <div>
                <label className="text-[11px] text-gray-500 block mb-1 flex items-center gap-1"><Text className="h-3 w-3" /> Descrição Principal do Produto</label>
                <textarea rows="4" value={produtoSelecionado.descricao || ''} onChange={(e) => atualizarDetalheProduto('descricao', e.target.value)} placeholder="Fale sobre os benefícios, materiais e diferenciais do produto..." className="w-full bg-[#222232] border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:border-violet-500 outline-none resize-none custom-scrollbar" />
              </div>

              <div>
                <label className="text-[11px] text-gray-500 block mb-1 flex items-center gap-1"><Info className="h-3 w-3" /> Especificações Técnicas / Detalhes</label>
                <textarea rows="3" value={produtoSelecionado.detalhes || ''} onChange={(e) => atualizarDetalheProduto('detalhes', e.target.value)} placeholder="Ex: &#10;• Material: Couro Legítimo&#10;• Peso: 400g" className="w-full bg-[#222232] border border-gray-700 rounded-lg p-2.5 text-xs font-mono text-gray-300 focus:border-violet-500 outline-none resize-none" />
              </div>
            </div>
          ) : (
            /* COMPONENTES NORMAIS DO PAINEL CASO NENHUM PRODUTO ESTEJA ATALHADO */
            <>
              {activeTab === 'layout' && (
                <div className="space-y-6">
                  {/* Menu / Abas */}
                  <div className="bg-[#1a1a26] p-4 rounded-xl border border-gray-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Abas Ativas do Site</h3>
                      <button onClick={adicionarPagina} className="text-violet-400 hover:text-violet-300 flex items-center gap-1 text-xs font-bold"><FilePlus2 className="h-3.5 w-3.5" /> Criar Aba</button>
                    </div>
                    <div className="space-y-2">
                      {paginas.map(pag => (
                        <div key={pag} className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium border ${paginaAtiva === pag ? 'bg-violet-950/40 border-violet-500/50 text-white' : 'bg-[#12121a] border-gray-800 text-gray-400'}`}>
                          <span className="cursor-pointer flex-1" onClick={() => { setPaginaAtiva(pag); setProdutoSelecionado(null); }}>{pag}</span>
                          <button onClick={() => removerPagina(pag)} className="text-gray-500 hover:text-rose-400 p-1"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Criação de Blocos */}
                  <form onSubmit={adicionarNovaSecao} className="bg-[#1a1a26] p-4 rounded-xl border border-gray-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5"><FolderPlus className="h-4 w-4 text-violet-400" /> Criar Novo Bloco / Categoria</h3>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Nome do Bloco (Categoria)</label>
                      <input type="text" value={novoNomeBloco} onChange={(e) => setNovoNomeBloco(e.target.value)} placeholder="Ex: Tênis Air, Blusa Casual" className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-violet-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Tipo de Exibição do Bloco</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button type="button" onClick={() => setNovoTipoBloco('grid')} className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${novoTipoBloco === 'grid' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-[#222232] border-gray-700 text-gray-400'}`}><Grid className="h-4 w-4" /> Grid (2 Col)</button>
                        <button type="button" onClick={() => setNovoTipoBloco('carrossel')} className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${novoTipoBloco === 'carrossel' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-[#222232] border-gray-700 text-gray-400'}`}><Layers className="h-4 w-4" /> Modo Rolante</button>
                        <button type="button" onClick={() => setNovoTipoBloco('banner')} className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${novoTipoBloco === 'banner' ? 'bg-violet-600 border-violet-500 text-white' : 'bg-[#222232] border-gray-700 text-gray-400'}`}><ImageIcon className="h-4 w-4" /> Banner Img</button>
                      </div>
                    </div>
                    {novoTipoBloco === 'banner' && (
                      <div>
                        <button type="button" onClick={() => bannerInputRef.current.click()} className="w-full bg-[#222232] border border-dashed border-gray-700 rounded-lg p-2.5 text-xs flex items-center justify-center gap-2 text-gray-300"><ImageIcon className="h-4 w-4 text-amber-400" /> {urlBannerBloco ? 'Banner Selecionado ✅' : 'Upload da Imagem do Banner'}</button>
                        <input ref={bannerInputRef} type="file" accept="image/*" onChange={handleBannerImgUpload} className="hidden" />
                      </div>
                    )}
                    <button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-2 rounded-lg shadow-md transition-all flex items-center justify-center gap-1"><Plus className="h-4 w-4" /> Acoplar Bloco no Layout</button>
                  </form>
                </div>
              )}

              {activeTab === 'produtos' && (
                <form onSubmit={adicionarProdutoNaCategoria} className="bg-[#1a1a26] p-4 rounded-xl border border-gray-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Cadastrar Novo Produto</h3>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Escolha o Bloco de Destino:</label>
                    <select value={blocoDestinoProd} onChange={(e) => setBlocoDestinoProd(e.target.value)} className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white outline-none">
                      <option value="">-- Selecione uma Categoria --</option>
                      {secoes.filter(s => s.tipo !== 'banner').map(s => (
                        <option key={s.id} value={s.id}>{s.titulo} ({s.tipo === 'grid' ? 'Grid' : 'Modo Rolante'})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Nome do Produto</label>
                    <input type="text" value={novoNomeProd} onChange={(e) => setNovoNomeProd(e.target.value)} placeholder="Ex: Tênis Run" className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-1">Valor (R$)</label>
                    <input type="text" value={novoPrecoProd} onChange={(e) => setNovoPrecoProd(e.target.value)} placeholder="Ex: 199,90" className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white outline-none" />
                  </div>
                  <div>
                    <button type="button" onClick={() => fileInputRef.current.click()} className="w-full bg-[#222232] border border-dashed border-gray-700 rounded-lg p-3 text-xs flex items-center justify-center gap-2 text-gray-300"><ImageIcon className="h-4 w-4 text-sky-400" /> {novaImgProd ? "Foto carregada! ✅" : "Upload da Foto"}</button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleProductImgUpload} className="hidden" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-1"><Plus className="h-4 w-4" /> Injetar Produto na Vitrine</button>
                </form>
              )}

              {activeTab === 'design' && (
                <div className="space-y-5">
                  <div className="bg-[#1a1a26] p-4 rounded-xl border border-gray-800 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Tema Visual da Loja</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setStoreTheme('light')} className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 ${storeTheme === 'light' ? 'bg-white text-gray-900 border-white shadow-lg' : 'bg-[#222232] border-gray-700 text-gray-400'}`}><Sun className="h-4 w-4" /> Modo Claro</button>
                      <button onClick={() => setStoreTheme('dark')} className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 ${storeTheme === 'dark' ? 'bg-[#2d2d3f] text-white border-violet-500 shadow-lg' : 'bg-[#222232] border-gray-700 text-gray-400'}`}><Moon className="h-4 w-4" /> Modo Escuro</button>
                    </div>
                  </div>

                  <div className="bg-[#1a1a26] p-4 rounded-xl border border-gray-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Identidade Visual do Topo</h3>
                    <input type="text" value={logoName} onChange={(e) => setLogoName(e.target.value)} className="w-full bg-[#222232] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white" />
                    <button onClick={() => logoInputRef.current.click()} className="w-full bg-[#222232] border border-dashed border-gray-700 rounded-lg p-2.5 text-xs flex items-center justify-center gap-2 text-gray-300"><ImageIcon className="h-4 w-4 text-violet-400" /> {logoImg ? "Trocar Imagem Logo" : "Upload da Logo"}</button>
                    <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </div>

                  <div className="bg-[#1a1a26] p-4 rounded-xl border border-gray-800 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Cor Principal de Ação</label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                        <button key={color} onClick={() => setPrimaryColor(color)} style={{ backgroundColor: color }} className={`h-8 rounded-md flex items-center justify-center border-2 ${primaryColor === color ? 'border-white scale-105 shadow-md' : 'border-transparent'}`}>{primaryColor === color && <CheckCircle className="h-3.5 w-3.5 text-white" />}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* ================= PREVIEW DA LOJA (DIREITA) ================= */}
      <div className="flex-1 bg-[#1c1c24] p-6 flex items-center justify-center overflow-y-auto relative">
        <div className={`w-full max-w-4xl rounded-2xl shadow-2xl min-h-[620px] flex flex-col max-h-[88vh] overflow-y-auto relative transition-all duration-300 ${storeTheme === 'light' ? 'bg-white text-gray-900' : 'bg-[#121216] text-gray-100'}`}>
          
          {/* Header/Navbar Fixo da Loja */}
          <header className={`px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b transition-colors ${storeTheme === 'light' ? 'bg-white border-gray-100' : 'bg-[#17171f] border-gray-800'}`}>
            <div className="flex items-center gap-2">
              {logoImg ? <img src={logoImg} alt="Logo" className="h-9 max-w-[140px] object-contain cursor-pointer" onClick={() => setProdutoSelecionado(null)} /> : <span className="font-black text-xl uppercase cursor-pointer" style={{ color: primaryColor }} onClick={() => setProdutoSelecionado(null)}>{logoName}</span>}
            </div>
            
            <nav className="flex items-center gap-6 text-sm font-bold">
              {paginas.map(pag => (
                <span key={pag} style={{ borderBottomColor: paginaAtiva === pag ? primaryColor : 'transparent' }} className={`cursor-pointer pb-1 transition-all border-b-2 text-xs uppercase tracking-wide ${paginaAtiva === pag ? (storeTheme === 'light' ? 'text-gray-900' : 'text-white') : (storeTheme === 'light' ? 'text-gray-400 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300')}`} onClick={() => { setPaginaAtiva(pag); setProdutoSelecionado(null); }}>{pag}</span>
              ))}

              <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-gray-500/10 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span style={{ backgroundColor: primaryColor }} className="absolute -top-0.5 -right-0.5 text-[9px] font-black text-white h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </nav>
          </header>

          {/* EXIBIÇÃO CONDICIONAL: TELA LIMPA DO PRODUTO ATIVO */}
          {produtoSelecionado ? (
            <div className="flex-1 p-8 space-y-6 animate-fadeIn">
              {/* Botão de Voltar para Vitrine */}
              <button 
                onClick={() => setProdutoSelecionado(null)} 
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider pb-2 transition-colors ${storeTheme === 'light' ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
              >
                <ArrowLeft className="h-4 w-4" /> Voltar para a Vitrine
              </button>

              {/* Grid Estrutural da Página do Produto Solo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {/* Imagem do Produto Expandida */}
                <div className={`rounded-2xl overflow-hidden border aspect-square ${storeTheme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#181822] border-gray-800'}`}>
                  <img src={produtoSelecionado.img} alt={produtoSelecionado.nome} className="w-full h-full object-cover" />
                </div>

                {/* Detalhes de Informação e Compra */}
                <div className="flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Badge de Disponibilidade */}
                    <div>
                      {produtoSelecionado.emEstoque ? (
                        <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-md">Pronta Entrega ✅</span>
                      ) : (
                        <span className="text-[10px] font-black uppercase bg-rose-500/10 text-rose-500 px-2.5 py-1 rounded-md">Produto Esgotado ❌</span>
                      )}
                    </div>

                    <h2 className="text-2xl font-black tracking-tight">{produtoSelecionado.nome}</h2>
                    <p className="text-3xl font-black" style={{ color: primaryColor }}>{produtoSelecionado.preco}</p>
                    
                    {/* Descrição Dinâmica Modificável */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] uppercase font-bold tracking-wider opacity-50 block">Descrição do Produto</span>
                      <p className="text-xs leading-relaxed opacity-80 whitespace-pre-wrap">
                        {produtoSelecionado.descricao || 'Nenhuma descrição adicionada para este produto.'}
                      </p>
                    </div>

                    {/* Especificações Técnicas */}
                    {produtoSelecionado.detalhes && (
                      <div className="space-y-1 pt-2">
                        <span className="text-[11px] uppercase font-bold tracking-wider opacity-50 block">Especificações Técnicas</span>
                        <p className="text-xs font-mono opacity-70 whitespace-pre-wrap bg-gray-500/5 p-2 rounded-lg">
                          {produtoSelecionado.detalhes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Botão de Compra Dedicado */}
                  <button 
                    onClick={() => adicionarAoCarrinho(produtoSelecionado)}
                    disabled={!produtoSelecionado.emEstoque}
                    style={{ backgroundColor: produtoSelecionado.emEstoque ? primaryColor : '#4b5563' }}
                    className="w-full text-white font-black uppercase tracking-wider text-xs py-3.5 rounded-xl shadow-lg transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {produtoSelecionado.emEstoque ? 'Adicionar à Sacola de Compras' : 'Produto Indisponível'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* VITRINE NORMAL POR CATEGORIAS (CASO NENHUM PRODUTO ESTEJA CLICADO) */
            paginaAtiva !== 'Início' ? (
              <div className="flex-1 p-16 text-center flex flex-col items-center justify-center font-bold text-gray-400">
                <Layout className="h-12 w-12 mb-3 opacity-60" />
                <p className="text-sm uppercase tracking-wide">Vitrine Customizada para a Aba "{paginaAtiva}"</p>
              </div>
            ) : (
              <div className="flex-1">
                {secoes.map((secao) => {
                  if (secao.tipo === 'banner') {
                    return (
                      <div key={secao.id} className="relative w-full h-[240px] flex items-center p-8 bg-cover bg-center" style={{ backgroundImage: `url(${secao.img})` }}>
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="relative z-10 text-white space-y-2">
                          <span style={{ backgroundColor: primaryColor }} className="text-[10px] font-black uppercase px-2.5 py-1 rounded">{secao.titulo}</span>
                          <h2 className="text-2xl font-black">{secao.subtitulo}</h2>
                        </div>
                      </div>
                    );
                  }

                  if (secao.tipo === 'grid') {
                    return (
                      <div key={secao.id} className={`p-6 space-y-4 border-b ${storeTheme === 'light' ? 'bg-white border-gray-100' : 'bg-[#181822] border-gray-800'}`}>
                        <h3 className="text-xs font-black uppercase tracking-wider border-l-4 pl-2" style={{ borderLeftColor: primaryColor }}>{secao.titulo}</h3>
                        {secao.produtos.length === 0 ? <p className="text-xs italic text-gray-500 text-center py-4">Nenhum produto aqui.</p> : (
                          <div className="grid grid-cols-2 gap-4">
                            {secao.produtos.map(produto => (
                              <div key={produto.id} className={`rounded-xl border overflow-hidden flex flex-col ${storeTheme === 'light' ? 'bg-white border-gray-200' : 'bg-[#121218] border-gray-800'}`}>
                                {/* CLIQUE NA FOTO OU NO PRODUTO ABRE A TELA LIMPA SOLO E ATIVA O EDITOR */}
                                <div className="h-44 bg-neutral-500/5 cursor-pointer relative group" onClick={() => { setProdutoSelecionado(produto); setActiveTab('produtos'); }}>
                                  <img src={produto.img} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="bg-white/90 text-gray-900 text-[10px] font-black px-2.5 py-1 rounded shadow-md uppercase tracking-wider">Visualizar & Editar</span>
                                  </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                                  <div className="cursor-pointer" onClick={() => { setProdutoSelecionado(produto); setActiveTab('produtos'); }}>
                                    <h4 className="font-bold text-sm hover:underline">{produto.nome}</h4>
                                    <p className="text-md font-black mt-1" style={{ color: primaryColor }}>{produto.preco}</p>
                                  </div>
                                  <button onClick={() => adicionarAoCarrinho(produto)} style={{ backgroundColor: primaryColor }} className="w-full text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 hover:brightness-110 shadow-sm">Comprar Item</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (secao.tipo === 'carrossel') {
                    return (
                      <div key={secao.id} className={`p-6 space-y-4 border-b ${storeTheme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#15151e] border-gray-800'}`}>
                        <h3 className="text-xs font-black uppercase tracking-wider border-l-4 pl-2" style={{ borderLeftColor: primaryColor }}>{secao.titulo}</h3>
                        {secao.produtos.length === 0 ? <p className="text-xs italic text-gray-500 text-center py-4">Nenhum produto aqui.</p> : (
                          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none select-none">
                            {secao.produtos.map(produto => (
                              <div key={produto.id} className={`min-w-[210px] w-[210px] rounded-xl border overflow-hidden flex flex-col ${storeTheme === 'light' ? 'bg-white border-gray-200' : 'bg-[#121218] border-gray-800'}`}>
                                <div className="h-36 cursor-pointer relative group" onClick={() => { setProdutoSelecionado(produto); setActiveTab('produtos'); }}>
                                  <img src={produto.img} alt={produto.nome} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="bg-white/90 text-gray-900 text-[9px] font-black px-2 py-0.5 rounded shadow-md uppercase">Ver</span>
                                  </div>
                                </div>
                                <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                                  <h4 className="font-bold text-xs truncate cursor-pointer hover:underline" onClick={() => { setProdutoSelecionado(produto); setActiveTab('produtos'); }}>{produto.nome}</h4>
                                  <p className="text-sm font-black" style={{ color: primaryColor }}>{produto.preco}</p>
                                  <button onClick={() => adicionarAoCarrinho(produto)} style={{ borderColor: primaryColor, color: primaryColor }} className="w-full border text-xs py-1.5 rounded-md font-bold hover:bg-black/5 transition-colors">+ Adicionar</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )
          )}

          {/* ================= CARRINHO LATERAL RETRÁTIL ================= */}
          <AnimatePresence>
            {isCartOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/60 z-40" />
                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className={`absolute right-0 top-0 bottom-0 w-[340px] z-50 shadow-2xl flex flex-col p-5 border-l ${storeTheme === 'light' ? 'bg-white text-gray-900 border-gray-100' : 'bg-[#171721] text-gray-100 border-gray-800'}`}>
                  <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-500/20">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" style={{ color: primaryColor }} />
                      <h3 className="font-black text-sm uppercase tracking-wide">Seu Carrinho</h3>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-100"><X className="h-5 w-5" /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center space-y-2 py-10">
                        <ShoppingBag className="h-10 w-10 opacity-30" />
                        <p className="text-xs font-semibold uppercase">O carrinho está vazio</p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.cartId} className={`flex gap-3 p-2 rounded-xl border border-gray-500/10 items-center ${storeTheme === 'light' ? 'bg-gray-50' : 'bg-[#111118]'}`}>
                          <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0"><img src={item.img} alt={item.nome} className="w-full h-full object-cover" /></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold truncate">{item.nome}</h4>
                            <p className="text-xs font-black mt-0.5" style={{ color: primaryColor }}>{item.preco}</p>
                          </div>
                          <button onClick={() => removerDoCarrinho(item.cartId)} className="text-gray-400 hover:text-rose-500 p-1.5"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      ))
                    )}
                  </div>
                  {cartItems.length > 0 && (
                    <div className="border-t pt-4 mt-4 border-gray-500/20 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold uppercase tracking-wider text-xs opacity-70">Valor Total:</span>
                        <span className="font-black text-base" style={{ color: primaryColor }}>{calcularTotalCarrinho()}</span>
                      </div>
                      <button style={{ backgroundColor: primaryColor }} className="w-full text-white font-bold text-xs py-2.5 rounded-xl uppercase tracking-wider shadow-md hover:brightness-110">Finalizar Compra</button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}