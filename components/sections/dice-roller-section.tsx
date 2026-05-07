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

    const quickRoll = (type: DiceType, count: number) => {
        setDiceType(type);
        setNumDice(count);
        setTimeout(() => {
            const dice = Array.from({ length: count }, () => 
                Math.floor(Math.random() * type) + 1
            );
            const total = dice.reduce((sum, d) => sum + d, 0);
            const newResult = { dice, total, diceType: type, timestamp: Date.now() };
            
            setResult(newResult);
            setHistory(prev => [newResult, ...prev].slice(0, 10));
        }, 50);
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-primary)',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
        }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem'
                }}>
                    Active Session
                </p>
                <h1 style={{
                    color: 'var(--color-gold)',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '800',
                    marginBottom: '0.5rem',
                    textShadow: '0 0 20px rgba(212,175,55,0.3)'
                }}>
                    🎲 Dice Roller
                </h1>
                <p style={{
                    color: 'rgba(244,232,208,0.6)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Roll the dice and let fate decide your destiny
                </p>
            </div>

            <div style={{ 
                maxWidth: '900px',
                margin: '0 auto',
                display: 'grid',
                gap: '2rem'
            }}>
                
                {/* Dice Controls */}
                <div className="card-dnd">
                    <h2 style={{ 
                        color: 'var(--color-gold)',
                        fontSize: '1.25rem',
                        marginBottom: '1.5rem',
                        fontWeight: '700'
                    }}>
                        Choose Your Dice
                    </h2>

                    {/* Dice Type Selector */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            color: 'rgba(244,232,208,0.7)',
                            fontSize: '0.9rem',
                            marginBottom: '0.75rem',
                            fontWeight: '600'
                        }}>
                            Dice Type
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                            gap: '0.75rem'
                        }}>
                            {DICE_TYPES.map(type => (
                                <button
                                    key={type}
                                    onClick={() => setDiceType(type)}
                                    disabled={isRolling}
                                    style={{
                                        padding: '1rem 0.5rem',
                                        backgroundColor: diceType === type 
                                            ? 'rgba(212,175,55,0.15)' 
                                            : 'rgba(0,0,0,0.3)',
                                        border: `2px solid ${diceType === type 
                                            ? 'var(--color-gold)' 
                                            : 'rgba(212,175,55,0.2)'}`,
                                        borderRadius: '0.5rem',
                                        color: diceType === type 
                                            ? 'var(--color-gold)' 
                                            : 'rgba(244,232,208,0.7)',
                                        fontSize: '1.25rem',
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
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            color: 'rgba(244,232,208,0.7)',
                            fontSize: '0.9rem',
                            marginBottom: '0.75rem',
                            fontWeight: '600'
                        }}>
                            Number of Dice: <span style={{ color: 'var(--color-gold)' }}>{numDice}</span>
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
                            fontSize: '0.75rem',
                            color: 'rgba(244,232,208,0.4)'
                        }}>
                            <span>1</span>
                            <span>10</span>
                        </div>
                    </div>

                    {/* Roll Button */}
                    <button
                        onClick={rollDice}
                        disabled={isRolling}
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            backgroundColor: isRolling 
                                ? 'rgba(212,175,55,0.3)' 
                                : 'var(--color-gold)',
                            border: 'none',
                            borderRadius: '0.75rem',
                            color: 'var(--color-primary)',
                            fontSize: '1.25rem',
                            fontWeight: '800',
                            cursor: isRolling ? 'not-allowed' : 'pointer',
                            boxShadow: isRolling ? 'none' : '0 0 20px rgba(212,175,55,0.4)',
                            transition: 'all 0.2s',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {isRolling ? '🎲 Rolling...' : `🎲 Roll ${numDice}d${diceType}`}
                    </button>

                    {/* Quick Roll Buttons */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <p style={{
                            color: 'rgba(244,232,208,0.5)',
                            fontSize: '0.8rem',
                            marginBottom: '0.75rem',
                            fontWeight: '600'
                        }}>
                            Quick Rolls
                        </p>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            {[
                                { label: 'd20', type: 20 as DiceType, count: 1 },
                                { label: '2d20', type: 20 as DiceType, count: 2 },
                                { label: '4d6', type: 6 as DiceType, count: 4 },
                                { label: '8d6', type: 6 as DiceType, count: 8 },
                                { label: '2d8', type: 8 as DiceType, count: 2 },
                                { label: 'd100', type: 100 as DiceType, count: 1 },
                            ].map(qr => (
                                <button
                                    key={qr.label}
                                    onClick={() => quickRoll(qr.type, qr.count)}
                                    disabled={isRolling}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'rgba(212,175,55,0.1)',
                                        border: '1px solid rgba(212,175,55,0.3)',
                                        borderRadius: '0.375rem',
                                        color: 'var(--color-gold)',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        cursor: isRolling ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: isRolling ? 0.5 : 1
                                    }}
                                    onMouseEnter={(e) => !isRolling && (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.2)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)')}
                                >
                                    {qr.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Display */}
                {(isRolling || result) && (
                    <div className="card-dnd">
                        <h2 style={{
                            color: 'var(--color-gold)',
                            fontSize: '1.25rem',
                            marginBottom: '1.5rem',
                            fontWeight: '700'
                        }}>
                            {isRolling ? 'Rolling...' : 'Result'}
                        </h2>

                        {isRolling ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                padding: '2rem'
                            }}>
                                <div style={{
                                    fontSize: '4rem',
                                    fontWeight: '900',
                                    color: 'rgba(212,175,55,0.4)',
                                    animation: 'pulse 0.5s ease-in-out infinite alternate'
                                }}>
                                    {animDice.reduce((a, b) => a + b, 0)}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                    justifyContent: 'center'
                                }}>
                                    {animDice.map((d, i) => (
                                        <div key={i} style={{
                                            padding: '0.75rem 1rem',
                                            backgroundColor: 'rgba(212,175,55,0.1)',
                                            border: '2px solid rgba(212,175,55,0.3)',
                                            borderRadius: '0.5rem',
                                            fontSize: '1.5rem',
                                            fontWeight: '800',
                                            color: 'rgba(212,175,55,0.5)',
                                            minWidth: '60px',
                                            textAlign: 'center'
                                        }}>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : result && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                padding: '2rem'
                            }}>
                                <div style={{
                                    fontSize: '5rem',
                                    fontWeight: '900',
                                    color: 'var(--color-gold)',
                                    textShadow: '0 0 30px rgba(212,175,55,0.5)',
                                    animation: 'lu-scale-up 0.4s ease-out'
                                }}>
                                    {result.total}
                                </div>
                                <div style={{
                                    color: 'rgba(244,232,208,0.6)',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    marginTop: '-1rem'
                                }}>
                                    {result.dice.length}d{result.diceType}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.75rem',
                                    justifyContent: 'center',
                                    maxWidth: '600px'
                                }}>
                                    {result.dice.map((d, i) => (
                                        <div key={i} style={{
                                            padding: '1rem 1.25rem',
                                            backgroundColor: 'rgba(212,175,55,0.15)',
                                            border: '2px solid rgba(212,175,55,0.4)',
                                            borderRadius: '0.5rem',
                                            fontSize: '1.75rem',
                                            fontWeight: '800',
                                            color: 'var(--color-parchment)',
                                            minWidth: '70px',
                                            textAlign: 'center',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                            animation: `lu-scale-up 0.3s ease-out ${i * 0.05}s backwards`
                                        }}>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <style>{`
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
                )}

                {/* Roll History */}
                {history.length > 0 && (
                    <div className="card-dnd">
                        <h2 style={{
                            color: 'var(--color-gold)',
                            fontSize: '1.25rem',
                            marginBottom: '1rem',
                            fontWeight: '700'
                        }}>
                            Roll History
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            maxHeight: '400px',
                            overflowY: 'auto'
                        }}>
                            {history.map((h, i) => (
                                <div key={h.timestamp} style={{
                                    padding: '1rem',
                                    backgroundColor: i === 0 
                                        ? 'rgba(212,175,55,0.1)' 
                                        : 'rgba(0,0,0,0.2)',
                                    border: `1px solid ${i === 0 
                                        ? 'rgba(212,175,55,0.3)' 
                                        : 'rgba(212,175,55,0.1)'}`,
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            fontSize: '1.5rem',
                                            fontWeight: '800',
                                            color: i === 0 ? 'var(--color-gold)' : 'rgba(244,232,208,0.7)'
                                        }}>
                                            {h.total}
                                        </span>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            color: 'rgba(244,232,208,0.5)',
                                            fontWeight: '600'
                                        }}>
                                            {h.dice.length}d{h.diceType}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.375rem'
                                    }}>
                                        {h.dice.map((d, di) => (
                                            <span key={di} style={{
                                                padding: '0.25rem 0.5rem',
                                                backgroundColor: 'rgba(212,175,55,0.08)',
                                                border: '1px solid rgba(212,175,55,0.2)',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                color: 'rgba(244,232,208,0.6)'
                                            }}>
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
