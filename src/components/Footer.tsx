
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary/30 py-12 mt-20 border-t border-border/40">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-display text-lg font-semibold tracking-tight">Paula Mitchell</h3>
                        <p className="text-sm text-muted-foreground mt-1">Visual Storyteller</p>
                    </div>

                    <div className="flex gap-8">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        &copy; {currentYear} All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
