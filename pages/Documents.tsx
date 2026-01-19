
import React, { useState } from 'react';
import { FileText, Search, Plus, Download, Trash2, Eye, File, FileImage, X } from 'lucide-react';

interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: string;
}

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [documents, setDocuments] = useState<DocumentRecord[]>([
    { id: '1', name: 'Passaporte_Copia.pdf', type: 'PDF', size: '1.2 MB', date: '2024-05-10', category: 'Identificação' },
    { id: '2', name: 'Reserva_Airbnb_Dublin.png', type: 'Image', size: '3.4 MB', date: '2024-06-01', category: 'Acomodação' },
    { id: '3', name: 'Seguro_Viagem.pdf', type: 'PDF', size: '0.8 MB', date: '2024-06-05', category: 'Saúde' },
    { id: '4', name: 'Passagem_Aerea.pdf', type: 'PDF', size: '2.1 MB', date: '2024-06-12', category: 'Transporte' },
  ]);

  const [newDoc, setNewDoc] = useState({
    name: '',
    category: 'Outros',
    type: 'PDF'
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="text-red-500" size={24} />;
      case 'Image': return <FileImage className="text-blue-500" size={24} />;
      default: return <File className="text-emerald-500" size={24} />;
    }
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name) return;

    const doc: DocumentRecord = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDoc.name + (newDoc.name.includes('.') ? '' : (newDoc.type === 'PDF' ? '.pdf' : '.png')),
      type: newDoc.type,
      size: '0.0 KB', // Registro manual
      date: new Date().toISOString().split('T')[0],
      category: newDoc.category
    };

    setDocuments([doc, ...documents]);
    setNewDoc({ name: '', category: 'Outros', type: 'PDF' });
    setShowAddModal(false);
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Documentos</h1>
          <p className="text-emerald-600">Armazene comprovantes, vistos e reservas com segurança</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200"
        >
          <Plus size={20} />
          Registrar Documento
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-emerald-100 rounded-2xl py-3 pl-12 pr-4 text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documents.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.category.toLowerCase().includes(searchTerm.toLowerCase())).map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 rounded-2xl">
                {getIcon(doc.type)}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-emerald-400 hover:text-emerald-600 transition-colors"><Eye size={18} /></button>
                <button className="p-2 text-emerald-400 hover:text-emerald-600 transition-colors"><Download size={18} /></button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900 truncate" title={doc.name}>{doc.name}</h3>
              <p className="text-xs text-emerald-500 font-medium mt-1">{doc.category} • {doc.size}</p>
              <div className="mt-4 pt-4 border-t border-emerald-50 flex items-center justify-between">
                <span className="text-[10px] text-emerald-300 font-bold uppercase">{new Date(doc.date).toLocaleDateString('pt-BR')}</span>
                <button 
                  onClick={() => removeDocument(doc.id)}
                  className="text-red-200 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {documents.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div className="col-span-full py-12 text-center text-emerald-400 italic font-medium">
            Nenhum documento encontrado.
          </div>
        )}
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-600 p-8 flex justify-between items-center text-white">
              <div>
                <h2 className="text-2xl font-bold">Novo Registro</h2>
                <p className="text-emerald-100 text-sm">Cadastre um documento manualmente</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Nome do Arquivo</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Comprovante de Pagamento"
                    value={newDoc.name}
                    onChange={e => setNewDoc({...newDoc, name: e.target.value})}
                    className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Categoria</label>
                  <select 
                    value={newDoc.category}
                    onChange={e => setNewDoc({...newDoc, category: e.target.value})}
                    className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                  >
                    <option value="Identificação">Identificação</option>
                    <option value="Acomodação">Acomodação</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Tipo de Arquivo</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setNewDoc({...newDoc, type: 'PDF'})}
                      className={`py-3 rounded-xl font-bold text-sm transition-all border ${newDoc.type === 'PDF' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-400 border-emerald-100'}`}
                    >
                      PDF
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewDoc({...newDoc, type: 'Image'})}
                      className={`py-3 rounded-xl font-bold text-sm transition-all border ${newDoc.type === 'Image' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-400 border-emerald-100'}`}
                    >
                      Imagem
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
              >
                Salvar Registro
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
