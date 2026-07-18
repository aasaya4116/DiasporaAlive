"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WhySection() {
  const { ref: sectionRef, visible: isVisible } = useReveal<HTMLElement>()

  return (
    <>
      {/* Gradient divider above */}
      <div className="gradient-divider" />

      <section
        ref={sectionRef}
        className={`relative py-32 px-8 transition-[opacity,transform] duration-700 overflow-hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/[0.03] blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Large decorative quote mark */}
          <span
            className="absolute -top-16 -left-8 text-[12rem] font-serif leading-none text-emerald-500 opacity-5 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <h2 className="text-4xl font-bold mb-10 text-center">
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 text-transparent bg-clip-text">
              THE WHY
            </span>
          </h2>

          <div className="editorial-text space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              It was early October (2016) when I had the pleasure of visiting the Smithsonian's National Museum of African
              American History and Culture, otherwise known as "Blacksonian". Filled with several pieces of African
              American achievement in America, dating back to what many recognize as the initial caste system of racial
              control, slavery, the museum serves as a mural-sized collage of the "African American experience". While
              this was certainly an overwhelming experience, I've often wondered the traceability of people/culture from
              the African diaspora, but in other non-North American countries. A friend of mine, and I often discuss the
              newfound emergence of "awakening/wokeness" that has permeated the minds of young people of color. The thirst
              for knowledge, and the yearning to want to know from "whence one came" has grown in modern times
              (post-2010).
            </p>

            <p>
              I consider myself a 1st generation born African American, born to Nigerian parents. I never particularly
              struggled with the idea of tracing my personal identity. I always seemed to have a solid grasp on the
              customs my parents lived by in our household growing up, and was able to make a clear distinction between
              what was Nigerian culture vs, what was African American culture. However, it wasn't until much later in life
              that I grew to understand all of my peers weren't afforded the same luxury.
            </p>

            <p>
              The need and importance of understanding the magnitude of African influence on several modern day cultures
              is imperative for quenching the thirst of exploration and understanding cultural lineage. The migration of
              the people of Africa has proliferated, and contributed to many, many countries outside of the continent of
              Africa, unfortunately unbeknownst to many travelers. Diaspora Alive will provide an avenue for writers,
              cultural enthusiasts, academics, and travel curators to contribute to the flow and the availability of
              information. Diaspora Alive will educate and hopefully engage young travelers on how and where to experience
              the African Diaspora across the globe.
            </p>
          </div>

          {/* Decorative element */}
          <div className="mt-12 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </div>
        </div>
      </section>

      {/* Gradient divider below */}
      <div className="gradient-divider" />
    </>
  )
}
