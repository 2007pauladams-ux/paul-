import { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import {
  AcademicStream,
  COURSE_PROGRAMS,
  CourseProgram,
  DegreeLevel,
} from '../data/collegeData';
import { formatINR, getAnnualAcademicTotal } from '../utils/formatters';

interface CourseCatalogProps {
  onSelectCourse: (course: CourseProgram) => void;
  onEstimateCourseFee: (courseId: string) => void;
}

const STREAM_FILTERS: ('All' | AcademicStream)[] = [
  'All',
  'Engineering & Computing',
  'Sciences & Humanities',
  'Commerce & Management',
];

function getStreamAccentClass(stream: AcademicStream): string {
  switch (stream) {
    case 'Engineering & Computing':
      return 'text-[#1D4ED8]';
    case 'Sciences & Humanities':
      return 'text-[#6D28D9]';
    case 'Commerce & Management':
      return 'text-[#B91C1C]';
  }
}

export function CourseCatalog({
  onSelectCourse,
  onEstimateCourseFee,
}: CourseCatalogProps) {
  const [levelFilter, setLevelFilter] = useState<'ALL' | DegreeLevel>('ALL');
  const [streamFilter, setStreamFilter] = useState<'All' | AcademicStream>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COURSE_PROGRAMS.filter((course) => {
      if (levelFilter !== 'ALL' && course.level !== levelFilter) return false;
      if (streamFilter !== 'All' && course.stream !== streamFilter) return false;
      if (q) {
        const searchable = `${course.name} ${course.shortName} ${course.code} ${course.stream} ${course.overview}`.toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [levelFilter, streamFilter, searchQuery]);

  const handleReset = () => {
    setLevelFilter('ALL');
    setStreamFilter('All');
    setSearchQuery('');
  };

  return (
    <section id="programs" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6D28D9] mb-2">
              Academic Catalog · 2026–27
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Undergraduate & Postgraduate Courses
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Autonomous credit-based curricula designed with industry research partners, mandatory laboratory immersion, and full-semester corporate residencies.
            </p>
          </div>
          <p className="text-sm text-[#1D4ED8] font-mono font-medium tabular-nums whitespace-nowrap shrink-0">
            Showing {filteredCourses.length} of {COURSE_PROGRAMS.length} programs
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            {/* Degree Level Segmented Control */}
            <div
              role="group"
              aria-label="Filter by degree level"
              className="inline-flex items-center p-1 bg-[#F5F3FF] rounded-md border border-[#DDD6FE]"
            >
              {(
                [
                  { value: 'ALL', label: 'All Levels' },
                  { value: 'UG', label: 'Undergraduate' },
                  { value: 'PG', label: 'Postgraduate' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setLevelFilter(tab.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    levelFilter === tab.value
                      ? 'bg-[#6D28D9] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#6D28D9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Stream Filter Buttons */}
            <div
              role="group"
              aria-label="Filter by academic school"
              className="flex flex-wrap items-center gap-1.5"
            >
              {STREAM_FILTERS.map((stream) => (
                <button
                  key={stream}
                  type="button"
                  onClick={() => setStreamFilter(stream)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    streamFilter === stream
                      ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                  }`}
                >
                  {stream === 'All' ? 'All Schools' : stream}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course, code, or field..."
              aria-label="Search courses"
              className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 border border-slate-200 rounded-lg mt-8 px-6">
            <p className="font-serif text-xl text-slate-900">
              No matching academic programs found
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Try clearing your search keyword or switching to All Levels.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {filteredCourses.map((course) => {
              const annualTotal = getAnnualAcademicTotal(
                course.tuitionFeePerYear,
                course.labAcademicFeePerYear,
                course.examFeePerYear
              );

              return (
                <article
                  key={course.id}
                  className="bg-[#FAFAFF] border border-slate-200 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150 hover:border-[#6D28D9]/50"
                >
                  <div>
                    {/* Clean Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-mono tabular-nums">
                      <span className="font-semibold text-[#B91C1C]">{course.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.level === 'UG' ? 'Undergraduate' : 'Postgraduate'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.durationYears} Years ({course.semesters} Semesters)</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.intake} Seats</span>
                    </div>

                    <h3 className="mt-3 font-serif text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
                      {course.name}
                    </h3>

                    <p className={`mt-1.5 text-xs font-semibold ${getStreamAccentClass(course.stream)}`}>
                      {course.stream} · {course.accreditation}
                    </p>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {course.overview}
                    </p>

                    {/* Structured Key Specs */}
                    <dl className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <dt className="text-xs text-slate-500">Total Annual Fee</dt>
                        <dd className="mt-0.5 font-mono font-semibold text-[#1D4ED8] tabular-nums">
                          {formatINR(annualTotal)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500">Median Package</dt>
                        <dd className="mt-0.5 font-mono font-semibold text-[#6D28D9] tabular-nums">
                          {course.medianPackage}
                        </dd>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <dt className="text-xs text-slate-500">Placement Rate</dt>
                        <dd className="mt-0.5 font-mono font-semibold text-[#B91C1C] tabular-nums">
                          {course.placementRate}
                        </dd>
                      </div>
                    </dl>

                    <p className="mt-4 text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">Eligibility:</span>{' '}
                      {course.eligibility}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-sm py-1"
                    >
                      <span>View Syllabus & Details</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEstimateCourseFee(course.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-[#FEF9C3] border border-[#FACC15] hover:bg-[#FEF08A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Calculate Total Fee
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
