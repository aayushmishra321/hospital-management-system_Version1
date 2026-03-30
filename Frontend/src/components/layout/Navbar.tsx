export const Navbar = () => {
    return (
        <header className="bg-primary text-surface px-8 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
                <span className="font-heading text-2xl font-bold tracking-tight">HMS</span>
                <span className="px-2 py-0.5 bg-primary-dark text-xs font-mono rounded">v1.0 Enterprise</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 font-body text-sm">
                <a href="#" className="hover:text-accent transition-colors">Dashboard</a>
                <a href="#" className="hover:text-accent transition-colors">Queue</a>
                <a href="#" className="hover:text-accent transition-colors">Billing</a>
                <a href="#" className="hover:text-accent transition-colors">Settings</a>
            </nav>
            <div>
                <button className="px-4 py-2 bg-surface text-primary font-medium rounded-lg text-sm hover:bg-background transition-colors">
                    Sign Out
                </button>
            </div>
        </header>
    );
};