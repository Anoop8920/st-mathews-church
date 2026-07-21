import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from 'react-icons/fi';

export default function ManageFamilies() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { documents, loading } = useCollection('families', {
    orderBy: 'familyNo',
    orderDir: 'asc',
  });
  const { documents: members } = useCollection('members');

  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Calculate next family number
  const nextFamilyNo = useMemo(() => {
    if (documents.length === 0) return 1;
    const maxNo = Math.max(...documents.map((f) => Number(f.familyNo) || 0));
    return maxNo + 1;
  }, [documents]);

  const filteredFamilies = documents.filter((f) =>
    f.familyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(f.familyNo)?.includes(searchTerm)
  );

  const onSubmit = async (data) => {
    try {
      setSubmitError('');

      // Check for duplicate family name
      const duplicate = documents.find(
        (f) =>
          f.familyName.toLowerCase().trim() === data.familyName.toLowerCase().trim() &&
          f.id !== editingItem?.id
      );

      if (duplicate) {
        setSubmitError(`A family with the name "${data.familyName}" already exists (Family No: ${duplicate.familyNo}).`);
        return;
      }

      if (editingItem) {
        await updateDocument('families', editingItem.id, data);
      } else {
        // Auto-assign family number for new families
        await addDocument('families', { ...data, familyNo: nextFamilyNo });
      }
      reset();
      setShowForm(false);
      setEditingItem(null);
      setSubmitError('');
    } catch (error) {
      console.error('Error saving family:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    reset(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    // Check if any members are linked to this family
    const linkedMembers = (members || []).filter((m) => m.familyId === id);
    if (linkedMembers.length > 0) {
      alert(
        `Cannot delete this family. ${linkedMembers.length} member(s) are linked to it.\n\nPlease delete or reassign the members first.`
      );
      return;
    }

    if (window.confirm('Are you sure you want to delete this family?')) {
      try {
        await deleteDocument('families', id);
      } catch (error) {
        console.error('Error deleting family:', error);
        alert('Failed to delete family. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setSubmitError('');
    reset({});
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Families</h1>
        <button
          onClick={() => { setShowForm(true); setEditingItem(null); reset({}); }}
          className="btn-primary text-sm py-2 px-4 flex items-center"
        >
          <FiPlus className="mr-1" /> Add Family
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">
              {editingItem ? 'Edit Family' : 'New Family'}
            </h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>

          {/* Show auto-generated family number */}
          <div className="mb-4 p-3 bg-primary-50 rounded-lg inline-flex items-center gap-2">
            <span className="text-sm font-medium text-primary-600">
              Family No: 
            </span>
            <span className="text-lg font-bold text-primary-700">
              {editingItem ? editingItem.familyNo : nextFamilyNo}
            </span>
            {!editingItem && (
              <span className="text-xs text-primary-400">(Auto-generated)</span>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family Name *</label>
                <input
                  {...register('familyName', { required: 'Family name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Family name"
                />
                {errors.familyName && <p className="text-red-500 text-xs mt-1">{errors.familyName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">House Name</label>
                <input
                  {...register('houseName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="House name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
                <select
                  {...register('ward')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                >
                  <option value="">Select Ward</option>
                  <option value="1">Ward 1</option>
                  <option value="2">Ward 2</option>
                  <option value="3">Ward 3</option>
                  <option value="4">Ward 4</option>
                  <option value="5">Ward 5</option>
                  <option value="6">Ward 6</option>
                  <option value="7">Ward 7</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="family@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parish Unit</label>
                <input
                  {...register('parishUnit')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Parish unit name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                {...register('address')}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none resize-none"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
              <input
                {...register('pinCode', {
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Pin code must be 6 digits',
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                placeholder="686538"
                maxLength={6}
              />
              {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Family Photo URL</label>
              <input
                {...register('photoUrl')}
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
            {submitError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                ⚠️ {submitError}
              </div>
            )}
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by family name or number..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filteredFamilies.map((item) => (
          <div key={item.id} className="card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary-600">{item.familyNo || '-'}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{item.familyName}</h4>
                <p className="text-sm text-gray-500">
                  {item.houseName && `${item.houseName} • `}
                  {item.ward && `Ward ${item.ward}`}
                </p>
              </div>
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
        {filteredFamilies.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            {searchTerm ? 'No families match your search.' : 'No families added yet.'}
          </p>
        )}
      </div>
    </div>
  );
}
