import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { useCollection, addDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiTrash2, FiX, FiDownload, FiUpload } from 'react-icons/fi';

export default function ManageDownloads() {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { documents, loading } = useCollection('downloads', { orderBy: 'createdAt', orderDir: 'desc' });
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let url = data.url;

      if (data.file && data.file[0]) {
        const file = data.file[0];
        const storageRef = ref(storage, `downloads/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        url = await getDownloadURL(snapshot.ref);
      }

      await addDocument('downloads', {
        title: data.title,
        description: data.description || '',
        category: data.category || 'General',
        url,
        fileName: data.file?.[0]?.name || data.title,
      });
      reset(); setShowForm(false);
    } catch (error) { console.error('Error:', error); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this download?')) await deleteDocument('downloads', id);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Downloads</h1>
        <button onClick={() => { setShowForm(true); reset({}); }} className="btn-primary text-sm py-2 px-4 flex items-center">
          <FiPlus className="mr-1" /> Add Download
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">Upload Document</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input {...register('title', { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none" placeholder="Document title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select {...register('category')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none">
                  <option value="General">General</option>
                  <option value="Bulletin">Bulletin</option>
                  <option value="Circular">Circular</option>
                  <option value="Report">Report</option>
                  <option value="Form">Form</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
              <input type="file" {...register('file')} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Or URL</label>
              <input {...register('url')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input {...register('description')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none" />
            </div>
            <button type="submit" disabled={uploading} className="btn-primary text-sm py-2 px-6 flex items-center">
              <FiUpload className="mr-1" /> {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {documents.map((item) => (
          <div key={item.id} className="card p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiDownload className="text-primary-400" size={20} />
              <div>
                <h4 className="font-medium text-gray-800">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.category} • {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 text-green-500 hover:bg-green-50 rounded-lg" aria-label="Download">
                <FiDownload size={16} />
              </a>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Delete">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {documents.length === 0 && <p className="text-center text-gray-400 py-8">No downloads added yet.</p>}
      </div>
    </div>
  );
}
