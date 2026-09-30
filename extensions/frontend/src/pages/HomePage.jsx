import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CollectionGrid } from '../components/home/CollectionGrid';
import { CraftsmanshipSection } from '../components/home/CraftsmanshipSection';
import { TestimonialSlider } from '../components/home/TestimonialSlider';
import { LimitedEditionSection } from '../components/home/LimitedEditionSection';
import { PackagingSection } from '../components/home/PackagingSection';
import { VipClubSection } from '../components/home/VipClubSection';

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CollectionGrid />
      <CraftsmanshipSection />
      <TestimonialSlider />
      <LimitedEditionSection />
      <PackagingSection />
      <VipClubSection />
    </main>
  );
};
