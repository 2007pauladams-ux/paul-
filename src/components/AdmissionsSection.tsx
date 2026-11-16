import { FormEvent, useEffect, useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import {
  ADMISSION_STEPS,
  COLLEGE_INFO,
  COURSE_PROGRAMS,
  REQUIRED_DOCUMENTS,
} from '../data/collegeData';

interface AdmissionsSectionProps {
  preselectedCourseId: string;
  preselectedHostel: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  marksPercent?: string;
}

export function AdmissionsSection({
  preselectedCourseId,
  preselectedHostel,
}: AdmissionsSectionProps) {
  const [checkedDocs, setCheckedDocs] = useState<number[]>([0]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseId, setCourseId] = useState(preselectedCourseId);
  const [marksPercent, setMarksPercent] = useState('');
  const [hostelRequired, setHostelRequired] = useState(preselectedHostel);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    setCourseId(preselectedCourseId);
  }, [preselectedCourseId]);

  useEffect(() => {
    setHostelRequired(preselectedHostel);
  }, [preselectedHostel]);

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter the applicant’s full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = phone.replace(/[\s\-+]/g, '');
    if (!/^\d{10,12}$/.test(cleanPhone)) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (marksPercent.trim()) {
      const pct = Number(marksPercent);
      if (Number.isNaN(pct) || pct < 35 || pct > 100) {
        nextErrors.marksPercent = 'Enter a percentage between 35 and 100.';
      }
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`SKC-2026-${randomCode}`);
  };

  const handleResetForm = () => {
    setSubmittedRef(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMarksPercent('');
    setNotes('');
    setErrors({});
  };

  const selectedCourse =
    COURSE_PROGRAMS.find((c) => c.id === courseId) ?? COURSE_PROGRAMS[0];

  return (
    <section id="admissions" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pb-8 border-b border-slate-200">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#B91C1C] mb-2">
            2026–27 Academic Cycle · Admissions Office
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Admissions Timeline, Documents & Application Inquiry
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Review key counseling dates, verify your document readiness checklist, and submit a direct admissions inquiry to receive the official prospectus and scholarship screening link.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 6 Columns: Process Timeline + Document Checklist */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <h3 className="font-serif text-xl font-semibold text-slate-900">
                Admission Process & Important Dates
              </h3>
              <ol className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                {ADMISSION_STEPS.map((item) => (
                  <li key={item.step} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-[#1D4ED8]">
                        {item.step}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#B91C1C] tabular-nums">
                        {item.window}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Interactive Document Readiness Checklist */}
            <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-lg p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-lg font-semibold text-slate-900">
                  Document Readiness Checklist
                </h3>
                <span className="font-mono text-xs font-semibold text-[#6D28D9] tabular-nums">
                  {checkedDocs.length} / {REQUIRED_DOCUMENTS.length} ready
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Check off documents you already have ready for verification day.
              </p>
              <ul className="mt-4 space-y-2.5">
                {REQUIRED_DOCUMENTS.map((doc, idx) => {
                  const checked = checkedDocs.includes(idx);
                  return (
                    <li key={doc}>
                      <button
                        type="button"
                        onClick={() => toggleDoc(idx)}
                        className="w-full text-left flex items-start gap-3 py-1.5 group cursor-pointer"
                      >
                        <span
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            checked
                              ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
                              : 'bg-white border-slate-400 group-hover:border-[#6D28D9]'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3" aria-hidden="true" />}
                        </span>
                        <span
                          className={`text-sm transition-colors ${
                            checked
                              ? 'text-slate-500 line-through'
                              : 'text-slate-900'
                          }`}
                        >
                          {doc}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right 6 Columns: Application & Counseling Inquiry Form */}
          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-300 border-t-4 border-t-[#1D4ED8] rounded-lg p-6 sm:p-8">
            {submittedRef ? (
              <div className="py-6 space-y-5">
                <div className="flex items-center gap-3 text-[#6D28D9]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">
                    Application Inquiry Recorded
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{fullName}</span>. Your pre-admission inquiry for{' '}
                  <span className="font-semibold text-slate-900">{selectedCourse.name}</span> has been logged with our Coimbatore Admissions Desk.
                </p>

                <dl className="bg-[#FEFCE8] border border-[#FDE047] rounded-md p-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-700">Reference Number</dt>
                    <dd className="font-mono font-semibold text-[#1D4ED8] tabular-nums">
                      {submittedRef}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-700">Applicant Email</dt>
                    <dd className="text-slate-900">{email}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-700">Hostel Requested</dt>
                    <dd className="text-slate-900">{hostelRequired ? 'Yes' : 'Day Scholar'}</dd>
                  </div>
                </dl>

                <p className="text-xs text-slate-600">
                  An admissions counselor will reach out within 1 working day ({COLLEGE_INFO.visitingHours}). For urgent queries, call {COLLEGE_INFO.admissionsPhone}.
                </p>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2 text-sm font-medium text-slate-900 bg-white border border-slate-300 hover:border-[#1D4ED8] rounded-md transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-slate-900">
                    2026–27 Admissions Inquiry & Seat Reservation
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Application Fee: ₹{COLLEGE_INFO.registrationFee} (payable only upon formal portal enrollment).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="app-name"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Applicant Full Name *
                    </label>
                    <input
                      id="app-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Arjun Krishnan"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C]">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="app-phone"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="app-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 9842212345"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 font-mono tabular-nums focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C]">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="app-email"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="app-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="applicant@example.com"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="app-marks"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Qualifying Exam % (12th / UG)
                    </label>
                    <input
                      id="app-marks"
                      type="number"
                      min="35"
                      max="100"
                      step="0.1"
                      value={marksPercent}
                      onChange={(e) => setMarksPercent(e.target.value)}
                      placeholder="e.g., 91.5"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 font-mono tabular-nums focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                    />
                    {errors.marksPercent && (
                      <p className="mt-1 text-xs font-medium text-[#B91C1C]">{errors.marksPercent}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="app-course"
                    className="block text-sm font-medium text-slate-900 mb-1"
                  >
                    Preferred Program
                  </label>
                  <select
                    id="app-course"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                  >
                    {COURSE_PROGRAMS.map((prog) => (
                      <option key={prog.id} value={prog.id}>
                        {prog.name} ({prog.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    id="app-hostel"
                    type="checkbox"
                    checked={hostelRequired}
                    onChange={(e) => setHostelRequired(e.target.checked)}
                    className="w-4 h-4 accent-[#6D28D9] rounded border-slate-300"
                  />
                  <label htmlFor="app-hostel" className="text-sm text-slate-900">
                    I require on-campus hostel accommodation & dining
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="app-notes"
                    className="block text-sm font-medium text-slate-900 mb-1"
                  >
                    Questions for the Admissions Counselor (Optional)
                  </label>
                  <textarea
                    id="app-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ask about scholarship eligibility, lateral entry, or campus visit scheduling..."
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-md transition-colors cursor-pointer"
                >
                  Request Prospectus & Counseling Slot
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
