'use client';

export function getScoreStyling(score: number) {
    if (score >= 80) {
        return {
            color: 'text-green-400',
            stroke: 'stroke-green-400',
            indicator: 'bg-green-400',
            rating: 'Excellent Match',
        };
    }
    if (score >= 60) {
        return {
            color: 'text-yellow-400',
            stroke: 'stroke-yellow-400',
            indicator: 'bg-yellow-400',
            rating: 'Good Match',
        };
    }
    return {
        color: 'text-red-400',
        stroke: 'stroke-red-400',
        indicator: 'bg-red-400',
        rating: 'Needs Improvement',
    };
}
