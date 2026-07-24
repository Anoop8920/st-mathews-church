import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiUser } from 'react-icons/fi';

export default function ManageParishPriests() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { documents, loading } = useCollection('parishPriests', {
    orderBy: 'createdAt',
    orderDir: 'asc',
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let photoUrl = data.photoUrl || editingItem?.photoUrl || '';

      // Upload photo if file selected
      if (data.photo && data.photo[0]) {
        const file = data.photo[0];
        const storageRef = ref(storage, `parishPriests/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        photoUrl = await getDownloadURL(snapshot.ref);
      }

      const payload = {
        name: data.name,
        ordinationYear: data.ordinationYear || '',
        congregation: data.congregation || '',
        photoUrl,
      };

      if (editingItem) {
        await updateDocument('parishPriests', editingItem.id, payload);
      } else {
        await addDocument('parishPriests', payload);
      }

      reset();
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    reset(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this priest?')) {
      await deleteDocument('parishPriests', id);
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
        <h1 className="text-2xl font-bold text-primary-500">Priests from Parish</h1>
        <button
          onClick={() => { setShowForm(true); setEditingItem(null); reset({}); }}
          className="btn-primary text-sm py-2 px-4 flex items-center"
        >
          <FiPlus className="mr-1" /> Add Priest
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">
              {editingItem ? 'Edit Priest' : 'Add New Priest'}
            </h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Fr. Name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordination Year</label>
                <input
                  {...register('ordinationYear')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="e.g., 2005"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Congregation</label>
                <input
                  {...register('congregation')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="e.g., CMI, OCD, Diocesan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register('photo')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Or Photo URL</label>
              <input
                {...register('photoUrl')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={uploading} className="btn-primary text-sm py-2 px-6 flex items-center">
                <FiUpload className="mr-1" size={14} />
                {uploading ? 'Saving...' : editingItem ? 'Update' : 'Add Priest'}
              </button>
              <button type="button" onClick={handleCancel} className="btn-outline text-sm py-2 px-6">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((item) => (
          <div key={item.id} className="card p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-gold-400 flex-shrink-0">
              {item.photoUrl ? (
                <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                  <FiUser size={20} className="text-primary-300" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500">
                {item.ordinationYear && `Ordained: ${item.ordinationYear}`}
                {item.ordinationYear && item.congregation && ' • '}
                {item.congregation}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" aria-label="Edit">
                <FiEdit2 size={14} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Delete">
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <p className="text-center text-gray-400 py-8">No priests added yet. Click "Add Priest" to start.</p>
      )}
    </div>
  );
}
