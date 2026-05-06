import { Navigation } from '@/components';
import Sidebar from '@/components/dashboard/sidebar';
import ProtectedRoute from '@/components/protected-route';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navigation />
                <div style={{ display: 'flex', flex: 1 }}>
                    <Sidebar />
                    <main style={{ flex: 1, overflow: 'auto' }}>
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
