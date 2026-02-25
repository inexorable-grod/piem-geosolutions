import { HeroSection }       from '@/components/landing/HeroSection'
import { AboutSection }      from '@/components/landing/AboutSection'
import { ServicesSection }   from '@/components/landing/ServicesSection'
import { TechnologySection } from '@/components/landing/TechnologySection'
import { TeamSection }       from '@/components/landing/TeamSection'
import { ClientsSection }    from '@/components/landing/ClientsSection'
import { ContactSection }    from '@/components/landing/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechnologySection />
      <TeamSection />
      <ClientsSection />
      <ContactSection />
    </>
  )
}
