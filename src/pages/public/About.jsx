import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';

export default function About() {
  return (
    <div>
      <PageBanner
        title="About Our Parish"
        subtitle="Discover the rich history and vibrant community of St. Mathew's Knanaya Catholic Church"
      />

      {/* Parish History in Malayalam */}
      <section className="container-section">
        <SectionHeader
          title="ഇടവക ചരിത്രം"
          subtitle="Parish History"
        />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Image */}
            <div className="hidden lg:flex flex-col items-center flex-shrink-0 sticky top-28">
              <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gold-300 shadow-lg">
                <img
                  src="/patron-saint.jpg"
                  alt="Patron Saint"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-card p-8 md:p-10 border border-gray-100/50">
                <p className="text-gray-700 leading-[2] text-base md:text-lg mb-6" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  സുവിശേഷകനും അപ്പസ്‌തോലനുമായ വി.മത്തായി ശ്ലീഹായുടെ നാമത്തില്‍ കോട്ടയം അതിരൂപതയിലുള്ള ഏക ദൈവാലയമാണ്‌ വാകത്താനം സെന്റ്‌ മാത്യൂസ്‌ ക്‌നാനായ കത്തോലിക്കാപള്ളി. 1910 സെപ്‌റ്റംബര്‍ 21-ാം തീയതി വി. മത്തായി ശ്ലീഹായുടെ തിരുനാള്‍ ദിനത്തില്‍ ദൈവദാസനായ മാര്‍ മാത്യു മാക്കീല്‍ പിതാവ്‌ ഈ ദൈവാലയം കൂദാശ ചെയ്‌തു.
                </p>
                <p className="text-gray-700 leading-[2] text-base md:text-lg mb-6" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  ഇടയ്‌ക്കാട്ടുപള്ളിയിലും തുടര്‍ന്ന്‌ പാച്ചിറപള്ളിയിലും അംഗങ്ങളായിരുന്ന 15 ഓളം കുടുംബങ്ങളാണ്‌ വാകത്താനത്തെ ആദ്യ ഇടവകാംഗങ്ങള്‍. പാച്ചിറപള്ളി വികാര്‍ ഇന്‍ചാര്‍ജായിരുന്ന മാത്യു വട്ടക്കളത്തില്‍ അച്ചനാണ്‌ ഈ ദൈവാലയത്തിന്റെ പ്രഥമ വികാരി.
                </p>
                <p className="text-gray-700 leading-[2] text-base md:text-lg mb-6" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  1910-ല്‍ ഒരു ഓലമേഞ്ഞ ഷെഡില്‍ തുടങ്ങിയ ദൈവാലയം 1916-ല്‍ മാത്യു വട്ടക്കളത്തിലച്ചന്റെ നേത്യത്വത്തില്‍ പുതുക്കിപ്പണിയാന്‍ ആരംഭിച്ചു. എന്നാല്‍ വട്ടക്കളത്തിലച്ചന്റെ അകാല നിര്യാണത്തെ തുടര്‍ന്ന്‌ 1917-ല്‍ ചാക്കോ ഒട്ടക്കാട്ടില്‍ അച്ചന്റെ നേത്യത്വത്തില്‍ പണികള്‍ പൂര്‍ത്തീകരിച്ചു.
                </p>
                <p className="text-gray-700 leading-[2] text-base md:text-lg mb-6" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  എന്നാല്‍ വാകത്താനത്തെ ആളുകളുടെ ആത്മീയ ആവശ്യങ്ങള്‍ക്ക്‌ ഈ ദൈവാലയം പോരായ്‌കയാണെന്ന്‌ തോന്നുകയാലും സ്വന്തമായി ദൈവാലയം നിര്‍മ്മിക്കുവാനുള്ള സാമ്പത്തികവും ഭൗതികവുമായ സാഹചര്യം ഇവിടുത്തെ പാവപ്പെട്ട ഇടവകാംഗങ്ങള്‍ക്ക്‌ ഇല്ലായ്‌കയാലും അഭിവന്ദ്യ ചൂളപ്പറമ്പില്‍ പിതാവിന്റെ പ്രത്യേക താത്‌പര്യത്താല്‍ 1921-1922 വര്‍ഷത്തില്‍ ദൈവാലയം വീണ്ടും വിപുലീകരിച്ച്‌ നിര്‍മ്മിച്ചു. ഈ ദൈവാലയത്തില്‍ 68 വര്‍ഷത്തോളം ആത്മീയ ശുശ്രൂഷകള്‍ നടത്തി.
                </p>
                <p className="text-gray-700 leading-[2] text-base md:text-lg mb-6" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  ദൈവാലയത്തിന്റെ ജീര്‍ണ്ണതയും സ്ഥലപരിമിതിയും മൂലം പുതിയ ദൈവാലയം നിര്‍മ്മിക്കാന്‍ തീരുമാനിച്ചു. വികാരി ഫാ. മാത്യു ഇളപ്പാനിക്കലിന്റെ നേത്യത്വത്തില്‍ പുതിയ ദൈവാലയം നിര്‍മ്മിച്ച്‌ 1989 ഓഗസ്‌റ്‌റ്‌ 15-ാം തീയതി അഭിവന്ദ്യ മാര്‍ കുര്യാക്കോസ്‌ കുന്നശ്ശേരി പിതാവ്‌ കൂദാശ ചെയ്‌ത്‌ ദൈവത്തിന്‌ പ്രതിഷ്‌ഠിച്ചു.
                </p>
                <p className="text-gray-700 leading-[2] text-base md:text-lg mb-6" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  ഇപ്പോള്‍ ഈ ഇടവകയില്‍ 157 കുടുംബങ്ങളും 709 അംഗങ്ങളുമുണ്ട്‌. 2009-2010 വര്‍ഷത്തില്‍ ദൈവാലയത്തിന്റെ ശതാബ്‌ദി ആഘോഷിച്ചു. ശതാബ്‌ദി സ്‌മാരകമായി, പ്രഥമ വികാരിയായിരുന്ന ഫാ. മാത്യു വട്ടക്കളത്തിന്റെ പേരില്‍ ഒരു മതബോധനഹാള്‍ നിര്‍മ്മിക്കുകയും 2010 ഡിസംബര്‍ 30-ാം അഭി. മാത്യു മൂലക്കാട്ട്‌ മെത്രാപ്പോലീത്ത വെഞ്ചരിക്കുകയും ചെയ്‌തു.
                </p>
                <p className="text-gray-700 leading-[2] text-base md:text-lg" style={{ fontFamily: "'Noto Sans Malayalam', sans-serif" }}>
                  സെപ്‌റ്റംബര്‍ 21-ാം തീയതി വി. മത്തായി ശ്ലീഹായുടെ തിരുനാള്‍ കഴിഞ്ഞുവരുന്ന ഞായറാഴ്‌ച, ഈ ദൈവാലയത്തിന്റെ സ്ഥാപനത്തിരുനാളായും ജനുവരി 20 നു ശേഷം വരുന്ന ഞായറാഴ്‌ച പ്രധാനതിരുനാളായും (വി.സെബസ്‌ത്യാനോസ്‌) ആചരിക്കുന്നു.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex flex-col items-center flex-shrink-0 sticky top-28">
              <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gold-300 shadow-lg">
                <img
                  src="/church-altar.jpg"
                  alt="Church Altar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile: Show images in a row */}
          <div className="flex lg:hidden justify-center gap-6 mt-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold-300 shadow-lg">
              <img src="/patron-saint.jpg" alt="Patron Saint" className="w-full h-full object-cover" />
            </div>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gold-300 shadow-lg">
              <img src="/church-altar.jpg" alt="Church Altar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline History in English */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Key Milestones"
            subtitle="A timeline of our parish journey through the decades"
          />
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-8 border-l-2 border-gold-200 space-y-8">
              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-gold-400 border-4 border-gold-100" />
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <span className="badge-gold mb-3">1910</span>
                  <h3 className="font-heading font-bold text-primary-600 text-lg mb-2">
                    Church Established
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Consecrated on September 21, 1910 — the Feast of St. Matthew — by the
                    Servant of God Mar Mathew Makil. About 15 families from Edaykattupally
                    and Pachira formed the first parish community. Fr. Mathew Vattakkallathil
                    served as the first Vicar.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-gold-400 border-4 border-gold-100" />
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <span className="badge-gold mb-3">1916–1922</span>
                  <h3 className="font-heading font-bold text-primary-600 text-lg mb-2">
                    Early Construction
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    The original thatched-roof shed was rebuilt starting in 1916. After Fr. Vattakkallathil&apos;s
                    untimely death, the work was completed in 1917 under Fr. Chacko Ottakkatil. The church
                    was further expanded in 1921-22 through the initiative of Bishop Choolaparambil.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-gold-400 border-4 border-gold-100" />
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <span className="badge-gold mb-3">1989</span>
                  <h3 className="font-heading font-bold text-primary-600 text-lg mb-2">
                    New Church Consecrated
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    After 68 years of service in the old church, a new church was built under
                    the leadership of Fr. Mathew Ilappanikal and consecrated on August 15, 1989
                    by Mar Kuriakose Kunnassery.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-gold-400 border-4 border-gold-100" />
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <span className="badge-gold mb-3">2009–2010</span>
                  <h3 className="font-heading font-bold text-primary-600 text-lg mb-2">
                    Centenary Celebrations
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    The parish celebrated its centenary. A catechism hall was built as a centenary
                    memorial in the name of the first Vicar Fr. Mathew Vattakkallathil, blessed by
                    Archbishop Mathew Moolakkatt on December 30, 2010.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary-400 border-4 border-primary-100" />
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <span className="badge-primary mb-3">Present</span>
                  <h3 className="font-heading font-bold text-primary-600 text-lg mb-2">
                    A Thriving Community
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Today the parish has 157 families and 709 members. The feast of
                    St. Matthew (establishment feast) is celebrated on the Sunday following
                    September 21, and the main feast (St. Sebastian) on the Sunday after January 20.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patron Saint */}
      <section className="container-section">
        <SectionHeader
          title="Our Patron Saint"
          subtitle="St. Matthew the Apostle — Author of the First Gospel"
        />
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-ivory-100 to-ivory-200 rounded-3xl p-8 md:p-10 border border-ivory-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-gold-100 to-gold-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-soft">
                <span className="text-5xl md:text-6xl">📖</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-heading font-bold text-primary-600 mb-4">
                  St. Matthew the Apostle
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  St. Matthew, also known as Levi, was one of the twelve
                  apostles of Jesus Christ. Originally a tax collector, he was
                  called by Jesus to follow Him and went on to author the
                  first Gospel in the New Testament.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  His feast day is celebrated on <span className="font-semibold text-primary-600">September 21st</span>.
                  Our parish celebrates this occasion with great devotion every year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diocese Info */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Archeparchy of Kottayam"
            subtitle="Our diocese and ecclesiastical heritage"
          />
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed text-center mb-10 text-lg">
              St. Mathew&apos;s Church belongs to the Archeparchy of Kottayam, the
              metropolitan see of the Knanaya Catholic community, serving the
              spiritual needs of the faithful in Kerala and beyond.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Diocese', value: 'Archeparchy of Kottayam', icon: '🏛️' },
                { label: 'Rite', value: 'Syro-Malabar Catholic', icon: '⛪' },
                { label: 'Established', value: '1910', icon: '📅' },
                { label: 'Parish Size', value: '157 Families', icon: '👨‍👩‍👧‍👦' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-card"
                >
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="font-heading font-bold text-primary-600 text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23fff%22%3E%3Cpath d=%22M19 0v20h2V0h-2zm0 20v20h2V20h-2zM0 19h20v2H0v-2zm20 0h20v2H20v-2z%22/%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            title="Our Purpose"
            subtitle="Guided by faith, driven by love"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-gold-400/30 flex items-center justify-center mb-5">
                <span className="text-gold-300 text-lg">🎯</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gold-200 mb-4">
                Our Mission
              </h3>
              <p className="text-white/90 leading-relaxed">
                To nurture and strengthen the faith of our parish community
                through worship, catechesis, and service, while preserving the
                rich heritage of the Knanaya Catholic tradition and fostering
                unity among all families.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-gold-400/30 flex items-center justify-center mb-5">
                <span className="text-gold-300 text-lg">👁️</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-gold-200 mb-4">
                Our Vision
              </h3>
              <p className="text-white/90 leading-relaxed">
                To be a vibrant, faith-filled parish community that witnesses
                the love of Christ through active participation in the
                sacraments, charitable works, and building a strong bond of
                fellowship, guided by the Gospel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
