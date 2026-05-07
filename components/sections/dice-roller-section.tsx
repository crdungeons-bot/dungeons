'use client';

import { useState, useEffect } from 'react';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100] as const;
type DiceType = typeof DICE_TYPES[number];

type RollResult = {
    dice: number[];
    total: number;
    diceType: DiceType;
    timestamp: number;
};

export default function DiceRollerSection() {
    const [diceType, setDiceType] = useState<DiceType>(20);
    const [numDice, setNumDice] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [result, setResult] = useState<RollResult | null>(null);
    const [animDice, setAnimDice] = useState<number[]>([]);
    const [history, setHistory] = useState<RollResult[]>([]);
    const [historyExpanded, setHistoryExpanded] = useState(false);

    // Animation effect while rolling
    useEffect(() => {
        if (!isRolling) return;
        const interval = setInterval(() => {
            setAnimDice(Array.from({ length: numDice }, () => 
                Math.floor(Math.random() * diceType) + 1
            ));
        }, 80);
        return () => clearInterval(interval);
    }, [isRolling, numDice, diceType]);

    const rollDice = () => {
        setIsRolling(true);
        setResult(null);

        setTimeout(() => {
            const dice = Array.from({ length: numDice }, () => 
                Math.floor(Math.random() * diceType) + 1
            );
            const total = dice.reduce((sum, d) => sum + d, 0);
            const newResult = { dice, total, diceType, timestamp: Date.now() };
            
            setResult(newResult);
            setHistory(prev => [newResult, ...prev].slice(0, 10)); // Keep last 10 rolls
            setIsRolling(false);
        }, 1200);
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header */}
            <div style={{ 
                padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 3rem)',
                borderBottom: '1px solid rgba(212,175,55,0.2)'
            }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                }}>
                    Active Session
                </p>
                <h1 style={{
                    color: 'var(--color-gold)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: '800',
                    margin: 0,
                    textShadow: '0 0 20px rgba(212,175,55,0.3)'
                }}>
                    🎲 Dice Roller
                </h1>
            </div>

            {/* Main Content Area */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '320px 1fr',
                gap: 0,
                flex: 1,
            }} className="dice-roller-layout">
                
                {/* Left Sidebar - Controls */}
                <div style={{
                    backgroundColor: 'var(--color-primary-dark)',
                    borderRight: '1px solid rgba(212,175,55,0.2)',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    overflowY: 'auto'
                }} className="dice-controls-sidebar">
                    <h2 style={{ 
                        color: 'var(--color-gold)',
                        fontSize: '1.1rem',
                        marginBottom: '1.5rem',
                        fontWeight: '700'
                    }} className="controls-title">
                        Dice Controls
                    </h2>

                    {/* Dice Type Selector */}
                    <div className="dice-selection-controls">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                color: 'rgba(244,232,208,0.7)',
                                fontSize: '0.85rem',
                                marginBottom: '0.75rem',
                                fontWeight: '600'
                            }}>
                                Dice Type
                            </label>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '0.5rem'
                            }}>
                                {DICE_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setDiceType(type)}
                                        disabled={isRolling}
                                        style={{
                                            padding: '0.75rem 0.25rem',
                                            backgroundColor: diceType === type 
                                                ? 'rgba(212,175,55,0.15)' 
                                                : 'rgba(0,0,0,0.3)',
                                            border: `2px solid ${diceType === type 
                                                ? 'var(--color-gold)' 
                                                : 'rgba(212,175,55,0.2)'}`,
                                            borderRadius: '0.375rem',
                                            color: diceType === type 
                                                ? 'var(--color-gold)' 
                                                : 'rgba(244,232,208,0.7)',
                                            fontSize: '1.1rem',
                                            fontWeight: '800',
                                            cursor: isRolling ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                            opacity: isRolling ? 0.5 : 1
                                        }}
                                    >
                                        d{type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Number of Dice */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                color: 'rgba(244,232,208,0.7)',
                                fontSize: '0.85rem',
                                marginBottom: '0.75rem',
                                fontWeight: '600'
                            }}>
                                Number: <span style={{ color: 'var(--color-gold)', fontSize: '1.25rem' }}>{numDice}</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={numDice}
                                onChange={(e) => setNumDice(parseInt(e.target.value))}
                                disabled={isRolling}
                                style={{
                                    width: '100%',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: `linear-gradient(to right, 
                                        var(--color-gold) 0%, 
                                        var(--color-gold) ${(numDice - 1) / 9 * 100}%, 
                                        rgba(212,175,55,0.2) ${(numDice - 1) / 9 * 100}%, 
                                        rgba(212,175,55,0.2) 100%)`,
                                    outline: 'none',
                                    cursor: isRolling ? 'not-allowed' : 'pointer',
                                    opacity: isRolling ? 0.5 : 1
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '0.5rem',
                                fontSize: '0.7rem',
                                color: 'rgba(244,232,208,0.3)'
                            }}>
                                <span>1</span>
                                <span>10</span>
                            </div>
                        </div>
                    </div>

                    {/* Roll Button */}
                    <div className="dice-roll-button-container">
                        <button
                            onClick={rollDice}
                            disabled={isRolling}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: isRolling 
                                    ? 'rgba(212,175,55,0.3)' 
                                    : 'var(--color-gold)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                color: 'var(--color-primary)',
                                fontSize: '1.1rem',
                                fontWeight: '800',
                                cursor: isRolling ? 'not-allowed' : 'pointer',
                                boxShadow: isRolling ? 'none' : '0 0 20px rgba(212,175,55,0.4)',
                                transition: 'all 0.2s',
                                letterSpacing: '0.05em'
                            }}
                        >
                            {isRolling ? '🎲 Rolling...' : `🎲 Roll ${numDice}d${diceType}`}
                        </button>
                    </div>
                </div>

                {/* Right Side - Results & History */}
                <div style={{
                    padding: 'clamp(2rem, 4vw, 3rem)',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }} className="dice-results-area">
                    
                    {/* Results Display */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                    }} className="dice-results-display">
                        {!isRolling && !result && (
                            <div style={{
                                textAlign: 'center',
                                color: 'rgba(244,232,208,0.3)',
                                fontSize: '1.25rem',
                                fontStyle: 'italic'
                            }}>
                                Select your dice and roll to begin...
                            </div>
                        )}

                        {isRolling && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '2rem'
                            }}>
                                <div style={{
                                    fontSize: 'clamp(4rem, 10vw, 6rem)',
                                    fontWeight: '900',
                                    color: 'rgba(212,175,55,0.4)',
                                    animation: 'pulse 0.5s ease-in-out infinite alternate',
                                    textShadow: '0 0 40px rgba(212,175,55,0.3)'
                                }}>
                                    {animDice.reduce((a, b) => a + b, 0)}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.75rem',
                                    justifyContent: 'center',
                                    maxWidth: '600px'
                                }}>
                                    {animDice.map((d, i) => (
                                        <div key={i} style={{
                                            padding: '1rem 1.5rem',
                                            backgroundColor: 'rgba(212,175,55,0.1)',
                                            border: '2px solid rgba(212,175,55,0.3)',
                                            borderRadius: '0.5rem',
                                            fontSize: '2rem',
                                            fontWeight: '800',
                                            color: 'rgba(212,175,55,0.5)',
                                            minWidth: '70px',
                                            textAlign: 'center'
                                        }}>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!isRolling && result && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '2rem'
                            }}>
                                <div style={{
                                    fontSize: 'clamp(5rem, 12vw, 8rem)',
                                    fontWeight: '900',
                                    color: 'var(--color-gold)',
                                    textShadow: '0 0 40px rgba(212,175,55,0.6)',
                                    animation: 'lu-scale-up 0.4s ease-out',
                                    lineHeight: 1
                                }}>
                                    {result.total}
                                </div>
                                <div style={{
                                    color: 'rgba(244,232,208,0.6)',
                                    fontSize: '1.25rem',
                                    fontWeight: '600',
                                    marginTop: '-1rem'
                                }}>
                                    {result.dice.length}d{result.diceType}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                    maxWidth: '700px'
                                }}>
                                    {result.dice.map((d, i) => (
                                        <div key={i} style={{
                                            padding: '1.25rem 1.5rem',
                                            backgroundColor: 'rgba(212,175,55,0.15)',
                                            border: '2px solid rgba(212,175,55,0.4)',
                                            borderRadius: '0.5rem',
                                            fontSize: '2rem',
                                            fontWeight: '800',
                                            color: 'var(--color-parchment)',
                                            minWidth: '80px',
                                            textAlign: 'center',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                            animation: `lu-scale-up 0.3s ease-out ${i * 0.05}s backwards`
                                        }}>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Roll Button - Moved here for mobile reordering */}
                    <div className="dice-roll-button-container" style={{ display: 'none' }}>
                        <button
                            onClick={rollDice}
                            disabled={isRolling}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: isRolling 
                                    ? 'rgba(212,175,55,0.3)' 
                                    : 'var(--color-gold)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                color: 'var(--color-primary)',
                                fontSize: '1.1rem',
                                fontWeight: '800',
                                cursor: isRolling ? 'not-allowed' : 'pointer',
                                boxShadow: isRolling ? 'none' : '0 0 20px rgba(212,175,55,0.4)',
                                transition: 'all 0.2s',
                                letterSpacing: '0.05em'
                            }}
                        >
                            {isRolling ? '🎲 Rolling...' : `🎲 Roll ${numDice}d${diceType}`}
                        </button>
                    </div>

                    {/* Roll History */}
                    {history.length > 0 && (
                        <div className="dice-roll-history">
                            <button
                                onClick={() => setHistoryExpanded(!historyExpanded)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.75rem 0',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginBottom: historyExpanded ? '1rem' : '0'
                                }}
                            >
                                <h2 style={{
                                    color: 'var(--color-gold)',
                                    fontSize: '1.25rem',
                                    margin: 0,
                                    fontWeight: '700'
                                }}>
                                    Roll History ({history.length})
                                </h2>
                                <span style={{
                                    color: 'var(--color-gold)',
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    transform: historyExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease'
                                }}>
                                    ▼
                                </span>
                            </button>
                            {historyExpanded && (
                                <div style={{
                                    display: 'grid',
                                    gap: '0.5rem',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    paddingRight: '0.5rem'
                                }} className="history-list">
                                    {history.map((h, i) => {
                                        const date = new Date(h.timestamp);
                                        const timeString = date.toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true
                                        });
                                        
                                        return (
                                            <div key={h.timestamp} style={{
                                                padding: '0.75rem 1rem',
                                                backgroundColor: i === 0 
                                                    ? 'rgba(212,175,55,0.1)' 
                                                    : 'rgba(0,0,0,0.2)',
                                                border: `1px solid ${i === 0 
                                                    ? 'rgba(212,175,55,0.3)' 
                                                    : 'rgba(212,175,55,0.1)'}`,
                                                borderRadius: '0.375rem',
                                                display: 'grid',
                                                gridTemplateColumns: 'auto 1fr auto',
                                                alignItems: 'center',
                                                gap: '1rem'
                                            }} className="history-row">
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem'
                                                }}>
                                                    <span style={{
                                                        fontSize: '1.5rem',
                                                        fontWeight: '800',
                                                        color: i === 0 ? 'var(--color-gold)' : 'rgba(244,232,208,0.7)',
                                                        minWidth: '50px',
                                                        textAlign: 'center'
                                                    }}>
                                                        {h.total}
                                                    </span>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                                                        <span style={{
                                                            fontSize: '0.875rem',
                                                            color: 'rgba(244,232,208,0.5)',
                                                            fontWeight: '600'
                                                        }}>
                                                            {h.dice.length}d{h.diceType}
                                                        </span>
                                                        <span style={{
                                                            fontSize: '0.7rem',
                                                            color: 'rgba(244,232,208,0.35)',
                                                            fontWeight: '500'
                                                        }}>
                                                            {timeString}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '0.375rem',
                                                    justifyContent: 'flex-end'
                                                }}>
                                                    {h.dice.map((d, di) => (
                                                        <span key={di} style={{
                                                            padding: '0.25rem 0.5rem',
                                                            backgroundColor: 'rgba(212,175,55,0.08)',
                                                            border: '1px solid rgba(212,175,55,0.2)',
                                                            borderRadius: '0.25rem',
                                                            fontSize: '0.8rem',
                                                            fontWeight: '700',
                                                            color: 'rgba(244,232,208,0.7)'
                                                        }}>
                                                            {d}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .dice-roller-layout {
                        grid-template-columns: 1fr !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    .dice-controls-sidebar {
                        border-right: none !important;
                        border-top: 1px solid rgba(212,175,55,0.2) !important;
                        display: flex !important;
                        flex-direction: column !important;
                        order: 3 !important;
                        padding: 1.5rem !important;
                    }
                    .dice-controls-sidebar > .dice-roll-button-container {
                        display: none !important;
                    }
                    .controls-title {
                        display: none !important;
                    }
                    .dice-results-area {
                        order: 1 !important;
                        padding: 1.5rem !important;
                        display: flex !important;
                        flex-direction: column !important;
                    }
                    .dice-results-area > .dice-roll-button-container {
                        display: block !important;
                        order: 2 !important;
                        margin-bottom: 1.5rem !important;
                    }
                    .dice-results-display {
                        min-height: 250px !important;
                        order: 1 !important;
                    }
                    .dice-roll-history {
                        order: 4 !important;
                        padding: 1.5rem !important;
                        border-top: none !important;
                    }
                    .dice-selection-controls {
                        order: 1 !important;
                    }
                    .dice-selection-controls button {
                        padding: 0.5rem 0.25rem !important;
                        font-size: 0.9rem !important;
                    }
                    .history-row {
                        grid-template-columns: auto 1fr !important;
                        padding: 0.625rem 0.75rem !important;
                    }
                    .history-row > div:first-child {
                        gap: 0.5rem !important;
                    }
                    .history-row > div:first-child > span:first-child {
                        font-size: 1.25rem !important;
                        min-width: 40px !important;
                    }
                    .history-list {
                        gap: 0.375rem !important;
                    }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
                @keyframes lu-scale-up {
                    0% { opacity: 0; transform: scale(0.4); }
                    60% { opacity: 1; transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
