import { FormEvent, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Search,
  X,
} from 'lucide-react';
import {
  AcademicStream,
  COLLEGE_INFO,
  FACULTY_MEMBERS,
  HELP_DESK_CHANNELS,
} from '../data/collegeData';
import { ResilientImage } from './ResilientImage';

const DEPARTMENT_FILTERS: ('All' | AcademicStream)[] = [
  'All',
  'Engineering & Computing',
  'Sciences & Humanities',
  'Commerce & Management',
];

const CARD_TOP_ACCENTS = [
  'border-t-2 border-t-[#1D4ED8]',
  'border-t-2 border-t-[#6D28D9]',
  'border-t-2 border-t-[#B91C1C]',
  'border-t-2 border-t-[#EAB308]',
];

export function FacultyAndHelpDeskModule() {
  const [deptFilter, setDeptFilter] = useState<'All' | AcademicStream>('All');
  const [facultyQuery, setFacultyQuery] = useState('');

  // Help Desk Ticket State
  const [selectedDeskId, setSelectedDeskId] = useState(HELP_DESK_CHANNELS[0].id);
  const [requesterName, setRequesterName] = useState('');
  const [requesterContact, setRequesterContact] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Admissions & Eligibility');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [ticketReceipt, setTicketReceipt] = useState<string | null>(null);

  const filteredFaculty = useMemo(() => {
    const q = facultyQuery.trim().toLowerCase();
    return FACULTY_MEMBERS.filter((fac) => {
      if (deptFilter !== 'All' && fac.department !== deptFilter) return false;
      if (q) {
        const text = `${fac.name} ${fac.designation} ${fac.subDepartment} ${fac.specialization} ${fac.qualification}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [deptFilter, facultyQuery]);

  const handleSubmitTicket = (e: FormEvent) => {
    e.preventDefault();
    if (requesterName.trim().length < 2) {
      setTicketError('Please enter your full name.');
      return;
    }
    if (requesterContact.trim().length < 6) {
      setTicketError('Please provide a valid phone number or email address.');
      return;
    }
    if (ticketMessage.trim().length < 10) {
      setTicketError('Please describe your question (at least 10 characters).');
      return;
    }
    setTicketError(null);
    const id = Math.floor(1000 + Math.random() * 9000);
    setTicketReceipt(`HD-SKC-${id}`);
  };

  const resetTicket = () => {
    setTicketReceipt(null);
    setRequesterName('');
    setRequesterContact('');
    setTicketMessage('');
    setTicketError(null);
  };

  const activeDesk =
    HELP_DESK_CHANNELS.find((d) => d.id === selectedDeskId) ?? HELP_DESK_CHANNELS[0];

  return (
    <>
      {/* Faculty Directory & Academic Leadership Module */}
      <section id="faculty" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Intro Split with Faculty Seminar Photograph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pb-12 border-b border-slate-200">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#6D28D9] mb-2">
                  Academic Leadership & Mentorship
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                  Faculty Directory & Doctoral Mentors
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  With a 14:1 student-to-faculty ratio and 72% doctoral faculty across engineering, sciences, and management, students work directly alongside active researchers and industry fellows from their first year.
                </p>
              </div>

              <dl className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
                <div>
                  <dt className="text-xs text-slate-500">Doctoral Faculty</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[#1D4ED8] tabular-nums">
                    72%
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Avg. Experience</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[#B91C1C] tabular-nums">
                    16+ Yrs
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Annual Papers</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold text-[#6D28D9] tabular-nums">
                    180+
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <ResilientImage
                  src="/src/assets/images/faculty_lecture_seminar_1794812307169.jpg"
                  alt="Senior professor engaging with students during an interactive seminar at Sri Krishna College"
                  title="Sri Krishna College Faculty Seminar"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2.5 text-xs font-serif italic text-slate-500">
                Honors undergraduate seminar in Mechanical & Thermal Sciences, Academic Block I
              </p>
            </div>
          </div>

          {/* Faculty Filter & Search Bar */}
          <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200">
            <div
              role="group"
              aria-label="Filter faculty by school"
              className="flex flex-wrap items-center gap-1.5"
            >
              {DEPARTMENT_FILTERS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setDeptFilter(dept)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    deptFilter === dept
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-[#6D28D9] hover:text-[#6D28D9]'
                  }`}
                >
                  {dept === 'All' ? 'All Schools' : dept}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={facultyQuery}
                onChange={(e) => setFacultyQuery(e.target.value)}
                placeholder="Search faculty or research area..."
                aria-label="Search faculty"
                className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
              />
              {facultyQuery && (
                <button
                  type="button"
                  onClick={() => setFacultyQuery('')}
                  aria-label="Clear faculty search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Faculty Cards Grid */}
          {filteredFaculty.length === 0 ? (
            <div className="mt-8 py-12 text-center bg-white border border-slate-200 rounded-lg px-6">
              <p className="font-serif text-lg text-slate-900">
                No faculty members match your filter
              </p>
              <button
                type="button"
                onClick={() => {
                  setDeptFilter('All');
                  setFacultyQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#1D4ED8] rounded-md cursor-pointer"
              >
                Reset Faculty Filter
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredFaculty.map((fac, idx) => (
                <article
                  key={fac.id}
                  className={`bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between ${
                    CARD_TOP_ACCENTS[idx % CARD_TOP_ACCENTS.length]
                  }`}
                >
                  <div>
                    <p className="text-[11px] font-mono font-semibold text-[#B91C1C]">
                      {fac.subDepartment}
                    </p>
                    <h3 className="mt-1.5 font-serif text-lg font-semibold text-slate-900 leading-snug">
                      {fac.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-[#1D4ED8]">
                      {fac.designation}
                    </p>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                      {fac.qualification} · <span className="font-mono tabular-nums">{fac.experienceYears} Yrs Exp.</span>
                    </p>
                    <p className="mt-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">Research:</span>{' '}
                      {fac.specialization}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-1 text-xs">
                    <p className="text-slate-500">
                      <span className="font-medium text-slate-700">Office Hours:</span>{' '}
                      {fac.officeHours}
                    </p>
                    <a
                      href={`mailto:${fac.email}`}
                      className="inline-block text-[#6D28D9] hover:underline truncate max-w-full"
                    >
                      {fac.email}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact & Student / Parent Help Desk Module */}
      <section id="contact-helpdesk" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl pb-8 border-b border-slate-200">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#B91C1C] mb-2">
              Student, Parent & Recruiter Support
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Campus Contact Directory & Help Desk
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Reach dedicated campus offices directly by extension or email, or raise a verified support ticket for admissions, fee receipts, transcripts, hostel allocation, or placement drives.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: 5 Campus Help Desk Channels + Location Card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                {HELP_DESK_CHANNELS.map((desk) => {
                  const isActive = desk.id === selectedDeskId;
                  return (
                    <div
                      key={desk.id}
                      className={`p-5 rounded-lg border transition-colors ${
                        isActive
                          ? 'bg-[#F5F3FF] border-[#6D28D9]'
                          : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-slate-900">
                            {desk.deskName}
                          </h3>
                          <p className="text-xs text-[#B91C1C] font-medium mt-0.5">
                            {desk.location} · {desk.sla}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDeskId(desk.id);
                            setTicketCategory(desk.deskName);
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isActive
                              ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                              : 'bg-white text-[#1D4ED8] border-slate-300 hover:border-[#1D4ED8]'
                          }`}
                        >
                          {isActive ? 'Selected Desk' : 'Message Desk'}
                        </button>
                      </div>

                      <p className="mt-2.5 text-sm text-slate-600">{desk.handles}</p>

                      <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-700">
                        <span className="inline-flex items-center gap-1.5 font-mono tabular-nums font-semibold text-[#1D4ED8]">
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          {desk.phone}
                        </span>
                        <a
                          href={`mailto:${desk.email}`}
                          className="inline-flex items-center gap-1.5 text-slate-700 hover:text-[#6D28D9] hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          {desk.email}
                        </a>
                        <span className="inline-flex items-center gap-1.5 text-slate-500">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {desk.hours}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Campus Address & Transit Directions */}
              <div className="bg-[#FEFCE8] border border-[#FDE047] rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B91C1C] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-slate-900">
                      Campus Address & Transit Access
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                      {COLLEGE_INFO.address}
                    </p>
                    <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                      <div>
                        <dt className="font-semibold text-[#1D4ED8]">Coimbatore Junction</dt>
                        <dd className="mt-0.5 tabular-nums">7.5 km (~20 mins via Palakkad Rd)</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#6D28D9]">Coimbatore Int’l Airport</dt>
                        <dd className="mt-0.5 tabular-nums">18.5 km (~35 mins via Bypass)</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#B91C1C]">Ukkadam Bus Terminus</dt>
                        <dd className="mt-0.5 tabular-nums">5.2 km (~12 mins direct bus)</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Help Desk Ticket Widget */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-300 border-t-4 border-t-[#6D28D9] rounded-lg p-6 sm:p-8">
              {ticketReceipt ? (
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-2.5 text-[#1D4ED8]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                    <h3 className="font-serif text-xl font-semibold text-slate-900">
                      Help Desk Ticket Created
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your request has been routed to <span className="font-semibold text-slate-900">{activeDesk.deskName}</span>.
                  </p>
                  <dl className="bg-[#FEFCE8] border border-[#FDE047] rounded-md p-4 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-700">Ticket ID</dt>
                      <dd className="font-mono font-semibold text-[#6D28D9] tabular-nums">
                        {ticketReceipt}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-700">Target SLA</dt>
                      <dd className="text-slate-900 font-medium">{activeDesk.sla}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-700">Desk Contact</dt>
                      <dd className="font-mono text-xs text-[#1D4ED8]">{activeDesk.phone}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={resetTicket}
                    className="w-full py-2 px-4 text-sm font-medium text-slate-900 bg-white border border-slate-300 hover:border-[#6D28D9] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Help Desk Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} noValidate className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <Headphones className="w-5 h-5 text-[#6D28D9] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-slate-900">
                        Raise a Help Desk Support Ticket
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Direct routing to <span className="font-semibold text-[#1D4ED8]">{activeDesk.deskName}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="hd-desk"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Target Help Desk
                    </label>
                    <select
                      id="hd-desk"
                      value={selectedDeskId}
                      onChange={(e) => {
                        setSelectedDeskId(e.target.value);
                        const found = HELP_DESK_CHANNELS.find((d) => d.id === e.target.value);
                        if (found) setTicketCategory(found.deskName);
                      }}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                    >
                      {HELP_DESK_CHANNELS.map((desk) => (
                        <option key={desk.id} value={desk.id}>
                          {desk.deskName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="hd-name"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Student / Parent / Visitor Name *
                    </label>
                    <input
                      id="hd-name"
                      type="text"
                      value={requesterName}
                      onChange={(e) => setRequesterName(e.target.value)}
                      placeholder="e.g., Priya Natarajan"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hd-contact"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Phone Number or Email *
                    </label>
                    <input
                      id="hd-contact"
                      type="text"
                      value={requesterContact}
                      onChange={(e) => setRequesterContact(e.target.value)}
                      placeholder="e.g., +91 98422 00112 or email"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hd-topic"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Subject / Topic
                    </label>
                    <input
                      id="hd-topic"
                      type="text"
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hd-msg"
                      className="block text-sm font-medium text-slate-900 mb-1"
                    >
                      Query or Assistance Needed *
                    </label>
                    <textarea
                      id="hd-msg"
                      rows={3}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Describe your question regarding fees, hostel allotment, documents, or campus visit..."
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
                    />
                  </div>

                  {ticketError && (
                    <p className="text-xs font-medium text-[#B91C1C]">{ticketError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Help Desk Ticket
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
