'use client';
import { useState, useEffect, useMemo } from 'react';
import type { AnalyzedCandidate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { PageLoader } from '@/components/ui/page-loader';
import { PrintableComparisonReport } from '@/app/components/printable-comparison-report';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';

export default function CompareReportPage() {
    const searchParams = useSearchParams();
    const ids = searchParams.get('ids');
    const [reportIdA, reportIdB] = useMemo(() => ids?.split(',') || [null, null], [ids]);

    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const reportADocRef = useMemoFirebase(() => {
        if (!user || !firestore || !reportIdA) return null;
        return doc(firestore, 'users', user.uid, 'analysisReports', reportIdA);
    }, [firestore, user, reportIdA]);

    const reportBDocRef = useMemoFirebase(() => {
        if (!user || !firestore || !reportIdB) return null;
        return doc(firestore, 'users', user.uid, 'analysisReports', reportIdB);
    }, [firestore, user, reportIdB]);

    const { data: reportADoc, isLoading: isLoadingA } = useDoc(reportADocRef);
    const { data: reportBDoc, isLoading: isLoadingB } = useDoc(reportBDocRef);

    const [reportData, setReportData] = useState<[AnalyzedCandidate, AnalyzedCandidate] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoadingA || isLoadingB || isUserLoading) return;
        
        if (reportADoc && reportBDoc) {
            try {
                const dataA = JSON.parse(reportADoc.reportJson);
                const dataB = JSON.parse(reportBDoc.reportJson);
                setReportData([dataA, dataB]);
                setError(null);
            } catch (e) {
                setError("Failed to read report data. The format is invalid.");
            }
        } else if (!ids) {
            setError("No report IDs provided.");
        }
        else {
            setError("One or more reports could not be found.");
        }
    }, [reportADoc, reportBDoc, isLoadingA, isLoadingB, isUserLoading, ids]);

    if (isLoadingA || isLoadingB || isUserLoading) {
        return <PageLoader />;
    }

    if (error || !reportData) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background text-center text-white">
                <div>
                    <h1 className="text-2xl font-bold">Comparison Report Not Found</h1>
                    <p className="text-muted-foreground">{error || "The report could not be loaded."}</p>
                </div>
            </div>
        );
    }
    
    return (
        <>
            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none;
                    }
                    body {
                        background: white !important;
                    }
                    .printable-area {
                        box-shadow: none;
                        border: none;
                    }
                }
            `}</style>
            <main className="max-w-6xl mx-auto p-4 sm:p-8 bg-gray-100">
                <div className="no-print mb-8 flex justify-end gap-2">
                    <Button onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print or Save as PDF
                    </Button>
                </div>
                <div className="printable-area bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                    <PrintableComparisonReport data={reportData} />
                </div>
            </main>
        </>
    );
}
