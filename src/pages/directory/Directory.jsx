import { useState, useMemo, useEffect } from 'react';
import PageBanner from '../../components/common/PageBanner';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCollection } from '../../hooks/useFirestore';
import { FiSearch, FiUsers, FiUser, FiPhone, FiChevronDown, FiChevronUp } from 'react-icons/fi';

function MemberRow({ member, index }) {
  const [showMore, setShowMore] = useState(false);

  const age = member.dateOfBirth
    ? Math.floor((new Date() - new Date(member.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
    : '-';

  return (
    <>
      <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
        <td className="border border-gray-200 p-2 text-center">{index + 1}</td>
        <td className="border border-gray-200 p-2 font-medium whitespace-nowrap">{member.name || '-'}</td>
        <td className="border border-gray-200 p-2 text-center">{age}</td>
        <td className="border border-gray-200 p-2 whitespace-nowrap">{member.baptismName || '-'}</td>
        <td className="border border-gray-200 p-2">{member.relationship || '-'}</td>
        <td className="border border-gray-200 p-2">{member.gender || '-'}</td>
        <td className="border border-gray-200 p-2">{member.occupation || '-'}</td>
        <td className="border border-gray-200 p-2">{member.workLocation || '-'}</td>
        <td className="border border-gray-200 p-2 whitespace-nowrap">{member.mobile || '-'}</td>
        <td className="border border-gray-200 p-2 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-primary-500 hover:text-primary-600 p-1"
            aria-label="View more details"
          >
            {showMore ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </button>
        </td>
      </tr>
      {showMore && (
        <tr className="bg-blue-50/50">
          <td colSpan={10} className="border border-gray-200 p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
              <div>
                <p className="text-gray-400 font-medium">Date of Birth</p>
                <p className="text-gray-800">{member.dateOfBirth || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Baptism Date</p>
                <p className="text-gray-800">{member.baptismDate || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Marriage Date</p>
                <p className="text-gray-800">{member.marriageDate || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Blood Group</p>
                <p className="text-gray-800">{member.bloodGroup || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Email</p>
                <p className="text-gray-800">{member.email || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">House Name (Origin)</p>
                <p className="text-gray-800">{member.originHouseName || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Parish (Origin)</p>
                <p className="text-gray-800">{member.originParish || '-'}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('familyName');
  const [selectedFamily, setSelectedFamily] = useState(null);

  const { documents: families, loading: familiesLoading } = useCollection(
    'families',
    { orderBy: 'familyName', orderDir: 'asc' }
  );

  const { documents: members } = useCollection('members');

  // Clear selectedFamily if it no longer exists (e.g., deleted by admin)
  useEffect(() => {
    if (selectedFamily && families.length > 0) {
      const stillExists = families.find((f) => f.id === selectedFamily.id);
      if (!stillExists) {
        setSelectedFamily(null);
      }
    }
  }, [families, selectedFamily]);

  const filteredFamilies = useMemo(() => {
    if (!searchTerm.trim()) return families;

    const term = searchTerm.toLowerCase();
    return families.filter((family) => {
      switch (searchField) {
        case 'familyName':
          return family.familyName?.toLowerCase().includes(term);
        case 'houseName':
          return family.houseName?.toLowerCase().includes(term);
        case 'ward':
          return family.ward?.toLowerCase().includes(term);
        case 'phone':
          return family.phone?.includes(term);
        case 'memberName':
          return members.some(
            (m) =>
              m.familyId === family.id &&
              m.name?.toLowerCase().includes(term)
          );
        default:
          return true;
      }
    });
  }, [families, members, searchTerm, searchField]);

  const familyMembers = useMemo(() => {
    if (!selectedFamily) return [];
    return members.filter((m) => m.familyId === selectedFamily.id);
  }, [members, selectedFamily]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 opacity-20"
        style={{ backgroundImage: "url('/directory-bg.jpg')" }}
      />

      <PageBanner
        title="Parish Directory"
        subtitle="Family directory for registered parish members"
      />

      <section className="container-section">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="card p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
                aria-label="Search field"
              >
                <option value="familyName">Family Name</option>
                <option value="houseName">House Name</option>
                <option value="memberName">Member Name</option>
                <option value="ward">Ward</option>
                <option value="phone">Phone Number</option>
              </select>
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search by ${searchField.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              {filteredFamilies.length} families found
            </p>
          </div>
        </div>

        {familiesLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-6xl mx-auto">
            {selectedFamily ? (
              /* Family Detail View - Table Format */
              <div>
                <button
                  onClick={() => setSelectedFamily(null)}
                  className="text-primary-500 hover:text-primary-600 text-sm mb-6 flex items-center"
                >
                  ← Back to Directory
                </button>

                <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden">
                  {/* Family Header - Values only, comma separated */}
                  <div className="bg-primary-500 text-white p-4 text-center">
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                      {selectedFamily.familyNo || '-'}
                      {'. '}
                      {selectedFamily.familyName}
                      {', '}
                      {familyMembers.find((m) => m.relationship === 'Head')?.name || '-'}
                      {', '}
                      {selectedFamily.address || '-'}
                      {' - '}
                      {selectedFamily.pinCode || '-'}
                      {', '}
                      {familyMembers.find((m) => m.relationship === 'Head')?.mobile || selectedFamily.phone || '-'}
                      {', '}
                      {'Ward ' + (selectedFamily.ward || '-')}
                    </p>
                  </div>

                  {/* Members Table */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-primary-600 mb-3">
                      Family Members ({familyMembers.length})
                    </h3>
                    {familyMembers.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50 text-gray-600">
                              <th className="border border-gray-200 p-2 text-left font-semibold">Sl.</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Name</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Age</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Baptism Name</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Relationship</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Gender</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Occupation</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Work Location</th>
                              <th className="border border-gray-200 p-2 text-left font-semibold">Phone</th>
                              <th className="border border-gray-200 p-2 text-center font-semibold">More</th>
                            </tr>
                          </thead>
                          <tbody>
                            {familyMembers.map((member, index) => (
                              <MemberRow key={member.id} member={member} index={index} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm py-4 text-center">
                        No members listed for this family.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Family List View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFamilies.map((family) => {
                  const head = members.find((m) => m.familyId === family.id && m.relationship === 'Head');
                  return (
                    <div
                      key={family.id}
                      onClick={() => setSelectedFamily(family)}
                      className="relative cursor-pointer rounded-2xl p-5 border-2 border-primary-200 hover:border-gold-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      }}
                    >
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-gold-400 to-primary-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-sm font-bold text-white">
                            {family.familyNo || '-'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-primary-600 truncate text-[15px]">
                            {family.familyName}
                          </h3>
                          {head && (
                            <p className="text-sm text-gray-600 mt-0.5 truncate">
                              {head.name}
                            </p>
                          )}
                          {family.ward && (
                            <span className="inline-block mt-2 text-xs font-semibold text-primary-500 bg-primary-50 px-2.5 py-0.5 rounded-full">
                              Ward {family.ward}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredFamilies.length === 0 && !familiesLoading && (
              <div className="text-center py-12">
                <FiSearch size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No families match your search.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
