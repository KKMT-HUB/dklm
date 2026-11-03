
"use client";

import { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  HeartPulse,
  CreditCard,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Upload,
  CheckCircle2,
  ChevronRight,
  FileText,
} from "lucide-react";

type Field = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  full?: boolean;
};

const sections = [
  {
    title: "Basic & Personal Information",
    subtitle: "Personal details and identification",
    icon: User,
    fields: [
      { id: "fullName", label: "Full Name (In Block Letters)", required: true },
      { id: "fatherName", label: "Father's Name" },
      { id: "motherName", label: "Mother's Name" },
      { id: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
      { id: "dob", label: "Date of Birth", type: "date" },
      { id: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Widowed", "Divorced"] },
      { id: "nationality", label: "Nationality", placeholder: "e.g. Indian" },
      { id: "motherTongue", label: "Mother Tongue" },
      { id: "languages", label: "Languages Known", placeholder: "e.g. Malayalam, English, Arabic" },
      { id: "religion", label: "Religion / Caste / Category" },
      { id: "jamaath", label: "Which Jamaath Member (Mahal / Jamaath Name & Place)", full: true },
      { id: "photo", label: "Photo Upload / ID Code", type: "file", full: true },
    ],
  },
  {
    title: "Contact Information",
    subtitle: "Your phone and emergency contact details",
    icon: Phone,
    fields: [
      { id: "mobile", label: "Primary Mobile Number", type: "tel", required: true },
      { id: "whatsapp", label: "Alternative Mobile / WhatsApp Number", type: "tel" },
      { id: "email", label: "Email ID", type: "email" },
      { id: "emergencyName", label: "Emergency Contact Person Name" },
      { id: "emergencyRelationship", label: "Emergency Contact Relationship" },
      { id: "emergencyPhone", label: "Emergency Contact Phone Number", type: "tel" },
    ],
  },
  {
    title: "Permanent Address",
    subtitle: "Your registered permanent residential address",
    icon: MapPin,
    fields: [
      { id: "permanentHouse", label: "House Name / Number" },
      { id: "permanentStreet", label: "Street / Locality Name" },
      { id: "permanentPost", label: "Post Office & PIN Code" },
      { id: "permanentLocalBody", label: "Panchayat / Municipality / Corporation" },
      { id: "permanentTaluk", label: "Taluk" },
      { id: "permanentDistrict", label: "District" },
      { id: "permanentState", label: "State" },
    ],
  },
  {
    title: "Current / Communication Address",
    subtitle: "Where you currently reside",
    icon: MapPin,
    fields: [
      { id: "currentHouse", label: "House Name / Room No. / Building" },
      { id: "currentStreet", label: "Street / Area" },
      { id: "currentPost", label: "Post Office & PIN Code" },
      { id: "currentLocalBody", label: "Panchayat / Municipality" },
      { id: "currentTaluk", label: "Taluk" },
      { id: "currentDistrict", label: "District" },
      { id: "currentState", label: "State" },
    ],
  },
  {
    title: "Health, Disability & Special Role Details",
    subtitle: "Health information and additional responsibilities",
    icon: HeartPulse,
    fields: [
      { id: "bloodGroup", label: "Blood Group & Rh Factor", type: "select", options: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"] },
      { id: "disability", label: "Disability Status", type: "select", options: ["No", "Yes"] },
      { id: "disabilityDetails", label: "Disability Details & Percentage (Type, %, UDID No.)", full: true },
      { id: "rationCard", label: "Ration Card Type", type: "select", options: ["APL", "BPL", "AAY", "PHH"] },
      { id: "rationNumber", label: "Ration Card Number" },
      { id: "itCoordinator", label: "Is IT Coordinator?", type: "select", options: ["No", "Yes"] },
      { id: "itDetails", label: "Specify Zone / Responsibilities", full: true },
      { id: "employmentDetails", label: "Other Working / Employment Details", type: "textarea", full: true },
    ],
  },
  {
    title: "Identity & Financial / Bank Details",
    subtitle: "Identity documents and bank account information",
    icon: CreditCard,
    fields: [
      { id: "identityNumber", label: "Aadhaar / Voter ID / PAN Number" },
      { id: "accountHolder", label: "Account Holder Name (as in Passbook)" },
      { id: "bankName", label: "Bank Name" },
      { id: "branchName", label: "Branch Name" },
      { id: "accountNumber", label: "Account Number" },
      { id: "ifsc", label: "IFSC Code" },
      { id: "micr", label: "MICR Code" },
      { id: "uan", label: "UAN (EPF) / ESI Number (If applicable)", full: true },
    ],
  },
  {
    title: "Religious & Educational Qualifications",
    subtitle: "Islamic studies and general education",
    icon: GraduationCap,
    fields: [
      { id: "islamicQualification", label: "Primary Islamic Qualification", placeholder: "e.g. Baqavi, Faizy, Hudawi" },
      { id: "madrasaEducation", label: "Madrasa Education Completed Level" },
      { id: "generalEducation", label: "General Educational Qualification", placeholder: "SSLC, Plus Two, Degree, PG" },
      { id: "hafiz", label: "Hafiz", type: "select", options: ["No", "Yes"] },
      { id: "qari", label: "Qari / Tajweed Certification", type: "select", options: ["No", "Yes"] },
      { id: "teacherTraining", label: "Teacher Training Certification", type: "select", options: ["No", "Yes"] },
      { id: "institution", label: "Name of Islamic Institution / University Studied", full: true },
      { id: "passingYear", label: "Year of Passing (Religious Degree)", type: "number" },
      { id: "computerLiteracy", label: "Computer / IT Literacy Level", type: "select", options: ["Basic", "Intermediate", "Advanced", "Professional"] },
    ],
  },
  {
    title: "Employment & Madrasa Service Details",
    subtitle: "Current teaching position and service history",
    icon: BookOpen,
    fields: [
      { id: "msrNumber", label: "Muallim Service Register (MSR) Number" },
      { id: "madrasaName", label: "Current Madrasa Name & Code" },
      { id: "madrasaAddress", label: "Madrasa Address & Range / District", full: true },
      { id: "designation", label: "Designation", type: "select", options: ["Sadru Muallim", "Assistant Muallim", "Other"] },
      { id: "joiningDate", label: "Date of Joining Current Madrasa", type: "date" },
      { id: "experience", label: "Total Teaching Experience (in Years)", type: "number" },
      { id: "classes", label: "Classes / Standards Currently Taught" },
      { id: "subjects", label: "Subjects Handled" },
      { id: "salary", label: "Monthly Base Salary / Honorarium", type: "number" },
      { id: "salaryMode", label: "Mode of Salary Payment", type: "select", options: ["Bank Transfer", "Cash", "Cheque"] },
      { id: "previousMadrasa", label: "Previous Madrasa Worked (Name & Duration)", type: "textarea", full: true },
    ],
  },
  {
    title: "Welfare, Pension & Insurance Schemes",
    subtitle: "Welfare registration and nominee information",
    icon: ShieldCheck,
    fields: [
      { id: "welfareNumber", label: "SJM / SKJM Welfare Board Registration No" },
      { id: "pension", label: "Pension Scheme Enrolled", type: "select", options: ["No", "Yes"] },
      { id: "insurance", label: "Health / Medical Insurance Details", full: true },
      { id: "nomineeName", label: "Nominee Name (for Welfare Benefits)" },
      { id: "nomineeDetails", label: "Nominee Relationship & Contact Number" },
    ],
  },
];

function FormField({ field }: { field: Field }) {
  const commonClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

  return (
    <div className={field.full ? "md:col-span-2" : ""}>
      <label
        htmlFor={field.id}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {field.type === "select" ? (
        <select
          id={field.id}
          name={field.id}
          required={field.required}
          defaultValue=""
          className={commonClass}
        >
          <option value="" disabled>
            Select {field.label}
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={field.id}
          name={field.id}
          rows={3}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          className={commonClass}
        />
      ) : field.type === "file" ? (
        <div className="relative rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 transition hover:border-teal-500">
          <input
            id={field.id}
            name={field.id}
            type="file"
            accept="image/*,.pdf"
            className="w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:font-semibold file:text-teal-800 hover:file:bg-teal-100"
          />
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <Upload className="size-4" />
            Upload a photo or ID document
          </p>
        </div>
      ) : (
        <input
          id={field.id}
          name={field.id}
          type={field.type || "text"}
          required={field.required}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          min={field.type === "number" ? 0 : undefined}
          className={commonClass}
        />
      )}
    </div>
  );
}

export default function RegistrationPage() {
  const [submitted, setSubmitted] = useState(false);

  const totalFields = sections.reduce(
    (total, section) => total + section.fields.length,
    0
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900 px-5 py-14 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-32 size-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-48 -left-20 size-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-100">
            <FileText className="size-4" />
            MUALLIM REGISTRATION
          </div>

          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Muallim Registration Form
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-teal-100 sm:text-base">
            Please complete the following registration form with accurate
            personal, educational, service and welfare information.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg bg-white/10 px-4 py-2">
              9 Sections
            </span>
            <span className="rounded-lg bg-white/10 px-4 py-2">
              {totalFields} Information Fields
            </span>
            <span className="rounded-lg bg-white/10 px-4 py-2">
              Online Registration
            </span>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="my-8 rounded-2xl border border-teal-100 bg-teal-50 p-4 sm:p-5">
          <div className="flex gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-100 text-teal-800">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <h2 className="font-semibold text-teal-950">
                Instructions for Applicants
              </h2>
              <p className="mt-1 text-sm leading-6 text-teal-800">
                Fill in all applicable details carefully. Fields marked with
                an asterisk (*) are mandatory. Please ensure your contact,
                identity and bank information is accurate.
              </p>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Form validation completed. The registration UI is ready, but
            submission storage has not yet been connected to a backend.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                id={`section-${index + 1}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Section Heading */}
                <div className="border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-800">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                        Section {index + 1} of {sections.length}
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                        {section.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {section.subtitle}
                      </p>
                    </div>

                    <span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 sm:block">
                      {section.fields.length} Fields
                    </span>
                  </div>
                </div>

                {/* Section Fields */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-5 sm:p-7 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field as Field}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Declaration */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-bold text-slate-900">
              Declaration
            </h2>

            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="declaration"
                required
                className="mt-1 size-4 accent-teal-700"
              />
              <span className="text-sm leading-6 text-slate-600">
                I hereby declare that the information provided in this
                registration form is true and correct to the best of my
                knowledge. I agree to provide supporting documents whenever
                required.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:px-7">
            <p className="text-center text-xs leading-5 text-slate-500 sm:text-left">
              Please review all information before submitting.
            </p>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5 hover:bg-teal-900 sm:w-auto"
            >
              Submit Registration
              <ChevronRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
