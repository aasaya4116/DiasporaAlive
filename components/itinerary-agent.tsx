"use client"

import { Send, Sparkles, MapPin, Clock, Calendar, User, Bot } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Sample conversation to show the UI
const sampleMessages = [
  {
    id: "1",
    role: "user",
    content: "I want to experience authentic Afro-Caribbean music and cuisine. Can you help plan a trip?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "I'd love to help you plan an incredible cultural journey! Based on your interests in music and cuisine, I recommend a Caribbean island-hopping experience. Let me create a personalized itinerary for you.",
    itinerary: {
      title: "7-Day Afro-Caribbean Cultural Journey",
      days: [
        {
          day: 1,
          location: "San Juan, Puerto Rico",
          activities: [
            "Bomba workshop at Don Rafael Cepeda School",
            "Lunch at El Burén de Lula for authentic African-influenced dishes",
            "Evening visit to Loiza's Samuel Lind Studio",
          ],
        },
        {
          day: 2,
          location: "Kingston, Jamaica",
          activities: [
            "Jamaica African Dance Arts Festival",
            "Traditional Kumina ceremony experience",
            "Dinner featuring jerk chicken and festival bread",
          ],
        },
        {
          day: 3,
          location: "Port-au-Prince, Haiti",
          activities: ["Visit Musée Colonial Ogier-Fombrun", "Explore local markets", "Attend evening Vodou ceremony"],
        },
      ],
    },
  },
]

export function ItineraryAgent() {
  const messages = sampleMessages
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-12 transition-[opacity,transform] duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              AI Travel Planning — Preview
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Your Personal Cultural Guide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our AI agent help you discover and plan immersive cultural experiences across the African diaspora
          </p>
        </div>

        {/* Chat interface */}
        <div
          className={cn(
            "bg-card border border-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden transition-[opacity,transform] duration-700 delay-200 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Messages area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center">
              <span className="rounded-full border border-line bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Example Conversation
              </span>
            </div>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}

                <div className={cn("max-w-[80%]", message.role === "user" ? "order-first" : "")}>
                  <div
                    className={cn(
                      "rounded-lg p-4",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-secondary border border-border",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>

                  {/* Itinerary card */}
                  {message.itinerary && (
                    <div className="mt-4 bg-background border border-primary/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {message.itinerary.title}
                      </h3>

                      <div className="mt-4 space-y-4">
                        {message.itinerary.days.map((day) => (
                          <div key={day.day} className="border-l-2 border-primary/30 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="flex items-center justify-center w-6 h-6 bg-primary/20 text-primary text-xs font-bold rounded-full">
                                {day.day}
                              </span>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="font-medium text-foreground">{day.location}</span>
                              </div>
                            </div>
                            <ul className="space-y-1 ml-8">
                              {day.activities.map((activity, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <Clock className="h-3 w-3 mt-1 text-primary/60 flex-shrink-0" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <button className="mt-6 w-full px-4 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2">
                        Customize this itinerary
                        <Sparkles className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input area — disabled until the live AI integration ships */}
          <div className="border-t border-border/50 p-4 bg-background/50">
            <div className="flex gap-3">
              <input
                type="text"
                disabled
                placeholder="Live AI planning is coming soon — explore the example above"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-full text-sm opacity-60 cursor-not-allowed"
              />
              <button
                disabled
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium opacity-50 cursor-not-allowed flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
