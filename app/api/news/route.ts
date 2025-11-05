import { NextResponse } from 'next/server'

// Sample Mumbai news stories (in production, this would fetch from real news APIs)
const mumbaiNewsStories = [
  {
    headline: "Metro Line 3 Opens New Station",
    summary: "Mumbai Metro inaugurated Dadar station on Line 3, reducing travel time between BKC and Dadar by 20 minutes. The aqua line now serves 15,000+ daily commuters with modern amenities.",
    category: "Traffic",
    emoji: "🚇"
  },
  {
    headline: "Monsoon Alert: Heavy Rains Expected",
    summary: "IMD issues orange alert for Mumbai with predictions of 100-150mm rainfall in next 24 hours. BMC activates emergency response teams. Citizens advised to avoid waterlogging-prone areas and stay indoors.",
    category: "Weather",
    emoji: "🌧️"
  },
  {
    headline: "Marine Drive Gets Smart Lighting",
    summary: "BMC completes installation of energy-efficient LED lights along Marine Drive promenade. The ₹12 crore project features 800+ solar-powered streetlights, enhancing safety and reducing energy costs by 60%.",
    category: "Civic",
    emoji: "💡"
  },
  {
    headline: "Coastal Road Phase 2 Progress",
    summary: "Mumbai's coastal road project achieves 75% completion with Phase 2 connecting Worli to Marine Drive. The 10.58 km stretch promises to cut travel time by 45 minutes upon inauguration in Q2 2025.",
    category: "Traffic",
    emoji: "🏗️"
  },
  {
    headline: "Cyber Crime Unit Busts Fraud Ring",
    summary: "Mumbai Police cyber cell arrests 12-member gang involved in ₹50 crore online scam. The operation recovered electronic devices and fake documents, bringing relief to 200+ victims across Maharashtra.",
    category: "Crime",
    emoji: "🚔"
  },
  {
    headline: "Bandra Property Prices Surge 18%",
    summary: "Real estate market analysis reveals Bandra West residential properties appreciated 18% year-on-year. Average price now ₹45,000 per sq ft driven by infrastructure development and commercial growth.",
    category: "RealEstate",
    emoji: "🏢"
  },
  {
    headline: "Gateway of India Festival Returns",
    summary: "Maharashtra Tourism launches 10-day cultural festival at Gateway of India featuring traditional dance, music, and cuisine. Expected to attract 2 lakh visitors with free entry from Dec 15-24.",
    category: "Events",
    emoji: "🎭"
  },
  {
    headline: "Airport Express Highway Expansion",
    summary: "MMRDA approves ₹800 crore project to widen Western Express Highway near airport. Six-lane expansion from Vile Parle to Dahisar promises smoother connectivity for 5 lakh daily vehicles.",
    category: "Traffic",
    emoji: "✈️"
  },
  {
    headline: "Worli Sea Link Toll Reduced",
    summary: "Maharashtra government slashes Bandra-Worli Sea Link toll by 25% for local commuters. New rates effective immediately: ₹45 for cars, ₹75 for SUVs. Expected to benefit 40,000+ daily users.",
    category: "Traffic",
    emoji: "🌉"
  },
  {
    headline: "Juhu Beach Cleanup Drive Success",
    summary: "BMC's weekend cleanup drive removes 12 tons of plastic waste from Juhu Beach with 5,000 volunteers. Initiative part of Swachh Mumbai mission includes installing 50 new waste segregation bins.",
    category: "Civic",
    emoji: "🏖️"
  }
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Select random news story
    const randomStory = mumbaiNewsStories[Math.floor(Math.random() * mumbaiNewsStories.length)]

    return NextResponse.json(randomStory)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
