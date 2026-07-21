import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

export default function ManageEvents() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { documents, loading } = useCollection('events', {
    orderBy: 'date',
    orderDir: 'desc',
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (editingItem) {
        await updateDocument('events', editingItem.id, data);
      } else {
        await addDocument('events', data);
      }
      reset();
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    reset(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteDocument('events', id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    reset({});
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Events</h1>
        <button
          onClick={() => { setShowForm(true); setEditingItem(null); reset({}); }}
          className="btn-primary text-sm py-2 px-4 flex items-center"
        >
          <FiPlus className="mr-1" /> Add New
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">
              {editingItem ? 'Edit Event' : 'New Event'}
            </h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Event title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  {...register('time')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="e.g., 9:00 AM - 12:00 PM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input
                  {...register('venue')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Event venue"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                {...register('description')}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none resize-none"
                placeholder="Event description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poster URL</label>
              <input
                {...register('posterUrl')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm py-2 px-6">
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-outline text-sm py-2 px-6">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {documents.map((item) => (
          <div key={item.id} className="card p-4 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <span className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <h4 className="font-medium text-gray-800">{item.title}</h4>
              {item.venue && <p className="text-xs text-gray-500">{item.venue}</p>}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" aria-label="Edit">
                <FiEdit2 size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Delete">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-center text-gray-400 py-8">No events yet.</p>
        )}
      </div>
    </div>
  );
}
