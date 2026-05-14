export default function MaintenancePage() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>DND Guru - Under Construction</title>
            </head>
            <body style={{ margin: 0, padding: 0 }}>
                <div style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #0a0502 0%, #1a0f08 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                    {/* Logo */}
                    <div style={{
                        marginBottom: '3rem',
                        width: '180px',
                        height: '180px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <img
                            src="/dnd-guru-logo-512.png"
                            alt="DND Guru Logo"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>

                    {/* Main message */}
                    <div style={{
                        textAlign: 'center',
                        maxWidth: '600px',
                    }}>
                        <h1 style={{
                            color: '#d4af37',
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            marginBottom: '1rem',
                            letterSpacing: '0.02em',
                        }}>
                            Under Construction
                        </h1>
                        
                        <p style={{
                            color: 'rgba(244, 232, 208, 0.7)',
                            fontSize: '1.1rem',
                            lineHeight: '1.7',
                            marginBottom: '2rem',
                        }}>
                            We're making some important improvements to bring you the best D&D experience possible.
                        </p>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem 2rem',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            borderRadius: '0.5rem',
                        }}>
                            <span style={{
                                fontSize: '1.5rem',
                            }}>🔧</span>
                            <span style={{
                                color: '#d4af37',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                letterSpacing: '0.05em',
                            }}>
                                We'll be back soon!
                            </span>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p style={{
                        position: 'absolute',
                        bottom: '2rem',
                        color: 'rgba(244, 232, 208, 0.3)',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                    }}>
                        Thank you for your patience
                    </p>
                </div>
            </body>
        </html>
    );
}
