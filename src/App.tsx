import { useState } from 'react';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import {
  COLLEGE_INFO,
  COURSE_PROGRAMS,
  CourseProgram,
  INSTITUTIONAL_SNAPSHOT,
} from './data/collegeData';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailModal } from './components/CourseDetailModal';
import { FeeStructureSection } from './components/FeeStructureSection';
import { CampusAndPlacements } from './components/CampusAndPlacements';
import { FacultyAndHelpDeskModule } from './components/FacultyAndHelpDeskModule';
import { AdmissionsSection } from './components/AdmissionsSection';

const SNAPSHOT_ACCENTS = [
  { border: 'border-t-[#1D4ED8]', text: 'text-[#1D4ED8]' },
  { border: 'border-t-[#B91C1C]', text: 'text-[#B91C1C]' },
  { border: 'border-t-[#EAB308]', text: 'text-[#A16207]' },
  { border: 'border-t-[#6D28D9]', text: 'text-[#6D28D9]' },
];

export default function App() {
  const [activeCourseModal, setActiveCourseModal] = useState<CourseProgram | null>(null);
  const [estimatorCourseId, setEstimatorCourseId] = useState<string>(COURSE_PROGRAMS[0].id);
  const [inquiryCourseId, setInquiryCourseId] = useState<string>(COURSE_PROGRAMS[0].id);
  const [inquiryHostel, setInquiryHostel] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEstimateCourseFee = (courseId: string) => {
    setEstimatorCourseId(courseId);
    scrollToSection('fee-estimator');
  };

  const handleApplyForCourse = (courseId: string, hostelNeeded = false) => {
    setInquiryCourseId(courseId);
    setInquiryHostel(hostelNeeded);
    scrollToSection('admissions');
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Header onApplyClick={() => scrollToSection('admissions')} />

      <main className="flex-1">
        {/* Institutional Hero & Operational Utility Ribbon */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-[#F5F3FF]/60 via-white to-white">
          {/* Operational Utility Strip (Yellow-Gold Ribbon) */}
          <div className="bg-[#FEF9C3] border-b border-[#FDE047]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 text-xs text-[#713F12]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-[#B91C1C]">
                  Admissions Open: 2026–27 Cycle
                </span>
                <span aria-hidden="true">·</span>
                <span>{COLLEGE_INFO.accreditation}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono tabular-nums">
                <span>Campus Visiting: {COLLEGE_INFO.visitingHours}</span>
                <span aria-hidden="true">·</span>
                <span>Helpline: {COLLEGE_INFO.admissionsPhone}</span>
              </div>
            </div>
          </div>

          {/* 2-Column Hero Split */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#B91C1C]">
                    {COLLEGE_INFO.fullTitle} · Est. {COLLEGE_INFO.estYear}
                  </p>
                  <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-[#1E1B4B] tracking-tight leading-[1.12]">
                    Rigorous Scholarship for Tomorrow’s Builders & Thinkers
                  </h1>
                  <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                    An autonomous Coimbatore institution uniting engineering, computational sciences, commerce, and management—backed by transparent fees, merit waivers up to 50%, and research-led laboratories.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('programs')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#0745df] hover:bg-[#1E40AF] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0745df] focus-visible:ring-offset-2"
                  >
                    <span>Explore Academic Programs</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#fees"
                    className="px-4 py-3 text-sm font-semibold text-[#6D28D9] hover:text-[#4C1D95] underline underline-offset-4 decoration-[#EAB308] decoration-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    View 2026–27 Fee Schedule
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col">
                <div className="w-full h-full min-h-[280px] lg:min-h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src="/assets/aistudio/images_e974b30d.jpg"
                    alt="Sri Krishna College academic building with terracotta-tiled roof and landscaped green courtyard lawn"
                    title="Sri Krishna College Main Campus"
                    className="w-full h-full lg:h-full object-cover"
                  />
                </div>
                <p className="mt-2.5 text-xs font-serif italic text-slate-500">
                  Main Academic Quadrangle, Kuniyamuthur Campus — Coimbatore
                </p>
              </div>
            </div>

            {/* Full-Width 4-Column Institutional Snapshot Strip */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {INSTITUTIONAL_SNAPSHOT.map((stat, idx) => {
                const accent = SNAPSHOT_ACCENTS[idx % SNAPSHOT_ACCENTS.length];
                return (
                  <div
                    key={stat.label}
                    className={`pt-4 border-t-2 ${accent.border}`}
                  >
                    <p
                      className={`font-mono text-2xl sm:text-3xl font-semibold tabular-nums ${accent.text}`}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {stat.label}
                    </p>
                    <p className="text-xs text-slate-500">{stat.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course Catalog & Interactive Explorer */}
        <CourseCatalog
          onSelectCourse={(course) => setActiveCourseModal(course)}
          onEstimateCourseFee={handleEstimateCourseFee}
        />

        {/* Transparent Fee Structure & Cost Calculator */}
        <FeeStructureSection
          selectedCourseId={estimatorCourseId}
          onSelectCourseId={setEstimatorCourseId}
          onProceedToApply={(courseId, hostelNeeded) =>
            handleApplyForCourse(courseId, hostelNeeded)
          }
        />

        {/* Campus Facilities, Photo Gallery & Placements Proof */}
        <CampusAndPlacements />

        {/* Faculty Directory, Contact & Student Help Desk Module */}
        <FacultyAndHelpDeskModule />

        {/* Admissions Timeline, Checklist & Application Inquiry */}
        <AdmissionsSection
          preselectedCourseId={inquiryCourseId}
          preselectedHostel={inquiryHostel}
        />
      </main>

      {/* Imperial Purple Institutional Footer */}
      <footer className="bg-[#2E1065] text-[#EDE9FE]">
        <div className="grid grid-cols-4 h-1 w-full" aria-hidden="true">
          <div className="bg-[#1D4ED8]" />
          <div className="bg-[#B91C1C]" />
          <div className="bg-[#EAB308]" />
          <div className="bg-[#7C3AED]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#4C1D95]">
            <div className="md:col-span-5 space-y-3">
              <p className="font-serif text-xl font-semibold text-white">
                {COLLEGE_INFO.name}
              </p>
              <p className="text-sm text-[#DDD6FE] leading-relaxed max-w-md">
                {COLLEGE_INFO.fullTitle}. {COLLEGE_INFO.accreditation}.
              </p>
              <div className="pt-2 space-y-2 text-sm text-[#DDD6FE]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#FACC15] shrink-0" aria-hidden="true" />
                  <span>{COLLEGE_INFO.address}</span>
                </p>
                <p className="flex items-center gap-2.5 font-mono text-xs tabular-nums">
                  <Phone className="w-4 h-4 text-[#FACC15] shrink-0" aria-hidden="true" />
                  <span>Admissions: {COLLEGE_INFO.admissionsPhone} · Office: {COLLEGE_INFO.generalPhone}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FACC15] shrink-0" aria-hidden="true" />
                  <span>{COLLEGE_INFO.email}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FACC15] shrink-0" aria-hidden="true" />
                  <span>{COLLEGE_INFO.visitingHours}</span>
                </p>
              </div>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#FACC15]">
                Academic Directory
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#DDD6FE]">
                <li>
                  <a href="#programs" className="hover:text-white transition-colors">
                    Undergraduate & PG Courses
                  </a>
                </li>
                <li>
                  <a href="#fees" className="hover:text-white transition-colors">
                    2026–27 Fee Schedule
                  </a>
                </li>
                <li>
                  <a href="#fee-estimator" className="hover:text-white transition-colors">
                    Scholarship & Fee Calculator
                  </a>
                </li>
                <li>
                  <a href="#campus" className="hover:text-white transition-colors">
                    Library, Labs & Hostels
                  </a>
                </li>
                <li>
                  <a href="#placements" className="hover:text-white transition-colors">
                    Placement Audit & Recruiters
                  </a>
                </li>
                <li>
                  <a href="#faculty" className="hover:text-white transition-colors">
                    Faculty Directory & Mentors
                  </a>
                </li>
                <li>
                  <a href="#contact-helpdesk" className="hover:text-white transition-colors">
                    Help Desk & Campus Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#FACC15]">
                Statutory Disclosures & Governance
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-[#DDD6FE] leading-relaxed">
                <li>UGC Autonomous Status · Affiliated to Anna University & Bharathiar University (stream-wise)</li>
                <li>Mandatory Anti-Ragging Helpline (24/7): <span className="font-mono text-white">1800-180-5522</span></li>
                <li>Internal Complaints Committee & SC/ST Grievance Redressal Cell active on campus</li>
                <li>NIRF 2025 Institutional Data & IQAC Annual Quality Assurance Reports archived at Registrar Office</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C4B5FD]">
            <p>© {new Date().getFullYear()} Sri Krishna College. All academic rights reserved.</p>
            <p>Kuniyamuthur, Coimbatore · Tamil Nadu</p>
          </div>
        </div>
      </footer>

      {/* Program Syllabus & Details Modal */}
      <CourseDetailModal
        course={activeCourseModal}
        onClose={() => setActiveCourseModal(null)}
        onApplyForCourse={(courseId) => handleApplyForCourse(courseId, false)}
        onEstimateCourseFee={handleEstimateCourseFee}
      />
    </div>
  );
}
