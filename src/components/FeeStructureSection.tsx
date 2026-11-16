import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import {
  COLLEGE_INFO,
  COURSE_PROGRAMS,
  DegreeLevel,
  HOSTEL_OPTIONS,
  SCHOLARSHIP_TIERS,
  TRANSPORT_OPTIONS,
} from '../data/collegeData';
import { formatINR, getAnnualAcademicTotal } from '../utils/formatters';

interface FeeStructureSectionProps {
  selectedCourseId: string;
  onSelectCourseId: (id: string) => void;
  onProceedToApply: (courseId: string, hostelNeeded: boolean) => void;
}

const SCHOLARSHIP_TOP_BORDERS = [
  'border-t-2 border-t-[#1D4ED8]',
  'border-t-2 border-t-[#B91C1C]',
  'border-t-2 border-t-[#EAB308]',
  'border-t-2 border-t-[#6D28D9]',
];

export function FeeStructureSection({
  selectedCourseId,
  onSelectCourseId,
  onProceedToApply,
}: FeeStructureSectionProps) {
  const [tableFilter, setTableFilter] = useState<'ALL' | DegreeLevel>('ALL');
  const [hostelId, setHostelId] = useState<string>('day-scholar');
  const [transportId, setTransportId] = useState<string>('none');
  const [scholarshipId, setScholarshipId] = useState<string>('none');

  const visiblePrograms = useMemo(() => {
    if (tableFilter === 'ALL') return COURSE_PROGRAMS;
    return COURSE_PROGRAMS.filter((c) => c.level === tableFilter);
  }, [tableFilter]);

  const selectedCourse =
    COURSE_PROGRAMS.find((c) => c.id === selectedCourseId) ?? COURSE_PROGRAMS[0];
  const selectedHostel =
    HOSTEL_OPTIONS.find((h) => h.id === hostelId) ?? HOSTEL_OPTIONS[0];
  const selectedTransport =
    TRANSPORT_OPTIONS.find((t) => t.id === transportId) ?? TRANSPORT_OPTIONS[0];
  const selectedScholarship =
    SCHOLARSHIP_TIERS.find((s) => s.id === scholarshipId) ?? SCHOLARSHIP_TIERS[0];

  const effectiveTransportFee =
    selectedHostel.annualFee > 0 ? 0 : selectedTransport.annualFee;

  const tuitionWaiverAmount = Math.round(
    (selectedCourse.tuitionFeePerYear * selectedScholarship.tuitionWaiverPercent) / 100
  );
  const netTuition = Math.max(
    0,
    selectedCourse.tuitionFeePerYear -
      tuitionWaiverAmount -
      selectedScholarship.flatAnnualGrant
  );
  const annualAcademicPayable =
    netTuition + selectedCourse.labAcademicFeePerYear + selectedCourse.examFeePerYear;
  const totalAnnualPayable =
    annualAcademicPayable + selectedHostel.annualFee + effectiveTransportFee;
  const firstYearWithDeposit = totalAnnualPayable + COLLEGE_INFO.cautionDeposit;
  const fullProgramEstimate =
    totalAnnualPayable * selectedCourse.durationYears + COLLEGE_INFO.cautionDeposit;

  const handleDownloadCSV = () => {
    const headers = [
      'Program Code',
      'Program Name',
      'Level',
      'Duration (Years)',
      'Annual Tuition (INR)',
      'Lab & Resource Fee (INR)',
      'Exam Fee (INR)',
      'Total Annual Academic Fee (INR)',
    ];
    const rows = COURSE_PROGRAMS.map((p) => {
      const total = getAnnualAcademicTotal(
        p.tuitionFeePerYear,
        p.labAcademicFeePerYear,
        p.examFeePerYear
      );
      return [
        p.code,
        `"${p.name}"`,
        p.level,
        p.durationYears,
        p.tuitionFeePerYear,
        p.labAcademicFeePerYear,
        p.examFeePerYear,
        total,
      ].join(',');
    });
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sri_Krishna_College_Fee_Schedule_2026_27.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="fees" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#B91C1C] mb-2">
              Transparent Financial Schedule · 2026–27
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Fee Structure & Scholarship Calculator
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every rupee disclosed upfront—no hidden development levies or undisclosed semester surcharges. Estimate your exact annual commitment after merit waivers and residential options.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-900 bg-[#FEF9C3] border border-[#FACC15] hover:bg-[#FEF08A] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#854D0E]" aria-hidden="true" />
            <span>Download Fee Schedule (CSV)</span>
          </button>
        </div>

        {/* Part 1: Complete Annual Fee Schedule Table */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="font-serif text-xl font-semibold text-slate-900">
              Official Annual Academic Fee Schedule
            </h3>
            <div
              role="group"
              aria-label="Filter fee table by degree level"
              className="inline-flex items-center p-1 bg-[#EFF6FF] rounded-md border border-[#BFDBFE]"
            >
              {(
                [
                  { value: 'ALL', label: 'All Programs' },
                  { value: 'UG', label: 'UG Programs' },
                  { value: 'PG', label: 'PG Programs' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setTableFilter(tab.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    tableFilter === tab.value
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#1D4ED8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200 bg-[#1E1B4B] text-xs font-medium text-[#FEF9C3] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Program & Code</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4 text-right">Tuition / Yr</th>
                  <th className="py-3.5 px-4 text-right">Lab & Library / Yr</th>
                  <th className="py-3.5 px-4 text-right">Exam Fee / Yr</th>
                  <th className="py-3.5 px-4 text-right">Total Academic / Yr</th>
                  <th className="py-3.5 px-4 text-right">Estimator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {visiblePrograms.map((prog) => {
                  const total = getAnnualAcademicTotal(
                    prog.tuitionFeePerYear,
                    prog.labAcademicFeePerYear,
                    prog.examFeePerYear
                  );
                  const isSelected = prog.id === selectedCourseId;
                  return (
                    <tr
                      key={prog.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-[#EFF6FF]' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{prog.name}</div>
                        <div className="text-xs text-[#6D28D9] font-mono">
                          {prog.code} · {prog.level}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 tabular-nums whitespace-nowrap">
                        {prog.durationYears} Years
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-900">
                        {formatINR(prog.tuitionFeePerYear)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-600">
                        {formatINR(prog.labAcademicFeePerYear)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-600">
                        {formatINR(prog.examFeePerYear)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold tabular-nums text-[#1D4ED8]">
                        {formatINR(total)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCourseId(prog.id);
                            document
                              .getElementById('fee-estimator')
                              ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                              : 'bg-white text-[#1D4ED8] border-slate-300 hover:border-[#1D4ED8]'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Estimate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5 text-xs text-slate-500">
            Note: Tuition fee may be paid in two equal semester installments (July & December). One-time refundable caution deposit: {formatINR(COLLEGE_INFO.cautionDeposit)}.
          </p>
        </div>

        {/* Part 2: Interactive Cost & Scholarship Estimator */}
        <div
          id="fee-estimator"
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left 7 Columns: Configuration Controls */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-slate-900">
                Personalize Your Total Cost Estimate
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Combine degree program, merit scholarship tier, and hostel or bus preference.
              </p>
            </div>

            {/* Course Selector */}
            <div>
              <label
                htmlFor="estimator-course"
                className="block text-sm font-medium text-slate-900 mb-1.5"
              >
                1. Academic Program
              </label>
              <select
                id="estimator-course"
                value={selectedCourse.id}
                onChange={(e) => onSelectCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
              >
                {COURSE_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name} ({prog.durationYears} Yrs — {formatINR(prog.tuitionFeePerYear)} tuition/yr)
                  </option>
                ))}
              </select>
            </div>

            {/* Scholarship Tier */}
            <div>
              <label
                htmlFor="estimator-scholarship"
                className="block text-sm font-medium text-slate-900 mb-1.5"
              >
                2. Merit / Government Scholarship Tier
              </label>
              <select
                id="estimator-scholarship"
                value={scholarshipId}
                onChange={(e) => setScholarshipId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
              >
                {SCHOLARSHIP_TIERS.map((tier) => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} — {tier.benefitLabel}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                Eligibility: {selectedScholarship.eligibility}. {selectedScholarship.notes}
              </p>
            </div>

            {/* Hostel Option */}
            <div>
              <span className="block text-sm font-medium text-slate-900 mb-2">
                3. Campus Residence & Dining Plan (Optional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HOSTEL_OPTIONS.map((option) => {
                  const active = option.id === hostelId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setHostelId(option.id)}
                      className={`text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#F5F3FF] border-[#6D28D9]'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-slate-900">
                          {option.label}
                        </span>
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#6D28D9] shrink-0">
                          {option.annualFee === 0 ? '₹0' : `${formatINR(option.annualFee)}/yr`}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-snug">
                        {option.includes}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transport Option */}
            <div>
              <label
                htmlFor="estimator-transport"
                className="block text-sm font-medium text-slate-900 mb-1.5"
              >
                4. College Bus Transport (Day Scholars Only)
              </label>
              <select
                id="estimator-transport"
                value={selectedHostel.annualFee > 0 ? 'none' : transportId}
                disabled={selectedHostel.annualFee > 0}
                onChange={(e) => setTransportId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-md text-slate-900 disabled:opacity-50 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
              >
                {TRANSPORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label} ({opt.distance}) — {opt.annualFee === 0 ? '₹0' : `${formatINR(opt.annualFee)}/yr`}
                  </option>
                ))}
              </select>
              {selectedHostel.annualFee > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  Transport fee is ₹0 because you selected on-campus hostel accommodation.
                </p>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Itemized Summary Card */}
          <div className="lg:col-span-5 bg-white border border-slate-300 border-t-4 border-t-[#6D28D9] rounded-lg p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B91C1C]">
              Itemized Fee Summary
            </p>
            <h4 className="mt-1 font-serif text-xl font-semibold text-slate-900">
              {selectedCourse.shortName} · {selectedCourse.durationYears}-Year Estimate
            </h4>

            <dl className="mt-5 space-y-3 text-sm border-t border-slate-200 pt-4">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Base Annual Tuition</dt>
                <dd className="font-mono tabular-nums text-slate-900">
                  {formatINR(selectedCourse.tuitionFeePerYear)}
                </dd>
              </div>
              {(tuitionWaiverAmount > 0 || selectedScholarship.flatAnnualGrant > 0) && (
                <div className="flex justify-between gap-4 text-[#B91C1C]">
                  <dt>Scholarship Deduction ({selectedScholarship.benefitLabel})</dt>
                  <dd className="font-mono tabular-nums font-semibold">
                    – {formatINR(tuitionWaiverAmount + selectedScholarship.flatAnnualGrant)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Lab, Computing & Library Fee</dt>
                <dd className="font-mono tabular-nums text-slate-900">
                  {formatINR(selectedCourse.labAcademicFeePerYear)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Examination Fee</dt>
                <dd className="font-mono tabular-nums text-slate-900">
                  {formatINR(selectedCourse.examFeePerYear)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Hostel & Dining Plan</dt>
                <dd className="font-mono tabular-nums text-slate-900">
                  {formatINR(selectedHostel.annualFee)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600">Campus Bus Transport</dt>
                <dd className="font-mono tabular-nums text-slate-900">
                  {formatINR(effectiveTransportFee)}
                </dd>
              </div>
            </dl>

            <div className="mt-5 pt-4 border-t border-slate-200 space-y-2.5 bg-[#FEFCE8] -mx-2 px-3 py-3 rounded-md border border-[#FDE047]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-slate-900">
                  Estimated Annual Total (Years 2–{selectedCourse.durationYears})
                </span>
                <span className="font-mono text-xl font-semibold tabular-nums text-[#1D4ED8]">
                  {formatINR(totalAnnualPayable)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 text-xs text-slate-700">
                <span>Year 1 Total (incl. ₹10,000 refundable caution deposit)</span>
                <span className="font-mono font-semibold tabular-nums text-slate-900">
                  {formatINR(firstYearWithDeposit)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 text-xs text-slate-700">
                <span>Projected {selectedCourse.durationYears}-Year Degree Total</span>
                <span className="font-mono font-semibold tabular-nums text-[#6D28D9]">
                  {formatINR(fullProgramEstimate)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onProceedToApply(selectedCourse.id, selectedHostel.annualFee > 0)
              }
              className="mt-6 w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer"
            >
              Proceed to Inquiry with This Estimate
            </button>
          </div>
        </div>

        {/* Part 3: Scholarships & Education Loan Summary */}
        <div className="mt-12 pt-10 border-t border-slate-200">
          <h3 className="font-serif text-xl font-semibold text-slate-900">
            Merit Scholarships & Financial Aid Policy
          </h3>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SCHOLARSHIP_TIERS.slice(1).map((tier, idx) => (
              <div
                key={tier.id}
                className={`bg-white border border-slate-200 rounded-md p-5 ${
                  SCHOLARSHIP_TOP_BORDERS[idx % SCHOLARSHIP_TOP_BORDERS.length]
                }`}
              >
                <p className="font-mono text-xs font-semibold text-[#B91C1C]">
                  {tier.benefitLabel}
                </p>
                <h4 className="mt-1.5 text-sm font-semibold text-slate-900">
                  {tier.name}
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {tier.eligibility}
                </p>
                <p className="mt-2 text-xs text-slate-500">{tier.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
