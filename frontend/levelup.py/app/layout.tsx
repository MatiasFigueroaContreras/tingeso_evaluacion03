import SideBar from "@/components/sidebar/SideBar";
import "./globals.css";
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";

const baloo = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LEVELUP.py",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={baloo.className}>
                <SideBar />
                <main className="app">{children}</main>
            </body>
        </html>
    );
}
