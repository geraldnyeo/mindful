import "./landingPage.css"
import { useEffect, useState } from "react"
import { ThemeToggle } from "../../components/ThemeToggle"
import { Heart, Users, Target, ArrowRight, Zap, Globe } from "lucide-react"
import { useNavigate } from "react-router"

function LandingPage() {
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        // Initialize theme from localStorage
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            {/* Navigation */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white dark:bg-slate-900 shadow-md" : "bg-transparent"
            }`}>
                <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-slate-900 dark:text-white">Mindful</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/auth/login")}
                            className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/auth/signup")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Sign Up
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                                    ✨ Volunteer Platform for MINDS Singapore
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                                    Smart Volunteer Management for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">MINDS</span>
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Coordinate volunteers, track their contributions, and maximize impact for people with intellectual disabilities. Empower MINDS' mission with intelligent volunteer management.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => navigate("/auth/signup")}
                                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </button>
                                <button
                                    className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 dark:border-slate-700 transition-all duration-300"
                                >
                                    Learn More
                                </button>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                🔒 Secure • 🚀 Fast • 📊 Powerful analytics
                            </p>
                        </div>
                        <div className="relative h-96 md:h-full min-h-96">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 dark:from-blue-600/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                                <div className="space-y-4 w-full px-6">
                                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded w-3/4"></div>
                                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded"></div>
                                    <div className="h-4 bg-blue-200 dark:bg-blue-900 rounded w-5/6"></div>
                                    <div className="flex gap-2 pt-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-32 bg-white dark:bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Powerful Features for MINDS Volunteers
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Everything you need to manage volunteers and maximize impact for our beneficiaries
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: "Volunteer Management",
                                description: "Register, manage, and track all MINDS volunteers in one centralized platform"
                            },
                            {
                                icon: Target,
                                title: "Event Scheduling",
                                description: "Create and manage volunteer events with automatic notifications and reminders"
                            },
                            {
                                icon: Zap,
                                title: "Impact Tracking",
                                description: "Monitor volunteer hours, contributions, and measure the impact on beneficiaries"
                            },
                            {
                                icon: Heart,
                                title: "Mission Alignment",
                                description: "Connect volunteers to MINDS' mission and celebrate their meaningful contributions"
                            },
                            {
                                icon: Globe,
                                title: "Mobile Friendly",
                                description: "Access the platform on any device. Perfect for volunteers on the go"
                            },
                            {
                                icon: Zap,
                                title: "Secure & Compliant",
                                description: "Enterprise-grade security for sensitive volunteer and participant information"
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-8 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Ready to Strengthen MINDS' Volunteer Network?
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Join MINDS in using this smart platform to coordinate volunteers and maximize impact for people with intellectual disabilities.
                    </p>
                    <button
                        onClick={() => navigate("/auth/signup")}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Start Free Today <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-bold text-white">Mindful</span>
                            </div>
                            <p className="text-sm text-slate-400">Supporting MINDS' mission through intelligent volunteer management.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8">
                        <p className="text-center text-sm text-slate-400">
                            &copy; 2026 MINDS Volunteer Management System. Supporting MINDS Singapore.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage