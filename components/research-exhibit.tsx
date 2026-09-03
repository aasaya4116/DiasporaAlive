"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Clock3, Map, Route } from "lucide-react"
import { Markdown } from "@/components/markdown"
import { SectionCitations } from "@/components/section-citations"
import type { ContentSection, TopicExhibit } from "@/lib/topics"

interface ResearchExhibitProps {
  title: string
  summary: string
  author?: string
  year?: number | string
  sections: ContentSection[]
  exhibit: TopicExhibit
}

export function ResearchExhibit({ title, summary, author, year, sections, exhibit }: ResearchExhibitProps) {
  const firstChapter = exhibit.chapters[0]
  const [activeChapterId, setActiveChapterId] = useState(firstChapter.id)
  const [activeStoryId, setActiveStoryId] = useState<string | undefined>(firstChapter.storyCards?.[0]?.id)

  useEffect(() => {
    const requestedChapter = window.location.hash.replace("#", "")
    const chapter = exhibit.chapters.find((candidate) => candidate.id === requestedChapter)
    if (chapter) {
      setActiveChapterId(chapter.id)
      setActiveStoryId(chapter.storyCards?.[0]?.id)
    }
  }, [exhibit.chapters])

  function selectChapter(chapterId: string) {
    const chapter = exhibit.chapters.find((candidate) => candidate.id === chapterId)
    if (!chapter) return

    setActiveChapterId(chapter.id)
    setActiveStoryId(chapter.storyCards?.[0]?.id)
    window.history.replaceState(null, "", `${window.location.pathname}#${chapter.id}`)
  }

  return (
    <>
      <section className="grid gap-8 pb-10 pt-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end lg:pb-12">
        <div>
          <span className="overline mb-4 block">Research Exhibit · Haiti</span>
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">{summary}</p>
          <p className="mt-5 text-sm text-ink-3">
            {author}
            {author && year ? " · " : ""}
            {year}
            {(author || year) && " · "}
            {exhibit.duration}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/country/${exhibit.primaryCountryId}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-px hover:bg-gold-strong"
            >
              <Map className="h-4 w-4" />
              Explore Haiti
            </Link>
            <Link
              href="/timeline"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-px hover:border-gold hover:text-gold"
            >
              <Clock3 className="h-4 w-4" />
              Open timeline
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-card p-6" aria-label="Research path">
          <div className="mb-6 flex items-center gap-2 text-gold">
            <Route className="h-4 w-4" />
            <span className="overline">Research Path</span>
          </div>
          <ol className="space-y-5">
            {exhibit.chapters.map((chapter, index) => (
              <li key={chapter.id} className="grid grid-cols-[38px_1fr] gap-3">
                <span className="font-serif text-xl text-gold">{chapter.number}</span>
                <div className={index < exhibit.chapters.length - 1 ? "border-b border-line-subtle pb-5" : ""}>
                  <p className="font-semibold text-foreground">{chapter.title}</p>
                  <p className="mt-1 text-xs text-ink-3">{chapter.period}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line py-10 sm:py-12" aria-labelledby="cost-of-sugar-heading">
        <div className="mb-8 max-w-3xl">
          <span className="overline mb-3 block">The Plantation System</span>
          <h2 id="cost-of-sugar-heading" className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
            The Cost of Sugar
          </h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {exhibit.costOfSugar.introduction}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <article>
            <span className="overline mb-4 block">The Wealth</span>
            <div className="divide-y divide-line border-y border-line">
              {exhibit.costOfSugar.wealth.map((metric) => (
                <div key={metric.label} className="py-5">
                  <div className="flex items-start justify-between gap-5">
                    <p className="font-serif text-4xl leading-none text-gold sm:text-5xl">{metric.value}</p>
                    <span className="text-xs text-ink-3">{metric.source}</span>
                  </div>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <span className="overline mb-4 block">The Human Cost</span>
            <div className="grid border-y border-line sm:grid-cols-2">
              {exhibit.costOfSugar.humanCost.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`py-5 sm:px-5 ${index % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${
                    index > 0 ? "border-t border-line sm:border-t-0" : ""
                  } ${index >= 2 ? "sm:border-t sm:border-line" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-serif text-3xl leading-none text-gold sm:text-4xl">{metric.value}</p>
                    <span className="text-xs text-ink-3">{metric.source}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <p className="mt-7 max-w-4xl border-l-2 border-gold/60 pl-4 text-sm leading-relaxed text-ink-3">
          {exhibit.costOfSugar.note} Source: Dubois &amp; Garrigus, <cite>Slave Revolution in the Caribbean</cite>, pp. 2, 7.
        </p>
      </section>

      <section className="py-12 lg:py-16">
        <div
          className="sticky top-[65px] z-30 -mx-6 mb-10 overflow-x-auto border-y border-line bg-background/95 px-6 backdrop-blur-xl"
          role="tablist"
          aria-label="Research chapters"
        >
          <div className="mx-auto flex min-w-max lg:max-w-5xl">
            {exhibit.chapters.map((chapter) => {
              const isActive = chapter.id === activeChapterId
              return (
                <button
                  key={chapter.id}
                  id={`tab-${chapter.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${chapter.id}`}
                  onClick={() => selectChapter(chapter.id)}
                  className={`min-h-14 border-t-2 px-5 text-left text-sm font-semibold transition sm:px-7 ${
                    isActive
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-transparent text-muted-foreground hover:border-line hover:text-foreground"
                  }`}
                >
                  <span className="mr-2 font-serif text-gold">{chapter.number}</span>
                  {chapter.title}
                </button>
              )
            })}
          </div>
        </div>

        {exhibit.chapters.map((chapter, chapterIndex) => {
          const isActive = chapter.id === activeChapterId
          const chapterSections = chapter.sectionIndexes.map((index) => sections[index]).filter(Boolean)
          const selectedStory = chapter.storyCards?.find((card) => card.id === activeStoryId) ?? chapter.storyCards?.[0]

          return (
            <div
              key={chapter.id}
              id={`panel-${chapter.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${chapter.id}`}
              hidden={!isActive}
              className="grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-12"
            >
              <aside>
                <span className="overline block">Chapter {chapter.number}</span>
                <p className="mt-3 font-serif text-2xl text-foreground">{chapter.period}</p>
                <div className="my-5 h-24 w-px bg-gradient-to-b from-gold via-gold/40 to-line lg:h-32" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-ink-3">
                  {chapterIndex + 1} of {exhibit.chapters.length}
                </p>
              </aside>

              <div>
                <span className="overline mb-3 block">{chapter.eyebrow}</span>
                <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
                  {chapter.title}
                </h2>
                <p className="mt-5 max-w-3xl font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {chapter.summary}
                </p>

                <div className="mt-10 max-w-3xl divide-y divide-line-subtle border-y border-line-subtle">
                  {chapterSections.map((section) => (
                    <section key={section.heading} className="py-8 first:pt-7">
                      <h3 className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{section.heading}</h3>
                      <Markdown>{section.body}</Markdown>
                      <SectionCitations citations={section.citations} />
                    </section>
                  ))}
                </div>

                {chapter.storyCards && chapter.storyCards.length > 0 && selectedStory && (
                  <section className="mt-12" aria-labelledby="us-connections-heading">
                    <span className="overline mb-3 block">Follow the Connection</span>
                    <h3 id="us-connections-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      The United States and the Haitian Revolution
                    </h3>
                    <p className="mt-3 max-w-2xl text-muted-foreground">
                      Select a thread to see how events in Haiti reshaped the early United States.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {chapter.storyCards.map((card) => {
                        const isSelected = card.id === selectedStory.id
                        return (
                          <button
                            key={card.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setActiveStoryId(card.id)}
                            className={`group min-h-28 rounded-xl border p-5 text-left transition hover:-translate-y-0.5 ${
                              isSelected
                                ? "border-gold bg-gold/10"
                                : "border-line bg-card hover:border-gold/60"
                            }`}
                          >
                            <span className="overline block">{card.eyebrow}</span>
                            <span className="mt-2 flex items-start justify-between gap-4 font-semibold text-foreground">
                              {card.title}
                              <ArrowRight className={`mt-0.5 h-4 w-4 shrink-0 transition ${isSelected ? "text-gold" : "text-ink-3 group-hover:text-gold"}`} />
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-4 rounded-xl border-l-2 border-gold bg-card p-6" aria-live="polite">
                      <span className="overline block">{selectedStory.eyebrow}</span>
                      <h4 className="mt-2 text-xl font-bold text-foreground">{selectedStory.title}</h4>
                      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{selectedStory.body}</p>
                      <Link
                        href="/country/usa"
                        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-foreground transition hover:border-gold hover:text-gold"
                      >
                        Continue on the USA page
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </section>
                )}

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <p className="text-sm text-ink-3">Choose another chapter or continue through the wider research network.</p>
                  {chapterIndex < exhibit.chapters.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => selectChapter(exhibit.chapters[chapterIndex + 1].id)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-px hover:bg-gold-strong"
                    >
                      Next chapter
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={`/country/${exhibit.primaryCountryId}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background transition hover:-translate-y-px hover:bg-gold-strong"
                    >
                      Explore Haiti
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
