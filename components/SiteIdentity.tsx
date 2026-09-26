"use client"
import React from 'react';
import SITE_IDENTITY from '../app/config/site_identity';
import Section from './Section';

const SiteIdentity: React.FC = () => {
  return (
    <Section spacing="sm" className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src={SITE_IDENTITY.logo.primary}
            alt={SITE_IDENTITY.name}
            className="h-10 w-auto mx-auto mb-3"
          />
          <h2 className="text-xl font-extrabold text-brand-950">
            {SITE_IDENTITY.name}
          </h2>
          <p className="mt-1.5 text-sm text-gray-600">
            {SITE_IDENTITY.tagline}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm">
            <a
              href={`tel:${SITE_IDENTITY.contact.phone.replace(/\s/g, '')}`}
              className="font-semibold text-brand-950 hover:text-brand-900"
            >
              {SITE_IDENTITY.contact.phone}
            </a>
            <a
              href={`mailto:${SITE_IDENTITY.contact.email}`}
              className="font-semibold text-brand-950 hover:text-brand-900 break-words"
            >
              {SITE_IDENTITY.contact.email}
            </a>
            <a
              href={SITE_IDENTITY.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-950 hover:text-brand-900"
            >
              Get Directions
            </a>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            {SITE_IDENTITY.statistics.studentsCounselled} Students Counseled · {SITE_IDENTITY.statistics.yearsExperience} Years Experience · {SITE_IDENTITY.statistics.partnerColleges} Partner Colleges
          </p>
        </div>
    </Section>
  );
};

export default SiteIdentity;
