import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import * as defaultContent from '../data/siteContent.js';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    // Optional fetch to dynamic endpoint if implemented
    fetch('/api/site-content')
      .then(res => (res.ok ? res.json() : null))
      .then(remote => {
        if (active && remote) {
          setData(remote);
        }
      })
      .catch(() => {
        // Fallback to local data silently
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    return {
      loading,
      company: data?.settings ? { ...defaultContent.company, ...data.settings } : defaultContent.company,
      navItems: defaultContent.navItems,
      metrics: defaultContent.metrics,
      services: defaultContent.services,
      serviceDetails: defaultContent.serviceDetails,
      serviceInterestOptions: defaultContent.serviceInterestOptions,
      whyChooseUs: defaultContent.whyChooseUs,
      portfolioProjects: defaultContent.portfolioProjects,
      testimonials: defaultContent.testimonials,
      caseStudies: defaultContent.caseStudies,
      industries: defaultContent.industries,
      devProcess: defaultContent.devProcess,
      techStack: defaultContent.techStack,
      engagementModels: defaultContent.engagementModels,
      teamMembers: defaultContent.teamMembers,
      milestones: defaultContent.milestones,
      blogPosts: defaultContent.blogPosts,
      faqs: defaultContent.faqs,
      contactCards: defaultContent.contactCards,
      viniAssistant: defaultContent.viniAssistant,
      getWhatsAppUrl: defaultContent.getWhatsAppUrl,
    };
  }, [loading, data]);

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    return defaultContent;
  }
  return context;
}
