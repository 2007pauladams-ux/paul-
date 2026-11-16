import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { CourseProgram } from '../data/collegeData';
import { formatINR, getAnnualAcademicTotal } from '../utils/formatters';

interface CourseDetailModalProps {
  course: CourseProgram | null;
  onClose: () => void;
  onApplyForCourse: (courseId: string) => void;
  onEstimateCourseFee: (courseId: string) => void;
}

export function CourseDetailModal({
  course,
  onClose,
  onApplyForCourse,
  onEstimateCourseFee,
}: CourseDetailModalProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  useEffect(() => {
    setActivePhaseIndex(0);
  }, [course?.id]);

  useEffect(() => {
    if (!course) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, onClose]);

  if (!course) return null;

  const annualTotal = getAnnualAcademicTotal(
    course.tuitionFeePerYear,
    course.labAcademicFeePerYear,
    course.examFeePerYear
  );
  const activePhase = course.curriculum[activePhaseIndex] ?? course.curriculum[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E1B4B]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
              <span className="font-semibold text-[#B91C1C]">{course.code}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#6D28D9] font-medium">{course.stream}</span>
              <span aria-hidden="true">·</span>
              <span>{course.accreditation}</span>
            </div>
            <h3
              id="course-modal-title"
              className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-900"
            >
              {course.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close program details"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview */}
          <div>
            <p className="text-base text-slate-700 leading-relaxed">{course.overview}</p>
          </div>

          {/* Admission & Academic Specifications Grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-5 border-y border-slate-200 text-sm">
            <div>
              <dt className="text-xs text-slate-500">Duration & Intake</dt>
              <dd className="mt-1 font-medium text-slate-900 tabular-nums">
                {course.durationYears} Years ({course.semesters} Semesters) · {course.intake} Approved Seats
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Selection Mode</dt>
              <dd className="mt-1 font-medium text-slate-900">{course.admissionMode}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-slate-500">Academic Eligibility</dt>
              <dd className="mt-1 font-medium text-slate-900">{course.eligibility}</dd>
            </div>
          </dl>

          {/* Annual Fee Breakdown */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-slate-900">
              2026–27 Annual Academic Fee Breakdown
            </h4>
            <div className="mt-3 border border-slate-200 rounded-md overflow-hidden bg-slate-50">
              <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-700">Annual Tuition Fee</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-900">
                      {formatINR(course.tuitionFeePerYear)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700">
                      Laboratory, Computing & Library Resource Fee
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-900">
                      {formatINR(course.labAcademicFeePerYear)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700">
                      Autonomous Examination & Assessment Fee
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-900">
                      {formatINR(course.examFeePerYear)}
                    </td>
                  </tr>
                  <tr className="bg-[#EFF6FF]">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      Total Annual Academic Fee (Per Year)
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums text-[#1D4ED8]">
                      {formatINR(annualTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              One-time refundable caution deposit of ₹10,000 applies at admission. Hostel and transport are optional.
            </p>
          </div>

          {/* Interactive Semester Curriculum */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-slate-900">
              Curriculum Structure
            </h4>
            <div
              role="tablist"
              aria-label="Curriculum semester phases"
              className="mt-3 flex flex-wrap gap-2"
            >
              {course.curriculum.map((phase, idx) => (
                <button
                  key={phase.phaseLabel}
                  type="button"
                  role="tab"
                  aria-selected={activePhaseIndex === idx}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activePhaseIndex === idx
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                      : 'bg-slate-50 text-slate-600 border-slate-300 hover:text-[#6D28D9]'
                  }`}
                >
                  {phase.phaseLabel}
                </button>
              ))}
            </div>

            {activePhase && (
              <div className="mt-3 p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                  {activePhase.focus}
                </p>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-900">
                  {activePhase.subjects.map((subject, idx) => (
                    <li key={subject} className="flex items-baseline gap-2">
                      <span className="font-mono text-xs font-semibold text-[#6D28D9] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Labs & Career Paths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Dedicated Department Laboratories
              </h4>
              <ul className="mt-2.5 space-y-1.5 text-sm text-slate-600">
                {course.labs.map((lab) => (
                  <li key={lab} className="flex items-start gap-2">
                    <span className="text-[#B91C1C] font-bold" aria-hidden="true">
                      –
                    </span>
                    <span>{lab}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Graduate Career Pathways
              </h4>
              <ul className="mt-2.5 space-y-1.5 text-sm text-slate-600">
                {course.careerPaths.map((role) => (
                  <li key={role} className="flex items-start gap-2">
                    <span className="text-[#1D4ED8] font-bold" aria-hidden="true">
                      –
                    </span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onEstimateCourseFee(course.id);
            }}
            className="px-4 py-2 text-sm font-semibold text-slate-900 bg-[#FEF9C3] border border-[#FACC15] hover:bg-[#FEF08A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open in Fee Estimator
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onApplyForCourse(course.id);
            }}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Apply for {course.shortName}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
