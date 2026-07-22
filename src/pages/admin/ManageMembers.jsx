import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCollection, addDocument, updateDocument, deleteDocument } from '../../hooks/useFirestore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from 'react-icons/fi';

export default function ManageMembers() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { documents: members, loading } = useCollection('members', {
    orderBy: 'name',
    orderDir: 'asc',
  });
  const { documents: families } = useCollection('families', {
    orderBy: 'familyName',
    orderDir: 'asc',
  });

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

  const selectedRelationship = watch('relationship');
  const showOriginFields = ['Wife', 'Mother', 'Grandmother', 'Son-in-law', 'Daughter-in-law', 'Father-in-law', 'Mother-in-law'].includes(selectedRelationship);

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data) => {
    try {
      // Validate: first member of a family must be "Head"
      if (!editingItem) {
        const familyMembers = members.filter((m) => m.familyId === data.familyId);
        if (familyMembers.length === 0 && data.relationship !== 'Head') {
          alert('The first member added to a family must have the relationship "Head".');
          return;
        }
      }

      if (editingItem) {
        await updateDocument('members', editingItem.id, data);
      } else {
        await addDocument('members', data);
      }
      reset();
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    reset(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      await deleteDocument('members', id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    reset({});
  };

  const getFamilyName = (familyId) => {
    const family = families.find((f) => f.id === familyId);
    return family?.familyName || 'Unknown';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Members</h1>
        <button
          onClick={() => { setShowForm(true); setEditingItem(null); reset({}); }}
          className="btn-primary text-sm py-2 px-4 flex items-center"
        >
          <FiPlus className="mr-1" /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary-500">
              {editingItem ? 'Edit Member' : 'New Member'}
            </h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family *</label>
                <select
                  {...register('familyId', { required: 'Family is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                >
                  <option value="">Select Family</option>
                  {families.map((f) => (
                    <option key={f.id} value={f.id}>{f.familyNo}. {f.familyName}</option>
                  ))}
                </select>
                {errors.familyId && <p className="text-red-500 text-xs mt-1">{errors.familyId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baptism Name</label>
                <input
                  {...register('baptismName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Baptism name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  {...register('gender')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <select
                  {...register('relationship')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                >
                  <option value="">Select Relationship</option>
                  <option value="Head">Head</option>
                  <option value="Wife">Wife</option>
                  <option value="Husband">Husband</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Grandfather">Grandfather</option>
                  <option value="Grandmother">Grandmother</option>
                  <option value="Grandson">Grandson</option>
                  <option value="Granddaughter">Granddaughter</option>
                  <option value="Father-in-law">Father-in-law</option>
                  <option value="Mother-in-law">Mother-in-law</option>
                  <option value="Son-in-law">Son-in-law</option>
                  <option value="Daughter-in-law">Daughter-in-law</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {showOriginFields && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House Name (Origin)</label>
                    <input
                      {...register('originHouseName')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                      placeholder="House name before marriage"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parish (Origin)</label>
                    <input
                      {...register('originParish')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                      placeholder="Original parish name"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baptism Date</label>
                <input
                  type="date"
                  {...register('baptismDate')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marriage Date</label>
                <input
                  type="date"
                  {...register('marriageDate')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <input
                  {...register('occupation')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="Occupation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
                <input
                  {...register('workLocation')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                  placeholder="City / Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  {...register('bloodGroup')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  {...register('mobile')}
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
                  placeholder="email@example.com"
                />
              </div>
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

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search members by name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
        />
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-medium text-gray-600">Name</th>
              <th className="text-left p-3 font-medium text-gray-600">Family</th>
              <th className="text-left p-3 font-medium text-gray-600">Relationship</th>
              <th className="text-left p-3 font-medium text-gray-600">Mobile</th>
              <th className="text-left p-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((item) => (
              <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-600">{getFamilyName(item.familyId)}</td>
                <td className="p-3 text-gray-600">{item.relationship || '-'}</td>
                <td className="p-3 text-gray-600">{item.mobile || '-'}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded" aria-label="Edit">
                      <FiEdit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" aria-label="Delete">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredMembers.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          {searchTerm ? 'No members match your search.' : 'No members added yet.'}
        </p>
      )}
    </div>
  );
}
