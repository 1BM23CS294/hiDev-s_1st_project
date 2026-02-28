'use client';
import { useState, useEffect, Suspense } from 'react';
import type { AnalyzedCandidate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { PageLoader } from '@/components/ui/page-loader';
import { PrintableReport } from '@/app/components/printable-report';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';

function ReportContent({ params }: { params: { reportId: string } }) {
    const { reportId } = params;
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const searchParams = useSearchParams();

    const sessionData = searchParams.get('sessionData');

    const reportDocRef = useMemoFirebase(() => {
        if (sessionData || !user || !firestore || !reportId) return null;
        return doc(firestore, 'users', user.uid, 'analysisReports', reportId);
    }, [firestore, user, reportId, sessionData]);

    const { data: reportDoc, isLoading: isReportLoading, error: reportError } = useDoc(reportDocRef);

    const [reportData, setReportData] = useState<AnalyzedCandidate | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionData) {
            try {
                const data = JSON.parse(sessionStorage.getItem(`report_${reportId}`) || '{}');
                if (data && data.id === reportId) {
                    setReportData(data);
                } else {
                     setError("Report data not found in session. It may have expired.");
                }
            } catch (e) {
                 setError("Could not parse report data from session.");
            }
            return;
        }

        if (isReportLoading || isUserLoading) {
            return;
        }

        if (reportDoc) {
            try {
                const firestoreData = JSON.parse(reportDoc.reportJson);
                setReportData(firestoreData);
                setError(null);
            } catch (e) {
                console.error("Could not parse report data from Firestore.", e);
                setError("Failed to read report data. The format is invalid.");
            }
        } else if (reportError) {
             console.error("Firestore error:", reportError);
             setError("Could not load report due to a database error.");
        } else if (!isReportLoading && !reportDoc) {
            setError("Report not found. It may not have been saved to your history yet.");
        }
    }, [reportDoc, isReportLoading, reportError, isUserLoading, sessionData, reportId]);

    if (!sessionData && (isReportLoading || isUserLoading)) {
        return <PageLoader />;
    }

    if (error || !reportData) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-100 text-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Report Not Found</h1>
                    <p className="text-gray-600">
                       {error || "The report could not be loaded. Please try again from the dashboard."}
                    </p>
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
            <main className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-100">
                <div className="no-print mb-8 flex justify-end gap-2">
                    <Button onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print or Save as PDF
                    </Button>
                </div>
                <div className="printable-area bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                    <PrintableReport data={reportData} />
                </div>
            </main>
        </>
    );
}


export default function ReportPage({ params }: { params: { reportId: string } }) {
    return (
        <Suspense fallback={<PageLoader />}>
            <ReportContent params={params} />
        </Suspense>
    );
}
