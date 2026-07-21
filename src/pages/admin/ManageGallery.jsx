import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { useCollection, addDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiTrash2, FiX, FiUpload } from 'react-icons/fi';

const categories = ['Church', 'Feast', 'Retreat', 'Youth', 'Catechism', 'Christmas', 'Easter', 'Family Units'];

export default function ManageGallery() {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { documents, loading } = useCollection('gallery', {
    orderBy: 'createdAt',
    orderDir: 'desc',
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let url = data.url;

      if (data.file && data.file[0]) {
        const file = data.file[0];
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        url = await getDownloadURL(snapshot.ref);
      }

      await addDocument('gallery', {
        url,
        caption: data.caption || '',
        category: data.category || 'Church',
      });

      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await deleteDocument('gallery', id);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Gallery</h1>
        <button
          onClick={() => { setShowForm(true); reset({}); }}
          className="btn-primary text-sm py-2 px-4 flex items-center"
        >
          <FiPlus className="mr-1" /> Upload Image
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">Upload New Image</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
              <input
                type="file"
                accept="image/*"
                {...register('file')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Or Image URL</label>
              <input
                {...register('url')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input
                  {...register('caption')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Image caption"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary text-sm py-2 px-6 flex items-center"
            >
              <FiUpload className="mr-1" />
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {documents.map((image) => (
          <div key={image.id} className="relative group aspect-square rounded-lg overflow-hidden">
            <img
              src={image.url}
              alt={image.caption || 'Gallery image'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button
                onClick={() => handleDelete(image.id)}
                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full transition-opacity"
                aria-label="Delete image"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-2">
              <p className="text-white text-xs truncate">{image.category}</p>
            </div>
          </div>
        ))}
      </div>

      {documents.length === 0 && (
        <p className="text-center text-gray-400 py-8">No images in gallery yet.</p>
      )}
    </div>
  );
}
