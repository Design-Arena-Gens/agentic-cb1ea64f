'use client'

import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import { format } from 'date-fns'

interface NewsStory {
  headline: string
  summary: string
  category: string
  emoji: string
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [newsStory, setNewsStory] = useState<NewsStory | null>(null)
  const [error, setError] = useState('')
  const postRef = useRef<HTMLDivElement>(null)

  const fetchNews = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/news')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news')
      }

      setNewsStory(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    if (!postRef.current) return

    try {
      const dataUrl = await toPng(postRef.current, {
        quality: 1,
        pixelRatio: 2,
        width: 1080,
        height: 1080,
      })

      const link = document.createElement('a')
      link.download = `mumbai-news-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      alert('Failed to generate image')
    }
  }

  const getEmojis = (category: string) => {
    const emojiMap: { [key: string]: string[] } = {
      traffic: ['🚗', '🚦', '🛣️'],
      weather: ['🌦️', '☀️', '🌧️'],
      crime: ['🚔', '⚠️', '🚨'],
      civic: ['🏛️', '🏗️', '📋'],
      events: ['🎭', '🎪', '🎉'],
      realestate: ['🏢', '🏠', '📈'],
    }
    return emojiMap[category.toLowerCase()] || ['📰', '🔔', '📍']
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
        Mumbai News 📰
      </h1>
      <p style={{ fontSize: '18px', color: '#aaa', textAlign: 'center', marginBottom: '40px' }}>
        Latest verified local news • Instagram-ready posts
      </p>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          onClick={fetchNews}
          disabled={loading}
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: '#000',
            border: 'none',
            padding: '16px 48px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)',
          }}
        >
          {loading ? 'Fetching News...' : 'Get Latest Mumbai News'}
        </button>
      </div>

      {error && (
        <div style={{
          background: '#ff4444',
          color: '#fff',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {newsStory && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <div
            ref={postRef}
            style={{
              width: '1080px',
              height: '1080px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '0',
            }}
          >
            {/* Background Mumbai Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1080&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.25,
            }} />

            {/* Yellow accent bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: '#FFD700',
            }} />

            {/* Content container */}
            <div style={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '80px 60px 60px',
            }}>
              {/* Header */}
              <div>
                <div style={{
                  background: '#FFD700',
                  color: '#000',
                  display: 'inline-block',
                  padding: '12px 28px',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}>
                  {newsStory.category}
                </div>

                {/* Headline */}
                <h2 style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: '#fff',
                  lineHeight: '1.1',
                  marginBottom: '50px',
                  textShadow: '3px 3px 10px rgba(0,0,0,0.8)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {newsStory.headline}
                </h2>

                {/* Summary */}
                <p style={{
                  fontSize: '36px',
                  lineHeight: '1.5',
                  color: '#fff',
                  marginBottom: '50px',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                  maxWidth: '900px',
                }}>
                  {newsStory.summary}
                </p>
              </div>

              {/* Footer */}
              <div>
                {/* Date & Location */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '30px',
                }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: '#FFD700',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '28px',
                    fontWeight: 'bold',
                  }}>
                    📍 Mumbai
                  </div>
                  <div style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '28px',
                  }}>
                    {format(new Date(), 'dd MMM yyyy')}
                  </div>
                </div>

                {/* Emojis */}
                <div style={{
                  fontSize: '52px',
                  marginBottom: '30px',
                  letterSpacing: '10px',
                }}>
                  {getEmojis(newsStory.category).join(' ')}
                </div>

                {/* Hashtags */}
                <div style={{
                  fontSize: '32px',
                  color: '#FFD700',
                  fontWeight: 'bold',
                  lineHeight: '1.4',
                }}>
                  #MumbaiNews #MumbaiUpdates #MumbaiCity #BreakingNews #LocalMumbai
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={downloadImage}
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
            }}
          >
            📥 Download Instagram Post
          </button>
        </div>
      )}
    </div>
  )
}
