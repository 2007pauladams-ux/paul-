import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  CAMPUS_FACILITIES,
  CAMPUS_GALLERY_PHOTOS,
  CampusGalleryPhoto,
  PLACEMENT_COMPANIES_DETAILED,
  PlacementSector,
  TESTIMONIALS,
} from '../data/collegeData';
import { ResilientImage } from './ResilientImage';

const GALLERY_CATEGORIES = [
  'All',
  'Architecture',
  'Academics',
  'Laboratories',
  'Symposiums',
  'Student Life',
];

const PLACEMENT_SECTORS: ('All' | PlacementSector)[] = [
  'All',
  'Software & Cloud',
  'Core Engineering & VLSI',
  'Consulting & Finance',
];

export function CampusAndPlacements() {
  const [activeFacilityId, setActiveFacilityId] = useState(CAMPUS_FACILITIES[0].id);
  const [photoCategory, setPhotoCategory] = useState('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<CampusGalleryPhoto | null>(null);
  const [sectorFilter, setSectorFilter] = useState<'All' | PlacementSector>('All');

  const activeFacility =
    CAMPUS_FACILITIES.find((f) => f.id === activeFacilityId) ?? CAMPUS_FACILITIES[0];

  const filteredPhotos = useMemo(() => {
    if (photoCategory === 'All') return CAMPUS_GALLERY_PHOTOS;
    return CAMPUS_GALLERY_PHOTOS.filter((p) => p.category === photoCategory);
  }, [photoCategory]);

  const filteredCompanies = useMemo(() => {
    if (sectorFilter === 'All') return PLACEMENT_COMPANIES_DETAILED;
    return PLACEMENT_COMPANIES_DETAILED.filter((c) => c.sector === sectorFilter);
  }, [sectorFilter]);

  useEffect(() => {
    if (!lightboxPhoto) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const idx = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
        if (idx >= 0) {
          setLightboxPhoto(filteredPhotos[(idx + 1) % filteredPhotos.length]);
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
        if (idx >= 0) {
          setLightboxPhoto(
            filteredPhotos[(idx - 1 + filteredPhotos.length) % filteredPhotos.length]
          );
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxPhoto, filteredPhotos]);

  const navigateLightbox = (direction: 1 | -1) => {
    if (!lightboxPhoto || filteredPhotos.length === 0) return;
    const idx = filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + filteredPhotos.length) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[nextIdx]);
  };

  return (
    <>
      {/* Campus, Facilities & Photo Gallery Section */}
      <section id="campus" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#6D28D9] mb-2">
                56-Acre Residential Campus · Kuniyamuthur
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                Libraries, Research Studios & Campus Gallery
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Designed around walkable shaded courtyards, silent scholarly libraries, industry-grade computing labs, a 1,200-seat auditorium, and secured residential hostels.
              </p>
            </div>

            {/* Facility Selector Tabs */}
            <div
              role="tablist"
              aria-label="Campus facilities"
              className="flex flex-wrap gap-2"
            >
              {CAMPUS_FACILITIES.map((facility) => (
                <button
                  key={facility.id}
                  type="button"
                  role="tab"
                  aria-selected={facility.id === activeFacilityId}
                  onClick={() => setActiveFacilityId(facility.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    facility.id === activeFacilityId
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-[#6D28D9] hover:text-[#6D28D9]'
                  }`}
                >
                  {facility.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Facility Showcase */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={activeFacility.image}
                  alt={activeFacility.imageAlt}
                  title={activeFacility.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2.5 text-xs font-serif italic text-slate-500">
                {activeFacility.caption}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B91C1C]">
                  {activeFacility.subtitle}
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-slate-900">
                  {activeFacility.title}
                </h3>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  {activeFacility.description}
                </p>
              </div>

              <dl className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6">
                {activeFacility.highlights.map((item, idx) => (
                  <div key={item.label}>
                    <dt className="text-xs text-slate-500">{item.label}</dt>
                    <dd
                      className={`mt-1 font-mono text-lg font-semibold tabular-nums ${
                        idx % 2 === 0 ? 'text-[#1D4ED8]' : 'text-[#6D28D9]'
                      }`}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Campus Photo Archive Grid */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-slate-900">
                  Campus Photo Archive
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Explore academic buildings, auditoriums, research labs, and residential blocks. Click any photo to enlarge.
                </p>
              </div>

              <div
                role="group"
                aria-label="Filter campus photos"
                className="flex flex-wrap gap-1.5"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setPhotoCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoCategory === cat
                        ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                        : 'bg-slate-50 text-slate-600 border-slate-300 hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setLightboxPhoto(photo)}
                  className="group text-left bg-[#FAFAFF] border border-slate-200 rounded-lg overflow-hidden hover:border-[#6D28D9] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      title={photo.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-[11px] font-mono font-semibold text-[#B91C1C]">
                      {photo.category}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 leading-snug">
                      {photo.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Placements & Detailed Recruiting Companies Section */}
      <section id="placements" className="py-16 lg:py-24 bg-[#FEFCE8] border-b border-[#FDE047]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl pb-8 border-b border-[#FDE047]">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#B91C1C] mb-2">
              Career Outcomes · Graduating Class of 2025
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Placement Companies, Packages & Alumni Outcomes
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
              Our Career & Industry Relations Office coordinates pre-placement internships, technical interview mentorship, and on-campus recruitment drives across 194 companies.
            </p>
          </div>

          {/* Quantitative Placement Proof Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-[#FDE047]">
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#1D4ED8] tabular-nums">
                94.6%
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Eligible Cohort Placed
              </p>
              <p className="text-xs text-slate-600">Class of 2025 verified audit</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#B91C1C] tabular-nums">
                ₹32.0 LPA
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Highest Annual CTC
              </p>
              <p className="text-xs text-slate-600">Cloud & Core Product Engineering</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#6D28D9] tabular-nums">
                ₹7.8 LPA
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Median Graduate Salary
              </p>
              <p className="text-xs text-slate-600">Across UG & PG disciplines</p>
            </div>
            <div>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#854D0E] tabular-nums">
                194
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Recruiting Organizations
              </p>
              <p className="text-xs text-slate-600">78% offering paid internships</p>
            </div>
          </div>

          {/* Detailed Placement Companies Directory */}
          <div className="py-8 border-b border-[#FDE047]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="font-serif text-xl font-semibold text-slate-900">
                  Key Placement Companies & 2025 Hiring Record
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Filter participating campus recruiters by industry sector.
                </p>
              </div>
              <div
                role="group"
                aria-label="Filter recruiters by sector"
                className="flex flex-wrap gap-1.5"
              >
                {PLACEMENT_SECTORS.map((sector) => (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => setSectorFilter(sector)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      sectorFilter === sector
                        ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                        : 'bg-white text-slate-700 border-[#EAB308] hover:border-[#6D28D9] hover:text-[#6D28D9]'
                    }`}
                  >
                    {sector === 'All' ? 'All Sectors' : sector}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#EAB308]/70 rounded-lg overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#1E1B4B] text-xs font-medium text-[#FEF9C3] uppercase tracking-wider">
                    <th className="py-3.5 px-4">Recruiting Company</th>
                    <th className="py-3.5 px-4">Sector</th>
                    <th className="py-3.5 px-4">Roles Offered</th>
                    <th className="py-3.5 px-4">CTC Package Band</th>
                    <th className="py-3.5 px-4 text-right">2025 Hires</th>
                    <th className="py-3.5 px-4 text-right">Drive Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {filteredCompanies.map((item) => (
                    <tr key={item.company} className="hover:bg-[#FEFCE8]/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {item.company}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-[#6D28D9]">
                        {item.sector}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{item.roles}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#1D4ED8] tabular-nums whitespace-nowrap">
                        {item.ctcBand}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#B91C1C] tabular-nums">
                        {item.hires2025}
                      </td>
                      <td className="py-3.5 px-4 text-right text-xs text-slate-500 whitespace-nowrap">
                        {item.visitMonth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attributable Alumni Testimonials */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => {
              const topBorders = [
                'border-t-2 border-t-[#1D4ED8]',
                'border-t-2 border-t-[#6D28D9]',
                'border-t-2 border-t-[#B91C1C]',
              ];
              return (
                <blockquote
                  key={item.name}
                  className={`bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between ${
                    topBorders[idx % topBorders.length]
                  }`}
                >
                  <p className="text-sm text-slate-700 leading-relaxed">
                    “{item.quote}”
                  </p>
                  <footer className="mt-6 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-[#1D4ED8] font-medium mt-0.5">{item.role}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.degree}</p>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B4B]/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="w-full max-w-4xl bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono font-semibold text-[#B91C1C]">
                  {lightboxPhoto.category}
                </p>
                <h4 className="font-serif text-lg font-semibold text-slate-900">
                  {lightboxPhoto.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Close photo preview"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-slate-900 aspect-[16/10]">
              <ResilientImage
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                title={lightboxPhoto.title}
                className="w-full h-full object-contain"
              />
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(-1)}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-900 hover:bg-white flex items-center justify-center shadow cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(1)}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-900 hover:bg-white flex items-center justify-center shadow cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-700">{lightboxPhoto.caption}</p>
              <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                {filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id) + 1} /{' '}
                {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
