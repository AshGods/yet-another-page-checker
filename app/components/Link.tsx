"use client";

interface LinkProps {
    href: string;
    children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
    return (
        <a href={href} className="text-blue-400 hover:text-blue-300">
            {children}
        </a>
    );
} 