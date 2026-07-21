import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

export default function ManageMassTimings() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { documents, loading } = useCollection('massTimings', { orderBy: 'order', orderDir: 'asc' });
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const items = data.items ? data.items.split('\n').filter(Boolean) : [];
      const payload = { ...data, items, order: Number(data.order) || 0 };
      if (editingItem) await updateDocument('massTimings', editingItem.id, payload);
      else await addDocument('massTimings', payload);
      reset(); setShowForm(false); setEditingItem(null);
    } catch (error) { console.error('Error saving:', error); }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    reset({ ...item, items: (item.items || []).join('\n') });
    setShowForm(true);
  };
  const handleDelete = async (id) => { if (window.confirm('Delete this timing?')) await deleteDocument('massTimings', id); };
  const handleCancel = () => { setShowForm(false); setEditingItem(null); reset({}); };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Mass Timings</h1>
        <button onClick={() => { setShowForm(true); setEditingItem(null); reset({}); }} className="btn-primary text-sm py-2 px-4 flex items-center">
          <FiPlus className="mr-1" /> Add Timing
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">{editingItem ? 'Edit Timing' : 'New Timing'}</h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <input {...register('category', { required: 'Category is required' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none" placeholder="e.g., Sunday" />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                <input {...register('icon')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none" placeholder="e.g., ⛪" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input type="number" {...register('order')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timings (one per line)</label>
              <textarea {...register('items')} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none resize-none" placeholder="Holy Mass: 6:30 AM&#10;Evening Prayer: 5:30 PM" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm py-2 px-6">{editingItem ? 'Update' : 'Create'}</button>
              <button type="button" onClick={handleCancel} className="btn-outline text-sm py-2 px-6">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {documents.map((item) => (
          <div key={item.id} className="card p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon || '⛪'}</span>
              <div>
                <h4 className="font-medium text-gray-800">{item.category}</h4>
                <p className="text-sm text-gray-500">{(item.items || []).join(' | ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" aria-label="Edit"><FiEdit2 size={16} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Delete"><FiTrash2 size={16} /></button>
            </div>
          </div>
        ))}
        {documents.length === 0 && <p className="text-center text-gray-400 py-8">No mass timings added yet.</p>}
      </div>
    </div>
  );
}
