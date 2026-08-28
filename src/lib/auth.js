import { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

let initialized = false

function ensureInit() {
  if (!initialized) {
    netlifyIdentity.init()
    initialized = true
  }
}

// React hook exposing the current Netlify Identity user and auth actions.
// On the free Netlify tier this provides real server-verified auth for gating
// the private area. Enable Identity in the Netlify site dashboard for it to work.
export function useAuth() {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ensureInit()
    setUser(netlifyIdentity.currentUser())
    setReady(true)

    const onLogin = (u) => { setUser(u); netlifyIdentity.close() }
    const onLogout = () => setUser(null)
    netlifyIdentity.on('login', onLogin)
    netlifyIdentity.on('logout', onLogout)
    return () => {
      netlifyIdentity.off('login', onLogin)
      netlifyIdentity.off('logout', onLogout)
    }
  }, [])

  return {
    user,
    ready,
    login: () => { ensureInit(); netlifyIdentity.open('login') },
    logout: () => netlifyIdentity.logout(),
  }
}
